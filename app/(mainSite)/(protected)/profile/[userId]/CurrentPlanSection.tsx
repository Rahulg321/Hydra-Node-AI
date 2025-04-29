import { GradientButton } from "@/components/buttons/gradient-button";
import { formatDateWithSuffix } from "@/hooks/lib/utils";
import type { User } from "@prisma/client";
import Link from "next/link";
import { InfoIcon } from "lucide-react";
import { PaymentDetailsDialog } from "@/components/Dialogs/payment-details-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CancelSubscriptionDialog from "@/components/Dialogs/cancel-subscription-dialog";
import CancelSubscriptionButton from "@/components/CancelSubscriptionButton";

export default function CurrentPlanSection({
  existingUser,
}: {
  existingUser: User;
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
        billingType: "One time",
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
        const lastPaymentDate = new Date(existingUser.stripeCurrentPeriodEnd);
        lastPaymentDate.setFullYear(lastPaymentDate.getFullYear() - 1);

        return {
          planName: "Pro Plan",
          planType: "Yearly",
          lastPayment: formatDateWithSuffix(lastPaymentDate),
          upcomingPayment: formatDateWithSuffix(
            new Date(existingUser.stripeCurrentPeriodEnd),
          ),
          status: "Active",
          actionLink: "#",
          actionText: "Manage Subscription",
          amount: "$100",
          billingCycle: "Yearly",
          billingType: "Subscription",
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
      return {
        planName: "Cancelled Plan",
        planType: "Yearly",
        lastPayment: "N/A",
        upcomingPayment: formatDateWithSuffix(
          new Date(existingUser.stripeCurrentPeriodEnd),
        ),
        status: "Cancelled",
        actionLink: "/pricing",
        actionText: "Get Subscription",
        amount: "$100",
        billingCycle: "Yearly",
        billingType: "Subscription",
      };
    }

    // Check for expired subscription
    if (
      existingUser.stripeCurrentPeriodEnd &&
      new Date(existingUser.stripeCurrentPeriodEnd) <= currentDate
    ) {
      return {
        planName: "Expired Plan",
        planType: "Yearly",
        lastPayment: formatDateWithSuffix(
          new Date(existingUser.stripeCurrentPeriodEnd),
        ),
        upcomingPayment: "N/A",
        status: "Expired",
        actionLink: "/pricing",
        actionText: "Renew Plan",
        amount: "$100",
        billingCycle: "Yearly",
        billingType: "Subscription",
      };
    }

    // Check for active trial
    if (
      existingUser.trialEndsAt &&
      new Date(existingUser.trialEndsAt) > currentDate
    ) {
      return {
        planName: "Trial Plan",
        planType: "Trial",
        lastPayment: "N/A",
        upcomingPayment: formatDateWithSuffix(
          new Date(existingUser.trialEndsAt),
        ),
        status: "Trial",
        actionLink: "/pricing",
        actionText: "Subscribe Now",
        amount: "$0",
        billingCycle: "7 days",
        billingType: "Trial",
      };
    }

    // Check for expired trial
    if (
      existingUser.trialEndsAt &&
      new Date(existingUser.trialEndsAt) <= currentDate
    ) {
      return {
        planName: "Trial Plan",
        planType: "Trial",
        lastPayment: "N/A",
        upcomingPayment: "N/A",
        status: "Expired",
        actionLink: "/pricing",
        actionText: "Subscribe Now",
        amount: "$0",
        billingCycle: "7 days",
        billingType: "Trial",
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
      billingType: "None",
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
