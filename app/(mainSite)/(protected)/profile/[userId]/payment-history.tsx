import { formatDateWithSuffix } from "@/hooks/lib/utils";
import { Session } from "next-auth";
import { CheckCircle2, XCircle } from "lucide-react";
import db from "@/hooks/lib/db";
import { Payment } from "@prisma/client";

async function PaymentHistorySection({
  paymentHistory,
}: {
  paymentHistory: Payment[];
}) {
  if (!paymentHistory || paymentHistory.length === 0) {
    return (
      <div className="rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 text-center shadow-lg backdrop-blur transition-shadow hover:shadow-xl dark:bg-dark-card">
        <h2 className="text-lg font-semibold">No Payment History Found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          It looks like you haven&apos;t made any payments yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 shadow-lg backdrop-blur transition-shadow hover:shadow-xl dark:bg-dark-card">
      <div className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Payment History</h2>

        {/* Mobile View */}
        <div className="space-y-4 md:hidden">
          {paymentHistory.map((payment) => (
            <div
              key={payment.id}
              className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {formatDateWithSuffix(new Date(payment.createdAt))}
                </span>
                <div className="flex items-center gap-1">
                  {payment.status === "SUCCEEDED" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      payment.status === "SUCCEEDED"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between border-b py-2">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">
                    ${payment.amount.toFixed(2)}{" "}
                    {payment.currency.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Payment Type</span>
                  <span className="font-medium">
                    {payment.paymentType.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b text-left">
                  <th className="whitespace-nowrap px-4 py-2 text-sm font-semibold">
                    Date
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-sm font-semibold">
                    Amount
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-sm font-semibold">
                    Currency
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-sm font-semibold">
                    Payment Type
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b last:border-0 hover:bg-muted/50"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {formatDateWithSuffix(new Date(payment.createdAt))}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {payment.currency.toUpperCase()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {payment.paymentType.replace("_", " ")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      <div className="flex items-center gap-1">
                        {payment.status === "SUCCEEDED" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={`${
                            payment.status === "SUCCEEDED"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentHistorySection;
