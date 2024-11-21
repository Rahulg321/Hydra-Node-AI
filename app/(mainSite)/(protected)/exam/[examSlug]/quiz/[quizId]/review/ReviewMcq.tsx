"use client";

import HtmlContent from "@/components/html-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Question, QuizSession, UserAttempt } from "@prisma/client";
import { CircleCheckBig, CircleX } from "lucide-react";
import Link from "next/link";
import React from "react";

const ReviewMcq = ({
  userAttempts = [],
  questions,
  quizSession,
  examName,
  examSlug,
}: {
  userAttempts?: UserAttempt[];
  questions: Question[];
  quizSession: QuizSession;
  examName: string;
  examSlug: string;
}) => {
  const [userAttemptIndex, setUserAttemptIndex] = React.useState(0);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [showOverallExplanation, setShowOverallExplanation] =
    React.useState(false);

  let currentAttempt = userAttempts[userAttemptIndex];
  let currentQuestion = questions[questionIndex];

  const calculateScore = () => {
    const correctQuestions = userAttempts.filter(
      (attempt) => attempt.isCorrect,
    ).length;
    return (correctQuestions / userAttempts.length) * 100;
  };

  const handleNext = () => {
    setUserAttemptIndex((prev) => prev + 1);
    setQuestionIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setUserAttemptIndex((prev) => prev - 1);
    setQuestionIndex((prev) => prev - 1);
  };

  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-5">
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
            totalQuestions={questions.length}
            correctQuestions={quizSession.correctAnswers}
            incorrectQuestions={quizSession.incorrectAnswers}
            skippedQuestions={quizSession.skippedAnswers}
            score={quizSession.percentageScored!}
          />

          <Button asChild variant={"hydraPrimary"}>
            <Link href={`/exam/${examSlug}/quiz/${quizSession.id}/results`}>
              See Results
            </Link>
          </Button>
        </div>
        <div className="container col-span-4 py-4">
          <h2>{examName}</h2>
          <div className="mt-4 flex justify-between">
            <span className="font-medium">
              Exam Mode{" "}
              <span className="font-bold">{quizSession.examMode}</span>
            </span>
            <span className="font-medium">
              Question <span className="font-bold">{userAttemptIndex + 1}</span>
            </span>
            <span className="font-medium">
              Total Questions{" "}
              <span className="font-bold">{questions.length}</span>
            </span>
          </div>

          <span>Question Type: {currentQuestion.questionType}</span>
          <div className="my-4 md:my-8">
            <HtmlContent content={currentQuestion.question} />
          </div>
          {!currentAttempt || currentAttempt.skipped ? (
            <div className="mb-4">
              <Badge variant={"destructive"}>Skipped</Badge>
            </div>
          ) : (
            <div className="mb-4">
              <Badge variant={"success"}>Attempted</Badge>
            </div>
          )}
          <div className="space-y-4 md:space-y-6">
            {/* TODO:-  figure out why this does not work */}
            {[...Array(6)].map((_, i) => {
              let userSelections: number[] = [];

              if (!currentAttempt) {
                userSelections = [];
              } else {
                userSelections = currentAttempt.userAnswer
                  ? currentAttempt.userAnswer.split(",").map(Number)
                  : [];
              }

              // @ts-ignore
              let optionText = currentQuestion[`answerOption${i + 1}`];

              // @ts-ignore
              let optionExplanation = currentQuestion[`explanation${i + 1}`];

              let correctAnswers = currentQuestion.correctAnswers;
              let correctAnswersArray = correctAnswers.split(",").map(Number);
              let isCorrect = correctAnswersArray.includes(i + 1);

              let isOptionSelected = userSelections.includes(i + 1);

              return (
                <Option
                  key={i}
                  optionText={optionText}
                  optionExplanation={optionExplanation}
                  isCorrect={isCorrect!}
                  isUserOptionSelected={isOptionSelected}
                  isShowAnswer={showOverallExplanation}
                />
              );
            })}
          </div>
          {/* Show/Hide Answer Button */}
          {showOverallExplanation && (
            <div className="mt-6 space-y-4">
              <h4>Overall Explanation:-</h4>
              <span className="font-semibold text-green-800">
                {currentQuestion.overallExplanation}
              </span>
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <Button
              variant={"hydraPrimary"}
              onClick={() => setShowOverallExplanation((prev) => !prev)}
            >
              {showOverallExplanation ? "Hide" : "Get Explanation"}
            </Button>
            <div className="space-x-4">
              <Button
                variant={"hydraPrimary"}
                onClick={handlePrevious}
                disabled={questionIndex === 0}
              >
                Previous Question
              </Button>
              <Button
                variant={"hydraPrimary"}
                onClick={handleNext}
                disabled={questionIndex === questions.length - 1}
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

function Option({
  optionText,
  optionExplanation,
  isCorrect,
  isUserOptionSelected,
  isShowAnswer,
}: {
  optionExplanation: string;
  optionText: string | null;
  isCorrect: boolean;
  isShowAnswer: boolean;
  isUserOptionSelected: boolean;
}) {
  const [selected, setSelected] = React.useState(false);

  const onSelect = () => setSelected((prev) => !prev);

  if (!optionText) return null;

  console.log({ optionText, selected, isCorrect });

  return (
    <div
      className={cn("cursor-pointer border-2 border-base p-4", {
        "border-green-500": isCorrect,
        "border-red-500": !isCorrect,
      })}
      onClick={onSelect}
    >
      <div className={`flex cursor-pointer items-center gap-2 rounded-lg`}>
        <div className="flex flex-col items-center justify-center">
          {isCorrect ? (
            <div>
              <CircleCheckBig className="text-green-600" />
            </div>
          ) : (
            <div>
              <CircleX className="text-red-800" />
            </div>
          )}
          {isUserOptionSelected && isCorrect && (
            <div>
              <Badge variant="success">Selected</Badge>
            </div>
          )}

          {isUserOptionSelected && !isCorrect && (
            <div>
              <Badge variant="destructive">Selected</Badge>
            </div>
          )}
        </div>
        <label className="cursor-pointer text-sm font-semibold">
          {optionText}
        </label>
      </div>
      {selected ||
        (isShowAnswer && (
          <div className="mt-4 space-y-4">
            <h6 className="text-sm text-muted-foreground">Explanation</h6>
            <span
              className={cn("text-sm font-semibold", {
                "text-green-800 dark:text-green-600": isCorrect,
                "text-red-800 dark:text-red-600": !isCorrect,
              })}
            >
              {optionExplanation}
            </span>
          </div>
        ))}
    </div>
  );
}
