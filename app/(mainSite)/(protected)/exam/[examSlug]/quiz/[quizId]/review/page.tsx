import db from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";
import ReviewMcq from "./ReviewMcq";

type ReviewExamPageProps = {
  params: {
    examSlug: string;
    quizId: string;
  };
};

const ReviewExamPage = async ({
  params: { examSlug, quizId },
}: ReviewExamPageProps) => {
  // Fetch quiz session first
  const quizSession = await db.quizSession.findUnique({
    where: { id: quizId },
    include: {
      exam: { select: { slug: true, name: true, id: true } },
    },
  });

  if (!quizSession || !quizSession.isCompleted) {
    console.log("Quiz session not found or not completed");
    return redirect(
      `/exam/${quizSession?.exam.slug}/quiz/${quizSession?.id}/results`,
    );
  }

  // Fetch user attempts for the quiz session
  const userAttempts = await db.userAttempt.findMany({
    where: { quizSessionId: quizId },
    include: {
      question: {
        include: {
          options: true,
          correctAnswers: true,
        },
      },
    },
  });

  return <ReviewMcq quizSession={quizSession} userAttempts={userAttempts} />;
};

export default ReviewExamPage;
