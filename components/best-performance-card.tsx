import { Trophy } from "lucide-react";
import { CardBase } from "./card-base";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/lib/utils";
import { getBestOverallQuizSessionPerformance } from "@/prisma/queries";

interface BestPerformanceCardProps {
  userId: string;
  className?: string;
}

export async function BestPerformanceCard({
  userId,
  className,
}: BestPerformanceCardProps) {
  const bestOverallQuizSessionPerformance =
    await getBestOverallQuizSessionPerformance(userId);

  const {
    percentageScored: bestExamScore,
    durationMs,
    exam,
  } = bestOverallQuizSessionPerformance ?? {};

  const duration = formatDuration(durationMs ?? 0);

  return (
    <CardBase
      title="BEST PERFORMANCE"
      icon={<Trophy className="h-5 w-5" />}
      className={className}
    >
      <div className="mt-4 flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-col space-y-1">
          <div className="font-bold text-white">
            {bestExamScore?.toFixed(2)}%
          </div>
          <div className="text-sm text-neutral-400">Score</div>
        </div>

        <div className="flex flex-col space-y-1">
          <div className="font-bold text-white">{duration}</div>
          <div className="text-sm text-neutral-400">Duration</div>
        </div>

        <div className="flex flex-col space-y-1">
          <div className="text-sm text-neutral-400">Vendor</div>
          <div className="font-bold text-white">{exam?.vendor.name}</div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-sm text-neutral-400">Certificate</div>
          <div className="font-bold text-white">{exam?.name}</div>
        </div>
      </div>
    </CardBase>
  );
}
