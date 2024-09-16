import { headers } from "next/headers";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@/auth";

export const POST = auth(async function POST(req) {
  // const userSession = req.auth;
  // console.log("user session in webhook from req.auth is", userSession);
  // const currentUserId = userSession?.user.id;
  // console.log("currentUserId is", currentUserId);

  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  if (!signature) {
    console.error("Missing Stripe signature");
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 },
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Missing Stripe webhook secret");
    return NextResponse.json(
      { error: "Missing Stripe webhook secret" },
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

  try {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("checkoutsession in webhook is ", session);
    const customerId = session.customer as string;

    // Fetch user by Stripe customer ID
    const customerDetails = session.customer_details;
    const existingUser = await db.user.findUnique({
      where: { email: customerDetails?.email as string },
    });

    console.log("found an existing user using email", existingUser);

    if (!existingUser) {
      console.log("user not found using email");
      return NextResponse.json(
        { error: "User not found using customer details" },
        { status: 400 },
      );
    }

    if (event.type === "checkout.session.completed") {
      if (session.subscription) {
        // Handle subscription case

        console.log("a subscription was made");

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string,
        );

        console.log("subscription in checkout session", subscription);

        await db.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000,
            ),
          },
        });
      } else {
        // Handle one-time payment case

        console.log("a one time payment was made");

        const paymentIntent = await stripe.paymentIntents.retrieve(
          session.payment_intent as string,
        );

        const existingPayment = await db.payment.findFirst({
          where: { stripePaymentIntentId: paymentIntent.id },
        });

        if (!existingPayment) {
          // Proceed if the payment has not been recorded
          await db.user.update({
            where: { id: existingUser.id },
            data: {
              hasLifetimeAccess:
                paymentIntent.status === "succeeded" ? true : false,
            },
          });

          await db.payment.create({
            data: {
              userId: existingUser.id,
              amount: paymentIntent.amount / 100, // Stripe stores amounts in cents
              currency: paymentIntent.currency,
              paymentType: "ONE_TIME",
              stripePaymentIntentId: paymentIntent.id,
              status:
                paymentIntent.status === "succeeded" ? "SUCCEEDED" : "FAILED",
            },
          });
        } else {
          console.log(
            "Payment record already exists, skipping creation in checkout session completed webhook.",
          );
        }
      }
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const customerId = paymentIntent.customer as string;

      // Fetch user by Stripe customer ID
      const user = await db.user.findUnique({
        where: { stripeCustomerId: customerId },
      });

      if (!user) {
        console.error("User not found for customer ID:", customerId);
        return NextResponse.json({ error: "User not found" }, { status: 400 });
      }

      console.log("successfully fetched the user by customer id");
      const currentUserId = user.id;

      const existingPayment = await db.payment.findFirst({
        where: { stripePaymentIntentId: paymentIntent.id },
      });

      // Update hasLifetimeAccess
      if (!existingPayment) {
        // Proceed if the payment has not been recorded
        await db.user.update({
          where: { id: currentUserId },
          data: {
            hasLifetimeAccess: true,
          },
        });

        // Create payment record
        await db.payment.create({
          data: {
            userId: currentUserId,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            paymentType: "ONE_TIME",
            stripePaymentIntentId: paymentIntent.id,
            status: "SUCCEEDED",
          },
        });
      } else {
        console.log("Payment record already exists, skipping creation.");
      }
    }

    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;

      if (invoice.subscription) {
        // Handle subscription payments
        const subscription = await stripe.subscriptions.retrieve(
          invoice.subscription as string,
        );

        await db.user.update({
          where: {
            stripeSubscriptionId: subscription.id,
          },
          data: {
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000,
            ),
          },
        });

        // Insert a payment record for the subscription
        const existingPayment = await db.payment.findFirst({
          where: { stripeInvoiceId: invoice.id },
        });

        if (!existingPayment) {
          // Proceed if the payment has not been recorded
          await db.payment.create({
            data: {
              userId: existingUser.id,
              amount: invoice.amount_paid / 100, // Stripe stores amounts in cents
              currency: invoice.currency,
              paymentType: "SUBSCRIPTION",
              stripePaymentIntentId: invoice.payment_intent as string,
              stripeInvoiceId: invoice.id,
              status: invoice.paid ? "SUCCEEDED" : "FAILED",
            },
          });
        } else {
          console.log(
            "Subscription payment record already exists, skipping creation.",
          );
        }
      } else {
        const existingPayment = await db.payment.findFirst({
          where: { stripePaymentIntentId: invoice.payment_intent as string },
        });

        // Handle one-time payments
        if (!existingPayment) {
          // Proceed if the payment has not been recorded
          await db.payment.create({
            data: {
              userId: existingUser.id,
              amount: invoice.amount_paid / 100,
              currency: invoice.currency,
              paymentType: "ONE_TIME",
              stripePaymentIntentId: invoice.payment_intent as string,
              status: invoice.paid ? "SUCCEEDED" : "FAILED",
            },
          });
        } else {
          console.log(
            "One-time payment record already exists, skipping creation.",
          );
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error(
      "an error occcured in stripe webhook while handling events",
      error,
      error.message,
    );
    return NextResponse.json(
      { error: "Webhook Error", message: error.message },
      { status: 400 },
    );
  }
});
