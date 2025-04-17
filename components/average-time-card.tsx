import { Clock } from "lucide-react";
import { CardBase } from "./card-base";
import { formatDuration } from "@/lib/utils";
import { getAverageTimeTaken } from "@/prisma/queries";
interface AverageTimeCardProps {
  userId: string;
  className?: string;
}

export async function AverageTimeCard({
  userId,
  className,
}: AverageTimeCardProps) {
  const averageTime = await getAverageTimeTaken(userId);
  const averageTimeFormatted = formatDuration(averageTime);

  return (
    <CardBase
      title="AVERAGE TIME"
      icon={<Clock className="h-5 w-5" />}
      className={className}
    >
      <div className="mt-4 text-2xl font-bold md:text-4xl lg:text-5xl">
        {averageTimeFormatted}
      </div>
    </CardBase>
  );
}
