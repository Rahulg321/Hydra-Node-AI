"use server";

import { withServerActionAuth } from "@/hooks/lib/auth";
import db from "@/hooks/lib/db";
import { stripe } from "@/hooks/lib/stripe";
import { revalidatePath } from "next/cache";
import { sendSubscriptionEndedEmail } from "@/hooks/lib/mail";
import { formatDateWithSuffix } from "@/hooks/lib/utils";

/**
 * This function is used to cancel a subscription for a user.
 * @param userId - The ID of the user to cancel the subscription for.
 * @returns A promise that resolves to an object containing the type and message of the result.
 */
const cancelSubscription = withServerActionAuth(async (user, userId) => {
  try {
    if (!user || !user.stripeSubscriptionId) {
      console.error("User does not have an active subscription.");
      throw new Error("User does not have an active subscription.");
    }

    const subscription = await stripe.subscriptions.cancel(
      user.stripeSubscriptionId,
    );

    if (subscription.status !== "canceled") {
      console.error("Failed to cancel the subscription on Stripe.");
      throw new Error("Failed to cancel the subscription on Stripe.");
    }

    console.log("updating in the db");
    await db.user.update({
      where: { id: userId },
      data: {
        hasActiveSubscription: false,
      },
    });

    console.log("sending subscription ended email");
    sendSubscriptionEndedEmail(
      user.email,
      "Pro",
      "https://hydranode.ai/pricing",
      user.trialEndsAt ? formatDateWithSuffix(user.trialEndsAt) : "",
      user.firstName ?? "",
      user.lastName ?? "",
    );

    console.log("successfully sent subscription ended email");

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
