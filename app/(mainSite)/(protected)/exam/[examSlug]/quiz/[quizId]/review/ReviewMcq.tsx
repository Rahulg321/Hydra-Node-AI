"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Exam, QuizSession, UserAttempt } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import StartExamButton from "../../../StartExamButton";

type ReviewMcqProps = {
  quizSession: QuizSession & {
    exam: {
      id: string;
      name: string;
      slug: string;
    };
  };
  userAttempts: Array<
    UserAttempt & {
      question: {
        id: string;
        type: string;
        overallExplanation: string;
        question: string;
        options: Array<{ id: string; option: string; explanation: string }>;
        correctAnswers: Array<{ id: string; answer: string }>;
      };
    }
  >;
};

const ReviewMcq = ({ quizSession, userAttempts }: ReviewMcqProps) => {
  const [userAttemptIndex, setUserAttemptIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentAttempt = useMemo(
    () => userAttempts[userAttemptIndex],
    [userAttemptIndex, userAttempts],
  );

  console.log("current attempt", currentAttempt);

  const options = currentAttempt.question.options.map((e) => {
    return {
      option: e.option,
      explanation: e.explanation,
    };
  });

  const isCorrectAnswer = (option: string) => {
    return currentAttempt.question.correctAnswers.some(
      (correct) => correct.answer.toLowerCase() === option.toLowerCase(),
    );
  };

  const isSelectedAnswer = (option: string) => {
    const userAnswersArray = currentAttempt.userAnswer.split(",");
    return userAnswersArray.some(
      (answer) => answer.trim().toLowerCase() === option.toLowerCase(),
    );
  };

  const handleNext = () => setUserAttemptIndex((prev) => prev + 1);
  const handlePrevious = () => setUserAttemptIndex((prev) => prev - 1);

  const calculateScore = () => {
    const correctQuestions = userAttempts.filter(
      (attempt) => attempt.isCorrect,
    ).length;
    return (correctQuestions / userAttempts.length) * 100;
  };

  return (
    <section className="">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {/* Sidebar Section */}
        <div className="container col-span-1 space-y-4">
          <h4 className="text-baseC">Exam Content</h4>

          {/* Correct/Incorrect/Skipped Markers */}
          <div className="space-y-2">
            <Legend color="bg-green-400" label="Correct" />
            <Legend color="bg-red-400" label="Incorrect" />
            <Legend color="bg-yellow-400" label="Skipped" />
          </div>

          <CorrectQuestionGrid
            questionLength={userAttempts.length}
            questionStatus={userAttempts.map((attempt) =>
              attempt.skipped
                ? "skipped"
                : attempt.isCorrect
                  ? "correct"
                  : "incorrect",
            )}
          />

          {/* Summary Section */}
          <Summary
            totalQuestions={userAttempts.length}
            correctQuestions={userAttempts.filter((a) => a.isCorrect).length}
            incorrectQuestions={
              userAttempts.filter((a) => !a.isCorrect && !a.skipped).length
            }
            skippedQuestions={userAttempts.filter((a) => a.skipped).length}
            score={calculateScore()}
          />

          <StartExamButton
            buttonLabel="Retake Exam"
            examId={quizSession.examId}
            examSlug={quizSession.exam.slug}
            currentUserId={quizSession.userId}
          />

          <Button asChild>
            <Link
              href={`/exam/${quizSession.exam.slug}/quiz/${quizSession.id}/results`}
            >
              Back to EXAM Result
            </Link>
          </Button>
        </div>

        {/* Question and Answer Section */}
        {/* <div
          className={cn("container col-span-4 py-4", {
            "bg-green-200": currentAttempt.isCorrect,
            "bg-red-200": !currentAttempt.isCorrect,
          })} */}
        <div className={cn("container col-span-4 py-4")}>
          {/* Question Navigation */}
          <QuestionHeader
            currentQuestionIndex={userAttemptIndex + 1}
            totalQuestions={userAttempts.length}
          />

          <h2>{currentAttempt.question.question}</h2>

          {/* Options Section */}
          <div className="mt-4 space-y-4">
            {options.map((option, index) => {
              const isCorrectOption = isCorrectAnswer(option.option);
              const isUserSelection = isSelectedAnswer(option.option);
              const isUserIncorrectSelection =
                !isCorrectOption && isUserSelection;

              return (
                <div key={index}>
                  <div
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-lg border border-base p-4 md:p-6",
                      {
                        "border-4 border-green-500 bg-green-50 text-green-600":
                          isCorrectOption, // Correct Answer (light green background)
                        "border-4 border-red-500 bg-red-50 text-red-600":
                          isUserIncorrectSelection, // Incorrect Answer (light red background)
                        "border-4 border-blue-500 bg-blue-50 text-blue-600":
                          isUserSelection && !isCorrectOption, // User-selected wrong option
                        "hover:shadow-lg": !isUserSelection, // Add subtle hover effect for unselected
                      },
                    )}
                  >
                    <h5 className="">{option.option}</h5>
                  </div>
                  <span
                    className={cn("font-bold text-red-500", {
                      "font-bold text-green-500": isCorrectOption,
                      "": isUserIncorrectSelection,
                    })}
                  >
                    {option.explanation}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Show/Hide Answer Button */}
          {showAnswer && (
            <div className="mt-6 space-y-4">
              <h4 className="font-medium text-green-600">
                Correct Answer:{" "}
                {currentAttempt.question.correctAnswers
                  .map((a) => a.answer)
                  .join(", ")}
              </h4>
              <span className="block font-medium">
                {currentAttempt.question.overallExplanation}
              </span>
            </div>
          )}

          <div className="mt-4 flex justify-between">
            <Button
              className="mb-4 rounded-full bg-base px-10 py-6 text-base"
              onClick={() => setShowAnswer((prev) => !prev)}
            >
              {showAnswer ? "Hide Answer" : "Get Overall Explanation"}
            </Button>
            <div className="space-x-4">
              <Button
                className="mb-4 rounded-full border border-base bg-white px-10 py-6 text-base font-semibold text-baseC hover:bg-base hover:text-white"
                onClick={handlePrevious}
                disabled={userAttemptIndex === 0}
              >
                Previous Question
              </Button>
              <Button
                className="mb-4 rounded-full bg-base px-10 py-6 text-base"
                onClick={handleNext}
                disabled={userAttemptIndex === userAttempts.length - 1}
              >
                Next Question
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewMcq;

// Helper Components for Legends, Summary, and Question Header
const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div
      className={`size-6 rounded-lg border ${color} text-center text-white`}
    ></div>
    <span className="font-semibold text-baseC">{label}</span>
  </div>
);

const Summary = ({
  totalQuestions,
  correctQuestions,
  incorrectQuestions,
  skippedQuestions,
  score,
}: {
  totalQuestions: number;
  correctQuestions: number;
  incorrectQuestions: number;
  skippedQuestions: number;
  score: number;
}) => (
  <div className="space-y-2">
    <h5>Total Questions: {totalQuestions}</h5>
    <h5>Correct Questions: {correctQuestions}</h5>
    <h5>Incorrect Questions: {incorrectQuestions}</h5>
    <h5>Skipped Questions: {skippedQuestions}</h5>
    <h5>Exam Score: {score.toFixed(2)}%</h5>
  </div>
);

const QuestionHeader = ({
  currentQuestionIndex,
  totalQuestions,
}: {
  currentQuestionIndex: number;
  totalQuestions: number;
}) => (
  <div className="mb-4 flex justify-between">
    <h5>
      Question{" "}
      <span className="font-semibold text-baseC">{currentQuestionIndex}</span>
    </h5>
    <h5>
      Total Questions{" "}
      <span className="font-semibold text-baseC">{totalQuestions}</span>
    </h5>
  </div>
);

type QuestionGridProps = {
  questionLength: number;
  questionStatus: (string | null)[];
};

function CorrectQuestionGrid({
  questionLength,
  questionStatus,
}: QuestionGridProps) {
  return (
    <div className="bg-muted p-4">
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: questionLength }).map((_, index) => {
          let statusClass = "border-base";
          if (questionStatus[index] === "correct") {
            statusClass = "bg-green-500 border-green-500";
          } else if (questionStatus[index] === "incorrect") {
            statusClass = "bg-red-500 border-red-500";
          } else if (questionStatus[index] === "skipped") {
            statusClass = "bg-yellow-500 border-yellow-500";
          }

          return (
            <div
              key={index}
              className={`size-8 rounded-lg border text-center text-white ${statusClass}`}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
