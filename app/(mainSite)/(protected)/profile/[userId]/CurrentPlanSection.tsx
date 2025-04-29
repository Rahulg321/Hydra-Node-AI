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

  // Helper function to find the latest relevant payment
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
        )[// Return the first element (latest)
      0]
    );
  };

  const getSubscriptionDetails = () => {
    // Lifetime access takes precedence
    if (existingUser.hasLifetimeAccess) {
      return {
        planName: "Lifetime Plan",
        planType: "Unlimited",
        lastPayment: "N/A",
        upcomingPayment: "N/A",
        status: "Active",
        actionLink: "#",
        actionText: "Learn More",
        amount: "$200", // Assuming fixed price for lifetime
        billingCycle: "Lifetime",
        billingType: "One time" as const,
      };
    }

    const lastPayment = findLatestSubscriptionPayment();
    const lastPaymentDate = lastPayment?.createdAt
      ? new Date(lastPayment.createdAt)
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
      return {
        planName: "Pro Plan", // Consider fetching nickname from priceId if available
        planType: "Subscription",
        lastPayment: lastPaymentDate
          ? formatDateWithSuffix(lastPaymentDate)
          : "N/A",
        upcomingPayment: formatDateWithSuffix(periodEndDate), // periodEndDate is guaranteed non-null here
        status: "Active",
        actionLink: "#", // Link to Stripe customer portal?
        actionText: "Manage Subscription",
        amount: lastPayment ? `$${lastPayment.amount}` : "$100", // Or fetch amount from priceId
        billingCycle: "Subscription", // Or determine from price interval (e.g., Monthly/Yearly)
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
        lastPayment: lastPaymentDate
          ? formatDateWithSuffix(lastPaymentDate)
          : "N/A",
        upcomingPayment: `Access ends ${formatDateWithSuffix(periodEndDate)}`, // Clarify meaning
        status: "Cancelled",
        actionLink: "/pricing",
        actionText: "Resubscribe",
        amount: lastPayment ? `$${lastPayment.amount}` : "$100", // Or fetch amount from priceId
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
        lastPayment: lastPaymentDate
          ? formatDateWithSuffix(lastPaymentDate)
          : "N/A",
        upcomingPayment: "N/A",
        status: "Expired",
        actionLink: "/pricing",
        actionText: "Renew Plan",
        amount: lastPayment ? `$${lastPayment.amount}` : "$100", // Or fetch amount from priceId
        billingCycle: "Subscription",
        billingType: "Subscription" as const,
      };
    }

    // Default case - no active, cancelled, expired, or lifetime plan found
    return {
      planName: "No Plan",
      planType: "None",
      lastPayment: "N/A",
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
              {subscriptionDetails.lastPayment !== "N/A" && (
                <Link
                  href="#" // TODO: Link to actual invoice URL if available
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
              {subscriptionDetails.upcomingPayment !== "N/A" &&
                subscriptionDetails.status !== "Cancelled" && (
                  <PaymentDetailsDialog
                    plan={subscriptionDetails.planName}
                    nextPaymentDate={subscriptionDetails.upcomingPayment} // This might need adjustment if 'Access ends...' text is used
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
              {subscriptionDetails.status === "Active" &&
                existingUser.stripeSubscriptionId &&
                existingUser.hasLifetimeAccess !== true && ( // Don't show cancel for lifetime
                  <CancelSubscriptionDialog userId={existingUser.id} />
                )}
              {(subscriptionDetails.status === "Expired" ||
                subscriptionDetails.status === "Cancelled" ||
                subscriptionDetails.status === "Inactive") && ( // Removed Trial here, add if needed
                <Button variant="link" size="lg" asChild>
                  <Link href={subscriptionDetails.actionLink}>
                    {subscriptionDetails.actionText}
                  </Link>
                </Button>
              )}
              {/* Add link to Stripe Customer Portal if status is Active */}
              {/* {subscriptionDetails.status === "Active" && existingUser.stripeCustomerId && (
                 <Button variant="link" size="lg" asChild>
                   <Link href="/api/stripe-portal">Manage Billing</Link>
                 </Button>
               )} */}
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
              {subscriptionDetails.lastPayment !== "N/A" && (
                <Link
                  href="#" // TODO: Link to actual invoice URL if available
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
                subscriptionDetails.status !== "Cancelled" && (
                  <PaymentDetailsDialog
                    plan={subscriptionDetails.planName}
                    nextPaymentDate={subscriptionDetails.upcomingPayment} // This might need adjustment if 'Access ends...' text is used
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
                  existingUser.stripeSubscriptionId &&
                  existingUser.hasLifetimeAccess !== true && (
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
                {/* Add link to Stripe Customer Portal if status is Active */}
                {/* {subscriptionDetails.status === "Active" && existingUser.stripeCustomerId && (
                   <Button variant="link" size="lg" asChild>
                     <Link href="/api/stripe-portal">Manage Billing</Link>
                   </Button>
                 )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
