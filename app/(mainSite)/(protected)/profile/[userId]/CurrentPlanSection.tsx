import { formatDateWithSuffix } from "@/hooks/lib/utils";
import type { User, Payment } from "@prisma/client";
import Link from "next/link";
import { InfoIcon } from "lucide-react";
import { PaymentDetailsDialog } from "@/components/Dialogs/payment-details-dialog";
import { Button } from "@/components/ui/button";
import CancelSubscriptionDialog from "@/components/Dialogs/cancel-subscription-dialog";

export default function CurrentPlanSection({
  existingUser,
}: {
  existingUser: User & {
    Payment?: Payment[];
  };
}) {
  const currentDate = new Date();

  // Helper function to find the latest relevant *subscription* payment
  const findLatestSubscriptionPayment = (): Payment | undefined => {
    if (!existingUser.Payment || !existingUser.stripeSubscriptionId) {
      return undefined;
    }
    return (
      existingUser.Payment
        // Filter for relevant subscription payments first
        .filter(
          (payment) =>
            payment.paymentType === "SUBSCRIPTION" &&
            payment.status === "SUCCEEDED" &&
            payment.stripeSubscriptionId === existingUser.stripeSubscriptionId,
        )
        // Sort by creation date descending to get the latest
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )[0] // Return the first element (latest)
    );
  };

  // Helper function to find the lifetime payment
  const findLifetimePayment = (): Payment | undefined => {
    // Find the first successful lifetime payment
    return existingUser.Payment?.find(
      (payment) =>
        payment.paymentType === "ONE_TIME" &&
        payment.status === "SUCCEEDED" &&
        payment.userId === existingUser.id,
    );
  };

  const getSubscriptionDetails = () => {
    // Lifetime access takes precedence
    if (existingUser.hasLifetimeAccess) {
      const lifetimePayment = findLifetimePayment();
      const lifetimePaymentDate = lifetimePayment?.createdAt
        ? new Date(lifetimePayment.createdAt)
        : null;

      console.log("lifetimePayment", lifetimePayment);

      return {
        planName: "Lifetime Plan",
        planType: "Unlimited",
        lastPayment: lifetimePaymentDate // Display the date of the lifetime payment
          ? formatDateWithSuffix(lifetimePaymentDate)
          : "N/A", // Fallback if payment record not found for some reason
        upcomingPayment: "N/A",
        status: "Active",
        actionLink: "#",
        actionText: "Learn More",
        amount: lifetimePayment ? `$${lifetimePayment.amount}` : "$200", // Use actual amount if found, else default
        billingCycle: "Lifetime",
        billingType: "One time" as const,
      };
    }

    // Find the latest successful *subscription* payment for recurring plans
    const lastSubscriptionPayment = findLatestSubscriptionPayment();
    const lastSubscriptionPaymentDate = lastSubscriptionPayment?.createdAt
      ? new Date(lastSubscriptionPayment.createdAt)
      : null;
    const periodEndDate = existingUser.stripeCurrentPeriodEnd
      ? new Date(existingUser.stripeCurrentPeriodEnd)
      : null;

    // Check for active subscription
    if (
      existingUser.hasActiveSubscription &&
      existingUser.stripeSubscriptionId &&
      periodEndDate &&
      periodEndDate > currentDate
    ) {
      // TODO: Replace these with actual Stripe Price IDs from your environment variables or config
      const MONTHLY_PRICE_ID =
        process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID ||
        "YOUR_MONTHLY_PRICE_ID_PLACEHOLDER";
      const YEARLY_PRICE_ID =
        process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID ||
        "YOUR_YEARLY_PRICE_ID_PLACEHOLDER";

      let determinedPlanName = "Pro Plan"; // Default name
      let determinedBillingCycle = "Subscription"; // Default cycle

      // Determine plan details based on the stored price ID
      if (existingUser.stripePriceId === MONTHLY_PRICE_ID) {
        console.log("monthly");
        determinedPlanName = "Pro Monthly";
        determinedBillingCycle = "Monthly";
      } else if (existingUser.stripePriceId === YEARLY_PRICE_ID) {
        console.log("yearly");
        determinedPlanName = "Pro Yearly";
        determinedBillingCycle = "Yearly";
      } else if (existingUser.stripePriceId) {
        console.log("unknown");
        // If there's a price ID but it doesn't match known ones, log a warning
        // or fetch nickname dynamically if possible. For now, use default.
        console.warn(
          `Unknown active subscription price ID: ${existingUser.stripePriceId}`,
        );
      }

      return {
        planName: determinedPlanName, // Use determined name
        planType: "Subscription",
        lastPayment: lastSubscriptionPaymentDate // Use the date of the last successful subscription payment
          ? formatDateWithSuffix(lastSubscriptionPaymentDate)
          : "N/A", // Fallback if no successful payment found for this sub ID
        upcomingPayment: formatDateWithSuffix(periodEndDate), // periodEndDate is guaranteed non-null here
        status: "Active",
        actionLink: process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL || "#", // Link to Stripe customer portal
        actionText: "Manage Subscription",
        amount: lastSubscriptionPayment
          ? `$${lastSubscriptionPayment.amount}`
          : "N/A", // Use last payment amount, fallback N/A
        billingCycle: determinedBillingCycle, // Use determined cycle (Monthly/Yearly)
        billingType: "Subscription" as const,
      };
    }

    // Check for cancelled subscription that still has access
    if (
      !existingUser.hasActiveSubscription &&
      existingUser.stripeSubscriptionId &&
      periodEndDate &&
      periodEndDate > currentDate
    ) {
      return {
        planName: "Cancelled Plan", // Consider fetching nickname
        planType: "Subscription",
        lastPayment: lastSubscriptionPaymentDate // Use the date of the last successful subscription payment before cancellation
          ? formatDateWithSuffix(lastSubscriptionPaymentDate)
          : "N/A",
        upcomingPayment: `Access ends ${formatDateWithSuffix(periodEndDate)}`, // Clarify meaning
        status: "Cancelled",
        actionLink: "/pricing",
        actionText: "Resubscribe",
        amount: lastSubscriptionPayment
          ? `$${lastSubscriptionPayment.amount}`
          : "$100", // Or fetch amount from priceId
        billingCycle: "Subscription",
        billingType: "Subscription" as const,
      };
    }

    // Check for expired subscription (had one previously but period ended)
    if (
      existingUser.stripeSubscriptionId && // Check if they ever had a subscription ID
      periodEndDate &&
      periodEndDate <= currentDate
    ) {
      return {
        planName: "Expired Plan", // Consider fetching nickname
        planType: "Subscription",
        lastPayment: lastSubscriptionPaymentDate // Use the date of the last successful subscription payment before expiry
          ? formatDateWithSuffix(lastSubscriptionPaymentDate)
          : "N/A",
        upcomingPayment: "N/A",
        status: "Expired",
        actionLink: "/pricing",
        actionText: "Renew Plan",
        amount: lastSubscriptionPayment
          ? `$${lastSubscriptionPayment.amount}`
          : "$100", // Or fetch amount from priceId
        billingCycle: "Subscription",
        billingType: "Subscription" as const,
      };
    }

    // Default case - no active, cancelled, expired, or lifetime plan found
    return {
      planName: "No Plan",
      planType: "None",
      lastPayment: "N/A", // No relevant payment for "No Plan"
      upcomingPayment: "N/A",
      status: "Inactive",
      actionLink: "/pricing",
      actionText: "Subscribe Now",
      amount: "$0",
      billingCycle: "None",
      billingType: "None" as const,
    };
  };

  const subscriptionDetails = getSubscriptionDetails();

  // Find the specific payment record associated with the displayed lastPayment date
  // This is needed to potentially link to an invoice URL later
  const lastPaymentRecord =
    subscriptionDetails.billingType === "One time"
      ? findLifetimePayment()
      : findLatestSubscriptionPayment();

  return (
    <div className="w-full space-y-6">
      <h2 className="text-xl font-semibold text-white">Subscription</h2>

      <div className="overflow-hidden rounded-xl border border-gray-800 bg-[#171616]">
        <div className="p-6">
          <h5 className="transducer-font mb-6 font-semibold uppercase tracking-wider text-white">
            View and manage subscription
          </h5>

          {/* Desktop view - hidden on mobile */}
          <div className="hidden gap-4 rounded-t-md bg-[#50443F] p-4 md:grid md:grid-cols-5">
            <div className="text-sm font-medium text-white">Subscription</div>
            <div className="text-sm font-medium text-white">Last payment</div>
            <div className="text-sm font-medium text-white">
              {subscriptionDetails.status === "Cancelled"
                ? "Access Ends"
                : "Upcoming payment"}
            </div>
            <div className="text-sm font-medium text-white">Status</div>
            <div className="text-sm font-medium text-white">Manage</div>
          </div>

          {/* Desktop Content - hidden on mobile */}
          <div className="hidden min-h-[80px] items-center gap-4 p-4 md:grid md:grid-cols-5">
            {/* Plan Name & Type */}
            <div>
              <div className="font-medium text-white">
                {subscriptionDetails.planName}
              </div>
              <div className="text-sm text-gray-400">
                {subscriptionDetails.planType}
              </div>
            </div>

            {/* Last Payment */}
            <div>
              <div className="text-white">
                {subscriptionDetails.lastPayment}
              </div>
              {/* Show View Invoice link only if there was a last payment record found */}
              {lastPaymentRecord && lastPaymentRecord.stripeInvoiceId && (
                <Link
                  href={`https://dashboard.stripe.com/invoices/${lastPaymentRecord.stripeInvoiceId}`}
                  target="_blank" // Open invoice in new tab
                  rel="noopener noreferrer"
                  className="text-sm text-orange-500 hover:text-orange-400"
                >
                  View invoice
                </Link>
              )}
            </div>

            {/* Upcoming Payment / Access End */}
            <div>
              <div className="text-white">
                {subscriptionDetails.upcomingPayment}
              </div>
              {/* Show Payment Details only for active, non-lifetime subscriptions with an upcoming payment */}
              {subscriptionDetails.upcomingPayment !== "N/A" &&
                subscriptionDetails.status === "Active" &&
                subscriptionDetails.billingType === "Subscription" && (
                  <PaymentDetailsDialog
                    plan={subscriptionDetails.planName}
                    nextPaymentDate={subscriptionDetails.upcomingPayment}
                    amount={subscriptionDetails.amount}
                    billingCycle={subscriptionDetails.billingCycle}
                    billingType={subscriptionDetails.billingType}
                    trigger={
                      <Button variant="link" className="h-8 p-0">
                        View Payment Details
                      </Button>
                    }
                  />
                )}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <span
                className={`${
                  subscriptionDetails.status === "Active"
                    ? "text-green-500"
                    : subscriptionDetails.status === "Trial" // Assuming Trial might be a status
                      ? "text-blue-500"
                      : subscriptionDetails.status === "Expired"
                        ? "text-red-500"
                        : subscriptionDetails.status === "Cancelled"
                          ? "text-yellow-500"
                          : "text-gray-500" // Inactive or other
                }`}
              >
                {subscriptionDetails.status}
              </span>
              <InfoIcon className="h-4 w-4 text-gray-500" />
            </div>

            {/* Manage Actions */}
            <div>
              {/* Show Cancel only for Active Subscriptions (not Lifetime) */}
              {subscriptionDetails.status === "Active" &&
                subscriptionDetails.billingType === "Subscription" &&
                existingUser.stripeSubscriptionId && (
                  <CancelSubscriptionDialog userId={existingUser.id} />
                )}
              {/* Show Resubscribe/Renew/Subscribe links */}
              {(subscriptionDetails.status === "Expired" ||
                subscriptionDetails.status === "Cancelled" ||
                subscriptionDetails.status === "Inactive") && (
                <Button variant="link" size="lg" asChild>
                  <Link href={subscriptionDetails.actionLink}>
                    {subscriptionDetails.actionText}
                  </Link>
                </Button>
              )}
              {/* Add link to Stripe Customer Portal if status is Active and it's a subscription */}
              {subscriptionDetails.status === "Active" &&
                subscriptionDetails.billingType === "Subscription" &&
                existingUser.stripeCustomerId && (
                  <Button variant="link" size="lg" asChild>
                    <Link href="/api/stripe-portal">Manage Billing</Link>
                  </Button>
                )}
            </div>
          </div>

          {/* Mobile view */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {/* Subscription */}
            <div className="rounded-md bg-[#50443F] p-4">
              <div className="mb-2 text-sm font-medium text-white">
                Subscription
              </div>
              <div className="font-medium text-white">
                {subscriptionDetails.planName}
              </div>
              <div className="text-sm text-gray-400">
                {subscriptionDetails.planType}
              </div>
            </div>

            {/* Last Payment */}
            <div className="rounded-md bg-[#50443F] p-4">
              <div className="mb-2 text-sm font-medium text-white">
                Last payment
              </div>
              <div className="text-white">
                {subscriptionDetails.lastPayment}
              </div>
              {lastPaymentRecord && lastPaymentRecord.stripeInvoiceId && (
                <Link
                  href={`https://dashboard.stripe.com/invoices/${lastPaymentRecord.stripeInvoiceId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-orange-500 hover:text-orange-400"
                >
                  View invoice
                </Link>
              )}
            </div>

            {/* Upcoming Payment / Access End */}
            <div className="rounded-md bg-[#50443F] p-4">
              <div className="mb-2 text-sm font-medium text-white">
                {subscriptionDetails.status === "Cancelled"
                  ? "Access Ends"
                  : "Upcoming payment"}
              </div>
              <div className="text-white">
                {subscriptionDetails.upcomingPayment}
              </div>
              {subscriptionDetails.upcomingPayment !== "N/A" &&
                subscriptionDetails.status === "Active" &&
                subscriptionDetails.billingType === "Subscription" && (
                  <PaymentDetailsDialog
                    plan={subscriptionDetails.planName}
                    nextPaymentDate={subscriptionDetails.upcomingPayment}
                    amount={subscriptionDetails.amount}
                    billingCycle={subscriptionDetails.billingCycle}
                    billingType={subscriptionDetails.billingType}
                    trigger={
                      <Button variant="link" className="h-8 p-0">
                        View Payment Details
                      </Button>
                    }
                  />
                )}
            </div>

            {/* Status */}
            <div className="rounded-md bg-[#50443F] p-4">
              <div className="mb-2 text-sm font-medium text-white">Status</div>
              <div className="flex items-center gap-2">
                <span
                  className={`${
                    subscriptionDetails.status === "Active"
                      ? "text-green-500"
                      : subscriptionDetails.status === "Trial"
                        ? "text-blue-500"
                        : subscriptionDetails.status === "Expired"
                          ? "text-red-500"
                          : subscriptionDetails.status === "Cancelled"
                            ? "text-yellow-500"
                            : "text-gray-500"
                  }`}
                >
                  {subscriptionDetails.status}
                </span>
                <InfoIcon className="h-4 w-4 text-gray-500" />
              </div>
            </div>

            {/* Manage */}
            <div className="rounded-md bg-[#50443F] p-4">
              <div className="mb-2 text-sm font-medium text-white">Manage</div>
              <div>
                {subscriptionDetails.status === "Active" &&
                  subscriptionDetails.billingType === "Subscription" &&
                  existingUser.stripeSubscriptionId && (
                    <CancelSubscriptionDialog userId={existingUser.id} />
                  )}
                {(subscriptionDetails.status === "Expired" ||
                  subscriptionDetails.status === "Cancelled" ||
                  subscriptionDetails.status === "Inactive") && (
                  <Button variant="link" size="lg" asChild>
                    <Link href={subscriptionDetails.actionLink}>
                      {subscriptionDetails.actionText}
                    </Link>
                  </Button>
                )}
                {subscriptionDetails.status === "Active" &&
                  subscriptionDetails.billingType === "Subscription" &&
                  existingUser.stripeCustomerId && (
                    <Button variant="link" size="lg" asChild>
                      <Link href="/api/stripe-portal">Manage Billing</Link>
                    </Button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
