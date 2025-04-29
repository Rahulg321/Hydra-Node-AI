import { QuestionsHeader } from "@/components/headers/questions-header";
import ManageQuestionsSidebar from "@/components/sidebars/manage-questions-sidebar";
import db from "@/hooks/lib/db";
import { redirect } from "next/navigation";
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

  const currentExam = await db.exam.findUnique({
    where: {
      id: examId,
    },
    select: {
      name: true,
    },
  });

  if (!currentExam) {
    redirect("/instructor");
  }
  // Fetch all questions related to the instructor exam
  const examQuestions = await db.question.findMany({
    where: {
      examId: examId,
    },
  });

  const examName = currentExam.name;
  const questionsLength = examQuestions.length;

  return (
    <div>
      <QuestionsHeader
        examId={examId}
        examName={examName}
        questionCount={questionsLength}
        backLink="/instructor/exams"
      />
      <div className="grid min-h-screen md:grid-cols-[350px_1fr]">
        <ManageQuestionsSidebar examId={examId} examQuestions={examQuestions} />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default layout;
