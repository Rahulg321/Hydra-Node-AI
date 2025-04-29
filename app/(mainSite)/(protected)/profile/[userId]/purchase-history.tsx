import { Button } from "@/components/ui/button";
import { formatDateWithSuffix } from "@/hooks/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import db from "@/hooks/lib/db";
import { Exam, Purchase } from "@prisma/client";
import { GradientButton } from "@/components/buttons/gradient-button";

interface PurchaseHistoryProps {
  purchasedExams: (Purchase & { exam: Exam })[];
}

async function PurchasedExamHistorySection({
  purchasedExams,
}: PurchaseHistoryProps) {
  if (!purchasedExams || purchasedExams.length === 0) {
    return (
      <div className="rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 text-center shadow-lg backdrop-blur transition-shadow hover:shadow-xl dark:bg-dark-card">
        <h2 className="text-lg font-semibold">
          You have not purchased any exams
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          It looks like you haven&apos;t purchased any exams yet. Purchase an
          exam to start practicing.
        </p>
        <GradientButton className="mt-6 w-full sm:w-auto" size="lg" asChild>
          <Link href="/vendors">Purchase an Exam</Link>
        </GradientButton>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
      <div className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Purchased Exam History</h2>

        {/* Mobile View */}
        <div className="space-y-4 md:hidden">
          {purchasedExams.map((exam) => (
            <div
              key={exam.id}
              className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
            >
              <div className="mb-3 space-y-1">
                <h3 className="font-medium">{exam.exam.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDateWithSuffix(new Date(exam.purchaseDate))}
                </p>
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <span className="text-sm font-medium">
                  ${exam.amount.toFixed(2)}
                </span>
                <Link
                  href={`/exam/${exam.exam.slug}`}
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  View Details
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
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
                    Exam Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-sm font-semibold">
                    Purchase Date
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-sm font-semibold">
                    Price
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchasedExams.map((exam) => (
                  <tr
                    key={exam.id}
                    className="border-b last:border-0 hover:bg-muted/50"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {exam.exam.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {formatDateWithSuffix(new Date(exam.purchaseDate))}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      ${exam.amount.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <Link
                        href={`/exam/${exam.exam.slug}`}
                        className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        View Details
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
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

export default PurchasedExamHistorySection;
