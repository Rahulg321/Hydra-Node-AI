import { CheckCircle } from "lucide-react";
import React from "react";
import { GradientButton } from "../buttons/gradient-button";
import Link from "next/link";

const ExamEndedScreen = ({
  examName,
  questionsLength,
  examId,
  quizSessionId,
}: {
  examName: string;
  questionsLength: number;
  examId: string;
  quizSessionId: string;
}) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 py-10">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
          <CheckCircle className="h-14 w-14" />
        </div>
        <h2 className="mb-2 font-bold">Your {examName} Exam has Ended</h2>
        <p className="mb-2 max-w-md text-muted-foreground">
          Congratulations on completing your exam! Your answers have been
          submitted successfully.
        </p>
        <div className="mt-2 grid grid-cols-2 gap-4 text-center">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Total Questions</p>
            <p className="text-2xl font-bold">{questionsLength}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <GradientButton className="" asChild>
          <Link href={`/exam/${examId}/quiz/${quizSessionId}/results`}>
            View Your Score
          </Link>
        </GradientButton>
        <GradientButton className="" asChild>
          <Link href={`/exam/${examId}`}>Back to Exam Details</Link>
        </GradientButton>
      </div>
    </div>
  );
};

export default ExamEndedScreen;
