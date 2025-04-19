"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Question, QuizSession, UserAttempt } from "@prisma/client";
import {
  Circle,
  CircleCheckBig,
  CircleX,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react"; // Added Menu, X
import Link from "next/link";
import RenderMarkdown from "@/components/RenderMarkdown";
import { GradientButton } from "@/components/buttons/gradient-button";
import CorrectQuestionGrid from "@/components/correct-question-grid";

// Assuming HtmlContent might not be needed if RenderMarkdown handles HTML, removed import for now.
// import HtmlContent from "@/components/html-content";

const ReviewMcq = ({
  userAttempts = [],
  questions,
  quizSession,
  examName, // examName is passed but not used, consider using it e.g., in a header
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar visibility

  const currentAttempt = userAttempts[userAttemptIndex];
  const currentQuestion = questions[userAttemptIndex];

  const handleNext = () => {
    setShowOverallExplanation(false); // Hide explanation when changing question
    setUserAttemptIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };
  const handlePrevious = () => {
    setShowOverallExplanation(false); // Hide explanation when changing question
    setUserAttemptIndex((prev) => Math.max(prev - 1, 0));
  };
  const handleGridSelect = (index: number) => {
    setShowOverallExplanation(false);
    setUserAttemptIndex(index);
  };

  const totalQuestions = questions.length;
  const correctQuestions = userAttempts.filter(
    (attempt) => !attempt.skipped && attempt.isCorrect,
  ).length;
  const incorrectQuestions = userAttempts.filter(
    (attempt) => !attempt.skipped && !attempt.isCorrect,
  ).length;
  const skippedQuestions = userAttempts.filter(
    (attempt) => attempt.skipped,
  ).length;

  const questionStatus = userAttempts.map((attempt, index) => ({
    index: index,
    status: attempt.skipped
      ? "skipped"
      : attempt.isCorrect
        ? "correct"
        : "incorrect",
  }));

  return (
    <section className="bg-background text-foreground">
      {/* Main Grid Layout */}
      <div
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out md:grid",
          // Dynamically set grid columns based on sidebar state
          isSidebarOpen
            ? "md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)]" // Sidebar open width
            : "md:grid-cols-[0px_1fr]", // Sidebar closed width
        )}
      >
        {/* Sidebar */}
        <aside
          className={cn(
            "border-grid hidden h-full flex-col overflow-hidden border-r bg-muted/40 transition-all duration-300 ease-in-out md:flex",
            // Control width and padding for smooth transition
            isSidebarOpen ? "w-full p-4 lg:p-6" : "w-0 border-none p-0",
          )}
        >
          {/* Ensure content only shows when open or fades out */}
          <div
            className={cn(
              "no-scrollbar flex h-full flex-col gap-4 overflow-auto transition-opacity duration-200",
              isSidebarOpen ? "opacity-100" : "opacity-0",
            )}
          >
            <h2 className="mb-4 text-lg font-semibold">Quiz Overview</h2>
            <CorrectQuestionGrid
              totalQuestions={totalQuestions}
              questionStatus={questionStatus.map((item) => item.status)}
              onSelectQuestion={handleGridSelect} // Pass handler
              currentQuestionIndex={userAttemptIndex} // Highlight current
            />
            <GradientButton className="mt-auto w-full" asChild>
              <Link
                href={`/exam/${examId}/quiz/${quizSession.id}/results`}
                className="flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Results
              </Link>
            </GradientButton>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="relative h-full w-full overflow-auto p-4 md:p-6 lg:p-8">
          {/* Sidebar Toggle Button (Positioned Absolutely) */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute left-4 top-4 z-10 md:hidden" // Hidden on medium+ screens where sidebar behaviour changes
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {/* Mobile toggle, always show */}
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute left-6 top-6 z-10 hidden md:inline-flex" // Show only on md+
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <Card className="border-border shadow-sm">
            <CardHeader>
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <CardTitle className="text-xl">
                  Question {userAttemptIndex + 1}
                  <span className="text-base font-normal text-muted-foreground">
                    {" "}
                    of {questions.length}
                  </span>
                </CardTitle>
                {/* Summary Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{totalQuestions} Total</Badge>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                  >
                    {correctQuestions} Correct
                  </Badge>
                  <Badge variant="destructive">
                    {incorrectQuestions} Incorrect
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                  >
                    {skippedQuestions} Skipped
                  </Badge>
                </div>
              </div>
              <p className="pt-2 text-sm font-medium text-muted-foreground">
                Question Type: {currentQuestion.questionType}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Question Text */}
              <div>
                {/* Using prose for better markdown formatting defaults */}
                <div className="prose prose-invert dark:prose-invert prose-lg prose-h1:text-2xl prose-h1:mb-4 max-w-none">
                  <RenderMarkdown
                    source={currentQuestion.question}
                    // Removed inline styles, rely on prose/global styles or pass specific classes
                    // contentStyle={{ fontSize: "2rem", lineHeight: "2.5rem", color: "white" }}
                  />
                </div>
              </div>

              {/* Attempt Status Badge */}
              <div>
                {!currentAttempt || currentAttempt.skipped ? (
                  <Badge
                    variant="outline"
                    className="border-yellow-500 text-yellow-500"
                  >
                    Skipped
                  </Badge>
                ) : (
                  <Badge variant="secondary">Attempted</Badge>
                )}
              </div>

              {/* Options */}
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => {
                  const optionKey = `answerOption${i + 1}` as keyof Question;
                  const explanationKey =
                    `explanation${i + 1}` as keyof Question;

                  const optionText = currentQuestion[optionKey];
                  if (!optionText) return null; // Don't render if option doesn't exist

                  const optionExplanation =
                    (currentQuestion[explanationKey] as string) || ""; // Default to empty string
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
                      optionIndex={i + 1}
                      optionText={optionText as string}
                      optionExplanation={optionExplanation}
                      isCorrect={isCorrect}
                      isUserOptionSelected={isUserOptionSelected}
                      isShowAnswer={showOverallExplanation} // Pass down the state
                    />
                  );
                })}
              </div>

              {/* Overall Explanation Section */}
              {showOverallExplanation && currentQuestion.overallExplanation && (
                <Card className="mt-6 border-border bg-muted/50 shadow-inner">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Overall Explanation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-invert dark:prose-invert max-w-none text-sm">
                      <RenderMarkdown
                        source={currentQuestion.overallExplanation}
                        // contentStyle={{ fontSize: "1rem", color: "white" }} // Rely on prose styles
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-4 pt-6 sm:flex-row sm:justify-between">
              {/* Toggle Explanation Button */}
              <Button
                variant="outline"
                onClick={() => setShowOverallExplanation((prev) => !prev)}
                disabled={
                  !currentQuestion.overallExplanation &&
                  ![...Array(6)].some(
                    (_, i) =>
                      currentQuestion[`explanation${i + 1}` as keyof Question],
                  )
                } // Disable if no explanations exist
              >
                {showOverallExplanation
                  ? "Hide Explanations"
                  : "Show Explanations"}
              </Button>

              {/* Navigation Buttons */}
              <div className="flex items-center space-x-4">
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
            </CardFooter>
          </Card>
        </main>
      </div>
    </section>
  );
};

export default ReviewMcq;

// Option Component Refined for Clarity and Aesthetics
const Option = ({
  optionIndex,
  optionText,
  optionExplanation,
  isCorrect,
  isUserOptionSelected,
  isShowAnswer,
}: {
  optionIndex: number;
  optionText: string;
  optionExplanation: string;
  isCorrect: boolean;
  isUserOptionSelected: boolean;
  isShowAnswer: boolean;
}) => {
  const getOptionStateClasses = () => {
    if (isCorrect) {
      // Correct option, potentially selected by user
      return "border-green-500 bg-green-500/10 dark:bg-green-900/30";
    } else if (isUserOptionSelected && !isCorrect) {
      // User selected this incorrect option
      return "border-red-500 bg-red-500/10 dark:bg-red-900/30";
    } else {
      // Default: Not the correct answer, and not selected by user (or skipped question)
      return "border-border bg-transparent hover:bg-muted/50";
    }
  };

  const getIcon = () => {
    if (isCorrect) {
      return <CircleCheckBig className="flex-shrink-0 text-green-500" />;
    } else if (isUserOptionSelected && !isCorrect) {
      return <CircleX className="flex-shrink-0 text-red-500" />;
    } else {
      return <Circle className="flex-shrink-0 text-muted-foreground" />;
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-colors duration-200",
        getOptionStateClasses(),
      )}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1">
          {/* Option Text */}
          <div className="prose prose-invert dark:prose-invert max-w-none [&_p]:my-0">
            <RenderMarkdown
              source={optionText}
              // contentStyle={{ fontSize: "1.1rem" }} // Adjust base size via prose or global styles
            />
          </div>

          {/* Badges: Your Selection / Correct Answer */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {isUserOptionSelected && (
              <Badge
                variant={isCorrect ? "secondary" : "destructive"}
                className={cn(
                  isCorrect &&
                    "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
                )}
              >
                Your Selection
              </Badge>
            )}
            {isCorrect && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
              >
                Correct Answer
              </Badge>
            )}
          </div>

          {/* Explanation (Conditional) */}
          {isShowAnswer && optionExplanation && (
            <div className="mt-3 border-t border-border/50 pt-3">
              {/* Use a subtle heading or just display */}
              {/* <h4 className="text-sm font-semibold mb-1 text-muted-foreground">Explanation</h4> */}
              <div className="prose prose-sm prose-invert dark:prose-invert max-w-none text-muted-foreground">
                <RenderMarkdown
                  source={optionExplanation}
                  // contentStyle={{ fontSize: "0.9rem" }} // Use prose-sm
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// The Legend and Summary components from your original code aren't directly used
// in the main ReviewMcq structure anymore as their info is integrated differently.
// You could keep them if needed elsewhere, or remove them.
