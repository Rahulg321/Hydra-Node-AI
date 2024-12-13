import db from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";
import ReviewMcq from "./ReviewMcq";
import { getExamWithSlug } from "@/data/exam";

type ReviewExamPageProps = {
  params: Promise<{
    examSlug: string;
    quizId: string;
  }>;
};

export async function generateMetadata(
  props: {
    params: Promise<{ examSlug: string; quizId: string }>;
  }
) {
  const params = await props.params;
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

const ReviewExamPage = async (props: ReviewExamPageProps) => {
  const params = await props.params;

  const {
    examSlug,
    quizId
  } = params;

  // Fetch quiz session first
  const quizSession = await db.quizSession.findUnique({
    where: { id: quizId },
    include: {
      exam: {
        include: { questions: true },
      },
      userAttempts: true,
    },
  });

  console.log("quizSession", quizSession);

  if (!quizSession || !quizSession.isCompleted) {
    console.log("Quiz session not found or not completed");
    return redirect(
      `/exam/${quizSession?.exam.slug}/quiz/${quizSession?.id}/results`,
    );
  }

  let userAttempts = quizSession.userAttempts;
  const exam = quizSession.exam;
  const questions = exam.questions;
  let questionsLimit = quizSession.questionCount;

  const sliceQuestions = questions.slice(0, questionsLimit);

  return (
    <section className="min-h-screen">
      <ReviewMcq
        quizSession={quizSession}
        userAttempts={userAttempts}
        examName={quizSession.exam.name}
        examSlug={examSlug}
        questions={sliceQuestions}
      />
    </section>
  );
};

export default ReviewExamPage;
