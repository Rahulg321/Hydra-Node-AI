import PrimaryButton from "@/components/ComponentButtons/PrimaryButton";
import db from "@/lib/db";
import React from "react";

const ExamsPage = async ({
  searchParams,
}: {
  searchParams?: {
    examLevel?: string;
    examType?: string;
  };
}) => {
  const examLevel = searchParams?.examLevel || "associate";
  const examType = searchParams?.examType || "googlenet";

  // const exams = await db.exam.findMany({
  //   where: {
  //     examLevel: {
  //       slug: examLevel,
  //     },
  //     examType: {
  //       slug: examType,
  //     },
  //   },
  // });

  return (
    <div>
      <p>Exam Level: {examLevel}</p>
      <p>Exam Type: {examType}</p>
    </div>
  );
};

export default ExamsPage;
