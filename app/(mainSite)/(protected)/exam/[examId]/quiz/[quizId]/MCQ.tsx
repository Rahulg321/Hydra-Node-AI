"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useExamModeContext } from "@/lib/exam-mode-context";
import { cn, formatTime } from "@/lib/utils";
import { Exam, Question, QuizSession } from "@prisma/client";
import axios from "axios";
import {
  Check,
  CheckCircle,
  Loader2,
  Menu,
  TableOfContents,
} from "lucide-react";
import Link from "next/link";
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
import TimeLeft from "./TimeLeft";
import CorrectQuestionGrid from "./CorrectQuestionGrid";
import HtmlContent from "@/components/html-content";
import EndQuizAction from "@/actions/end-quiz";
import MarkdownQuestion from "@/components/MarkdownQuestion";
import MDEditor from "@uiw/react-md-editor";
import RenderMarkdown from "@/components/RenderMarkdown";
import { GradientButton } from "@/components/buttons/gradient-button";
import ExamAnalysingScreen from "@/components/screens/ExamAnalysingScreen";
import ExamEndedScreen from "@/components/screens/ExamEndedScreen";

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

  const totalQuizTime = quizSession.examTime * 60;

  const [open, setOpen] = React.useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<number[]>([]);
  const [questionIndex, setQuestionIndex] = useState(currentQuestionNumber - 1);
  const [skippedAnswers, setSkippedAnswers] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [questionStatus, setQuestionStatus] = useState(
    Array(questions.length).fill(null),
  );
  const currentQuestion = questions[questionIndex];
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    const analysePerformance = async () => {
      await new Promise((resolve) => setTimeout(resolve, 12000));
      setIsEnding(false);
    };

    if (hasEnded) {
      setIsEnding(true);
      analysePerformance();
    }
  }, [hasEnded]);

  useEffect(() => {
    if (!isPending && hasEnded) return;

    function beforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";

      window.navigator.sendBeacon(
        "/api/EndQuiz",
        JSON.stringify({
          quizSessionId: quizSession.id,
        }),
      );
    }

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [isPending, hasEnded, quizSession.id]);

  // This effect updates the questionIndex when the query string changes
  useEffect(() => {
    const questionNumber = parseInt(
      searchParams.get("question-number") || "1",
      10,
    );
    setQuestionIndex(questionNumber - 1); // Update the questionIndex based on query params
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handlePrevious = useCallback(() => {
    const newQuestionNumber = Math.max(1, currentQuestionNumber - 1);
    router.push(
      `?${createQueryString("question-number", newQuestionNumber.toString())}`,
    );
    setSelected([]);
  }, [createQueryString, currentQuestionNumber, router]);

  const handleNext = useCallback(() => {
    startTransition(async () => {
      try {
        if (isPending) return;

        let status = "skipped";
        let questionId = currentQuestion.id;
        let quizSessionId = quizSession.id;
        let questionType = currentQuestion.questionType;

        // check if any answer is selected
        if (selected.length > 0) {
          // Make an API call to check the answer
          const userAnswer = selected;

          console.log({ questionId, quizSessionId, questionType, userAnswer });

          const response = await axios.post("/api/CheckAnswer", {
            questionId,
            quizSessionId,
            questionType,
            userAnswer,
          });

          if (response.status !== 200) {
            throw new Error("Server Side Error while submitting question");
          }

          status = "attempted";
        } else {
          const response = await axios.post("/api/SkipAnswer", {
            questionId,
            quizSessionId,
          });

          if (response.status !== 200) {
            throw new Error("Server Side Error while skipping a question");
          }

          toast({
            title: "Successfully skipped a question ⛷️",
            description: "Made an API call to skip the question",
          });
        }

        // Update the status of the current question
        setQuestionStatus((prevStatus) => {
          const updatedStatus = [...prevStatus];
          updatedStatus[questionIndex] = status;
          return updatedStatus; // Update only the necessary index
        });

        if (status === "skipped") {
          setSkippedAnswers((prev) => prev + 1);
        }

        if (questionIndex === questions.length - 1) {
          const response = await EndQuizAction(quizSessionId, questions.length);

          if (response.type === "success") {
            toast({
              title: "Successfully Ended Mcq Exam",
              variant: "success",
              description:
                response.message || "Your exam was ended successfully",
            });
          } else {
            toast({
              title: "Could not End Exam ❌",
              variant: "destructive",
              description:
                response.message || "There was an issue ending your exam",
            });
          }
          setHasEnded(true);
          return;
        }

        const newQuestionNumber = Math.min(
          questions.length,
          currentQuestionNumber + 1,
        );

        router.push(
          `?${createQueryString("question-number", newQuestionNumber.toString())}`,
        );

        setSelected([]);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error Clicking Next ❌",
          description: "Error, Please try again",
        });
      }
    });
  }, [
    currentQuestion.id,
    currentQuestion.questionType,
    currentQuestionNumber,
    questionIndex,
    quizSession.id,
    questions.length,
    router,
    selected,
    createQueryString,
    isPending,
    toast,
  ]);

  const handleSelectOption = (index: number) => {
    if (currentQuestion.questionType === "multiple_choice") {
      // For single choice questions, deselect if already selected
      setSelected((prevSelected) => (prevSelected[0] === index ? [] : [index]));
    }

    if (currentQuestion.questionType === "multi_select") {
      setSelected((prevSelected) => {
        if (prevSelected.includes(index)) {
          // Deselect if already selected
          return prevSelected.filter((i) => i !== index);
        }
        // Otherwise, add it to the selected list
        return [...prevSelected, index];
      });
    }
  };

  return (
    <div>
      {isEnding ? (
        <div>
          <ExamAnalysingScreen />
        </div>
      ) : hasEnded ? (
        <ExamEndedScreen
          examName={exam.name}
          questionsLength={questions.length}
          examId={exam.id}
          quizSessionId={quizSession.id}
        />
      ) : (
        <section className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[340px_minmax(0,1fr)]">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="mt-2 w-fit md:hidden">
                <TableOfContents className="mr-2 size-4" />
                View Questions
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="max-h-[calc(100vh)] overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle>MCQ Sidebar</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <CountDownTimer
                  initialTime={totalQuizTime}
                  quizSessionId={quizSession.id}
                  mcqQuizEnded={hasEnded}
                  setMcqQuizEnded={setHasEnded}
                  mcqQuestionsLength={questions.length}
                />
                <CorrectQuestionGrid
                  questionLength={questions.length}
                  questionStatus={questionStatus}
                />
                <div className="flex flex-col gap-4">
                  <span className="font-medium">
                    Skipped Answers:{" "}
                    <span className="font-bold">{skippedAnswers}</span>
                  </span>
                </div>

                {!hasEnded && (
                  <div className="mt-auto">
                    <EndQuizButton
                      quizSessionId={quizSession.id}
                      setHasEnded={setHasEnded}
                      mcqQuestionLength={questions.length}
                    />
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <div className="border-grid hidden h-[calc(100vh-3.5rem)] w-[85%] max-w-[300px] shrink-0 border-r md:block">
            <div className="no-scrollbar h-full overflow-auto px-4 py-4 md:py-6 lg:py-8">
              <div className="sticky top-0 z-10 bg-background pb-4">
                <h3 className="mb-4">{exam.name}</h3>
                <CountDownTimer
                  initialTime={totalQuizTime}
                  quizSessionId={quizSession.id}
                  mcqQuizEnded={hasEnded}
                  setMcqQuizEnded={setHasEnded}
                  mcqQuestionsLength={questions.length}
                />
                <CorrectQuestionGrid
                  questionLength={questions.length}
                  questionStatus={questionStatus}
                />
                <div className="my-4 flex flex-col gap-4">
                  <span className="font-medium">
                    Skipped Answers:{" "}
                    <span className="font-bold">{skippedAnswers}</span>
                  </span>
                </div>

                {!hasEnded && (
                  <div className="mt-4">
                    <EndQuizButton
                      quizSessionId={quizSession.id}
                      setHasEnded={setHasEnded}
                      mcqQuestionLength={questions.length}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <div className="px-4 py-4 md:py-6 lg:py-8">
              <div className="flex flex-wrap justify-between gap-4 text-sm">
                <p className="text-lg font-medium text-[#737373]">
                  Question:{" "}
                  <span className="font-bold">{questionIndex + 1}</span>
                </p>
              </div>

              <div>
                <div className="my-4 md:my-6 lg:my-8">
                  <RenderMarkdown
                    source={currentQuestion.question}
                    contentStyle={{
                      fontSize: "2rem",
                      lineHeight: "2.5rem",
                      color: "white",
                    }}
                  />
                </div>
                <div className="space-y-4">
                  {/* TODO:-  figure out why this does not work */}
                  {[...Array(6)].map((_, i) => {
                    let questionType = currentQuestion.questionType;

                    // @ts-ignore
                    let optionText = currentQuestion[`answerOption${i + 1}`];

                    let correctAnswers = currentQuestion.correctAnswers;
                    let correctAnswersArray = correctAnswers
                      .split(",")
                      .map(Number);

                    // @ts-ignore
                    let optionExp = currentQuestion[`explanation${i + 1}`];

                    let isCorrect = correctAnswersArray.includes(i + 1);

                    return (
                      <Option
                        key={i}
                        questionType={questionType}
                        optionText={optionText}
                        isShowAnswer={showAnswer}
                        optionExplanation={optionExp}
                        isCorrect={isCorrect}
                        selected={selected.includes(i + 1)}
                        onSelect={() => {
                          handleSelectOption(i + 1);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              {showAnswer && (
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
              <div className="mt-4 flex justify-between">
                <div>
                  {quizSession.examMode === "PRACTICE" && (
                    <GradientButton
                      className=""
                      onClick={() => setShowAnswer(!showAnswer)}
                    >
                      {showAnswer ? "Hide Answer" : "Show Answer"}
                    </GradientButton>
                  )}
                </div>
                <div className="space-x-4">
                  <GradientButton
                    className=""
                    onClick={handlePrevious}
                    disabled={questionIndex === 0}
                  >
                    Previous
                  </GradientButton>
                  <GradientButton
                    className=""
                    onClick={handleNext}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Checking
                      </div>
                    ) : (
                      "Next"
                    )}
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MCQ;

// after the timer has expired it automatically ends the quiz using the correct values
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
    const interval = setInterval(async () => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });

      if (remainingTime <= 1 && !mcqQuizEnded) {
        try {
          const response = await EndQuizAction(
            quizSessionId,
            mcqQuestionsLength,
          );

          if (response.type === "success") {
            toast({
              title: "Successfully Ended Mcq Exam",
              variant: "success",
              description:
                response.message || "Your exam was ended successfully",
            });
          } else {
            toast({
              title: "Could not End Exam ❌",
              variant: "destructive",
              description:
                response.message || "There was an issue ending your exam",
            });
          }
          setMcqQuizEnded(true);
        } catch (error) {
          console.error("Failed to end the quiz:", error);
          toast({
            title: "Error",
            variant: "destructive",

            description: "An unexpected error occurred while ending the exam.",
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    quizSessionId,
    mcqQuizEnded,
    setMcqQuizEnded,
    remainingTime,
    toast,
    mcqQuestionsLength,
  ]);

  return (
    <div
      className={`rounded-lg p-4 text-center ${isTimeCritical ? "bg-red-500" : "bg-orange-700"} text-white`}
    >
      {mcqQuizEnded ? (
        <div>
          <h3>Exam Ended</h3>
        </div>
      ) : (
        <div>
          <h4>Time Left</h4>
          <h3 className="transducer-font mt-2 tracking-wider">
            {formatTime(remainingTime)}
          </h3>
        </div>
      )}
    </div>
  );
}

function Option({
  questionType,
  optionText,
  optionExplanation,
  selected,
  onSelect,
  isShowAnswer,
  isCorrect,
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

  return (
    <div
      className={cn(
        "flex transform cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-br from-white/10 via-white/0 to-white/10 p-4",
        selected && "bg-orange-700 text-white",
        isShowAnswer && isCorrect && "border-green-500 bg-green-800 text-white",
      )}
      onClick={onSelect}
    >
      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white">
        {selected && (
          <div className="rounded-full bg-white">
            <Check className="h-5 w-5 text-orange-700" />
          </div>
        )}
      </div>
      <div className="ml-2 flex flex-col">
        <div className="mb-2 w-full">
          <RenderMarkdown
            source={optionText!}
            contentStyle={{
              fontSize: "1.2rem",
              fontFamily: "var(--font-geist-sans)",
            }}
          />
        </div>
        {isShowAnswer && (
          <div className="flex flex-col gap-1 border-t border-white/20 pt-2">
            <h4 className="">Explanation</h4>
            <div className={cn("", isCorrect && "text-white")}>
              {isCorrect ? (
                <RenderMarkdown
                  source={optionExplanation!}
                  contentStyle={{
                    fontSize: "1rem",
                  }}
                  className="text-white"
                />
              ) : (
                <RenderMarkdown
                  source={optionExplanation!}
                  contentStyle={{
                    fontSize: "1rem",
                  }}
                  className="text-white"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
