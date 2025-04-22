import { CheckCircle } from "lucide-react";
import { CardBase } from "./card-base";
import { getTotalExamAttemptedByUser } from "@/prisma/queries";
import AttemptedExamsChart from "./attempted-exams-chart";

interface CompletedExamsCardProps {
  userId: string;
  className?: string;
}

export async function CompletedExamsCard({
  userId,
  className,
}: CompletedExamsCardProps) {
  const totalExamsCompleted = await getTotalExamAttemptedByUser(userId);
  const totalAttemptedExams = totalExamsCompleted.reduce(
    (acc, curr) => acc + curr.count,
    0,
  );

  return (
    <CardBase
      title="COMPLETED EXAMS"
      icon={<CheckCircle className="h-8 w-8" />}
      className={className}
    >
      <h3>{totalAttemptedExams}</h3>
      <div className="mt-4">
        <AttemptedExamsChart
          barChartData={totalExamsCompleted}
          totalAttemptedExams={totalAttemptedExams}
        />
      </div>
      {/* <span className="mt-4 text-2xl font-bold md:text-4xl lg:text-5xl">
        {totalExamsCompleted}
      </span> */}
    </CardBase>
  );
}
