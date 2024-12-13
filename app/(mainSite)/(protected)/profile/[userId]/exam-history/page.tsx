import db from "@/lib/db";
import { formatDateWithSuffix } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";
import ExamHistoryTable from "../ExamHistoryTable";

export const metadata: Metadata = {
  title: "Complete Exam History",
  description: "View your complete exam history. Filter and sort exams.",
};

const CompleteExamHistoryPage = async (
  props: {
    params: Promise<{
      userId: string;
    }>;
  }
) => {
  const params = await props.params;
  const userId = params.userId;

  const userQuizSessions = await db.quizSession.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      exam: {
        include: {
          questions: true,
        },
      },
    },
  });

  if (!userQuizSessions) {
    console.log("could not find a quiz session, user has not taken an exam");
  }

  let examData = userQuizSessions.map((e) => {
    const formattedDate = formatDateWithSuffix(new Date(e.createdAt));

    return {
      id: e.id,
      examName: e.exam.name,
      date: formattedDate,
      examMode: e.examMode,
      totalQuestions: e.exam.questions.length,
      difficultyLevel: e.exam.examLevel,
      link: `/exam/${e.id}/quiz/${e.id}/results`,
    };
  });
  return (
    <section className="block-space big-container">
      <div>
        <h1 className="mb-4">Complete Exam History</h1>
        <ExamHistoryTable examHistoryData={examData} />
      </div>
    </section>
  );
};

export default CompleteExamHistoryPage;
