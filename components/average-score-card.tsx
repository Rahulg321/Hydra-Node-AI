import { Flag } from "lucide-react";
import { CardBase } from "@/components/card-base";
import { getTotalAverageScore } from "@/prisma/queries";

interface AverageScoreCardProps {
  userId: string;
  className?: string;
}

export async function AverageScoreCard({
  userId,
  className,
}: AverageScoreCardProps) {
  const score = await getTotalAverageScore(userId);
  return (
    <CardBase
      title="AVERAGE SCORE"
      icon={<Flag className="h-5 w-5" />}
      className={className}
    >
      <div className="text-2xl font-bold md:text-4xl lg:text-5xl">
        {score.toFixed(2)}%
      </div>
    </CardBase>
  );
}
