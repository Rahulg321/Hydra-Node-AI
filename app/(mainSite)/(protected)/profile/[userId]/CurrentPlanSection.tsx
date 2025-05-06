import { formatDateWithSuffix } from "@/hooks/lib/utils";
import type { User, Payment } from "@prisma/client";
import Link from "next/link";
import { PaymentDetailsDialog } from "@/components/Dialogs/payment-details-dialog"; // Ensure this component handles its 'trigger' prop correctly with asChild
import { Button } from "@/components/ui/button";
import CancelSubscriptionDialog from "@/components/Dialogs/cancel-subscription-dialog"; // Ensure this component's internal trigger is correctly set up

type SubscriptionDisplayDetails = {
  planName: string;
  planType: string;
  lastPayment: string;
  upcomingPayment: string;
  status: "Active" | "Cancelled" | "Expired" | "Inactive" | "Trial";
  actionLink: string;
  actionText: string;
  amount: string;
  billingCycle: string;
  billingType: "One time" | "Subscription" | "None";
};

export default function CurrentPlanSection({
  existingUser,
}: {
  existingUser: User & {
    Payment?: Payment[];
  };
}) {
  const currentDate = new Date();

  const findLatestSubscriptionPayment = (): Payment | undefined => {
    if (!existingUser.Payment || !existingUser.stripeSubscriptionId) {
      return undefined;
    }
    return existingUser.Payment.filter(
      (payment) =>
        payment.paymentType === "SUBSCRIPTION" &&
        payment.status === "SUCCEEDED" &&
        payment.stripeSubscriptionId === existingUser.stripeSubscriptionId,
    ).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];
  };

  const findLifetimePayment = (): Payment | undefined => {
    return existingUser.Payment?.find(
      (payment) =>
        payment.paymentType === "ONE_TIME" &&
        payment.status === "SUCCEEDED" &&
        payment.userId === existingUser.id,
    );
  };

  const getSubscriptionDetails = (): SubscriptionDisplayDetails => {
    if (existingUser.hasLifetimeAccess) {
      const lifetimePayment = findLifetimePayment();
      const paymentDate = lifetimePayment?.createdAt
        ? new Date(lifetimePayment.createdAt)
        : null;
      return {
        planName: "Lifetime Plan",
        planType: "Unlimited",
        lastPayment: paymentDate ? formatDateWithSuffix(paymentDate) : "N/A",
        upcomingPayment: "N/A",
        status: "Active",
        actionLink: "#",
        actionText: "Learn More",
        amount: lifetimePayment ? `$${lifetimePayment.amount}` : "$200",
        billingCycle: "Lifetime",
        billingType: "One time",
      };
    }

    const lastSubscriptionPayment = findLatestSubscriptionPayment();
    const lastSubscriptionPaymentDate = lastSubscriptionPayment?.createdAt
      ? new Date(lastSubscriptionPayment.createdAt)
      : null;
    const periodEndDate = existingUser.stripeCurrentPeriodEnd
      ? new Date(existingUser.stripeCurrentPeriodEnd)
      : null;

    const getPlanInfoFromPriceId = (priceId: string | null) => {
      const MONTHLY_PRICE_ID =
        process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID ||
        "YOUR_PLUS_MONTHLY_PRICE_ID_PLACEHOLDER";
      const YEARLY_PRICE_ID =
        process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID ||
        "YOUR_PLUS_YEARLY_PRICE_ID_PLACEHOLDER";

      if (priceId === MONTHLY_PRICE_ID)
        return { name: "Plus Plan (Monthly)", cycle: "Monthly" };
      if (priceId === YEARLY_PRICE_ID)
        return { name: "Plus Plan (Yearly)", cycle: "Yearly" };
      if (priceId) {
        console.warn(`Unknown active subscription price ID: ${priceId}`); // Kept for debugging if needed
        return { name: "Plus Plan", cycle: "Subscription" };
      }
      return { name: "Subscription Plan", cycle: "Subscription" };
    };

    if (
      existingUser.hasActiveSubscription &&
      existingUser.stripeSubscriptionId &&
      periodEndDate &&
      periodEndDate > currentDate
    ) {
      const { name, cycle } = getPlanInfoFromPriceId(
        existingUser.stripePriceId,
      );
      return {
        planName: name,
        planType: "Subscription",
        lastPayment: lastSubscriptionPaymentDate
          ? formatDateWithSuffix(lastSubscriptionPaymentDate)
          : "N/A",
        upcomingPayment: formatDateWithSuffix(periodEndDate), // periodEndDate is non-null here
        status: "Active",
        actionLink:
          process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL ||
          "/api/stripe-portal",
        actionText: "Manage Subscription",
        amount: lastSubscriptionPayment
          ? `$${lastSubscriptionPayment.amount}`
          : "N/A",
        billingCycle: cycle,
        billingType: "Subscription",
      };
    }

    if (
      !existingUser.hasActiveSubscription &&
      existingUser.stripeSubscriptionId &&
      periodEndDate &&
      periodEndDate > currentDate
    ) {
      const { name } = getPlanInfoFromPriceId(existingUser.stripePriceId);
      return {
        planName: `Cancelled ${name}`,
        planType: "Subscription",
        lastPayment: lastSubscriptionPaymentDate
          ? formatDateWithSuffix(lastSubscriptionPaymentDate)
          : "N/A",
        upcomingPayment: `Access ends ${formatDateWithSuffix(periodEndDate)}`, // periodEndDate is non-null here
        status: "Cancelled",
        actionLink: "/pricing",
        actionText: "Resubscribe",
        amount: lastSubscriptionPayment
          ? `$${lastSubscriptionPayment.amount}`
          : "N/A",
        billingCycle: getPlanInfoFromPriceId(existingUser.stripePriceId).cycle, // retain original cycle if known
        billingType: "Subscription",
      };
    }

    if (
      existingUser.stripeSubscriptionId &&
      periodEndDate &&
      periodEndDate <= currentDate
    ) {
      const { name } = getPlanInfoFromPriceId(existingUser.stripePriceId);
      return {
        planName: `Expired ${name}`,
        planType: "Subscription",
        lastPayment: lastSubscriptionPaymentDate
          ? formatDateWithSuffix(lastSubscriptionPaymentDate)
          : "N/A",
        upcomingPayment: "N/A",
        status: "Expired",
        actionLink: "/pricing",
        actionText: "Renew Plan",
        amount: lastSubscriptionPayment
          ? `$${lastSubscriptionPayment.amount}`
          : "N/A",
        billingCycle: getPlanInfoFromPriceId(existingUser.stripePriceId).cycle, // retain original cycle if known
        billingType: "Subscription",
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

          {/* Desktop view */}
          <div className="hidden gap-4 rounded-t-md bg-[#50443F] p-4 md:grid md:grid-cols-5">
            {/* Headers */}
            <div className="text-center text-sm font-medium text-white">
              Subscription
            </div>
            <div className="text-center text-sm font-medium text-white">
              Last payment
            </div>
            <div className="text-center text-sm font-medium text-white">
              {subscriptionDetails.status === "Cancelled"
                ? "Access Ends"
                : "Upcoming payment"}
            </div>
            <div className="text-center text-sm font-medium text-white">
              Status
            </div>
            <div className="text-center text-sm font-medium text-white">
              Manage
            </div>
          </div>
          <div className="hidden min-h-[80px] items-center gap-4 p-4 md:grid md:grid-cols-5">
            {/* Content Rows */}
            <div className="text-center">
              <div className="font-medium text-white">
                {subscriptionDetails.planName}
              </div>
              <div className="text-sm text-gray-400">
                {subscriptionDetails.planType}
              </div>
            </div>
            <div className="text-center">
              <div className="text-white">
                {subscriptionDetails.lastPayment}
              </div>
              {lastPaymentRecord?.stripeInvoiceId && (
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
            <div className="text-center">
              <div className="text-white">
                {subscriptionDetails.upcomingPayment}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
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
            </div>
            <div className="flex flex-col items-center gap-1">
              {subscriptionDetails.status === "Active" &&
                subscriptionDetails.billingType === "Subscription" &&
                existingUser.stripeSubscriptionId && (
                  <CancelSubscriptionDialog userId={existingUser.id} />
                )}
              {(subscriptionDetails.status === "Expired" ||
                subscriptionDetails.status === "Cancelled" ||
                subscriptionDetails.status === "Inactive") && (
                <Button variant="link" size="sm" asChild className="h-auto p-0">
                  <Link href={subscriptionDetails.actionLink}>
                    {subscriptionDetails.actionText}
                  </Link>
                </Button>
              )}
              {subscriptionDetails.status === "Active" &&
                subscriptionDetails.billingType === "Subscription" &&
                existingUser.stripeCustomerId && (
                  <Button
                    variant="link"
                    size="sm"
                    asChild
                    className="h-auto p-0"
                  >
                    <Link href="/api/stripe-portal">Manage Billing</Link>
                  </Button>
                )}
            </div>
          </div>

          {/* Mobile view */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {[
              {
                label: "Subscription",
                content: (
                  <div className="text-center">
                    <div className="font-medium text-white">
                      {subscriptionDetails.planName}
                    </div>
                    <div className="text-sm text-gray-400">
                      {subscriptionDetails.planType}
                    </div>
                  </div>
                ),
              },
              {
                label: "Last payment",
                content: (
                  <div className="text-center">
                    <div className="text-white">
                      {subscriptionDetails.lastPayment}
                    </div>
                    {lastPaymentRecord?.stripeInvoiceId && (
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
                ),
              },
              {
                label:
                  subscriptionDetails.status === "Cancelled"
                    ? "Access Ends"
                    : "Upcoming payment",
                content: (
                  <div className="text-center">
                    <div className="text-white">
                      {subscriptionDetails.upcomingPayment}
                    </div>
                  </div>
                ),
              },
              {
                label: "Status",
                content: (
                  <div className="flex justify-center">
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
                  </div>
                ),
              },
              {
                label: "Manage",
                content: (
                  <div className="flex flex-col items-center gap-1">
                    {subscriptionDetails.status === "Active" &&
                      subscriptionDetails.billingType === "Subscription" &&
                      existingUser.stripeSubscriptionId && (
                        <CancelSubscriptionDialog userId={existingUser.id} />
                      )}
                    {(subscriptionDetails.status === "Expired" ||
                      subscriptionDetails.status === "Cancelled" ||
                      subscriptionDetails.status === "Inactive") && (
                      <Button
                        variant="link"
                        size="sm"
                        asChild
                        className="h-auto p-0"
                      >
                        <Link href={subscriptionDetails.actionLink}>
                          {subscriptionDetails.actionText}
                        </Link>
                      </Button>
                    )}
                    {subscriptionDetails.status === "Active" &&
                      subscriptionDetails.billingType === "Subscription" &&
                      existingUser.stripeCustomerId && (
                        <Button
                          variant="link"
                          size="sm"
                          asChild
                          className="h-auto p-0"
                        >
                          <Link href="/api/stripe-portal">Manage Billing</Link>
                        </Button>
                      )}
                  </div>
                ),
              },
            ].map((item) => (
              <div key={item.label} className="rounded-md bg-[#50443F] p-4">
                <div className="mb-2 text-center text-sm font-medium text-white">
                  {item.label}
                </div>
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
