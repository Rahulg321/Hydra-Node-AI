import db from "@/lib/db";
import { cn } from "@/lib/utils";
import React from "react";

const layout = async ({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams?: {
    examLevel?: string;
    examType?: string;
  };
}) => {
  const AllExamsType = await db.examType.findMany();
  const searchParamExamLevel = searchParams?.examLevel || "associate-level";
  const searchParamExamType = searchParams?.examType || "googlenet";

  return (
    <div className="pt-24">
      <div className="grid min-h-screen grid-cols-[220px_1fr]">
        <div className="space-y-4 border-r-2 p-4">
          {AllExamsType.map((examType) => (
            <ExamTypeButton key={examType.id} examType={examType} />
          ))}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default layout;

function ExamTypeButton({
  examType,
}: {
  examType: {
    id: string;
    name: string;
    slug: string;
  };
}) {
  return (
    <div
      className={cn(
        "rounded-md border-l-4 border-base bg-[#F5F8FE] px-4 py-2 text-muted-foreground",
      )}
    >
      {examType.name}
    </div>
  );
}
