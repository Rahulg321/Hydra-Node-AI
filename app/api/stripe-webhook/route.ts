import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@/auth";
import {
  sendExamPurchaseEmail,
  sendLifetimeAccessEmail,
  sendSubscriptionEndedEmail,
  sendSubscriptionStartEmail,
  sendVendorExamPurchasedEmail,
} from "@/lib/mail";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
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
      const subscription = event.data.object;
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

      // Update the user's access status
      await db.user.update({
        where: { id: user.id },
        data: { hasActiveSubscription: false },
      });

      // **Send the subscription ended email**
      await sendSubscriptionEndedEmail(
        user.email,
        new Date(subscription.current_period_end * 1000).toLocaleDateString(), // Format the end date
        `www.hydranode.ai/pricing`, // Link to renew the subscription
        subscription.items.data[0]?.price?.nickname || "Your Subscription Plan", // Subscription plan name
        user.firstName,
        user.lastName,
      );

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

        console.log("payment intent in one time payment was", paymentIntent);

        await db.user.update({
          where: { id: user.id },
          data: {
            hasLifetimeAccess: true, // Grant lifetime access
          },
        });

        await createPaymentRecord(user.id, paymentIntent);

        await sendLifetimeAccessEmail(
          user.email,
          "LIFETIME ACCESS",
          `https://hydranode.ai/profile/${user.id}`,
          new Date().toLocaleDateString(), // Access start date
          user.firstName,
          user.lastName,
        );
      } else if (session.subscription) {
        console.log("a subscription was made");
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string,
        );

        console.log("updating subscription", subscription);
        await updateUserWithSubscription(user, subscription);

        await sendSubscriptionStartEmail(
          user.email,
          subscription.items.data[0]?.price?.nickname ||
            "Your Subscription Plan",
          `https://hydranode.ai/profile/${user.id}`,
          new Date().toLocaleDateString(), // Subscription start date
          user.firstName,
          user.lastName,
        );
      }
      // One-time payment case
      else if (session.payment_intent && examId) {
        console.log("a one time payment was made");

        const paymentIntent = await stripe.paymentIntents.retrieve(
          session.payment_intent as string,
        );

        console.log("payment intent in one time payment was", paymentIntent);

        await processExamPurchase(user, examId, paymentIntent);
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

    console.log("subscription item is", subscriptionItem);

    if (
      !price ||
      price.unit_amount === null ||
      price.unit_amount === undefined
    ) {
      throw new Error(
        `Price or unit_amount is missing in the subscription for user ${user.id}`,
      );
    }

    // Update the user with subscription details
    await db.user.update({
      where: { id: user.id },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
        hasActiveSubscription: true,
      },
    });

    // Create a payment record for the subscription
    await db.payment.create({
      data: {
        userId: user.id,
        amount: price.unit_amount / 100,
        currency: price.currency,
        paymentType: "SUBSCRIPTION",
        stripePaymentIntentId: subscription.latest_invoice as string,
        stripeSubscriptionId: subscription.id,
        status: "SUCCEEDED",
      },
    });
  } catch (error: any) {
    console.error(
      `An error occurred while updating user ${user.id} for subscription ${subscription.id}:`,
      error,
    );
  }
}

// Process exam purchase for a user
async function processExamPurchase(
  user: any,
  examId: string,
  paymentIntent: Stripe.PaymentIntent,
) {
  // Fetch the exam details from the database
  const exam = await db.exam.findUnique({
    where: { id: examId },
    select: { name: true, slug: true, price: true, vendor:{
        select:{
            id:true,
            isUserVendor:true,
            userId:true,
            commissionRate:true,
            name:true,
            user:{
               select:{
                email:true,
               }
            }
        }
    } },
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
        status:"PAID"
      }
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
