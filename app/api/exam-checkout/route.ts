import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const { priceId, examId, userId, userEmail, examSlug } = await req.json();

    if (!priceId || !examId || !examSlug) {
      return NextResponse.json(
        { error: "Price ID or Exam ID or EXAMSLUG is required" },
        { status: 400 },
      );
    }

    let session;

    session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: {
        userId: userId || "",
        examId: examId || "",
        examSlug: examSlug || "",
        userEmail: userEmail as string,
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
      )}/exam-payment?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
    });

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error: any) {
    console.error("An error occurred while creating session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
