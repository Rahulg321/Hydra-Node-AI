import { headers } from "next/headers";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
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

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    if (session.subscription) {
      // Handle subscription case
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      await db.user.update({
        where: {
          id: session?.metadata?.userId,
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
      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent as string,
      );

      await db.payment.create({
        data: {
          userId: session?.metadata?.userId as string,
          amount: paymentIntent.amount / 100, // Stripe stores amounts in cents
          currency: paymentIntent.currency,
          paymentType: "ONE_TIME",
          stripePaymentIntentId: paymentIntent.id,
          status: paymentIntent.status === "succeeded" ? "SUCCEEDED" : "FAILED",
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
          userId: invoice.metadata?.userId as string,
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
          userId: invoice.metadata?.userId as string,
          amount: invoice.amount_paid / 100,
          currency: invoice.currency,
          paymentType: "ONE_TIME",
          stripePaymentIntentId: invoice.payment_intent as string,
          status: invoice.paid ? "SUCCEEDED" : "FAILED",
        },
      });
    }
  }

  return new Response(null, { status: 200 });
}
