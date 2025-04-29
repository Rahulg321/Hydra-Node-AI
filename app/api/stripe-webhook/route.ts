import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/hooks/lib/stripe";
import { NextResponse } from "next/server";
import db from "@/hooks/lib/db";
import { auth } from "@/auth";
import {
  sendExamPurchaseEmail,
  sendLifetimeAccessEmail,
  sendSubscriptionEndedEmail,
  sendSubscriptionStartEmail,
  sendVendorExamPurchasedEmail,
} from "@/hooks/lib/mail";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.log("missing stripe signature or secret");
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
    console.log("signing error in stripe webhook", error);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const examId = session.metadata?.examId;

  console.log("exam id in session metadata", examId);

  try {
    const customerDetails = session.customer_details;

    console.log("cutomer details ", customerDetails);

    const user = await db.user.findUnique({
      where: { email: customerDetails?.email as string },
    });

    console.log("found user is", user);

    if (!user) {
      return NextResponse.json(
        { error: "User not found using customer details" },
        { status: 400 },
      );
    }

    if (event.type === "customer.subscription.deleted") {
      // Handle subscription cancellation
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer;

      console.log(`Subscription ${subscription.id} has been deleted.`);

      const user = await db.user.findUnique({
        where: { stripeCustomerId: customerId as string },
      });

      if (!user) {
        return NextResponse.json(
          { error: "User not found while revoking subscription access" },
          { status: 400 },
        );
      }

      console.log(`Revoking access for user: ${user.email}`);

      // Update the user's subscription status and related fields
      await db.user.update({
        where: { id: user.id },
        data: {
          hasActiveSubscription: false,
          // Keep stripeSubscriptionId as it might be needed for reference
          // Keep stripePriceId as it might be needed for reference
          // Keep stripeCurrentPeriodEnd as it's needed to know when access actually ends
        },
      });

      // Create a payment record for the cancellation
      const lastPayment = await db.payment.findFirst({
        where: {
          userId: user.id,
          stripeSubscriptionId: subscription.id,
          status: "SUCCEEDED",
        },
        orderBy: { createdAt: "desc" },
      });

      if (lastPayment) {
        await db.payment.create({
          data: {
            userId: user.id,
            amount: lastPayment.amount,
            currency: lastPayment.currency,
            paymentType: "SUBSCRIPTION",
            stripePaymentIntentId: subscription.latest_invoice as string,
            stripeSubscriptionId: subscription.id,
            status: "SUCCEEDED",
          },
        });
      }

      // **Send the subscription ended email**
      try {
        const emailResult = await sendSubscriptionEndedEmail(
          user.email,
          new Date(subscription.current_period_end * 1000).toLocaleString(
            "en-US",
            {
              timeZone: "UTC",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            },
          ),
          `www.hydranode.ai/pricing`,
          subscription.items.data[0]?.price?.nickname ||
            "Your Subscription Plan",
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

      console.log(`Revoking access for user: ${user.email} and sending email.`);
    }

    if (event.type === "checkout.session.completed") {
      const isLifetime = session.metadata?.isLifetime === "true";
      console.log("session metadata", session.metadata);

      if (isLifetime) {
        console.log(`Granting lifetime access to user: ${user.email}`);

        const paymentIntent = await stripe.paymentIntents.retrieve(
          session.payment_intent as string,
        );

        const invoice = await stripe.invoices.retrieve(
          paymentIntent.invoice as string,
        );
        const invoiceLink = invoice.hosted_invoice_url;

        console.log("payment intent in one time payment was", paymentIntent);

        await db.user.update({
          where: { id: user.id },
          data: {
            hasLifetimeAccess: true,
          },
        });

        await createPaymentRecord(user.id, paymentIntent);

        try {
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
            invoiceLink || "",
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
        console.log("a new subscription was made", session.subscription);
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string,
        );

        const invoice = await stripe.invoices.retrieve(
          subscription.latest_invoice as string,
        );
        const invoiceLink = invoice.hosted_invoice_url;

        console.log("updating subscription", subscription);
        await updateUserWithSubscription(user, subscription);

        try {
          const emailResult = await sendSubscriptionStartEmail(
            user.email,
            subscription.items.data[0]?.price?.nickname ||
              "Your Subscription Plan",
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
            invoiceLink || "",
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
          console.error("Error sending subscription start email:", emailError);
        }
      }
      // One-time payment case
      else if (session.payment_intent && examId) {
        console.log("a one time payment was made");

        const paymentIntent = await stripe.paymentIntents.retrieve(
          session.payment_intent as string,
        );

        const invoice = await stripe.invoices.retrieve(
          paymentIntent.invoice as string,
        );
        const invoiceLink = invoice.hosted_invoice_url;

        await processExamPurchase(
          user,
          examId,
          paymentIntent,
          invoiceLink || "",
        );
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing error", message: error.message },
      { status: 400 },
    );
  }
}

// Helper function to handle subscription updates
async function updateUserWithSubscription(
  user: any,
  subscription: Stripe.Subscription,
) {
  try {
    // Check if the subscription has a price object and unit_amount
    const subscriptionItem = subscription.items.data[0];
    const price = subscriptionItem?.price;

    if (
      !price ||
      price.unit_amount === null ||
      price.unit_amount === undefined
    ) {
      throw new Error(
        `Price or unit_amount is missing in the subscription for user ${user.id}`,
      );
    }

    // Get the billing interval from the price
    const billingInterval = price.recurring?.interval;
    const billingIntervalCount = price.recurring?.interval_count || 1;

    console.log(
      `Subscription billing interval: ${billingInterval}, count: ${billingIntervalCount}`,
    );

    // Calculate the next billing date
    const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
    const currentPeriodStart = new Date(
      subscription.current_period_start * 1000,
    );

    console.log(
      `Subscription period: ${currentPeriodStart.toISOString()} to ${currentPeriodEnd.toISOString()}`,
    );

    // Update the user with subscription details
    await Promise.all([
      // Update the user with subscription details
      db.user.update({
        where: { id: user.id },
        data: {
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: price.id,
          stripeCurrentPeriodEnd: currentPeriodEnd,
          hasActiveSubscription: true,
        },
      }),
      // Create a payment record for the subscription
      db.payment.create({
        data: {
          userId: user.id,
          amount: price.unit_amount / 100,
          currency: price.currency,
          paymentType: "SUBSCRIPTION",
          stripePaymentIntentId: subscription.latest_invoice as string,
          stripeSubscriptionId: subscription.id,
          status: "SUCCEEDED",
        },
      }),
    ]);

    // Log the subscription details for debugging
    console.log(`Updated subscription for user ${user.id}:`, {
      subscriptionId: subscription.id,
      priceId: price.id,
      billingInterval,
      billingIntervalCount,
      currentPeriodStart: currentPeriodStart.toISOString(),
      currentPeriodEnd: currentPeriodEnd.toISOString(),
      amount: price.unit_amount / 100,
      currency: price.currency,
    });
  } catch (error: any) {
    console.error(
      `An error occurred while updating user ${user.id} for subscription ${subscription.id}:`,
      error,
    );
    throw error; // Re-throw to handle in the webhook
  }
}

// Process exam purchase for a user
async function processExamPurchase(
  user: any,
  examId: string,
  paymentIntent: Stripe.PaymentIntent,
  invoiceLink: string,
) {
  // Fetch the exam details from the database
  const exam = await db.exam.findUnique({
    where: { id: examId },
    select: {
      name: true,
      slug: true,
      price: true,
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
    console.log(`Exam with ID ${examId} not found.`);
    throw new Error("Exam not found");
  }

  const existingPurchase = await db.purchase.findFirst({
    where: { userId: user.id, examId: examId },
  });

  if (!existingPurchase) {
    // Create the purchase record for the user if they haven't already purchased this exam

    console.log("purchasing this exam with id", examId);

    await db.purchase.create({
      data: {
        userId: user.id,
        examId: examId,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        purchaseDate: new Date(),
      },
    });

    // Create a new payment record, as it's the first time purchasing the exam
    await createPaymentRecord(user.id, paymentIntent);

    // SEND EMAIL FOR SUCCESSFUL EXAM PURCHASE
    await sendExamPurchaseEmail(
      user.firstName,
      user.lastName,
      user.email,
      exam.name,
      new Date().toLocaleDateString(), // Purchase date
      `https://hydranode.ai/exam/${exam.slug}`,
      exam.price.toString(),
      invoiceLink || "", // Add invoice link
    );
  } else {
    console.log(
      "User has already purchased this exam, skipping purchase and payment creation.",
    );
  }
  // *** Check for User Vendor AFTER creating purchase and payment records ***
  if (exam.vendor.isUserVendor && exam.vendor.userId) {
    // Create a new payout record for the vendor (user)
    await db.payout.create({
      data: {
        vendorId: exam.vendor.id,
        amount: exam.price, // Calculate payout amount
        currency: paymentIntent.currency,
        status: "PAID",
      },
    });

    // send email to vendor for successful exam purchase
    await sendVendorExamPurchasedEmail(
      exam.vendor.name,
      exam.vendor.user?.email || "Contact@hydranode.ai",
      exam.name,
      new Date().toLocaleDateString(), // Purchase date
      exam.price.toString(),
      user.firstName,
      user.lastName,
    );
  }
}

// Helper function to calculate payout amount based on commission
function calculatePayoutAmount(price: number, commissionRate: number): number {
  // Calculate the payout amount after deducting the commission
  const commissionAmount = price * (commissionRate / 100);
  const payoutAmount = price - commissionAmount;
  return payoutAmount;
}

// Helper function to create a payment record
async function createPaymentRecord(
  userId: string,
  paymentIntent: Stripe.PaymentIntent,
) {
  const existingPayment = await db.payment.findFirst({
    where: { stripePaymentIntentId: paymentIntent.id },
  });

  if (!existingPayment) {
    await db.payment.create({
      data: {
        userId: userId,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        paymentType: "ONE_TIME",
        stripePaymentIntentId: paymentIntent.id,
        status: paymentIntent.status === "succeeded" ? "SUCCEEDED" : "FAILED",
      },
    });
  } else {
    console.log("Payment record already exists, skipping payment creation.");
  }
}
