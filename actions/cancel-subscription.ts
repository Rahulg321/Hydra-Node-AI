"use server";

import { withServerActionAuth } from "@/hooks/lib/auth";
import db from "@/hooks/lib/db";
import { stripe } from "@/hooks/lib/stripe";
import { revalidatePath } from "next/cache";

/**
 * This function is used to cancel a subscription for a user.
 * @param userId - The ID of the user to cancel the subscription for.
 * @returns A promise that resolves to an object containing the type and message of the result.
 */
const cancelSubscription = withServerActionAuth(async (user, userId) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.stripeSubscriptionId) {
      throw new Error("User does not have an active subscription.");
    }

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

    revalidatePath(`/profile/${userId}`);
    revalidatePath(`/profile/${userId}/subscription`);
    revalidatePath(`/`);

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
});

export { cancelSubscription };
