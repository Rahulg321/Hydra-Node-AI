import { CheckCircle } from "lucide-react";
import { CardBase } from "./card-base";

interface CompletedExamsCardProps {
  count: number;
  className?: string;
}

export function CompletedExamsCard({
  count,
  className,
}: CompletedExamsCardProps) {
  return (
    <CardBase
      title="COMPLETED EXAMS"
      icon={<CheckCircle className="h-8 w-8" />}
      className={className}
    >
      <span className="mt-4 text-2xl font-bold md:text-4xl lg:text-5xl">
        {count}
      </span>
    </CardBase>
  );
}
