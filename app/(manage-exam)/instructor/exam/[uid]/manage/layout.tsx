import ManageCourseHeader from "@/components/headers/manage-course-header";
import ManageExamSidebar from "@/components/sidebars/manage-exam-sidebar";
import db from "@/hooks/lib/db";
import React from "react";

const layout = async (props: {
  children: React.ReactNode;
  params: Promise<{
    uid: string;
  }>;
}) => {
  const params = await props.params;

  const { children } = props;

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
        examId={examId}
      />
      <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
        <ManageExamSidebar examId={examId} />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default layout;
