"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useExamModeContext } from "@/lib/exam-mode-context";
import { cn, formatTime } from "@/lib/utils";
import { Exam, Question, QuizSession } from "@prisma/client";
import axios from "axios";
import { CheckCircle, Loader2, Menu, TableOfContents } from "lucide-react";
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

  useEffect(() => {
    if (!isPending && hasEnded) return;

    function beforeUnload(e: BeforeUnloadEvent) {
      // Modern browsers handle custom messages poorly, so it's better to use the default behavior
      e.preventDefault();
      e.returnValue = ""; // Setting this makes the browser show a confirmation dialog

      // If the user decides to leave, send the beacon
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
    <section className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-10">
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
      <div
        className={`border-grid hidden h-[calc(100vh-3.5rem)] w-[85%] max-w-[300px] shrink-0 border-r bg-background transition-transform duration-300 md:sticky md:top-14 md:block md:translate-x-0 md:transition-none`}
      >
        <div className="no-scrollbar h-full overflow-auto px-4 py-2 md:sticky md:top-14">
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
            <div className="mt-auto">
              <EndQuizButton
                quizSessionId={quizSession.id}
                setHasEnded={setHasEnded}
                mcqQuestionLength={questions.length}
              />
            </div>
          )}
        </div>
      </div>
      <div className="">
        {hasEnded ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 py-10">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                <CheckCircle className="h-14 w-14" />
              </div>
              <h2 className="mb-2 text-3xl font-bold">
                Your {exam.name} Exam has Ended
              </h2>
              <p className="mb-2 max-w-md text-muted-foreground">
                Congratulations on completing your exam! Your answers have been
                submitted successfully.
              </p>
              <div className="mt-2 grid grid-cols-2 gap-4 text-center">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">
                    Total Questions
                  </p>
                  <p className="text-2xl font-bold">{questions.length}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Button className="rounded-full px-10 py-6 text-lg" asChild>
                <Link href={`/exam/${exam.id}/quiz/${quizSession.id}/results`}>
                  View Your Score
                </Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-10 py-6 text-lg"
                asChild
              >
                <Link href={`/exam/${exam.id}`}>Back to Exam Details</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-2">
            <div className="flex flex-wrap justify-between gap-4 text-sm">
              <span className="font-medium">
                Exam Mode:{" "}
                <span className="font-bold">{quizSession.examMode}</span>
              </span>
              <span className="font-medium">
                Question: <span className="font-bold">{questionIndex + 1}</span>
              </span>
              <span className="font-medium">
                Total Questions:{" "}
                <span className="font-bold">{questions.length}</span>
              </span>
            </div>

            <span>Question Type: {currentQuestion.questionType}</span>
            <div>
              <div className="my-4 md:my-6 lg:my-8">
                <RenderMarkdown source={currentQuestion.question} />
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
              <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900">
                <h3 className="my-4">Overall Explanation</h3>
                <RenderMarkdown source={currentQuestion.overallExplanation} />
              </div>
            )}
            <div className="mt-4 flex justify-between">
              <div>
                {quizSession.examMode === "PRACTICE" && (
                  <Button
                    className="rounded-full px-6 py-2"
                    onClick={() => setShowAnswer(!showAnswer)}
                  >
                    {showAnswer ? "Hide Answer" : "Show Answer"}
                  </Button>
                )}
              </div>
              <div className="space-x-4">
                <Button
                  className="rounded-full px-6 py-2"
                  onClick={handlePrevious}
                  disabled={questionIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  className="rounded-full px-6 py-2"
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
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
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
      className={`rounded-lg p-4 text-center ${isTimeCritical ? "bg-red-500" : "bg-primary dark:bg-primary-dark"} text-white`}
    >
      {mcqQuizEnded ? (
        <div>
          <h3>Exam Ended</h3>
        </div>
      ) : (
        <div>
          <h4>Time Left</h4>
          <h3>{formatTime(remainingTime)}</h3>
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
        "hover; flex transform cursor-pointer items-center gap-2 rounded-lg border-2 border-primary p-4",
        selected && "bg-primary text-white dark:bg-primary-dark",
        isShowAnswer &&
          isCorrect &&
          "border-green-500 bg-green-600 text-white dark:bg-green-800",
      )}
      onClick={onSelect}
    >
      {questionType === "multi_select" ? (
        <input
          type="checkbox"
          checked={selected}
          readOnly
          className="form-checkbox h-5 w-5 cursor-pointer text-base"
        />
      ) : (
        <input
          type="radio"
          checked={selected}
          readOnly
          className="form-radio h-5 w-5 cursor-pointer text-base"
        />
      )}
      <div className="ml-2 flex flex-col">
        <div className="w-full">
          <RenderMarkdown source={optionText!} className="bg-none" />
        </div>
        {isShowAnswer && (
          <div className="flex items-center justify-center gap-1">
            <span className="text-sm font-bold text-muted-foreground">
              Option Explanation
            </span>
            <div className={cn("", isCorrect && "text-white")}>
              {isCorrect ? (
                <RenderMarkdown
                  source={optionExplanation!}
                  contentStyle={{
                    color: "white",
                  }}
                />
              ) : (
                <RenderMarkdown source={optionExplanation!} contentStyle={{}} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
