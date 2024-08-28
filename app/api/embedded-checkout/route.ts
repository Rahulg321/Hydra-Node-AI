import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const currentUserSession = await auth();

    if (!currentUserSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      id: userId,
      name: userName,
      email: userEmail,
    } = currentUserSession.user;

    const { priceId, mode, trialPeriodDays } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 },
      );
    }

    let session;

    if (mode === "subscription") {
      const subscriptionData: Stripe.Checkout.SessionCreateParams = {
        ui_mode: "embedded",
        payment_method_types: ["card"],
        mode: "subscription",
        customer_email: userEmail || undefined,

        metadata: {
          userId: userId || "",
          userName: userName || "",
        },
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        return_url: `${req.headers.get(
          "origin",
        )}/return?session_id={CHECKOUT_SESSION_ID}`,
      };

      // Add trial period if present
      if (trialPeriodDays) {
        subscriptionData.subscription_data = {
          trial_period_days: trialPeriodDays,
        };
      }

      session = await stripe.checkout.sessions.create(subscriptionData);
    } else {
      session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        metadata: {
          userId: userId || "",
          userName: userName || "",
        },
        customer_email: userEmail || undefined,
        invoice_creation: {
          enabled: true,
        },
        customer_creation: "always",
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        return_url: `${req.headers.get(
          "origin",
        )}/return?session_id={CHECKOUT_SESSION_ID}`,
        automatic_tax: { enabled: true },
      });
    }

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error: any) {
    console.error("An error occurred while creating session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
