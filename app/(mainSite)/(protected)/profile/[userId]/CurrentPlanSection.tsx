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

  console.log("existingUser", existingUser);

  const getSubscriptionDetails = () => {
    // Lifetime access takes precedence over all other subscription types
    if (existingUser.hasLifetimeAccess) {
      return {
        planName: "Lifetime Plan",
        planType: "Unlimited",
        lastPayment: "N/A",
        upcomingPayment: "N/A",
        status: "Active",
        actionLink: "#",
        actionText: "Learn More",
        amount: "$200",
        billingCycle: "Lifetime",
        billingType: "One time" as const,
      };
    }

    // Check for active subscription
    if (
      existingUser.hasActiveSubscription &&
      existingUser.stripeSubscriptionId
    ) {
      // User has an active subscription
      if (
        existingUser.stripeCurrentPeriodEnd &&
        new Date(existingUser.stripeCurrentPeriodEnd) > currentDate
      ) {
        const periodEnd = new Date(existingUser.stripeCurrentPeriodEnd);

        // Get the last payment from the Payment table
        const lastPayment = existingUser.Payment?.find(
          (payment) =>
            payment.paymentType === "SUBSCRIPTION" &&
            payment.status === "SUCCEEDED" &&
            payment.stripeSubscriptionId === existingUser.stripeSubscriptionId,
        );

        const lastPaymentDate = lastPayment?.createdAt
          ? new Date(lastPayment.createdAt)
          : new Date(periodEnd.getTime() - 365 * 24 * 60 * 60 * 1000); // Fallback to 1 year ago if no payment found

        return {
          planName: "Pro Plan",
          planType: "Subscription",
          lastPayment: formatDateWithSuffix(lastPaymentDate),
          upcomingPayment: formatDateWithSuffix(periodEnd),
          status: "Active",
          actionLink: "#",
          actionText: "Manage Subscription",
          amount: lastPayment ? `$${lastPayment.amount}` : "$100",
          billingCycle: "Subscription",
          billingType: "Subscription" as const,
        };
      }
    }

    // Check for cancelled subscription that still has access until the end of the period
    if (
      !existingUser.hasActiveSubscription &&
      existingUser.stripeSubscriptionId &&
      existingUser.stripeCurrentPeriodEnd &&
      new Date(existingUser.stripeCurrentPeriodEnd) > currentDate
    ) {
      const lastPayment = existingUser.Payment?.find(
        (payment) =>
          payment.paymentType === "SUBSCRIPTION" &&
          payment.status === "SUCCEEDED" &&
          payment.stripeSubscriptionId === existingUser.stripeSubscriptionId,
      );

      return {
        planName: "Cancelled Plan",
        planType: "Subscription",
        lastPayment: lastPayment
          ? formatDateWithSuffix(new Date(lastPayment.createdAt))
          : "N/A",
        upcomingPayment: formatDateWithSuffix(
          new Date(existingUser.stripeCurrentPeriodEnd),
        ),
        status: "Cancelled",
        actionLink: "/pricing",
        actionText: "Get Subscription",
        amount: lastPayment ? `$${lastPayment.amount}` : "$100",
        billingCycle: "Subscription",
        billingType: "Subscription" as const,
      };
    }

    // Check for expired subscription
    if (
      existingUser.stripeCurrentPeriodEnd &&
      new Date(existingUser.stripeCurrentPeriodEnd) <= currentDate
    ) {
      const lastPayment = existingUser.Payment?.find(
        (payment) =>
          payment.paymentType === "SUBSCRIPTION" &&
          payment.status === "SUCCEEDED" &&
          payment.stripeSubscriptionId === existingUser.stripeSubscriptionId,
      );

      return {
        planName: "Expired Plan",
        planType: "Subscription",
        lastPayment: lastPayment
          ? formatDateWithSuffix(new Date(lastPayment.createdAt))
          : "N/A",
        upcomingPayment: "N/A",
        status: "Expired",
        actionLink: "/pricing",
        actionText: "Renew Plan",
        amount: lastPayment ? `$${lastPayment.amount}` : "$100",
        billingCycle: "Subscription",
        billingType: "Subscription" as const,
      };
    }
    // Default case - no plan
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
              Upcoming payment
            </div>
            <div className="text-sm font-medium text-white">Status</div>
            <div className="text-sm font-medium text-white">Manage</div>
          </div>

          {/* Desktop Content - hidden on mobile */}
          <div className="hidden min-h-[80px] items-center gap-4 p-4 md:grid md:grid-cols-5">
            <div>
              <div className="font-medium text-white">
                {subscriptionDetails.planName}
              </div>
              <div className="text-sm text-gray-400">
                {subscriptionDetails.planType}
              </div>
            </div>

            <div>
              <div className="text-white">
                {subscriptionDetails.lastPayment}
              </div>
              {subscriptionDetails.lastPayment !== "N/A" && (
                <Link
                  href="#"
                  className="text-sm text-orange-500 hover:text-orange-400"
                >
                  View invoice
                </Link>
              )}
            </div>

            <div>
              <div className="text-white">
                {subscriptionDetails.upcomingPayment}
              </div>
              {subscriptionDetails.upcomingPayment !== "N/A" && (
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

            <div>
              {subscriptionDetails.status === "Active" &&
                existingUser.stripeSubscriptionId && (
                  <CancelSubscriptionDialog userId={existingUser.id} />
                )}
              {(subscriptionDetails.status === "Expired" ||
                subscriptionDetails.status === "Cancelled" ||
                subscriptionDetails.status === "Trial" ||
                subscriptionDetails.status === "Inactive") && (
                <Button variant="link" size="lg" asChild>
                  <Link href="/pricing">Upgrade</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile view */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
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

            <div className="rounded-md bg-[#50443F] p-4">
              <div className="mb-2 text-sm font-medium text-white">
                Last payment
              </div>
              <div className="text-white">
                {subscriptionDetails.lastPayment}
              </div>
              {subscriptionDetails.lastPayment !== "N/A" && (
                <Link
                  href="#"
                  className="text-sm text-orange-500 hover:text-orange-400"
                >
                  View invoice
                </Link>
              )}
            </div>

            <div className="rounded-md bg-[#50443F] p-4">
              <div className="mb-2 text-sm font-medium text-white">
                Upcoming payment
              </div>
              <div className="text-white">
                {subscriptionDetails.upcomingPayment}
              </div>
              {subscriptionDetails.upcomingPayment !== "N/A" && (
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

            <div className="rounded-md bg-[#50443F] p-4">
              <div className="mb-2 text-sm font-medium text-white">Manage</div>
              <div>
                {subscriptionDetails.status === "Active" &&
                  existingUser.stripeSubscriptionId && (
                    <CancelSubscriptionDialog userId={existingUser.id} />
                  )}
                {(subscriptionDetails.status === "Expired" ||
                  subscriptionDetails.status === "Cancelled" ||
                  subscriptionDetails.status === "Trial" ||
                  subscriptionDetails.status === "Inactive") && (
                  <Button variant="link" size="lg" asChild>
                    <Link href="/pricing">Upgrade</Link>
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
