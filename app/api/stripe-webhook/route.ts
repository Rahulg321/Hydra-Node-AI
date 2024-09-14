import { headers } from "next/headers";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@/auth";

export const POST = auth(async function POST(req) {
  if (!req.auth)
    NextResponse.json({ message: "Not authenticated" }, { status: 401 });

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
    console.log("session in webhook is ", session);

    const currentUserId = session.metadata?.userId;
    console.log("currentUserId is", currentUserId);

    if (!currentUserId) {
      console.error("Missing userId in session metadata");
      return NextResponse.json(
        { error: "Missing userId in metadata" },
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

        await db.user.update({
          where: {
            id: currentUserId,
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

        await db.payment.create({
          data: {
            userId: currentUserId as string,
            amount: subscription.items.data[0].price.unit_amount / 100, // Stripe stores amounts in cents
            currency: subscription.currency,
            paymentType: "SUBSCRIPTION",
            stripePaymentIntentId: session.payment_intent as string,
            status: "SUCCEEDED",
          },
        });
      } else {
        // Handle one-time payment case

        console.log("a one time payment was made");

        const paymentIntent = await stripe.paymentIntents.retrieve(
          session.payment_intent as string,
        );

        await db.user.update({
          where: { id: currentUserId },
          data: {
            hasLifetimeAccess: paymentIntent.status === "succeeded",
          },
        });

        await db.payment.create({
          data: {
            userId: currentUserId as string,
            amount: paymentIntent.amount / 100, // Stripe stores amounts in cents
            currency: paymentIntent.currency,
            paymentType: "ONE_TIME",
            stripePaymentIntentId: paymentIntent.id,
            status:
              paymentIntent.status === "succeeded" ? "SUCCEEDED" : "FAILED",
          },
        });
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
        await db.payment.create({
          data: {
            userId: currentUserId as string,
            amount: invoice.amount_paid / 100, // Stripe stores amounts in cents
            currency: invoice.currency,
            paymentType: "SUBSCRIPTION",
            stripePaymentIntentId: invoice.payment_intent as string,
            stripeInvoiceId: invoice.id,
            status: invoice.paid ? "SUCCEEDED" : "FAILED",
          },
        });
      } else {
        // Handle one-time payments
        await db.payment.create({
          data: {
            userId: currentUserId as string,
            amount: invoice.amount_paid / 100,
            currency: invoice.currency,
            paymentType: "ONE_TIME",
            stripePaymentIntentId: invoice.payment_intent as string,
            status: invoice.paid ? "SUCCEEDED" : "FAILED",
          },
        });
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
