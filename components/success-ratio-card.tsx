import { PieChart } from "lucide-react";
import { CardBase } from "./card-base";
import { Book } from "lucide-react";
import { getTotalPassedExams } from "@/prisma/queries";
import { getTotalExamCompletedByUser } from "@/prisma/queries";

interface SuccessRatioCardProps {
  userId: string;
  className?: string;
}

export async function SuccessRatioCard({
  userId,
  className,
}: SuccessRatioCardProps) {
  const [totalPassedExams, totalExamsCompleted] = await Promise.all([
    getTotalPassedExams(userId),
    getTotalExamCompletedByUser(userId),
  ]);

  const totalFailedExams = totalExamsCompleted - totalPassedExams;
  const total = totalPassedExams + totalFailedExams;
  const passedPercentage = (totalPassedExams / total) * 100;
  const failedPercentage = (totalFailedExams / total) * 100;

  // Calculate the SVG path for the pie chart
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  // Calculate the stroke-dasharray and stroke-dashoffset for the passed segment
  const passedDashArray = (passedPercentage / 100) * circumference;
  const passedDashOffset = 0;

  // Calculate the stroke-dasharray and stroke-dashoffset for the failed segment
  const failedDashArray = (failedPercentage / 100) * circumference;
  const failedDashOffset = passedDashArray;

  return (
    <CardBase
      title="SUCCESS RATIO"
      icon={<PieChart className="h-5 w-5" />}
      className={className}
    >
      <div className="mt-4 flex items-center justify-between">
        <div className="space-y-4">
          <div>
            <div className="text-green-500">Passed exam</div>
            <div className="text-2xl font-bold text-green-500">
              {totalPassedExams}
            </div>
          </div>
          <div>
            <div className="text-red-600">Failed exam</div>
            <div className="text-2xl font-bold text-red-600">
              {totalFailedExams}
            </div>
          </div>
        </div>

        <div className="relative h-36 w-36">
          {/* SVG Pie Chart */}
          <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
            {/* Green segment (passed) */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke="#22c55e"
              strokeWidth="40"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - passedDashArray}
            />

            {/* Red segment (failed) */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke="#dc2626"
              strokeWidth="40"
              strokeDasharray={failedDashArray}
              strokeDashoffset={-passedDashArray}
            />
          </svg>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black p-3">
              <Book className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </CardBase>
  );
}
