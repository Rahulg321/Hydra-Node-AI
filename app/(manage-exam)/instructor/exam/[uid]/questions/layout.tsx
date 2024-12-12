import { QuestionsHeader } from "@/components/headers/questions-header";
import ManageQuestionsSidebar from "@/components/sidebars/manage-questions-sidebar";
import db from "@/lib/db";
import React from "react";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    uid: string;
  };
}) => {
  const examId = params.uid;

  const currentExam = await db.exam.findUnique({
    where: {
      id: examId,
    },
    select: {
      name: true,
    },
  });

  // Fetch all questions related to the instructor exam
  const examQuestions = await db.question.findMany({
    where: {
      examId: examId,
    },
  });

  if (!currentExam) {
    return (
      <div>
        <h2>Could not find Exam</h2>
        <p>Something went wrong</p>
      </div>
    );
  }

  const examName = currentExam.name;
  const questionsLength = examQuestions.length;

  return (
    <div>
      <QuestionsHeader
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
