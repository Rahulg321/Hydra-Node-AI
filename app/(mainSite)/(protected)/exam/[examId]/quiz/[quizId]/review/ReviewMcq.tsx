"use client";

import React, { useState } from "react";
import HtmlContent from "@/components/html-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Question, QuizSession, UserAttempt } from "@prisma/client";
import { Circle, CircleCheckBig, CircleX, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RenderMarkdown from "@/components/RenderMarkdown";
import { GradientButton } from "@/components/buttons/gradient-button";

const ReviewMcq = ({
  userAttempts = [],
  questions,
  quizSession,
  examName,
  examId,
}: {
  userAttempts?: UserAttempt[];
  questions: Question[];
  quizSession: QuizSession;
  examName: string;
  examId: string;
}) => {
  const [userAttemptIndex, setUserAttemptIndex] = useState(0);
  const [showOverallExplanation, setShowOverallExplanation] = useState(false);

  const currentAttempt = userAttempts[userAttemptIndex];
  const currentQuestion = questions[userAttemptIndex];

  const handleNext = () =>
    setUserAttemptIndex((prev) => Math.min(prev + 1, questions.length - 1));
  const handlePrevious = () =>
    setUserAttemptIndex((prev) => Math.max(prev - 1, 0));

  //   console.log("user attempts", userAttempts);

  const totalQuestions = questions.length;
  const correctQuestions = userAttempts.filter(
    (attempt) => attempt.isCorrect,
  ).length;
  const incorrectQuestions = userAttempts.filter(
    (attempt) => !attempt.isCorrect,
  ).length;

  return (
    <section className="">
      <div className="min-h-screen flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className="border-grid hidden h-full w-[85%] max-w-[300px] shrink-0 border-r md:block">
          <div className="no-scrollbar h-full overflow-auto px-4 py-4 md:py-6 lg:py-8">
            <div className="flex flex-col gap-4">
              <CorrectQuestionGrid
                totalQuestions={questions.length}
                questionStatus={userAttempts.map((attempt) =>
                  attempt.skipped
                    ? "skipped"
                    : attempt.isCorrect
                      ? "correct"
                      : "incorrect",
                )}
              />
              <GradientButton className="w-full" asChild>
                <Link
                  href={`/exam/${examId}/quiz/${quizSession.id}/results`}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Quiz
                </Link>
              </GradientButton>
            </div>
          </div>
        </div>
        <div className="h-full w-full px-4 py-4 md:py-6 lg:py-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="font-medium text-[#737373]">
                Question{" "}
                <span className="font-bold">{userAttemptIndex + 1}</span> of{" "}
                <span className="font-bold">{questions.length}</span>
              </p>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-orange-800 px-4 py-2 font-medium">
                  {totalQuestions} all
                </div>
                <div className="rounded-full bg-green-200 px-4 py-2 font-medium text-green-800">
                  {correctQuestions} correct
                </div>
                <div className="rounded-full bg-red-200 px-4 py-2 font-medium text-red-800">
                  {incorrectQuestions} incorrect
                </div>
                <div className="rounded-full bg-yellow-200 px-4 py-2 font-medium text-yellow-800">
                  {totalQuestions - correctQuestions - incorrectQuestions}{" "}
                  skipped
                </div>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Question Type: {currentQuestion.questionType}
              </span>
              <div className="mt-2">
                <RenderMarkdown
                  source={currentQuestion.question}
                  contentStyle={{
                    fontSize: "2rem",
                    lineHeight: "2.5rem",
                    color: "white",
                  }}
                />
              </div>
            </div>
            {!currentAttempt || currentAttempt.skipped ? (
              <Badge variant="destructive">Skipped</Badge>
            ) : (
              <Badge variant="secondary">Attempted</Badge>
            )}
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => {
                const optionText =
                  currentQuestion[`answerOption${i + 1}` as keyof Question];
                if (!optionText) return null;

                const optionExplanation = currentQuestion[
                  `explanation${i + 1}` as keyof Question
                ] as string;
                const correctAnswers = currentQuestion.correctAnswers
                  .split(",")
                  .map(Number);
                const isCorrect = correctAnswers.includes(i + 1);
                const userSelections =
                  currentAttempt?.userAnswer?.split(",").map(Number) || [];
                const isUserOptionSelected = userSelections.includes(i + 1);

                return (
                  <Option
                    key={i}
                    optionText={optionText as string}
                    optionExplanation={optionExplanation}
                    isCorrect={isCorrect}
                    isUserOptionSelected={isUserOptionSelected}
                    isShowAnswer={showOverallExplanation}
                  />
                );
              })}
            </div>
            {showOverallExplanation && (
              <div className="mt-4 rounded-lg p-4 dark:bg-green-900">
                <h3 className="my-4">Overall Explanation</h3>
                <RenderMarkdown
                  source={currentQuestion.overallExplanation}
                  contentStyle={{
                    fontSize: "1rem",
                    color: "white",
                  }}
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setShowOverallExplanation((prev) => !prev)}
              >
                {showOverallExplanation
                  ? "Hide Explanation"
                  : "Show Explanation"}
              </Button>
              <div className="space-x-4">
                <GradientButton
                  onClick={handlePrevious}
                  disabled={userAttemptIndex === 0}
                >
                  Previous
                </GradientButton>
                <GradientButton
                  onClick={handleNext}
                  disabled={userAttemptIndex === questions.length - 1}
                >
                  Next
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewMcq;

const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div className={`h-4 w-4 rounded ${color}`}></div>
    <span className="text-sm font-medium">{label}</span>
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
  <div className="space-y-2 text-sm">
    <p>
      Total Questions: <span className="font-bold">{totalQuestions}</span>
    </p>
    <p>
      Correct:{" "}
      <span className="font-bold text-green-600">{correctQuestions}</span>
    </p>
    <p>
      Incorrect:{" "}
      <span className="font-bold text-red-600">{incorrectQuestions}</span>
    </p>
    <p>
      Skipped:{" "}
      <span className="font-bold text-yellow-600">{skippedQuestions}</span>
    </p>
    <p>
      Score: <span className="font-bold">{score.toFixed(2)}%</span>
    </p>
  </div>
);

const CorrectQuestionGrid = ({
  totalQuestions,
  questionStatus,
}: {
  totalQuestions: number;
  questionStatus: (string | null)[];
}) => {
  console.log("question status in correct question grid", questionStatus);
  return (
    <div className="rounded-lg bg-muted">
      <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent max-h-[250px] overflow-y-auto">
        <div className="grid grid-cols-4 gap-1 px-2 py-4">
          {Array.from({ length: totalQuestions }).map((_, index) => {
            let statusClass = "bg-gray-400 dark:bg-muted";

            if (questionStatus[index] === "correct") {
              statusClass = "bg-green-500";
            } else if (questionStatus[index] === "incorrect") {
              statusClass = "bg-red-500";
            } else if (
              questionStatus[index] === "skipped" ||
              questionStatus[index] === null
            ) {
              statusClass = "bg-yellow-500";
            } else {
              statusClass = "bg-yellow-500";
            }

            return (
              <div
                key={index}
                className={`aspect-square w-full rounded-lg border ${statusClass} relative flex items-center justify-center p-2 text-xs font-medium`}
              >
                <span className="flex items-center justify-center text-xs font-bold text-white">
                  {questionStatus[index] === "incorrect" ? (
                    <div>
                      <CircleX className="text-white" />
                    </div>
                  ) : questionStatus[index] === "correct" ? (
                    <div>
                      <CircleCheckBig className="text-green-600" />
                    </div>
                  ) : (
                    <div>{index + 1}</div>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Option = ({
  optionText,
  optionExplanation,
  isCorrect,
  isUserOptionSelected,
  isShowAnswer,
}: {
  optionText: string;
  optionExplanation: string;
  isCorrect: boolean;
  isUserOptionSelected: boolean;
  isShowAnswer: boolean;
}) => (
  <div
    className={cn(
      "rounded-lg border p-4",
      isUserOptionSelected && "bg-red-800",
      isCorrect ? "bg-green-800" : "",
    )}
  >
    <div className="flex items-start gap-4">
      <div className="mt-1">
        {isCorrect ? (
          <CircleCheckBig className="text-green-600" />
        ) : isUserOptionSelected ? (
          <CircleX className="text-white" />
        ) : (
          <Circle className="text-gray-600" />
        )}
      </div>
      <div className="flex-1">
        <RenderMarkdown
          source={optionText}
          contentStyle={{
            fontSize: "1.2rem",
            fontFamily: "var(--font-geist-sans)",
          }}
        />
        <div className="flex items-center gap-2">
          {isUserOptionSelected && (
            <Badge
              variant={isCorrect ? "success" : "destructive"}
              className="mt-2"
            >
              Your Selection
            </Badge>
          )}
          {isCorrect && (
            <Badge variant="success" className="mt-2">
              Correct
            </Badge>
          )}
        </div>
        {isShowAnswer && (
          <div className="mt-2 border-t border-white/20 pt-2">
            <h4 className="font-medium">Explanation</h4>
            <RenderMarkdown
              source={optionExplanation}
              contentStyle={{
                fontSize: "1rem",
                color: isCorrect || isUserOptionSelected ? "white" : "gray",
              }}
              className="mt-2"
            />
          </div>
        )}
      </div>
    </div>
  </div>
);
