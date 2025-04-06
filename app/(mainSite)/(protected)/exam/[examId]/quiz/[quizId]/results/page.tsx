import React from "react";
import ResultsChart from "./ResultsChart";
import { Check, CircleOff, Timer, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientButton } from "@/components/buttons/gradient-button";

type props = {
  params: Promise<{
    examId: string;
    quizId: string;
  }>;
};

export const metadata: Metadata = {
  title: "Quiz Results",
  description: "View the results of your quiz session",
};

const QuizResultsPage = async (props: props) => {
  const params = await props.params;
  const currentQuizSession = await db.quizSession.findUnique({
    where: { id: params.quizId },
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
      exam: {
        select: {
          slug: true,
          name: true,
        },
      },
    },
  });

  if (!currentQuizSession) {
    console.log("the quiz session doesnt exist");
    return notFound();
  }

  let examTimeInMinutes = currentQuizSession.examTime;
  let totalQuestions = currentQuizSession.questionCount;
  let startTime = currentQuizSession.startTime;
  let endTime = currentQuizSession.endTime;

  if (!endTime || !startTime) {
    console.log("Start time or end time is missing");
    return notFound();
  }

  let timeTakenMs = new Date(endTime).getTime() - new Date(startTime).getTime();
  let timeTakenMinutes = Math.floor(timeTakenMs / 60000);
  const formattedEndTime = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(endTime));

  let totalTimeTaken =
    timeTakenMinutes < 1 ? "less than 1 min" : `${timeTakenMinutes} minutes`;

  const {
    correctAnswers,
    incorrectAnswers,
    skippedAnswers,
    percentageScored,
    passFailStatus,
  } = currentQuizSession;

  return (
    <section className="container py-8">
      <h2 className="transducer-font mb-6 font-bold uppercase tracking-wide">
        {currentQuizSession.exam.name} Results
      </h2>
      <div className="grid grid-cols-1 gap-8 rounded-lg border border-gray-200 bg-[linear-gradient(259.9deg,_#1D1E23_-1%,_#131418_44.29%,_#1D1E23_94.34%)] p-4 shadow-sm dark:border-gray-700 md:p-6 lg:grid-cols-2 lg:p-12">
        <div className="space-y-6 border-gray-700 lg:border-r">
          <div>
            <h3 className="transducer-font mb-2 font-bold uppercase tracking-wider">
              Exam Score
            </h3>
            <div className="flex items-center gap-4">
              <span className="bg-gradient-to-r from-white to-transparent bg-clip-text text-4xl font-bold text-transparent md:text-6xl lg:text-[8rem]">
                {percentageScored?.toFixed(2)}%
              </span>
              <span
                className={cn("rounded px-3 py-1 text-lg font-semibold", {
                  "bg-green-100 text-green-800 dark:bg-green-900/80 dark:text-green-100":
                    passFailStatus,
                  "bg-red-700 text-red-100": !passFailStatus,
                })}
              >
                {passFailStatus ? "Passed" : "Failed"}
              </span>
            </div>
          </div>
          <div className="border-gray-700 pt-4 lg:border-t">
            <h3 className="">{formattedEndTime}</h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoCard
                title="Correct"
                value={correctAnswers.toString()}
                backgroundColor=""
                icon={<Check className="text-green-600 dark:text-green-400" />}
              />
              <InfoCard
                title="Incorrect"
                value={incorrectAnswers.toString()}
                backgroundColor=""
                icon={<X className="text-red-600 dark:text-red-400" />}
              />
              <InfoCard
                title="Skipped"
                value={skippedAnswers.toString()}
                backgroundColor=""
                icon={
                  <CircleOff className="text-yellow-600 dark:text-yellow-400" />
                }
              />
              <InfoCard
                title="Time Taken"
                value={totalTimeTaken}
                backgroundColor=""
                icon={<Timer className="text-blue-600 dark:text-blue-400" />}
              />
            </div>
          </div>
        </div>
        <ResultsChart
          correct={correctAnswers}
          incorrect={incorrectAnswers}
          skipped={skippedAnswers}
        />
      </div>
      <div className="mt-8 flex justify-between">
        <GradientButton className="" variant={"outline"} size={"2xl"} asChild>
          <Link
            href={`/exam/${params.examId}/quiz/${currentQuizSession.id}/review`}
          >
            Review Exam
          </Link>
        </GradientButton>
        <Button
          className="rounded-full"
          variant={"outline"}
          size={"2xl"}
          asChild
        >
          <Link href={`/exam/${params.examId}`}>Retake Exam</Link>
        </Button>
      </div>
    </section>
  );
};

export default QuizResultsPage;

function InfoCard({
  title,
  value,
  icon,
  backgroundColor,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  backgroundColor: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-3 rounded-lg p-3", backgroundColor)}
    >
      <div className="rounded-full bg-white p-2 dark:bg-gray-700">{icon}</div>
      <div>
        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </h5>
        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {value}
        </span>
      </div>
    </div>
  );
}
