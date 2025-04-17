import { CheckCircle } from "lucide-react";
import { CardBase } from "./card-base";
import { getTotalExamCompletedByUser } from "@/prisma/queries";

interface CompletedExamsCardProps {
  userId: string;
  className?: string;
}

export async function CompletedExamsCard({
  userId,
  className,
}: CompletedExamsCardProps) {
  const totalExamsCompleted = await getTotalExamCompletedByUser(userId);

  return (
    <CardBase
      title="COMPLETED EXAMS"
      icon={<CheckCircle className="h-8 w-8" />}
      className={className}
    >
      <span className="mt-4 text-2xl font-bold md:text-4xl lg:text-5xl">
        {totalExamsCompleted}
      </span>
    </CardBase>
  );
}
