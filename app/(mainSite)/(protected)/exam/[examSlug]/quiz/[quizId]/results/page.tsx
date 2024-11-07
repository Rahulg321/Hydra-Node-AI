import React from "react";
import { ResultsChart } from "./ResultsChart";
import { Check, CircleOff, Timer, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import StartExamButton from "../../../StartExamButton";

export const dynamic = "force-dynamic";

type props = {
  params: {
    examSlug: string;
    quizId: string;
  };
};

const QuizResultsPage = async ({ params }: props) => {
  const currentQuizSession = await db.quizSession.findFirst({
    where: {
      id: params.quizId,
    },
    include: {
      exam: {
        include: {
          questions: true,
        },
      },
      userAttempts: {
        select: {
          isCorrect: true,
          skipped: true,
        },
      },
    },
  });

  if (!currentQuizSession) {
    console.log("the quiz session doesnt exist");
    return notFound();
  }

  let examTimeInMinutes = currentQuizSession.examTime;
  let totalQuestions = currentQuizSession.userAttempts.length;
  let startTime = currentQuizSession.startTime;
  let endTime = currentQuizSession.endTime;

  if (!endTime || !startTime) {
    console.log("Start time or end time is missing");
    return notFound();
  }

  // calculate the time taken
  let timeTakenMs = new Date(endTime).getTime() - new Date(startTime).getTime();
  let timeTakenMinutes = Math.floor(timeTakenMs / 60000); // Convert milliseconds to minutes
  const formattedEndTime = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(endTime));

  let totalTimeTaken = "";

  // formatted time less than 1min
  if (timeTakenMinutes < 1) {
    totalTimeTaken = "less than 1 min";
  } else {
    totalTimeTaken = `${timeTakenMinutes} minutes`;
  }

  const { correctQuestions, incorrectQuestions, skippedQuestions } =
    currentQuizSession.userAttempts.reduce(
      (acc, { isCorrect, skipped }) => {
        if (isCorrect) {
          acc.correctQuestions++;
        } else if (!skipped) {
          acc.incorrectQuestions++;
        }

        if (skipped) {
          acc.skippedQuestions++;
        }
        return acc;
      },
      { correctQuestions: 0, incorrectQuestions: 0, skippedQuestions: 0 },
    );

  let examScore =
    (correctQuestions / currentQuizSession.userAttempts.length) * 100;

  return (
    <section className="container py-4">
      <h1>Exam Results</h1>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="">
            Total Questions <span className="font-bold">{totalQuestions}</span>
          </h2>

          <h2 className="">
            Total Time Allowed{" "}
            <span className="font-bold">{examTimeInMinutes} minutes</span>
          </h2>

          <h2>Exam Score</h2>
          <div className="my-4 flex items-center gap-2">
            <h1>{examScore} %</h1>
            <span
              className={cn("font-semibold text-green-500", {
                "text-red-500": examScore < 50,
              })}
            >
              {examScore >= 50 ? "Passed" : "Failed"}
            </span>
          </div>
          <h3 className="mb-4 font-medium">{formattedEndTime}</h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoCard
              title="Correct"
              value={correctQuestions.toString()}
              backgroundColor="bg-green-200"
              icon={<Check className="text-green-400" />}
            />
            <InfoCard
              title="Incorrect"
              value={incorrectQuestions.toString()}
              backgroundColor="bg-pink-400"
              icon={<X className="text-pink-800" />}
            />
            <InfoCard
              title="Skipped/Unanswered"
              value={skippedQuestions.toString()}
              backgroundColor="bg-violet-400"
              icon={<CircleOff className="text-violet-800" />}
            />
            <InfoCard
              title="Time Taken"
              value={`${totalTimeTaken}`}
              backgroundColor="bg-orange-400"
              icon={<Timer className="text-orange-800" />}
            />
          </div>
        </div>
        <ResultsChart
          correct={correctQuestions}
          incorrect={incorrectQuestions}
          skipped={skippedQuestions}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <Button
          className="mb-4 rounded-full border border-base bg-white px-10 py-6 text-baseC transition duration-150 ease-in-out hover:bg-base hover:text-white"
          asChild
        >
          <Link
            href={`/exam/${currentQuizSession.exam.slug}/quiz/${params.quizId}/review`}
          >
            Review Exam
          </Link>
        </Button>

        <div className="space-x-4">
          <StartExamButton
            buttonLabel="Retake Exam"
            examId={currentQuizSession.examId}
            examSlug={currentQuizSession.exam.slug}
            currentUserId={currentQuizSession.userId}
          />

          <Button
            className="mb-4 rounded-full bg-base px-10 py-6 text-base"
            asChild
          >
            <Link href={"/product"}>Continue</Link>
          </Button>
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
  icon: any;
  backgroundColor: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("rounded-lg p-2", backgroundColor)}>{icon}</div>
      <div>
        <h5 className="font-semibold">{title}</h5>
        <span>{value}</span>
      </div>
    </div>
  );
}
