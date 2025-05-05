import { PieChart, Book } from "lucide-react";
import { CardBase } from "./card-base";
import {
  getTotalPassedExams,
  getTotalExamsCompletedByUser,
} from "@/prisma/queries";

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
    getTotalExamsCompletedByUser(userId),
  ]);

  const totalFailedExams = totalExamsCompleted - totalPassedExams;
  const total = totalExamsCompleted; // Use total completed exams

  // Handle division by zero if no exams are completed
  const hasExams = total > 0;
  const passedPercentage = hasExams ? (totalPassedExams / total) * 100 : 0;
  // Calculate failed percentage based on passed percentage to avoid floating point issues summing to != 100
  const failedPercentage = hasExams ? 100 - passedPercentage : 0;

  // SVG Pie Chart constants
  const radius = 80; // Radius of the circle path
  const strokeWidth = 30; // Reduced stroke width for better visual separation
  const viewBoxSize = radius * 2 + strokeWidth; // Adjust viewBox to fit stroke
  const center = viewBoxSize / 2; // Center coordinates
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke dash values based on percentages
  const passedDashValue = (passedPercentage / 100) * circumference;

  // Define colors
  const greenStroke = "#22c55e"; // Tailwind green-500
  const redStroke = "#dc2626"; // Tailwind red-600
  const defaultStroke = "#404040"; // Neutral gray for no data state

  // Handle edge case where floating point math might make 100% slightly less
  const isEffectively100PercentPassed = hasExams && passedPercentage > 99.9;
  const isEffectively0PercentPassed = hasExams && passedPercentage < 0.1;

  return (
    <CardBase
      title="SUCCESS RATIO"
      icon={<PieChart className="h-5 w-5" />}
      className={className}
    >
      {/* Responsive layout: Column on small screens, Row on medium+ */}
      <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Text Info Section */}
        <div className="flex w-full justify-around gap-4 sm:w-auto sm:flex-col sm:justify-start sm:space-y-4">
          <div>
            <div className="text-sm text-green-500 sm:text-base">
              Passed exam
            </div>
            <div className="text-xl font-bold text-green-500 sm:text-2xl">
              {totalPassedExams}
            </div>
          </div>
          <div>
            <div className="text-sm text-red-600 sm:text-base">Failed exam</div>
            <div className="text-xl font-bold text-red-600 sm:text-2xl">
              {totalFailedExams}
            </div>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="relative h-32 w-32 flex-shrink-0 sm:h-36 sm:w-36">
          <svg
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            className="h-full w-full -rotate-90" // Rotate to start from the top
            aria-label={`Success ratio: ${passedPercentage.toFixed(0)}% passed, ${failedPercentage.toFixed(0)}% failed.`}
            role="img"
          >
            {/* Background Circle: Shows red if any exams failed, or gray if no exams */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={
                hasExams
                  ? isEffectively100PercentPassed
                    ? greenStroke // Show green background if 100% passed
                    : redStroke // Show red background otherwise (covers failed portion)
                  : defaultStroke // Show gray if no exams
              }
              strokeWidth={strokeWidth}
            />

            {/* Passed Segment (Green): Drawn on top of the background */}
            {/* Only draw the green segment if there are exams and passed % is > 0 and < 100% */}
            {hasExams &&
              !isEffectively0PercentPassed &&
              !isEffectively100PercentPassed && (
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={greenStroke}
                  strokeWidth={strokeWidth}
                  // Draw a stroke of passedDashValue length
                  strokeDasharray={`${passedDashValue} ${circumference}`}
                  // Use "butt" for sharp edges between segments
                  strokeLinecap="butt"
                />
              )}
          </svg>

          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Adjusted padding/size for responsiveness */}
            <div className="rounded-full bg-black p-2 sm:p-3">
              <Book className="h-6 w-6 text-orange-500 sm:h-8 sm:w-8" />
            </div>
          </div>
        </div>
      </div>
    </CardBase>
  );
}
