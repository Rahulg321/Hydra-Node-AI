"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn, formatTime } from "@/hooks/lib/utils";
import { Exam, Question, QuizSession } from "@prisma/client";
import axios from "axios";
import {
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Menu,
  TableOfContents,
} from "lucide-react";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import EndQuizButton from "./EndQuizButton";
import CorrectQuestionGrid from "./CorrectQuestionGrid";

import EndQuizAction from "@/actions/end-quiz";

import RenderMarkdown from "@/components/RenderMarkdown";
import { GradientButton } from "@/components/buttons/gradient-button";
import ExamAnalysingScreen from "@/components/screens/ExamAnalysingScreen";
import FinishExamDialog from "./finish-exam-dialog";

function Option({
  optionText,
  selected,
  onSelect,
  isShowAnswer, // State to toggle explanation visibility (from MCQ)
  isCorrect, // Whether this option is the correct one
  optionExplanation, // The explanation specific to this option
  questionType, // Type of question determines visual style
}: {
  questionType: "multi_select" | "multiple_choice";
  optionText: string | null;
  optionExplanation: string | null;
  selected: boolean;
  isShowAnswer: boolean;
  isCorrect: boolean;
  onSelect: () => void;
}) {
  if (!optionText) return null;

  const renderIndicator = () => {
    if (questionType === "multi_select") {
      return (
        <div
          className={cn(
            "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-white/40 transition-colors",
            selected ? "border-orange-500 bg-orange-600" : "bg-transparent",
          )}
        >
          {selected && <Check className="h-4 w-4 text-white" />}
        </div>
      );
    } else {
      // Radio button style for multiple-choice
      return (
        <div
          className={cn(
            "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-white/40 transition-colors",
            selected ? "border-orange-500 ring-1 ring-orange-600" : "", // Add ring for emphasis
          )}
        >
          {/* Inner dot for selection */}
          {selected && (
            <div className="h-2.5 w-2.5 scale-100 rounded-full bg-orange-500 transition-transform"></div>
          )}
        </div>
      );
    }
  };

  return (
    <div
      className={cn(
        "flex transform cursor-pointer flex-col rounded-lg border bg-gradient-to-br from-white/5 via-transparent to-white/5 p-4 transition hover:bg-white/10",
        // Base border
        "border-white/20",
        // Selection highlight
        selected && "border-orange-500 ring-1 ring-orange-500/60", // Adjusted ring for selection emphasis
        // Correct answer highlight (when answers shown)
        isShowAnswer &&
          isCorrect &&
          "border-green-500 bg-green-600/10 dark:bg-green-900/30",
        // Incorrect selection highlight (when answers shown)
        isShowAnswer &&
          selected &&
          !isCorrect &&
          "border-red-500 bg-red-600/10 dark:bg-red-900/30",
      )}
      onClick={onSelect}
    >
      <div className="flex items-start gap-4">
        {renderIndicator()}
        <div className="flex-1">
          <RenderMarkdown
            source={optionText!}
            contentStyle={{
              fontSize: "1.1rem",
              fontFamily: "var(--font-geist-sans)", // Example font
            }}
            className="prose prose-invert max-w-none [&_p]:my-0" // Ensure tight paragraph spacing
          />
        </div>
      </div>

      {isShowAnswer && optionExplanation && (
        <div className="mt-3 border-t border-white/10 pl-9 pt-3">
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Explanation
          </h4>
          <RenderMarkdown
            source={optionExplanation}
            contentStyle={{
              fontSize: "0.95rem",
            }}
            className="prose prose-sm prose-invert max-w-none text-muted-foreground" // Prose for formatting
          />
        </div>
      )}
    </div>
  );
}
// --- End Mock Option Component ---

// --- CountDownTimer Component (as provided) ---
function CountDownTimer({
  initialTime,
  quizSessionId,
  mcqQuizEnded,
  setMcqQuizEnded,
  mcqQuestionsLength,
}: {
  initialTime: number;
  mcqQuestionsLength: number;
  quizSessionId: string;
  mcqQuizEnded: boolean;
  setMcqQuizEnded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const [remainingTime, setRemainingTime] = useState(initialTime);

  const isTimeCritical = remainingTime <= 60;

  useEffect(() => {
    if (mcqQuizEnded) return; // Stop interval if quiz has already ended

    const interval = setInterval(async () => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          // Trigger end quiz logic only once
          if (!mcqQuizEnded) {
            (async () => {
              try {
                console.log("Timer ended, ending quiz...");
                const response = await EndQuizAction(
                  quizSessionId,
                  mcqQuestionsLength,
                );
                if (response.type === "success") {
                  toast({
                    title: "Exam Time Ended",
                    variant: "success",
                    description:
                      response.message || "Your exam was ended automatically.",
                  });
                } else {
                  toast({
                    title: "Could not End Exam ❌",
                    variant: "destructive",
                    description:
                      response.message ||
                      "There was an issue ending your exam automatically.",
                  });
                }
                setMcqQuizEnded(true); // Update state after action
              } catch (error) {
                console.error("Failed to end the quiz automatically:", error);
                toast({
                  title: "Error",
                  variant: "destructive",
                  description:
                    "An unexpected error occurred while ending the exam.",
                });
                setMcqQuizEnded(true); // Still set ended to true to stop timer etc.
              }
            })();
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quizSessionId, mcqQuizEnded, setMcqQuizEnded, toast, mcqQuestionsLength]); // Removed remainingTime from dependencies to avoid resetting interval constantly

  return (
    <div
      className={`rounded-lg p-4 text-center ${isTimeCritical ? "bg-red-600/80" : "bg-orange-700/80"} text-white`}
    >
      {mcqQuizEnded ? (
        <div>
          <h3 className="font-semibold">Exam Ended</h3>
        </div>
      ) : (
        <div>
          <h4 className="text-sm font-medium uppercase tracking-wide">
            Time Left
          </h4>
          <h3 className="transducer-font mt-1 text-2xl font-bold tracking-wider">
            {formatTime(remainingTime)}
          </h3>
        </div>
      )}
    </div>
  );
}
// --- End CountDownTimer Component ---

type McqProps = {
  quizSession: QuizSession;
  exam: {
    id: string;
    name: string;
    slug: string;
    timeAllowed: number;
  };
  questions: Question[];
};

const MCQ = ({ quizSession, exam, questions }: McqProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQuestionNumber = parseInt(
    searchParams.get("question-number") || "1",
    10,
  );

  const { toast } = useToast();

  const totalQuizTime = (quizSession.examTime || exam.timeAllowed) * 60;

  const [openSheet, setOpenSheet] = React.useState(false); // State for mobile sheet
  const [sidebarOpen, setSidebarOpen] = useState(true); // State for desktop sidebar
  const [showAnswer, setShowAnswer] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<number[]>([]);
  const [questionIndex, setQuestionIndex] = useState(currentQuestionNumber - 1);
  const [skippedAnswers, setSkippedAnswers] = useState(0);
  const [hasEnded, setHasEnded] = useState(quizSession.isCompleted);
  const [questionStatus, setQuestionStatus] = useState<
    ("attempted" | "skipped" | null)[]
  >(Array(questions.length).fill(null));
  const currentQuestion = questions[questionIndex];
  const [isEnding, setIsEnding] = useState(false);

  const [allSelections, setAllSelections] = useState<Record<string, number[]>>(
    {},
  );

  useEffect(() => {
    setSelected(allSelections[currentQuestion.id] || []);
    setShowAnswer(false);
  }, [currentQuestion.id, allSelections]);

  useEffect(() => {
    if (hasEnded && !isEnding) {
      setIsEnding(true);
    }
  }, [hasEnded, isEnding]);

  useEffect(() => {
    if (hasEnded) return;

    function beforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to leave? Your progress might be lost if the exam hasn't finished submitting."; // Standard confirmation message

      // Use sendBeacon for reliable background data sending
      // Ensure your API route /api/EndQuiz can handle potentially incomplete data
      // or is primarily used for marking an abrupt exit.
      // Consider if you need to send more state here.
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/EndQuiz", // Make sure this endpoint exists and handles the request
          JSON.stringify({
            quizSessionId: quizSession.id,
            abruptExit: true, // Flag to indicate potentially incomplete submission
          }),
        );
      } else {
        // Fallback for older browsers (less reliable)
        axios.post(
          "/api/EndQuiz",
          {
            quizSessionId: quizSession.id,
            abruptExit: true,
          },
          {
            signal: AbortSignal.timeout(5000), // 5 second timeout
          },
        );
      }
    }

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [hasEnded, quizSession.id]); // Rerun only if hasEnded or quizSession.id changes

  // Effect to sync questionIndex with URL query parameter
  useEffect(() => {
    const questionNumberFromURL = parseInt(
      searchParams.get("question-number") || "1",
      10,
    );
    // Ensure index is within bounds
    const newIndex = Math.max(
      0,
      Math.min(questions.length - 1, questionNumberFromURL - 1),
    );

    if (newIndex !== questionIndex) {
      setQuestionIndex(newIndex);
      setShowAnswer(false); // Hide answer when navigating
    }
  }, [searchParams, questions.length, questionIndex]); // Removed questionIndex dependency to prevent potential loops

  // Function to update URL query parameters
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  // Navigate to Previous Question
  const handlePrevious = useCallback(() => {
    if (questionIndex === 0) return; // Already at the first question
    const newQuestionNumber = questionIndex; // Target index is current index - 1, so number is current index
    router.push(
      `?${createQueryString("question-number", newQuestionNumber.toString())}`,
      { scroll: false }, // Prevent page scroll on navigation
    );
    // State updates (like setSelected, setShowAnswer) will happen in the useEffect watching searchParams
  }, [createQueryString, questionIndex, router]);

  // Navigate to Next Question (or End Quiz)
  const handleNext = useCallback(() => {
    if (isPending || hasEnded) return; // Prevent multiple submissions or actions after end

    startTransition(async () => {
      try {
        let status: "attempted" | "skipped" = "skipped";
        const questionId = currentQuestion.id;
        const quizSessionId = quizSession.id;
        const questionType = currentQuestion.questionType;

        if (selected.length > 0) {
          // Attempted the question
          const userAnswer = selected; // Use the state directly
          console.log("Checking Answer:", {
            questionId,
            quizSessionId,
            questionType,
            userAnswer,
          });
          const response = await axios.post("/api/CheckAnswer", {
            questionId,
            quizSessionId,
            questionType,
            userAnswer,
          });

          if (response.status !== 200) {
            console.error("CheckAnswer API Error:", response);
            throw new Error("Server error while submitting answer.");
          }
          // Optionally: update UI based on correctness immediately if desired (e.g., for practice mode)
          // if (quizSession.examMode === "PRACTICE") { /* Update some visual feedback */ }
          status = "attempted";
          toast({ title: "Answer Submitted", variant: "default" }); // Simple confirmation
        } else {
          // Skipped the question
          console.log("Skipping Answer:", { questionId, quizSessionId });
          const response = await axios.post("/api/SkipAnswer", {
            questionId,
            quizSessionId,
          });

          if (response.status !== 200) {
            console.error("SkipAnswer API Error:", response);
            throw new Error("Server error while skipping question.");
          }
          toast({
            title: "Question Skipped ⛷️",
            variant: "default",
          });
          status = "skipped"; // Status remains skipped
        }

        // Update question status locally
        setQuestionStatus((prevStatus) => {
          const updatedStatus = [...prevStatus];
          updatedStatus[questionIndex] = status;
          return updatedStatus;
        });

        // Update skipped count if necessary (though maybe better derived from questionStatus)
        if (status === "skipped") {
        }

        // Check if it was the last question
        if (questionIndex === questions.length - 1) {
          console.log("Last question answered/skipped, ending quiz...");

          return; // Stop further navigation
        }

        // Navigate to the next question
        const newQuestionNumber = questionIndex + 2; // Target index + 1 for number
        router.push(
          `?${createQueryString("question-number", newQuestionNumber.toString())}`,
          { scroll: false },
        );
        // State updates (setSelected, setShowAnswer) handled by useEffect
      } catch (error: any) {
        console.error("Error during next question transition:", error);
        toast({
          variant: "destructive",
          title: "Navigation Error ❌",
          description:
            error.message ||
            "Could not proceed to the next question. Please try again.",
        });
      }
    });
  }, [
    currentQuestion?.id, // Use optional chaining in case currentQuestion is briefly undefined
    currentQuestion?.questionType,
    questionIndex,
    quizSession.id,
    // quizSession.examMode, // Include if logic depends on it
    questions.length,
    router,
    selected,
    createQueryString,
    isPending,
    hasEnded,
    toast,
    startTransition, // Ensure startTransition is stable or included
  ]);

  const handleSelectOption = (idx: number) => {
    const qid = currentQuestion.id;
    const prev = allSelections[qid] || [];
    let next: number[];

    if (currentQuestion.questionType === "multiple_choice") {
      next = prev[0] === idx ? [] : [idx];
    } else {
      next = prev.includes(idx)
        ? prev.filter((i) => i !== idx)
        : [...prev, idx];
    }

    setAllSelections((s) => ({ ...s, [qid]: next }));
  };
  const calculatedSkippedAnswers = useMemo(() => {
    return questionStatus.filter((s) => s === "skipped").length;
  }, [questionStatus]);

  // Render Loading or Ended State first
  if (isEnding) {
    // Show loading/analysing screen immediately when isEnding is true
    return (
      <ExamAnalysingScreen examId={exam.id} quizSessionId={quizSession.id} />
    );
  }

  return (
    <div>
      <section
        className={cn(
          "flex flex-1 flex-col md:grid",
          "min-h-screen",
          sidebarOpen
            ? "md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)]" // Sidebar open widths (adjust px)
            : "md:grid-cols-[60px_minmax(0,1fr)] lg:grid-cols-[70px_minmax(0,1fr)]", // Sidebar closed widths (adjust px)
          "transition-all duration-300 ease-in-out",
        )}
      >
        <div className="sticky top-0 z-30 bg-background p-2 md:hidden">
          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Menu className="mr-2 size-4" />
                Menu / Progress
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex h-full flex-col p-4 pt-8" // Added flex column layout
              // className="max-h-[calc(100vh)] overflow-y-auto" // Original style - Keep if needed
            >
              <SheetHeader className="mb-4">
                <SheetTitle>{exam.name}</SheetTitle>
              </SheetHeader>
              <div className="flex-grow overflow-y-auto pr-2">
                {" "}
                {/* Scrollable content area */}
                <CountDownTimer
                  initialTime={totalQuizTime}
                  quizSessionId={quizSession.id}
                  mcqQuizEnded={hasEnded}
                  setMcqQuizEnded={setHasEnded}
                  mcqQuestionsLength={questions.length}
                />
                <div className="my-4">
                  <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
                    Progress
                  </h4>
                  <CorrectQuestionGrid
                    questionLength={questions.length}
                    questionStatus={questionStatus}
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1 text-sm">
                  <span className="font-medium">
                    Skipped:{" "}
                    <span className="font-bold">
                      {calculatedSkippedAnswers}
                    </span>
                  </span>
                  <span className="font-medium">
                    Attempted:{" "}
                    <span className="font-bold">
                      {questionStatus.filter((s) => s === "attempted").length}
                    </span>
                  </span>
                </div>
              </div>

              {!hasEnded && (
                <div className="mt-auto border-t pt-4">
                  <EndQuizButton
                    quizSessionId={quizSession.id}
                    setHasEnded={setHasEnded}
                    mcqQuestionLength={questions.length}
                    remainingQuestions={questions.length - questionIndex}
                  />
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
        {/* --- Desktop Sidebar (Hidden on Mobile) --- */}
        <div
          className={cn(
            "border-grid relative hidden min-h-screen border-r md:flex md:flex-col", // Use flex column for content alignment
            "transition-all duration-300 ease-in-out", // Ensure width transition is smooth
            !sidebarOpen && "overflow-hidden", // Hide content overflow when collapsed
          )}
        >
          {/* Sidebar Content Area (Scrollable) */}
          <div
            className={cn(
              "no-scrollbar flex-grow overflow-y-auto p-4 transition-opacity duration-200 ease-in-out lg:p-6",
              sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0", // Fade content, disable interaction when hidden
            )}
          >
            <h3 className="mb-4 text-lg font-semibold">{exam.name}</h3>
            <CountDownTimer
              initialTime={totalQuizTime}
              quizSessionId={quizSession.id}
              mcqQuizEnded={hasEnded}
              setMcqQuizEnded={setHasEnded}
              mcqQuestionsLength={questions.length}
            />
            <div className="my-4">
              <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
                Progress
              </h4>
              <CorrectQuestionGrid
                questionLength={questions.length}
                questionStatus={questionStatus}
              />
            </div>
            {!hasEnded && sidebarOpen && (
              <div className="mx-auto">
                <EndQuizButton
                  quizSessionId={quizSession.id}
                  setHasEnded={setHasEnded}
                  mcqQuestionLength={questions.length}
                  remainingQuestions={questions.length - questionIndex}
                />
              </div>
            )}
          </div>

          {sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="absolute right-2 top-3 z-10 text-muted-foreground hover:text-foreground" // Positioned inside
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="size-5" />
            </Button>
          )}

          {!sidebarOpen && (
            <Button
              variant="outline" // Use outline or ghost
              size="icon"
              className="absolute left-1/2 top-6 z-20 -translate-x-1/2 transform" // Centered in the collapsed bar
              onClick={() => setSidebarOpen(true)}
              aria-label="Expand sidebar"
            >
              <ChevronRight className="size-5" />
            </Button>
          )}
        </div>
        {/* --- Main Content Area --- */}
        <div
          className={cn(
            "min-w-0 flex-1", // flex-1 allows it to take remaining space, min-w-0 prevents overflow issues
            "transition-all duration-300 ease-in-out", // Allow smooth resizing if needed (though grid handles it)
          )}
        >
          <div className="px-4 py-6 md:py-8 lg:py-10">
            {" "}
            {/* Constrain content width */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm md:mb-6">
              <p className="text-base font-medium text-muted-foreground md:text-lg">
                Question:{" "}
                <span className="font-bold text-foreground">
                  {questionIndex + 1}
                </span>
                <span className="mx-1">/</span>
                <span>{questions.length}</span>
              </p>
              {/* Potentially add flags or other indicators here */}
            </div>
            {/* Question Display */}
            <div className="mb-6 md:mb-8 lg:mb-10">
              <RenderMarkdown
                source={currentQuestion.question}
                // Adjusted styling for better readability
                contentStyle={{
                  fontSize: "1.25rem", // Slightly smaller than 2rem
                  lineHeight: "1.7", // Improved line spacing
                  color: "var(--foreground)", // Use CSS variable
                }}
                className="prose prose-invert prose-p:text-foreground prose-headings:text-foreground prose-strong:text-foreground max-w-none" // Example prose styling
              />
            </div>
            {/* Options */}
            <div className="space-y-3">
              {/* Map through potential options (assuming up to 6) */}
              {[...Array(6)].map((_, i) => {
                // @ts-ignore - Prisma types might not directly index like this easily
                const optionText = currentQuestion[`answerOption${i + 1}`] as
                  | string
                  | null;
                // @ts-ignore
                const optionExp = currentQuestion[`explanation${i + 1}`] as
                  | string
                  | null;

                if (!optionText) return null;

                const correctAnswersArray = currentQuestion.correctAnswers
                  .split(",")
                  .map(Number);
                const isCorrect = correctAnswersArray.includes(i + 1);
                const isSelected = selected.includes(i + 1);

                return (
                  <Option
                    key={i}
                    questionType={
                      currentQuestion.questionType as
                        | "multi_select"
                        | "multiple_choice"
                    }
                    optionText={optionText}
                    isShowAnswer={showAnswer} // Pass state to Option
                    optionExplanation={optionExp}
                    isCorrect={isCorrect}
                    selected={isSelected}
                    onSelect={() => handleSelectOption(i + 1)}
                  />
                );
              })}
            </div>
            {/* Show Answer / Explanation Section */}
            {showAnswer && (
              <div className="mt-6 rounded-lg border border-green-700/50 bg-green-900/30 p-4 md:mt-8">
                <h3 className="mb-3 text-lg font-semibold text-green-300">
                  Overall Explanation
                </h3>
                <RenderMarkdown
                  source={
                    currentQuestion.overallExplanation ||
                    "No overall explanation provided."
                  }
                  contentStyle={{
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    color: "var(--foreground)", // Use CSS variable
                  }}
                  className="prose prose-invert prose-p:text-foreground/90 max-w-none"
                />
              </div>
            )}
            {/* Action Buttons */}
            <div className="mt-6 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-6 md:mt-8 md:flex-row md:pt-8">
              <div>
                {/* Show Answer Button (Practice Mode Only) */}
                {quizSession.examMode === "PRACTICE" && !hasEnded && (
                  <GradientButton
                    variant="outline" // Maybe outline style fits better here
                    size="xl"
                    onClick={() => setShowAnswer(!showAnswer)}
                  >
                    {showAnswer ? "Hide Answer" : "Show Answer"}
                  </GradientButton>
                )}
              </div>
              <div className="flex w-full justify-between space-x-3 md:w-auto">
                <GradientButton
                  variant="secondary" // Use secondary style for previous
                  size="xl"
                  onClick={handlePrevious}
                  disabled={questionIndex === 0 || isPending || hasEnded}
                >
                  Previous
                </GradientButton>
                {questionIndex === questions.length - 1 ? (
                  <FinishExamDialog
                    quizSessionId={quizSession.id}
                    questionsLength={questions.length}
                    setHasEnded={setHasEnded}
                    skippedQuestions={calculatedSkippedAnswers}
                    questionId={currentQuestion.id}
                    questionType={currentQuestion.questionType}
                    selectedQuestions={selected}
                  />
                ) : (
                  <GradientButton
                    size="xl"
                    onClick={handleNext}
                    disabled={isPending || hasEnded} // Disable if pending or quiz ended
                  >
                    {
                      isPending ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Submitting...</span>
                        </div>
                      ) : questionIndex === questions.length - 1 ? (
                        "Finish Exam"
                      ) : (
                        "Next"
                      ) // Change text for last question
                    }
                  </GradientButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MCQ;
