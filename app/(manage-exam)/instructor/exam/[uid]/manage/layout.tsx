import ManageCourseHeader from "@/components/headers/manage-course-header";
import ManageExamSidebar from "@/components/sidebars/manage-exam-sidebar";
import db from "@/lib/db";
import React from "react";

const layout = async ({
  params,
  children,
}: {
  children: React.ReactNode;
  params: {
    uid: string;
  };
}) => {
  const examId = params.uid;

  const fetchedExam = await db.exam.findUnique({
    where: {
      id: examId,
    },
    select: {
      name: true,
    },
  });

  if (!fetchedExam) {
    return (
      <div>
        <h2>Could not find Exam</h2>
        <p>Something went wrong</p>
      </div>
    );
  }

  const examName = fetchedExam?.name;

  return (
    <div className="">
      <ManageCourseHeader
        title={examName}
        isDraft={true}
        backLink={`/instructor/exams`}
      />
      <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
        <ManageExamSidebar examId={examId} />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default layout;
