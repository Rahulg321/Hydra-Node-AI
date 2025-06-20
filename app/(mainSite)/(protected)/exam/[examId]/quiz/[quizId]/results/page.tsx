import React from "react";
import ResultsChart from "./ResultsChart";
import { ArrowLeft, Check, CircleOff, Timer, X } from "lucide-react";
import { cn } from "@/hooks/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import db from "@/hooks/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientButton } from "@/components/buttons/gradient-button";
import CorrectQuestionGrid from "@/components/correct-question-grid";
import ExamGridResultSheet from "@/components/Sheets/ExamGridResultSheet";
import EndTimeExamComponent from "@/components/EndTimeExamComponent";

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
      userAttempts: {
        select: {
          skipped: true,
          isCorrect: true,
          order: true,
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

  const userAttempts = currentQuizSession.userAttempts;
  const sortedUserAttempts = userAttempts.sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  return (
    <section className="px-2 sm:px-4">
      <div className="min-h-screen flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[340px_minmax(0,1fr)]">
        <ExamGridResultSheet
          userAttempts={sortedUserAttempts}
          totalQuestions={totalQuestions}
          totalTimeTaken={totalTimeTaken}
        />
        <div className="border-grid hidden h-full w-[85%] max-w-[300px] shrink-0 border-r md:block">
          <div className="no-scrollbar h-full overflow-auto px-2 py-4 sm:px-4 md:py-6 lg:py-8">
            <div className="flex flex-col gap-4">
              <EndTimeExamComponent remainingTime={totalTimeTaken} />
              <CorrectQuestionGrid
                totalQuestions={totalQuestions}
                questionStatus={userAttempts.map((attempt) =>
                  attempt.skipped
                    ? "skipped"
                    : attempt.isCorrect
                      ? "correct"
                      : "incorrect",
                )}
              />
            </div>
          </div>
        </div>
        <div className="container max-w-full py-4 md:py-6 lg:py-8">
          <h2 className="transducer-font mb-4 font-bold uppercase tracking-wide sm:mb-6">
            {currentQuizSession.exam.name} Results
          </h2>
          <div>
            <div className="before:opacity-1 relative grid grid-cols-1 gap-6 rounded-lg border bg-[#0C0C0C] p-3 shadow-sm sm:gap-8 sm:p-4 md:p-6 lg:grid-cols-2 lg:p-10">
              <div className="space-y-4 sm:space-y-6 lg:border-r lg:pr-4">
                <div>
                  <h3 className="transducer-font mb-2 font-bold uppercase tracking-wider">
                    Exam Score
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span className="leading-trim-cap-height bg-gradient-to-r from-white to-transparent bg-clip-text text-3xl font-semibold leading-[100%] tracking-[0%] text-transparent sm:text-4xl md:text-6xl lg:text-[7rem]">
                      {percentageScored?.toFixed(2)}%
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-semibold sm:text-lg",
                        {
                          "bg-green-900/80 text-white": passFailStatus,
                          "bg-red-700 text-white": !passFailStatus,
                        },
                      )}
                    >
                      {passFailStatus ? "Passed" : "Failed"}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h3 className="">{formattedEndTime}</h3>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                    <InfoCard
                      title="Correct"
                      value={correctAnswers.toString()}
                      backgroundColor="bg-green-900/80"
                      icon={
                        <Check className="h-4 w-4 text-white sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
                      }
                    />
                    <InfoCard
                      title="Incorrect"
                      value={incorrectAnswers.toString()}
                      backgroundColor="bg-red-700"
                      icon={
                        <X className="h-4 w-4 text-white sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                      }
                    />
                    <InfoCard
                      title="Skipped"
                      value={skippedAnswers.toString()}
                      backgroundColor="bg-[#E8A600]"
                      icon={
                        <CircleOff className="h-4 w-4 text-white sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                      }
                    />
                    <InfoCard
                      title="Time Taken"
                      value={totalTimeTaken}
                      backgroundColor="bg-yellow-700/20"
                      icon={
                        <Timer className="h-4 w-4 text-white sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="w-full max-w-full overflow-hidden">
                <ResultsChart
                  correct={correctAnswers}
                  incorrect={incorrectAnswers}
                  skipped={skippedAnswers}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-between">
            <Button
              className="w-full rounded-full border-[#2F2F2F] text-white sm:w-auto"
              variant={"outline"}
              size={"xl"}
              asChild
            >
              <Link
                href={`/exam/${params.examId}/quiz/${currentQuizSession.id}/review`}
              >
                Review Exam
              </Link>
            </Button>
            <div className="space-x-2">
              <Button
                className="w-full rounded-full text-white sm:w-auto"
                variant={"outline"}
                size={"xl"}
                asChild
              >
                <Link href={`/exam/${params.examId}`}>Retake Exam</Link>
              </Button>
              <GradientButton
                className="w-full rounded-full sm:w-auto"
                variant={"outline"}
                size={"xl"}
                asChild
              >
                <Link href={`/exam/${params.examId}`}>Finish</Link>
              </GradientButton>
            </div>
          </div>
        </div>
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
      className={cn("flex items-center gap-2 rounded-lg p-2 sm:gap-3 sm:p-3")}
    >
      <div
        className={cn(
          "rounded-2xl bg-gray-700 p-1.5 sm:p-2 md:p-4",
          backgroundColor,
        )}
      >
        {icon}
      </div>
      <div>
        <h5 className="text-[#A5A5A5]">{title}</h5>
        <span className="transducer-font">{value}</span>
      </div>
    </div>
  );
}
