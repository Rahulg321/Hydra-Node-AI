import db from "@/lib/db";
import React from "react";
import { redirect } from "next/navigation";
import ReviewMcq from "./ReviewMcq";
import { getExamWithSlug } from "@/data/exam";

type ReviewExamPageProps = {
  params: Promise<{
    examId: string;
    quizId: string;
  }>;
};

export async function generateMetadata(props: {
  params: Promise<{ examId: string; quizId: string }>;
}) {
  const params = await props.params;

  console.log("first log", params);

  let post = await db.exam.findUnique({
    where: {
      id: params.examId,
    },
    select: {
      name: true,
      description: true,
    },
  });

  if (!post) {
    return {
      title: "Review Exam",
      description: "Review your exam",
    };
  }

  return {
    title: `Review ${post.name}`,
    description: `Review of your exam:- ${post.description}`,
  };
}

const ReviewExamPage = async (props: ReviewExamPageProps) => {
  const params = await props.params;

  const { examId, quizId } = params;

  // Fetch quiz session first
  const quizSession = await db.quizSession.findUnique({
    where: { id: quizId },
    select: {
      id: true,
      examTime: true,
      questionCount: true,
      startTime: true,
      endTime: true,
      correctAnswers: true,
      incorrectAnswers: true,
      skippedAnswers: true,
      percentageScored: true,
      passFailStatus: true,
      isCompleted: true,
      exam: {
        select: {
          slug: true,
          name: true,
        },
      },
      userAttempts: {
        select: {
          skipped: true,
          isCorrect: true,
          userAnswer: true,
          question: true,
          order: true,
        },
      },
    },
  });

  //   console.log("quizSession", quizSession);

  if (!quizSession || !quizSession.isCompleted) {
    console.log("Quiz session not found or not completed");
    return redirect(
      `/exam/${quizSession?.exam.slug}/quiz/${quizSession?.id}/results`,
    );
  }

  let userAttempts = quizSession.userAttempts.sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  const exam = quizSession.exam;
  const questions = userAttempts.map((attempt) => attempt.question);
  let questionsLimit = quizSession.questionCount;

  const sliceQuestions = questions.slice(0, questionsLimit);

  console.log("user attempts in review page", userAttempts);

  return (
    <section className="min-h-screen">
      <ReviewMcq
        quizSessionId={quizSession.id}
        userAttempts={userAttempts.map((attempt) => ({
          skipped: attempt.skipped ?? false,
          isCorrect: attempt.isCorrect ?? false,
          userAnswer: attempt.userAnswer ?? "",
        }))}
        examId={examId}
        questions={userAttempts.map((attempt) => attempt.question)}
      />
    </section>
  );
};

export default ReviewExamPage;
