"use client";

import React, { useState } from "react";
import HtmlContent from "@/components/html-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Question, QuizSession, UserAttempt } from "@prisma/client";
import { CircleCheckBig, CircleX } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [userAttemptIndex, setUserAttemptIndex] = useState(0);
  const [showOverallExplanation, setShowOverallExplanation] = useState(false);

  const currentAttempt = userAttempts[userAttemptIndex];
  const currentQuestion = questions[userAttemptIndex];

  const handleNext = () =>
    setUserAttemptIndex((prev) => Math.min(prev + 1, questions.length - 1));
  const handlePrevious = () =>
    setUserAttemptIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">{examName} Review</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Exam Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <Summary
                totalQuestions={questions.length}
                correctQuestions={quizSession.correctAnswers}
                incorrectQuestions={quizSession.incorrectAnswers}
                skippedQuestions={quizSession.skippedAnswers}
                score={quizSession.percentageScored!}
              />
              <Button asChild className="w-full">
                <Link href={`/exam/${examSlug}/quiz/${quizSession.id}/results`}>
                  See Results
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Card className="lg:col-span-3">
          <CardContent className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <span className="font-medium">
                Question{" "}
                <span className="font-bold">{userAttemptIndex + 1}</span> of{" "}
                <span className="font-bold">{questions.length}</span>
              </span>
              <span className="font-medium">
                Exam Mode:{" "}
                <span className="font-bold">{quizSession.examMode}</span>
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Question Type: {currentQuestion.questionType}
              </span>
              <div className="mt-2">
                <HtmlContent content={currentQuestion.question} />
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
              <Card>
                <CardHeader>
                  <CardTitle>Overall Explanation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">
                    {currentQuestion.overallExplanation}
                  </p>
                </CardContent>
              </Card>
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
                <Button
                  onClick={handlePrevious}
                  disabled={userAttemptIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={userAttemptIndex === questions.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
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
}) => (
  <div className="grid grid-cols-5 gap-2">
    {Array.from({ length: totalQuestions }).map((_, index) => {
      let statusClass = "bg-gray-200";
      if (questionStatus[index] === "correct") {
        statusClass = "bg-green-500";
      } else if (questionStatus[index] === "incorrect") {
        statusClass = "bg-red-500";
      } else if (questionStatus[index] === "skipped") {
        statusClass = "bg-yellow-500";
      }

      return (
        <div
          key={index}
          className={`pt-full w-full rounded-sm ${statusClass} relative`}
        >
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
            {index + 1}
          </span>
        </div>
      );
    })}
  </div>
);

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
      isCorrect ? "border-green-500" : "border-red-500",
      isUserOptionSelected && "bg-blue-50",
    )}
  >
    <div className="flex items-start gap-4">
      <div className="mt-1">
        {isCorrect ? (
          <CircleCheckBig className="text-green-600" />
        ) : (
          <CircleX className="text-red-600" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium">{optionText}</p>
        {isUserOptionSelected && (
          <Badge
            variant={isCorrect ? "success" : "destructive"}
            className="mt-2"
          >
            Your Selection
          </Badge>
        )}
        {isShowAnswer && (
          <div className="mt-2">
            <h6 className="text-sm font-medium text-muted-foreground">
              Explanation
            </h6>
            <p className="mt-1 text-sm">{optionExplanation}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);
