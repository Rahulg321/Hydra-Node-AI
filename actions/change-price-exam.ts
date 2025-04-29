"use server";

import { ChangeExamPriceFormType } from "@/app/(manage-exam)/instructor/exam/[uid]/manage/pricing/exam-price-form";
import { auth } from "@/auth";
import db from "@/hooks/lib/db";
import { stripe } from "@/hooks/lib/stripe";
import { revalidatePath } from "next/cache";

export default async function ChangePriceExam(
  examId: string,
  stripePriceId: string,
  stripeProductId: string,
  values: ChangeExamPriceFormType,
) {
  try {
    const session = await auth();

    if (!session) {
      return {
        type: "error",
        message: "An active session is required to upload questions.",
      };
    }

    if (!examId) {
      return {
        type: "error",
        message: "Exam ID is required to upload questions.",
      };
    }

    const currentPrice = await stripe.prices.retrieve(stripePriceId);
    const priceInCents = Math.round(values.price * 100);

    // Check if the price has changed before updating
    if (currentPrice.unit_amount !== priceInCents) {
      // Deactivate the current price
      await stripe.prices.update(stripePriceId, { active: false });

      // Create a new price in Stripe for the updated amount
      const newPrice = await stripe.prices.create({
        unit_amount: priceInCents,
        currency: "usd", // Adjust if needed
        product: stripeProductId,
        billing_scheme: "per_unit",
      });

      // Update the database with the new Stripe price ID
      await db.exam.update({
        where: {
          id: examId,
        },
        data: {
          stripePriceId: newPrice.id,
          price: values.price,
        },
      });
    }

    revalidatePath(`/instructor/exam/${examId}/manage/pricing`);

    return {
      type: "success",
      message: ` questions uploaded successfully!`,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return {
        type: "error",
        message: "An error occurred while updating price of exam",
      };
    }

    console.error("Error updating price", error);

    return {
      type: "error",
      message: "An error occurred while updating price of exam",
    };
  }
}
