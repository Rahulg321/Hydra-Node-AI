import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { sendPaymentErrorEmail, sendPaymentSuccessfulEmail } from "@/lib/mail";
import db from "@/lib/db";
import { SubscriptionStatus } from "@prisma/client";

export async function GET(req: Request) {}
export async function POST(req: Request) {
  console.log("stripe webhook triggered");
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Missing stripe webhook secret" },
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
    return NextResponse.json(
      { message: "Invalid Signature", error: error.message },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      await fulfillCheckout(event.data.object.id);
      break;
    case "invoice.paid":
      await handleInvoicePaid(event.data.object as Stripe.Invoice);
      break;
    case "invoice.payment_failed":
      await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
      break;
    case "payment_intent.payment_failed":
      await handlePaymentFailed(event.data.object.id);
      break;
    case "charge.failed":
      await handleChargeFailed(event.data.object.id);
      break;
    // ... other existing cases ...
  }

  // Handle the event
  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true }, { status: 200 });
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log("invoice paid webhook triggered............");
  console.log("Invoice paid:", invoice, invoice.id);
  if (invoice.customer_email) {
    const amount = (invoice.total / 100).toFixed(2);
    const currency = invoice.currency.toUpperCase();
    const paymentDate = new Date(
      invoice.status_transitions.paid_at! * 1000,
    ).toLocaleDateString();
    const invoiceNumber = invoice.number;
    const productName = invoice.lines.data[0]?.description || "Your product";

    await sendPaymentSuccessfulEmail(
      invoice.customer_name || "Valued Customer",
      amount,
      currency,
      paymentDate,
      invoiceNumber || "",
      productName,
      invoice.hosted_invoice_url || "",
      invoice.customer_email,
    );
  } else {
    console.error("Customer email not found for sending invoice paid email");
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log("invoice payment failed webhook triggered............");
  console.log("Invoice payment failed:", invoice.id, invoice);

  if (invoice.customer_email) {
    const amount = (invoice.total / 100).toFixed(2);
    const currency = invoice.currency.toUpperCase();
    const paymentDate = new Date().toLocaleDateString();
    const productName = invoice.lines.data[0]?.description || "Your product";

    await sendPaymentErrorEmail(
      invoice.customer_name || "Valued Customer",
      amount,
      currency,
      paymentDate,
      productName,
      invoice.customer_email,
    );
  } else {
    console.error(
      "Customer email not found for sending invoice payment failed email",
    );
  }
}

async function fulfillCheckout(sessionId: string) {
  console.log("Fulfilling Checkout Session " + sessionId);

  // TODO: Make this function safe to run multiple times,
  // even concurrently, with the same session ID

  // TODO: Make sure fulfillment hasn't already been
  // peformed for this Checkout Session

  const existingPayment = await db.payment.findUnique({
    where: { stripePaymentIntentId: sessionId },
  });

  if (existingPayment) {
    console.log(`Checkout session ${sessionId} has already been fulfilled`);
    return;
  }

  // Retrieve the Checkout Session from the API with line_items expanded
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "customer"],
  });

  // Check the Checkout Session's payment_status property
  // to determine if fulfillment should be peformed
  if (checkoutSession.payment_status !== "unpaid") {
    // TODO: Perform fulfillment of the line items
    // TODO: Record/save fulfillment status for this
    // Checkout Session

    console.log("checkout session is", checkoutSession);
    console.log("line items in checkout session", checkoutSession.line_items);
    console.log("invoice in checkout session", checkoutSession.invoice);

    const customerId = checkoutSession.customer as string;
    const subscriptionId = checkoutSession.subscription as string | null;
    const userEmail = checkoutSession.customer_details?.email;

    if (!userEmail) {
      console.error("User email not found in checkout session");
      return;
    }

    const user = await db.user.findUnique({ where: { email: userEmail } });

    if (!user) {
      console.error(`User with email ${userEmail} not found`);
      return;
    }

    if (!user.stripeCustomerId) {
      await db.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    if (subscriptionId) {
      // Handle subscription-based payment
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      console.log("subscription fetched in fulfill function is", subscription);

      // Cancel any existing active subscription
      const existingSubscription = await db.subscription.findFirst({
        where: { userId: user.id, status: "ACTIVE" },
      });

      if (existingSubscription) {
        await db.subscription.update({
          where: { id: existingSubscription.id },
          data: { status: "CANCELED" },
        });
      }
      await db.subscription.upsert({
        where: { stripeSubscriptionId: subscriptionId },
        update: {
          status: subscription.status.toUpperCase() as SubscriptionStatus,
          currentPeriodStart: new Date(
            subscription.current_period_start * 1000,
          ),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
        create: {
          userId: user.id,
          stripeSubscriptionId: subscriptionId,
          status: subscription.status.toUpperCase() as SubscriptionStatus,
          currentPeriodStart: new Date(
            subscription.current_period_start * 1000,
          ),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      });
      // Update user subscription status
      await db.user.update({
        where: { id: user.id },
        data: {
          subscriptionStatus:
            subscription.status.toUpperCase() as SubscriptionStatus,
          subscriptionEndDate: new Date(subscription.current_period_end * 1000),
        },
      });
    } else {
      // Handle one-time payment
      console.log("Processing one-time payment");

      // Update user status for one-time payment if needed
      await db.user.update({
        where: { id: user.id },
        data: {
          // Update fields as needed for one-time payment
          // For example:
          // oneTimePaymentStatus: "COMPLETED",
          // oneTimePaymentDate: new Date(),
        },
      });
    }

    // Create payment record (works for both subscription and one-time payments)
    await db.payment.create({
      data: {
        userId: user.id,
        amount: checkoutSession.amount_total! / 100,
        currency: checkoutSession.currency!,
        status: "SUCCEEDED",
        stripePaymentIntentId: checkoutSession.payment_intent as string,
        paymentType: subscriptionId ? "SUBSCRIPTION" : "ONE_TIME",
      },
    });

    console.log(`Checkout session ${sessionId} fulfilled for user ${user.id}`);
  }
}

async function handlePaymentFailed(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent"],
  });
  const paymentIntent = session.payment_intent as Stripe.PaymentIntent;

  console.log("Payment failed for PaymentIntent:", paymentIntent.id);

  const customer = await stripe.customers.retrieve(
    paymentIntent.customer as string,
  );
  const amount = (paymentIntent.amount / 100).toFixed(2);
  const currency = paymentIntent.currency.toUpperCase();
  const paymentDate = new Date().toLocaleDateString();
  const productName = paymentIntent.description || "Your product";

  if ("email" in customer && customer.email) {
    await sendPaymentErrorEmail(
      customer.name || "Valued Customer",
      amount,
      currency,
      paymentDate,
      productName,
      customer.email,
    );
  } else {
    console.error("Customer email not found for sending payment error email");
  }
}

async function handleChargeFailed(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent"],
  });
  const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
  const charge = paymentIntent.latest_charge as Stripe.Charge;

  console.log("Charge failed:", charge.id);

  const customer = await stripe.customers.retrieve(charge.customer as string);
  const amount = (charge.amount / 100).toFixed(2);
  const currency = charge.currency.toUpperCase();
  const paymentDate = new Date(charge.created * 1000).toLocaleDateString();
  const productName = charge.description || "Your product";

  if ("email" in customer && customer.email) {
    await sendPaymentErrorEmail(
      customer.name || "Valued Customer",
      amount,
      currency,
      paymentDate,
      productName,
      customer.email,
    );
  } else {
    console.error("Customer email not found for sending charge failed email");
  }
}
