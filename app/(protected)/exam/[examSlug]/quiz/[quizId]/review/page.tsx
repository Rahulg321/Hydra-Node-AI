import db from "@/lib/db";
import React from "react";
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
  // fetch the quiz session
  const currentQuizSession = await db.quizSession.findUnique({
    where: {
      id: quizId,
    },
    include: {
      userAttempts: {
        include: {
          question: true,
        },
      },
    },
  });

  if (!currentQuizSession) {
    console.log("session not found, cant display history");
    return <div>Quiz session not found</div>;
  }

  return <ReviewMcq quiz={currentQuizSession} />;
};

export default ReviewExamPage;
