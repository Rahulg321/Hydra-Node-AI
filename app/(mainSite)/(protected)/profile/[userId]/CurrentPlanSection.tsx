import { GradientButton } from "@/components/buttons/gradient-button";
import { formatDateWithSuffix } from "@/lib/utils";
import type { User } from "@prisma/client";
import Link from "next/link";
import { InfoIcon } from "lucide-react";
import { PaymentDetailsDialog } from "@/components/Dialogs/payment-details-dialog";
import { Button } from "@/components/ui/button";

export default function CurrentPlanSection({
  existingUser,
}: {
  existingUser: User;
}) {
  const currentDate = new Date();

  const getSubscriptionDetails = () => {
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

    if (
      existingUser.stripeSubscriptionId &&
      new Date(existingUser.stripeCurrentPeriodEnd as Date) > currentDate &&
      !existingUser.hasActiveSubscription
    ) {
      return {
        planName: "Cancelled Plan",
        planType: "Yearly",
        lastPayment: "N/A",
        upcomingPayment: formatDateWithSuffix(
          new Date(existingUser.stripeCurrentPeriodEnd as Date),
        ),
        status: "Cancelled",
        actionLink: "/pricing",
        actionText: "Get Subscription",
        amount: "$100",
        billingCycle: "Yearly",
        billingType: "Subscription",
      };
    }

    if (
      existingUser.stripeSubscriptionId &&
      new Date(existingUser.stripeCurrentPeriodEnd as Date) > currentDate
    ) {
      const lastPaymentDate = new Date(
        existingUser.stripeCurrentPeriodEnd as Date,
      );
      lastPaymentDate.setFullYear(lastPaymentDate.getFullYear() - 1);

      return {
        planName: "Pro Plan",
        planType: "Yearly",
        lastPayment: formatDateWithSuffix(lastPaymentDate),
        upcomingPayment: formatDateWithSuffix(
          new Date(existingUser.stripeCurrentPeriodEnd as Date),
        ),
        status: "Active",
        actionLink: "#",
        actionText: "Manage Subscription",
        amount: "$100",
        billingCycle: "Yearly",
        billingType: "Subscription",
      };
    }

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

    if (existingUser.trialEndsAt && !existingUser.stripeSubscriptionId) {
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
    <div className="w-full space-y-4">
      <h2 className="text-xl font-semibold text-white">Subscription</h2>

      <div className="">
        <div className="p-6">
          <div className="w-full rounded-xl border bg-[#171616] p-2 md:p-4 lg:p-6">
            <h5 className="transducer-font mb-4 font-semibold uppercase tracking-wider text-white">
              View and manage subscription
            </h5>

            {/* Desktop view - hidden on mobile */}
            <div className="hidden gap-4 rounded-t-md bg-[#50443F] p-4 md:grid md:grid-cols-4">
              <div className="text-sm font-medium text-white">Subscription</div>
              <div className="text-sm font-medium text-white">Last payment</div>
              <div className="text-sm font-medium text-white">
                Upcoming payment
              </div>
              <div className="text-sm font-medium text-white">Status</div>
            </div>

            {/* Desktop Content - hidden on mobile */}
            <div className="hidden items-center gap-4 p-4 md:grid md:grid-cols-4">
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
                      <Button variant="link">View Payment Details</Button>
                    }
                  />
                )}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-white ${
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
                <InfoIcon className="h-5 w-5 text-gray-500" />
              </div>
            </div>

            {/* Mobile view */}
            <div className="space-y-4 p-2 md:hidden">
              <div className="rounded-md bg-[#50443F] p-3">
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

              <div className="rounded-md bg-[#50443F] p-3">
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

              <div className="rounded-md bg-[#50443F] p-3">
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
                      <Button variant="link" className="h-auto p-0">
                        View Payment Details
                      </Button>
                    }
                  />
                )}
              </div>

              <div className="rounded-md bg-[#50443F] p-3">
                <div className="mb-2 text-sm font-medium text-white">
                  Status
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-white ${
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
                  <InfoIcon className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link href={"/pricing"}>
              <GradientButton
                className="w-full rounded-none sm:w-auto"
                size={"lg"}
                asChild
              >
                {subscriptionDetails.actionText}
              </GradientButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
