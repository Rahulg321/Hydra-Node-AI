import db from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";
import ReviewMcq from "./ReviewMcq";
import { getExamWithSlug } from "@/data/exam";

type ReviewExamPageProps = {
  params: {
    examSlug: string;
    quizId: string;
  };
};

export async function generateMetadata({
  params,
}: {
  params: { examSlug: string; quizId: string };
}) {
  let slug = params.examSlug;

  let post = await db.exam.findFirst({
    where: {
      slug,
    },
    select: {
      name: true,
      description: true,
    },
  });

  return {
    title: `Review ${post!.name}`,
    description: `Review of your exam:- ${post!.description}`,
  };
}

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
      question: true,
    },
  });

  return (
    <div className="min-h-screen">
      <ReviewMcq
        quizSession={quizSession}
        userAttempts={userAttempts}
        examName={quizSession.exam.name}
        examSlug={examSlug}
      />
    </div>
  );
};

export default ReviewExamPage;
