import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/hooks/lib/stripe"; // Ensure this is your Stripe instance
import { NextResponse } from "next/server";
import db from "@/hooks/lib/db"; // Ensure this is your Prisma client
import {
  sendExamPurchaseEmail,
  sendLifetimeAccessEmail,
  sendSubscriptionEndedEmail,
  sendSubscriptionStartEmail,
  sendVendorExamPurchasedEmail,
} from "@/hooks/lib/mail"; // Ensure these are correctly imported

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature"); // Get headers directly

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("missing stripe signature or secret");
    return NextResponse.json(
      { error: "Missing Stripe signature or secret" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error: any) {
    console.error("signing error in stripe webhook", error);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Log the event type being processed
  console.log(`Processing Stripe event: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const examId = session.metadata?.examId;
        const isLifetime = session.metadata?.isLifetime === "true";
        const userEmail = session.metadata?.userEmail;

        if (!userEmail) {
          console.error("User email not found in session metadata");
          return NextResponse.json(
            { error: "User email not found in session metadata" },
            { status: 400 },
          );
        }

        const user = await db.user.findUnique({
          where: { email: userEmail },
        });

        if (!user) {
          console.error(`User not found for email: ${userEmail}`);
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 },
          );
        }

        console.log(`User found for session: ${user.email}`);

        // --- Handle Provisioning based on product type ---
        if (isLifetime) {
          console.log(`Granting lifetime access to user: ${user.email}`);

          await db.user.update({
            where: { id: user.id },
            data: {
              hasLifetimeAccess: true,
              stripeCustomerId: session.customer as string, // Link customer ID
            },
          });

          // Payment record will be created by invoice.payment_succeeded
          // send email for lifetime access purchase
          try {
            // Retrieve invoice link if available on the session or via payment_intent -> invoice
            let invoiceLink = "";
            if (session.invoice) {
              try {
                const invoice = await stripe.invoices.retrieve(
                  session.invoice as string,
                );
                invoiceLink = invoice.hosted_invoice_url || "";
              } catch (err) {
                console.error(
                  "Failed to retrieve invoice for session:",
                  session.invoice,
                  err,
                );
              }
            }

            const emailResult = await sendLifetimeAccessEmail(
              user.email,
              "LIFETIME ACCESS",
              `https://hydranode.ai/profile/${user.id}`,
              new Date().toLocaleString("en-US", {
                timeZone: "UTC",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
              user.firstName,
              user.lastName,
              invoiceLink,
            );

            if (emailResult?.error) {
              console.error(
                "Failed to send lifetime access email:",
                emailResult.error,
              );
            } else {
              console.log(
                "Successfully sent lifetime access email to:",
                user.email,
              );
            }
          } catch (emailError) {
            console.error("Error sending lifetime access email:", emailError);
          }
        } else if (session.subscription) {
          console.log("Handling new subscription checkout completion");
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
          );

          // Provision subscription access
          await updateUserWithSubscription(user.id, subscription); // Pass user ID

          try {
            let invoiceLink = "";
            if (subscription.latest_invoice) {
              try {
                const invoice = await stripe.invoices.retrieve(
                  subscription.latest_invoice as string,
                );
                invoiceLink = invoice.hosted_invoice_url || "";
              } catch (err) {
                console.error(
                  "Failed to retrieve invoice for subscription:",
                  subscription.latest_invoice,
                  err,
                );
              }
            }

            let planName = subscription.items.data[0]?.price?.nickname;
            if (!planName) {
              // Fetch the product name as a fallback
              const price = subscription.items.data[0]?.price;
              if (price?.product) {
                try {
                  const product = await stripe.products.retrieve(
                    price.product as string,
                  );
                  planName = product.name;
                } catch (err) {
                  console.error(
                    "Failed to retrieve product for subscription:",
                    price?.product,
                    err,
                  );
                  planName = "Your Subscription Plan";
                }
              } else {
                planName = "Your Subscription Plan";
              }
            }

            const emailResult = await sendSubscriptionStartEmail(
              user.email,
              planName,
              new Date().toLocaleString("en-US", {
                // Use event timestamp or subscription start date
                timeZone: "UTC",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
              user.firstName,
              user.lastName,
              invoiceLink,
            );

            if (emailResult?.error) {
              console.error(
                "Failed to send subscription start email:",
                emailResult.error,
              );
            } else {
              console.log(
                "Successfully sent subscription start email to:",
                user.email,
              );
            }
          } catch (emailError) {
            console.error(
              "Error sending subscription start email:",
              emailError,
            );
          }
        }
        // One-time payment case (Exams)
        else if (session.payment_intent && examId) {
          console.log(
            `Handling one-time exam purchase checkout completion for examId: ${examId}`,
          );

          const paymentIntent = await stripe.paymentIntents.retrieve(
            session.payment_intent as string,
          );

          if (paymentIntent.status !== "succeeded") {
            console.warn(
              `Payment intent ${paymentIntent.id} for exam ${examId} is not succeeded. Status: ${paymentIntent.status}. Skipping purchase and payment creation.`,
            );
            return NextResponse.json({ received: true }, { status: 200 });
          }

          let invoiceLink = "";
          if (paymentIntent.invoice) {
            try {
              const invoice = await stripe.invoices.retrieve(
                paymentIntent.invoice as string,
              );
              invoiceLink = invoice.hosted_invoice_url || "";
            } catch (err) {
              console.error(
                "Failed to retrieve invoice for payment intent:",
                paymentIntent.invoice,
                err,
              );
            }
          }

          await processExamPurchase(user, examId, paymentIntent, invoiceLink);
        } else {
          console.warn(
            "Checkout session completed, but no lifetime, subscription, or exam metadata found.",
            {
              sessionId: session.id,
              subscriptionId: session.subscription,
              paymentIntentId: session.payment_intent,
              metadata: session.metadata,
            },
          );
        }

        break; // End of checkout.session.completed case
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer;

        console.log(`Subscription ${subscription.id} has been deleted.`);

        const user = await db.user.findUnique({
          where: { stripeCustomerId: customerId as string },
        });

        if (!user) {
          console.error(
            `User not found by customer ID ${customerId} while handling subscription deleted event.`,
          );
          return NextResponse.json(
            { error: "User not found while revoking subscription access" },
            { status: 404 },
          );
        }

        console.log(`Revoking access for user: ${user.email}`);

        // Update the user's subscription status and related fields
        await db.user.update({
          where: { id: user.id },
          data: {
            hasActiveSubscription: false,
            // Keep stripeSubscriptionId, stripePriceId, stripeCurrentPeriodEnd
            // for historical reference if needed. Do NOT clear them here
            // unless your logic specifically requires it.
          },
        });

        try {
          const priceNickname =
            subscription.items.data[0]?.price?.nickname ||
            "Your Subscription Plan";

          const emailResult = await sendSubscriptionEndedEmail(
            user.email,
            new Date(subscription.current_period_end * 1000).toLocaleString(
              "en-US",
              {
                timeZone: "UTC", // Or user's timezone if stored
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              },
            ),
            `www.hydranode.ai/pricing`, // Link to re-subscribe
            priceNickname,
            user.firstName,
            user.lastName,
          );

          if (emailResult?.error) {
            console.error(
              "Failed to send subscription ended email:",
              emailResult.error,
            );
          } else {
            console.log(
              "Successfully sent subscription ended email to:",
              user.email,
            );
          }
        } catch (emailError) {
          console.error("Error sending subscription ended email:", emailError);
        }

        console.log(`Revoked access for user: ${user.email} and sent email.`);
        break; // End of customer.subscription.deleted case
      }

      // --- Add Handler for successful payments ---
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;

        // Only process if the invoice is actually paid
        if (invoice.status !== "paid") {
          console.log(
            `Invoice ${invoice.id} status is ${invoice.status}, not 'paid'. Skipping payment record creation.`,
          );
          // Return 200 as the event was received and handled (by skipping)
          return NextResponse.json({ received: true }, { status: 200 });
        }

        const paymentIntentId = invoice.payment_intent as string;
        const customerId = invoice.customer as string;
        const subscriptionId = invoice.subscription as string | null; // Can be null for one-time payments

        console.log(
          `Handling successful invoice payment: ${invoice.id} (Payment Intent: ${paymentIntentId}, Customer: ${customerId}, Subscription: ${subscriptionId})`,
        );

        if (!customerId || !paymentIntentId) {
          console.error(
            `Missing customer ID or payment intent ID on invoice ${invoice.id}.`,
          );
          return NextResponse.json(
            { error: "Missing customer ID or payment intent ID on invoice" },
            { status: 400 },
          );
        }

        const user = await db.user.findUnique({
          where: { stripeCustomerId: customerId },
        });

        if (!user) {
          console.error(
            `User not found for customer ID ${customerId} during invoice payment succeeded.`,
          );
          return NextResponse.json(
            { error: "User not found for customer ID" },
            { status: 404 },
          );
        }

        // Retrieve the payment intent object for amount, currency etc.
        const paymentIntent =
          await stripe.paymentIntents.retrieve(paymentIntentId);

        if (!paymentIntent) {
          console.error(
            `Payment Intent ${paymentIntentId} not found for invoice ${invoice.id}.`,
          );
          return NextResponse.json(
            { error: "Payment Intent not found" },
            { status: 404 },
          );
        }

        // --- Fix 2: Create payment record here for ALL successful payments ---
        // This helper function includes a check for existing payment intent ID
        await createPaymentRecord(user.id, paymentIntent, subscriptionId);

        // For subscriptions, you might also want to update the current_period_end here
        // on subsequent payments (renewals), although checkout.session.completed
        // handles the initial setting. The updateUserWithSubscription helper does this,
        // but it's currently only called on checkout.
        // If you need to update stripeCurrentPeriodEnd on *every* successful
        // subscription payment (e.g., for monthly renewals), you could add logic here.
        if (subscriptionId) {
          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId);
          await db.user.update({
            where: { id: user.id },
            data: {
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000,
              ),
            },
          });
          console.log(
            `Updated stripeCurrentPeriodEnd for user ${user.id} from invoice ${invoice.id}.`,
          );
        }

        console.log(
          `Created payment record for user ${user.id} from invoice ${invoice.id}.`,
        );

        break; // End of invoice.payment_succeeded case
      }

      // Add other event types you care about here
      // case "invoice.payment_failed": {
      //   const invoice = event.data.object as Stripe.Invoice;
      //   console.log(`Invoice ${invoice.id} failed payment.`);
      //   // Handle payment failure (e.g., notify user, potentially revoke access after retries)
      //   break;
      // }

      default: {
        // Optionally log or handle other event types you receive but don't explicitly process
        console.log(`Unhandled event type ${event.type}`);
      }
    }

    // Always return 200 for events received successfully, even if you chose
    // not to process them based on their status or type.
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Stripe webhook processing error:", error);
    // Return 400 or 500 for errors during processing that prevent completion.
    // Stripe will retry.
    return NextResponse.json(
      { error: "Webhook processing error", message: error.message },
      { status: 500 }, // Changed to 500 for internal processing errors
    );
  }
}

// Helper function to handle subscription updates (called on checkout.session.completed)
async function updateUserWithSubscription(
  userId: string, // Pass user ID directly
  subscription: Stripe.Subscription,
) {
  try {
    const subscriptionItem = subscription.items.data[0];
    const price = subscriptionItem?.price;

    if (
      !price ||
      price.unit_amount === null ||
      price.unit_amount === undefined ||
      !price.id // Ensure price ID is present
    ) {
      console.error(
        `Price, price ID, or unit_amount is missing in the subscription for user ${userId}`,
      );
      // Throw an error to be caught by the main try/catch
      throw new Error(
        `Missing price details for subscription ${subscription.id}`,
      );
    }

    const currentPeriodEnd = new Date(subscription.current_period_end * 1000);

    console.log(
      `Updating subscription details for user ${userId} with subscription ${subscription.id}`,
    );

    // Update the user with subscription details
    await db.user.update({
      where: { id: userId },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: price.id,
        stripeCurrentPeriodEnd: currentPeriodEnd,
        hasActiveSubscription: true,
      },
    });

    // --- Fix 2: Removed creating a payment record here ---
    // Payment records are created by the invoice.payment_succeeded handler.

    console.log(
      `User ${userId} updated with subscription ${subscription.id} details.`,
    );
  } catch (error: any) {
    console.error(
      `An error occurred while updating user ${userId} for subscription ${subscription.id}:`,
      error,
    );
    throw error; // Re-throw to be handled in the main webhook try/catch
  }
}

// Process exam purchase for a user (called on checkout.session.completed for one-time exam purchases)
async function processExamPurchase(
  user: any, // Keep user object as it's used for email/vendor
  examId: string,
  paymentIntent: Stripe.PaymentIntent, // Pass the payment intent
  invoiceLink: string,
) {
  // Fetch the exam details from the database
  const exam = await db.exam.findUnique({
    where: { id: examId },
    select: {
      name: true,
      slug: true,
      price: true, // Assuming price is stored in exam model
      vendor: {
        select: {
          id: true,
          isUserVendor: true,
          userId: true,
          commissionRate: true,
          name: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      },
    },
  });

  if (!exam) {
    console.error(`Exam with ID ${examId} not found.`);
    // Throw an error as we can't process a purchase for a non-existent exam
    throw new Error(`Exam with ID ${examId} not found.`);
  }

  // Check if the purchase already exists to ensure idempotency
  const existingPurchase = await db.purchase.findFirst({
    where: { userId: user.id, examId: examId },
  });

  if (!existingPurchase) {
    console.log(
      `Creating purchase record for user ${user.id} and exam ${examId}.`,
    );

    // Create the purchase record
    await db.purchase.create({
      data: {
        userId: user.id,
        examId: examId,
        amount: exam.price, // Use the exam price from your DB for consistency
        currency: paymentIntent.currency, // Use currency from payment intent
        purchaseDate: new Date(), // Use current date
      },
    });

    console.log(
      `Purchase record created for user ${user.id} and exam ${examId}.`,
    );

    // --- Fix 2: Payment record is created by the invoice.payment_succeeded handler ---
    // This part is slightly tricky. If the one-time purchase *does* generate an invoice
    // and `invoice.payment_succeeded` fires, the payment record will be created there.
    // If it *doesn't* (less common for checkouts but possible depending on Stripe setup),
    // you *might* need to create it here. However, relying solely on `invoice.payment_succeeded`
    // for ALL payments is generally safer.
    // Let's keep `createPaymentRecord` here for robustness in case `invoice.payment_succeeded`
    // doesn't fire reliably for one-time checkouts in your setup, BUT ensure `createPaymentRecord`
    // checks for duplicates using `stripePaymentIntentId`. It already does, so this seems okay.
    await createPaymentRecord(user.id, paymentIntent);

    // SEND EMAIL FOR SUCCESSFUL EXAM PURCHASE
    try {
      await sendExamPurchaseEmail(
        user.firstName,
        user.lastName,
        user.email,
        exam.name,
        new Date().toLocaleDateString(), // Purchase date
        `https://hydranode.ai/exam/${exam.slug}`, // Link to exam
        exam.price.toFixed(2), // Format price
        invoiceLink, // Pass invoice link
      );
      console.log(
        `Sent exam purchase email to ${user.email} for ${exam.name}.`,
      );
    } catch (emailError) {
      console.error("Error sending exam purchase email:", emailError);
    }
  } else {
    console.log(
      `User ${user.id} has already purchased exam ${examId}, skipping purchase creation.`,
    );
    // If purchase already exists, check if payment record exists and create it if not?
    // No, better to rely on invoice.payment_succeeded for payment records.
    // If the purchase exists, it means a payment *must* have succeeded previously.
    // The check in `createPaymentRecord` handles the payment record side.
  }

  // *** Check for User Vendor AFTER ensuring purchase record exists ***
  // Process vendor payout if applicable
  if (exam.vendor?.isUserVendor && exam.vendor.userId) {
    console.log(
      `Processing vendor payout for exam ${examId} by vendor ${exam.vendor.id}`,
    );

    const payoutAmount = calculatePayoutAmount(
      exam.price,
      exam.vendor.commissionRate || 0,
    ); // Use actual commission rate

    // Check if a payout record for this *purchase/payment* already exists to prevent duplicates
    // You might need a more specific unique constraint or check here,
    // e.g., linking payout to paymentIntentId or purchaseId if possible.
    // For simplicity here, let's assume we create one payout per purchase record.
    // A better approach might be to process payouts in batch later based on purchases.
    // Creating a payout record directly in the webhook might lead to issues if the webhook is retried.
    // **Consider if creating Payout records here is the right place/strategy.**
    // A more robust system would queue payout processing.
    // For now, we'll keep it as is but acknowledge the potential for duplicates if retries occur
    // without a more specific idempotency key for payouts.
    try {
      // You might want to find an existing payout for this specific purchase/payment intent
      const existingPayout = await db.payout.findFirst({
        where: {
          vendorId: exam.vendor.id,
          // Add a field linking to the payment or purchase for idempotency
          // e.g., purchaseId: existingPurchase?.id // Needs purchase ID field on payout
          // or paymentIntentId: paymentIntent.id // Needs paymentIntentId on payout
        },
        // This check is difficult without linking payout directly to purchase/payment
      });

      if (!existingPayout) {
        await db.payout.create({
          data: {
            vendorId: exam.vendor.id,
            amount: payoutAmount,
            currency: paymentIntent.currency,
            status: "PENDING", // Often payouts are PENDING until manually or automatically disbursed
            // Link to the purchase? Needs purchaseId field on Payout model
            // purchaseId: existingPurchase?.id,
          },
        });
        console.log(
          `Created payout record for vendor ${exam.vendor.id}, amount ${payoutAmount}.`,
        );

        // send email to vendor for successful exam purchase
        try {
          await sendVendorExamPurchasedEmail(
            exam.vendor.name,
            exam.vendor.user?.email || "Contact@yourcompany.com", // Use a default or support email
            exam.name,
            new Date().toLocaleDateString(), // Purchase date
            payoutAmount.toFixed(2), // Send vendor's cut
            user.firstName,
            user.lastName,
          );
          console.log(
            `Sent vendor purchase email to ${exam.vendor.user?.email}.`,
          );
        } catch (emailError) {
          console.error("Error sending vendor purchase email:", emailError);
        }
      } else {
        console.log(
          `Payout record likely already exists for vendor ${exam.vendor.id} for this purchase.`,
        );
      }
    } catch (payoutError) {
      console.error(
        `Error creating payout for vendor ${exam.vendor.id}:`,
        payoutError,
      );
      // Don't re-throw, let the main purchase process complete if payout fails
    }
  }
}

// Helper function to calculate payout amount based on commission
function calculatePayoutAmount(price: number, commissionRate: number): number {
  // Ensure commissionRate is between 0 and 100
  const rate = Math.max(0, Math.min(100, commissionRate));
  // Calculate the payout amount after deducting the commission
  const commissionAmount = price * (rate / 100);
  const payoutAmount = price - commissionAmount;
  // Ensure payout is not negative
  return Math.max(0, payoutAmount);
}

// Helper function to create a payment record (called from invoice.payment_succeeded and potentially one-time purchase)
async function createPaymentRecord(
  userId: string,
  paymentIntent: Stripe.PaymentIntent, // Pass the Payment Intent object
  subscriptionId: string | null = null, // Pass subscription ID if applicable
) {
  // Use the payment intent ID as the unique identifier
  const existingPayment = await db.payment.findFirst({
    where: { stripePaymentIntentId: paymentIntent.id },
  });

  if (!existingPayment) {
    console.log(
      `Creating payment record for payment intent ${paymentIntent.id} for user ${userId}.`,
    );
    await db.payment.create({
      data: {
        userId: userId,
        amount: paymentIntent.amount / 100, // Amount is in cents
        currency: paymentIntent.currency,
        paymentType: subscriptionId ? "SUBSCRIPTION" : "ONE_TIME", // Determine type
        stripePaymentIntentId: paymentIntent.id,
        stripeSubscriptionId: subscriptionId, // Link subscription if present
        status: paymentIntent.status === "succeeded" ? "SUCCEEDED" : "FAILED", // Use payment intent status
      },
    });
    console.log(
      `Payment record created for payment intent ${paymentIntent.id}.`,
    );
  } else {
    console.log(
      `Payment record with stripePaymentIntentId ${paymentIntent.id} already exists, skipping creation.`,
    );
    // Optionally update the existing record if status changed, but for succeeded
    // event, it should already be succeeded if it exists.
  }
}
