import { Trophy } from "lucide-react";
import { CardBase } from "./card-base";
import { cn } from "@/lib/utils";

interface BestPerformanceCardProps {
  score: number;
  durationHours: number;
  durationMinutes: number;
  vendor: string;
  certificate: string;
  className?: string;
}

export function BestPerformanceCard({
  score,
  durationHours,
  durationMinutes,
  vendor,
  certificate,
  className,
}: BestPerformanceCardProps) {
  return (
    <CardBase
      title="BEST PERFORMANCE"
      icon={<Trophy className="h-5 w-5" />}
      className={className}
    >
      <div
        className={cn(
          "mt-4 flex flex-col items-start justify-between md:flex-row md:items-center",
          className,
        )}
      >
        <div className="flex items-baseline gap-3">
          <div className="text-xl font-bold text-white md:text-2xl">
            {score}%
          </div>
          <div className="text-neutral-400">Score</div>
        </div>

        <div className="mt-4 flex items-baseline gap-3 md:mt-0">
          <div className="text-xl font-bold text-white md:text-2xl">
            {durationHours}h {durationMinutes}m
          </div>
          <div className="text-neutral-400">Duration</div>
        </div>

        <div className="mt-6 md:mt-0">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            <div className="text-neutral-400">Vendor</div>
            <div className="text-neutral-400">Certificate</div>
            <div className="text-xl font-bold">{vendor}</div>
            <div className="text-xl font-bold">{certificate}</div>
          </div>
        </div>
      </div>
    </CardBase>
  );
}
