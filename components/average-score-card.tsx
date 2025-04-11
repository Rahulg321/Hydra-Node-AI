import { Flag } from "lucide-react";
import { CardBase } from "@/components/card-base";

interface AverageScoreCardProps {
  score: number;
  className?: string;
}

export function AverageScoreCard({ score, className }: AverageScoreCardProps) {
  return (
    <CardBase
      title="AVERAGE SCORE"
      icon={<Flag className="h-5 w-5" />}
      className={className}
    >
      <div className="text-2xl font-bold md:text-4xl lg:text-5xl">{score}%</div>
    </CardBase>
  );
}
