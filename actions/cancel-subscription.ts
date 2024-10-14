"use server";

import db from "@/lib/db";
import { stripe } from "@/lib/stripe";

// Function to cancel subscription for a user
export async function cancelUserSubscription(userId: string) {
  try {
    // Step 1: Find the user in the database
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.stripeSubscriptionId) {
      throw new Error("User does not have an active subscription.");
    }

    // Step 2: Cancel the subscription in Stripe
    const subscription = await stripe.subscriptions.cancel(
      user.stripeSubscriptionId,
    );

    if (subscription.status !== "canceled") {
      throw new Error("Failed to cancel the subscription on Stripe.");
    }

    // Step 3: Update the user in the database to reflect the cancellation
    await db.user.update({
      where: { id: userId },
      data: {
        hasActiveSubscription: false,
      },
    });

    return {
      type: "success",
      message: "Subscription canceled successfully.",
    };
  } catch (error: any) {
    console.error("Error canceling subscription:", error);
    return {
      type: "error",
      message: error.message,
    };
  }
}
