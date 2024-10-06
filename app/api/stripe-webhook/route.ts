import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@/auth";

export const POST = auth(async function POST(req) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");

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

    console.log("finding user");
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

    // Handle checkout session completion
    if (event.type === "checkout.session.completed") {
      // Subscription case
      if (session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string,
        );

        console.log("updating subscription");
        await updateUserWithSubscription(user, subscription);
      }
      // One-time payment case
      else if (session.payment_intent && examId) {
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
});

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

    // Grant lifetime access if the payment is successful
    if (paymentIntent.status === "succeeded") {
      await db.user.update({
        where: { id: user.id },
        data: { hasLifetimeAccess: true },
      });
    }
  } else {
    console.log(
      "User has already purchased this exam, skipping purchase and payment creation.",
    );
  }
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
