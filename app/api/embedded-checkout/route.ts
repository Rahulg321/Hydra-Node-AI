import { auth } from "@/auth";
import { stripe } from "@/hooks/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { redis } from "@/hooks/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { extractClientIp } from "@/hooks/lib/utils";
import { headers } from "next/headers";

const checkoutIpLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1m"),
});

const userLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10m"),
});

export async function POST(req: Request) {
  const userSession = await auth();

  if (!userSession) {
    console.log("Unauthorized");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("User session found");

  const hdrs = req.headers;
  const ip = extractClientIp(hdrs);

  try {
    const ipLimitPromise = checkoutIpLimiter.limit(ip);
    const ipTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("IP rate limiter timed out")), 2000),
    );

    const { success: ipAllowed, pending: ipPending } = (await Promise.race([
      ipLimitPromise,
      ipTimeout,
    ])) as { success: boolean; pending: Promise<void> };

    console.log("IP allowed", ipAllowed);

    if (!ipAllowed) {
      await ipPending;
      console.log("IP not allowed");
      return NextResponse.json(
        { error: "Too many checkout attempts. Please wait a minute." },
        { status: 429 },
      );
    }

    //   const userLimitPromise = userLimiter.limit(
    //     `checkout:${userSession.user.email}`,
    //   );
    //   const userTimeout = new Promise((_, reject) =>
    //     setTimeout(() => reject(new Error("User rate limiter timed out")), 2000),
    //   );

    //   const { success: userAllowed, pending: userPending } = (await Promise.race([
    //     userLimitPromise,
    //     userTimeout,
    //   ])) as { success: boolean; pending: Promise<void> };

    //   console.log("User allowed", userAllowed);

    //   if (!userAllowed) {
    //     await userPending;
    //     console.log("User not allowed");
    //     return NextResponse.json(
    //       { error: "Too many checkout attempts. Please wait a minute." },
    //       { status: 429 },
    //     );
    //   }
  } catch (error) {
    console.error("Rate limiting error:", error);
    // Proceed anyway if rate limiting fails, rather than blocking the user
    console.log("Proceeding despite rate limiting error");
  }

  console.log("reached inside");

  try {
    const { priceId, mode, trialPeriodDays, userId, userEmail, isLifetime } =
      await req.json();

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
          userId: userId as string,
          userEmail: userEmail as string,
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
        mode: "payment",
        metadata: {
          userId: userId || "",
          userEmail: userEmail as string,
          isLifetime,
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
