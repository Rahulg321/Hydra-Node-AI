import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import db from "@/lib/db";
import { InvoiceStatus, SubscriptionStatus } from "@prisma/client";

export async function GET(req: Request) {
  return NextResponse.json({
    message: "This endpoint supports POST requests only.",
  });
}

export const POST = async function POST(req: Request) {
  console.log("Stripe webhook triggered");

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    console.error("Missing Stripe signature");
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Missing Stripe webhook secret");
    return NextResponse.json(
      { error: "Missing Stripe webhook secret" },
      { status: 400 },
    );
  }

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error: any) {
    console.error("Error constructing Stripe event:", error.message);
    return NextResponse.json(
      { message: "Invalid Signature", error: error.message },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
        return await handleSubscriptionEvent(event, "created");

      case "customer.subscription.updated":
        return await handleSubscriptionEvent(event, "updated");

      case "customer.subscription.deleted":
        return await handleSubscriptionEvent(event, "deleted");

      case "invoice.payment_succeeded":
        return await handleInvoiceEvent(event, "succeeded");

      case "invoice.payment_failed":
        return await handleInvoiceEvent(event, "failed");

      case "checkout.session.completed":
        return await handleCheckoutSessionCompleted(event);

      default:
        console.warn(`Unhandled event type ${event.type}`);
        return NextResponse.json(
          { error: "Unhandled event type" },
          { status: 400 },
        );
    }
  } catch (error: any) {
    console.error("Error processing webhook event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

// Helper to get customer email from Stripe
async function getCustomerEmail(customerId: string): Promise<string | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return (customer as Stripe.Customer).email;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

// Subscription event handler
async function handleSubscriptionEvent(
  event: Stripe.Event,
  type: "created" | "updated" | "deleted",
) {
  const subscription = event.data.object as Stripe.Subscription;

  // Assuming userId is passed in metadata
  const customerEmail = await getCustomerEmail(subscription.customer as string);

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  const subscriptionData = {
    id: subscription.id,
    email: customerEmail,
    userId: subscription.metadata?.userId, // Assumes userId is passed in metadata
    status: subscription.status.toUpperCase() as SubscriptionStatus,
    start_date: new Date(subscription.created * 1000).toISOString(),
    end_date: new Date(subscription.current_period_end * 1000).toISOString(),
    plan_id: subscription.items.data[0]?.price.id,
  };

  try {
    if (type === "deleted") {
      await db.subscription.update({
        where: { id: subscription.id },
        data: {
          status: SubscriptionStatus.DELETED,
          email: customerEmail,
        },
      });
    } else {
      await db.subscription.upsert({
        where: { id: subscription.id },
        create: subscriptionData,
        update: subscriptionData,
      });
    }

    return NextResponse.json({
      status: 200,
      message: `Subscription ${type} success`,
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return NextResponse.json({
      status: 500,
      error: "Error updating subscription",
    });
  }
}

// Invoice event handler
async function handleInvoiceEvent(
  event: Stripe.Event,
  status: "succeeded" | "failed",
) {
  const invoice = event.data.object as Stripe.Invoice;
  const customerEmail = await getCustomerEmail(invoice.customer as string);

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched while handling invoices",
    });
  }

  try {
    const invoiceData = {
      stripe_invoice_id: invoice.id,
      subscriptionId: invoice.subscription as string,
      amount_paid:
        status === "succeeded" ? invoice.amount_paid / 100 : undefined,
      amount_due: status === "failed" ? invoice.amount_due / 100 : undefined,
      currency: invoice.currency,
      status: status.toUpperCase() as InvoiceStatus,
      userId: invoice.metadata?.userId, // Assumes userId is passed in metadata
      email: customerEmail,
    };

    await db.invoice.create({ data: invoiceData });

    return NextResponse.json({
      status: 200,
      message: `Invoice payment ${status}`,
    });
  } catch (error) {
    console.error(`Error inserting invoice (payment ${status}):`, error);
    return NextResponse.json({
      status: 500,
      error: `Error inserting invoice (payment ${status})`,
    });
  }
}

// Checkout session completed handler
async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const metadata = session.metadata;
  const userId = metadata?.userId; // Assuming userId is passed in metadata

  if (!userId) {
    console.error("User ID is missing in the session metadata");
    return NextResponse.json({ status: 400, error: "User ID is missing" });
  }

  try {
    if (metadata?.subscription === "true") {
      const subscriptionId = session.subscription;
      await stripe.subscriptions.update(subscriptionId as string, { metadata });

      await db.user.update({
        where: { id: userId },
        data: { subscriptionId: session.id },
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Payment and subscription updated successfully",
    });
  } catch (error) {
    console.error("Error handling checkout session:", error);
    return NextResponse.json({
      status: 500,
      error: "Error handling checkout session",
    });
  }
}
