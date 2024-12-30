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
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
        {currentQuizSession.exam.name} Results
      </h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">
              Exam Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-lg text-gray-700 dark:text-gray-300">
                Total Questions
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {totalQuestions}
              </span>
            </div>
            <div>
              <h2 className="mb-2 text-xl text-gray-900 dark:text-gray-100">
                Exam Score
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {percentageScored?.toFixed(2)}%
                </span>
                <span
                  className={cn("rounded px-3 py-1 text-lg font-semibold", {
                    "bg-green-100 text-green-800 dark:bg-green-900/80 dark:text-green-100":
                      passFailStatus,
                    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100":
                      !passFailStatus,
                  })}
                >
                  {passFailStatus ? "Passed" : "Failed"}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {formattedEndTime}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InfoCard
                title="Correct"
                value={correctAnswers.toString()}
                backgroundColor="bg-green-100 dark:bg-green-900"
                icon={<Check className="text-green-600 dark:text-green-400" />}
              />
              <InfoCard
                title="Incorrect"
                value={incorrectAnswers.toString()}
                backgroundColor="bg-red-100 dark:bg-red-900"
                icon={<X className="text-red-600 dark:text-red-400" />}
              />
              <InfoCard
                title="Skipped"
                value={skippedAnswers.toString()}
                backgroundColor="bg-yellow-100 dark:bg-yellow-900"
                icon={
                  <CircleOff className="text-yellow-600 dark:text-yellow-400" />
                }
              />
              <InfoCard
                title="Time Taken"
                value={totalTimeTaken}
                backgroundColor="bg-blue-100 dark:bg-blue-900"
                icon={<Timer className="text-blue-600 dark:text-blue-400" />}
              />
            </div>
          </CardContent>
        </Card>
        <ResultsChart
          correct={correctAnswers}
          incorrect={incorrectAnswers}
          skipped={skippedAnswers}
        />
      </div>
      <div className="mt-8 flex justify-between">
        <Button className="rounded-full px-6 py-2" asChild>
          <Link
            href={`/exam/${params.examId}/quiz/${currentQuizSession.id}/review`}
          >
            Review Exam
          </Link>
        </Button>
        <Button className="rounded-full px-6 py-2" variant="outline" asChild>
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
