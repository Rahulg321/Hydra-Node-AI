import { Clock } from "lucide-react";
import { CardBase } from "./card-base";

interface AverageTimeCardProps {
  hours: number;
  minutes: number;
  className?: string;
}

export function AverageTimeCard({
  hours,
  minutes,
  className,
}: AverageTimeCardProps) {
  return (
    <CardBase
      title="AVERAGE TIME"
      icon={<Clock className="h-5 w-5" />}
      className={className}
    >
      <div className="mt-4 text-2xl font-bold md:text-4xl lg:text-5xl">
        {hours}h {minutes}m
      </div>
    </CardBase>
  );
}
