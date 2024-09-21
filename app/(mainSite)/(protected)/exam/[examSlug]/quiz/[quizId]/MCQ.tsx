"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useExamModeContext } from "@/lib/exam-mode-context";
import { cn, formatTime } from "@/lib/utils";
import { Exam, QuizSession } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

type McqProps = {
  quizSession: QuizSession;
  exam: {
    id: string;
    name: string;
    slug: string;
    timeAllowed: number;
  };
  questions: Array<{
    id: string;
    type: string;
    question: string;
    overallExplanation: string;
    correctAnswers: Array<{
      id: string;
      answer: string;
    }>;
    options: Array<{
      id: string;
      option: string;
    }>;
  }>;
};

const MCQ = ({ quizSession, exam, questions }: McqProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQuestionNumber = parseInt(
    searchParams.get("question-number") || "1",
    10,
  );

  const { toast } = useToast();
  const totalTime = exam.timeAllowed * 60;
  const [showAnswer, setShowAnswer] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<number[]>([]);
  const [questionIndex, setQuestionIndex] = useState(currentQuestionNumber - 1);
  const [skippedAnswers, setSkippedAnswers] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const [questionStatus, setQuestionStatus] = useState(
    Array(questions.length).fill(null),
  );

  const currentQuestion = useMemo(
    () => questions[questionIndex],
    [questionIndex, questions],
  );

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

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          axios
            .post("/api/EndQuiz", { quizSessionId: quizSession.id })
            .then((response) => {
              if (response.status !== 200) {
                throw new Error("Could not end the quiz, error occurred");
              }
              toast({
                variant: "default",
                title: "Quiz has Ended",
                description: "Your Exam has Ended",
              });
            })
            .catch((error) => {
              console.error("Error updating end time:", error);
              toast({
                variant: "destructive",
                title: "Error Ending Quiz ❌",
                description:
                  "Could not update the quiz end time. Please try again.",
              });
            });
          setHasEnded(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [toast, quizSession.id]);

  const handlePrevious = useCallback(() => {
    const newQuestionNumber = Math.max(1, currentQuestionNumber - 1);
    router.push(
      `?${createQueryString("question-number", newQuestionNumber.toString())}`,
    );
    setQuestionIndex((prev) => prev - 1);
    setSelected([]);
  }, [createQueryString, currentQuestionNumber, router]);

  const handleNext = useCallback(() => {
    startTransition(async () => {
      try {
        if (isPending) return;

        let status = "skipped";

        let selectedAnswers = selected.map(
          (index) => currentQuestion.options[index].option,
        );

        if (selected.length > 0) {
          const response = await axios.post("/api/CheckAnswer", {
            questionId: currentQuestion.id,
            quizSessionId: quizSession.id,
            userAnswer:
              currentQuestion.type === "MCQ"
                ? selectedAnswers[0]
                : selectedAnswers,
          });

          if (response.status !== 200) {
            throw new Error("Error Clicking Next");
          }

          status = "attempted";
        } else {
          const response = await axios.post("/api/SkipAnswer", {
            questionId: currentQuestion.id,
            quizSessionId: quizSession.id,
          });

          if (response.status !== 200) {
            toast({
              variant: "destructive",
              title: "Error making API call to skip question",
              description: "Made an API call to skip the question",
            });
            throw new Error("Error Clicking Next");
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
          const response = await axios.post("/api/EndQuiz", {
            quizSessionId: quizSession.id,
          });

          if (response.status !== 200) {
            throw new Error("Could not end the quiz, error occurred");
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
    currentQuestion.options,
    currentQuestion.type,
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
    if (currentQuestion.type === "MCQ") {
      setSelected([index]); // Single selection for MCQ
    } else if (currentQuestion.type === "MULTI_SELECT") {
      setSelected((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index],
      ); // Toggle for multi-select
    }
  };

  const isTimeCritical = remainingTime <= 60;

  return (
    <section className="grid min-h-screen grid-cols-5">
      <div className="block-space container col-span-1 space-y-6">
        <TimeLeft
          time={formatTime(remainingTime)}
          isTimeCritical={isTimeCritical}
          quizEnded={hasEnded}
        />
        <CorrectQuestionGrid
          questionLength={questions.length}
          questionStatus={questionStatus}
        />
        <div className="flex flex-col gap-4">
          <span className="font-medium">
            Skipped Answers
            <span className="font-bold">{skippedAnswers}</span>
          </span>
        </div>

        <div className="content-end">
          <EndQuizButton quizSession={quizSession} setHasEnded={setHasEnded} />
        </div>
      </div>
      <div className="container col-span-4 space-y-4 bg-[#F5F4FA] py-4">
        {hasEnded ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <h2>Your {exam.name} Exam has Ended</h2>
            <h3>Check Your Score here 👇</h3>
            <Button
              className="mb-4 rounded-full bg-base px-10 py-6 text-base"
              asChild
            >
              <Link href={`/exam/${exam.slug}/quiz/${quizSession.id}/results`}>
                Score
              </Link>
            </Button>
          </div>
        ) : (
          <div>
            <h2>{exam.name}</h2>
            <div className="mt-4 flex justify-between">
              <span className="font-medium">
                Exam Mode{" "}
                <span className="font-bold">{quizSession.examMode}</span>
              </span>
              <span className="font-medium">
                Question <span className="font-bold">{questionIndex + 1}</span>
              </span>
              <span className="font-medium">
                Total Questions{" "}
                <span className="font-bold">{questions.length}</span>
              </span>
            </div>

            <span>Question Type: {currentQuestion.type}</span>
            <h3 className="my-4 font-medium">{currentQuestion.question}</h3>
            <div className="space-y-4">
              {currentQuestion.options.map((optionObj, index) => {
                const isSelected = selected.includes(index);
                return (
                  <div
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-lg border border-base p-4 md:p-6",
                      {
                        "border-white bg-base": isSelected,
                      },
                    )}
                  >
                    <div
                      className={cn(
                        "size-4 rounded-full border border-base transition duration-75 ease-in",
                        {
                          "border-4 border-white": isSelected,
                        },
                      )}
                    ></div>
                    <h5 className={cn("", { "text-white": isSelected })}>
                      {optionObj.option}
                    </h5>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex justify-between">
              <div className="">
                {showAnswer ? (
                  <div className="space-y-4">
                    <h3 className="text-green-400">
                      Correct Answers:{" "}
                      {currentQuestion.correctAnswers
                        .map((answerObj) => answerObj.answer)
                        .join(", ")}
                    </h3>
                    <span>{currentQuestion.overallExplanation}</span>
                  </div>
                ) : null}
                {quizSession.examMode === "PRACTICE" ? (
                  <Button
                    className="my-4 rounded-full bg-base px-10 py-6 text-base"
                    onClick={() => {
                      setShowAnswer(!showAnswer);
                    }}
                  >
                    {showAnswer ? "Hide Answer" : "Show Answer"}
                  </Button>
                ) : null}
              </div>
              <div className="space-x-4">
                <Button
                  className="mb-4 rounded-full border border-base bg-white px-10 py-6 text-base font-semibold text-baseC hover:bg-base hover:text-white"
                  onClick={handlePrevious}
                  disabled={questionIndex === 0}
                >
                  Previous Question
                </Button>
                <Button
                  className="mb-4 rounded-full bg-base px-10 py-6 text-base"
                  onClick={handleNext}
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Checking answer
                    </div>
                  ) : (
                    "Next Question"
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

function TimeLeft({
  time,
  isTimeCritical,
  quizEnded = false,
}: {
  time: string;
  isTimeCritical: boolean;
  quizEnded?: boolean;
}) {
  return (
    <div
      className={cn("rounded-lg bg-base p-4 text-center text-white", {
        "bg-red-500": isTimeCritical,
      })}
    >
      {quizEnded ? (
        <div>
          <h3>Exam Ended</h3>
        </div>
      ) : (
        <div>
          <h4>Time Left</h4>
          <h3>{time}</h3>
        </div>
      )}
    </div>
  );
}

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
          if (questionStatus[index] === "attempted") {
            statusClass = "bg-green-500 border-green-500";
          } else if (questionStatus[index] === "skipped") {
            statusClass = "bg-yellow-500 border-yellow-500";
          }
          return (
            <div
              key={index}
              className={`size-8 rounded-lg border ${statusClass}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

function EndQuizButton({
  quizSession,
  setHasEnded,
}: {
  quizSession: QuizSession;
  setHasEnded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        startTransition(async () => {
          // timeout of 3 sec
          // await new Promise((resolve) => setTimeout(resolve, 3000));

          const response = await axios.post("/api/EndQuiz", {
            quizSessionId: quizSession.id,
          });
          setHasEnded(true);
        });
      }}
      className="w-full rounded-full px-10 py-6 text-base"
      disabled={isPending}
    >
      {isPending ? "Ending Exam" : "End Exam"}
    </Button>
  );
}
