import { Button } from "@/components/ui/button";
import { formatDateWithSuffix } from "@/lib/utils";
import { User } from "@prisma/client";
import Link from "next/link";

export default function CurrentPlanSection({
  existingUser,
}: {
  existingUser: User;
}) {
  const currentDate = new Date();

  // Helper function to render subscription status
  const renderSubscriptionStatus = (
    title: string,
    description: string,
    buttonLabel: string,
    buttonLink: string,
  ) => {
    return (
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
        <h3 className="font-semibold text-baseC">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <Button
          className="mb-4 w-full rounded-full border border-base bg-base px-10 py-6 text-base font-semibold text-white"
          asChild
        >
          <Link href={buttonLink}>{buttonLabel}</Link>
        </Button>
      </div>
    );
  };

  // 1. Lifetime Access
  if (existingUser.hasLifetimeAccess) {
    return renderSubscriptionStatus(
      "You have Lifetime Access",
      "Enjoy unlimited access to all services. No further payments required.",
      "Learn More",
      "#",
    );
  }

  // 2. Expired Subscription
  if (
    existingUser.stripeCurrentPeriodEnd &&
    new Date(existingUser.stripeCurrentPeriodEnd) <= currentDate
  ) {
    const formattedEndDate = formatDateWithSuffix(
      new Date(existingUser.stripeCurrentPeriodEnd),
    );
    return renderSubscriptionStatus(
      "Subscription Ended",
      `Your subscription ended on ${formattedEndDate}. Renew to regain access to premium services.`,
      "Renew Plan",
      "/pricing",
    );
  }

  // 3. Active Subscription which was cancelled
  if (
    existingUser.stripeSubscriptionId &&
    new Date(existingUser.stripeCurrentPeriodEnd as Date) > currentDate &&
    !existingUser.hasActiveSubscription
  ) {
    const formattedEndDate = formatDateWithSuffix(
      new Date(existingUser.stripeCurrentPeriodEnd as Date),
    );

    return renderSubscriptionStatus(
      "Cancelled Subscription",
      `Your subscription was cancelled. Supposed to expire on ${formattedEndDate}`,
      "Get Subcription",
      "/pricing",
    );
  }

  // 4. Active Subscription
  if (
    existingUser.stripeSubscriptionId &&
    new Date(existingUser.stripeCurrentPeriodEnd as Date) > currentDate
  ) {
    const formattedEndDate = formatDateWithSuffix(
      new Date(existingUser.stripeCurrentPeriodEnd as Date),
    );

    return renderSubscriptionStatus(
      "Current Plan",
      `Expires on ${formattedEndDate}`,
      "Manage Subscription",
      "#",
    );
  }

  // 5. Expired Trial Period
  if (
    existingUser.trialEndsAt &&
    new Date(existingUser.trialEndsAt) <= currentDate
  ) {
    const formattedTrialEndDate = formatDateWithSuffix(
      new Date(existingUser.trialEndsAt),
    );
    return renderSubscriptionStatus(
      "Trial Ended",
      `Your trial period ended on ${formattedTrialEndDate}. Subscribe to unlock premium services.`,
      "Subscribe Now",
      "/pricing",
    );
  }

  // 6. Active Trial Period
  if (existingUser.trialEndsAt && !existingUser.stripeSubscriptionId) {
    const formattedTrialEndDate = formatDateWithSuffix(
      new Date(existingUser.trialEndsAt),
    );
    return renderSubscriptionStatus(
      "Active Trial",
      `Your trial is active until ${formattedTrialEndDate}. Subscribe to continue enjoying premium services.`,
      "Subscribe Now",
      "/pricing",
    );
  }

  // 7. No Active Plan (Default Case)
  return renderSubscriptionStatus(
    "No Active Plan",
    "You don’t have any active plans or purchases. Subscribe to unlock premium features.",
    "Subscribe Now",
    "/pricing",
  );
}
