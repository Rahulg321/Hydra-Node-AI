"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn, formatTime } from "@/lib/utils";
import { Exam, Question, QuizSession } from "@prisma/client";
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

// type McqProps = {
//   quiz: QuizSession & {
//     exam: Exam & {
//       questions: Omit<Question, "answer">[];
//     };
//   };
// };

type McqProps = {
  quiz: QuizSession & {
    exam: Exam & {
      questions: Pick<Question, "id" | "options" | "question">[];
    };
  };
};

type Option = {
  [key: string]: string;
};

const MCQ = ({ quiz }: McqProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuestionNumber = parseInt(
    searchParams.get("question-number") || "1",
    10,
  );

  const { toast } = useToast();
  // total time(min) into seconds
  let totalTime = quiz.exam.timeAllowed * 60;

  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState(-1);
  const [questionIndex, setQuestionIndex] = useState(currentQuestionNumber);
  const [skippedAnswers, setSkippedAnswers] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const [questionStatus, setQuestionStatus] = useState(
    Array(quiz.exam.questions.length).fill(null),
  );

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    setQuestionIndex(currentQuestionNumber - 1);
  }, [currentQuestionNumber]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          // the time expired, need to send an api call to endQuiz and update the time ended on the session
          // will update the end time on the session
          axios
            .post("/api/EndQuiz", {
              quizSessionId: quiz.id,
            })
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

    return () => {
      clearInterval(interval);
    };
  }, [toast, quiz.id]);

  const currentQuestion = useMemo(() => {
    return quiz.exam.questions[questionIndex];
  }, [questionIndex, quiz]);

  const options: Option[] = useMemo(() => {
    return JSON.parse(currentQuestion.options as string);
  }, [currentQuestion]);

  const handlePrevious = useCallback(() => {
    const newQuestionNumber = Math.max(1, currentQuestionNumber - 1);
    router.push(
      `?${createQueryString("question-number", newQuestionNumber.toString())}`,
    );
    setQuestionIndex((prev) => prev - 1);
    setSelected(-1);
  }, [createQueryString, currentQuestionNumber, router]);

  const handleNext = useCallback(() => {
    startTransition(async () => {
      try {
        if (isPending) {
          // so that we dont spam the next button and once a next request is send it is being processed
          return;
        }

        let status = "skipped"; // Default status if the question is skipped

        if (selected !== -1) {
          const selectedAnswer = Object.values(options[selected])[0];

          const response = await axios.post("/api/CheckAnswer", {
            questionId: currentQuestion.id,
            quizSessionId: quiz.id,
            userAnswer: selectedAnswer,
          });

          if (response.status !== 200) {
            throw new Error("Error Clicking Next");
          }

          status = "attempted";
        } else {
          const response = await axios.post("/api/SkipAnswer", {
            questionId: currentQuestion.id,
            quizSessionId: quiz.id,
          });

          if (response.status !== 200) {
            toast({
              variant: "destructive",
              title: "error making api call to skip question",
              description: "made an api call to skip the question",
            });
            throw new Error("Error Clicking Next");
          }

          toast({
            title: "Successfully skipped a question ⛷️",
            description: "made an api call to skip the question",
          });
        }

        // Update the status of the current question
        setQuestionStatus((prevStatus) =>
          prevStatus.map((s, index) => (index === questionIndex ? status : s)),
        );

        if (status === "skipped") {
          setSkippedAnswers((prev) => prev + 1);
        }

        if (questionIndex === quiz.exam.questions.length - 1) {
          // we end the quiz here, need to make an api call to update the end time for our quiz session
          const response = await axios.post("/api/EndQuiz", {
            quizSessionId: quiz.id,
          });

          if (response.status !== 200) {
            throw new Error("Could not end the quiz, error occurred");
          }

          setHasEnded(true);
          return;
        }

        const newQuestionNumber = Math.min(
          quiz.exam.questions.length,
          currentQuestionNumber + 1,
        );

        router.push(
          `?${createQueryString("question-number", newQuestionNumber.toString())}`,
        );

        setSelected(-1); // Reset selected option for the next question
      } catch (error) {
        console.log("error occurred while checking answer", error);
        toast({
          variant: "destructive",
          title: "Error Clicking Next ❌",
          description: "Error, Please try again",
        });
      }
    });
  }, [
    currentQuestion.id,
    quiz.id,
    options,
    selected,
    toast,
    isPending,
    questionIndex,
    quiz.exam.questions.length,
    createQueryString,
    currentQuestionNumber,
    router,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "1") {
        setSelected(0);
      } else if (event.key === "2") {
        setSelected(1);
      } else if (event.key === "3") {
        setSelected(2);
      } else if (event.key === "4") {
        setSelected(3);
      } else if (event.key === "Enter") {
        handleNext();
      } else if (event.key === "Escape") {
        setSelected(-1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);

  const isTimeCritical = remainingTime <= 60;

  return (
    <section className="grid min-h-screen grid-cols-5">
      <div className="block-space container col-span-1">
        {hasEnded ? (
          <TimeLeft
            time={formatTime(remainingTime)}
            isTimeCritical={isTimeCritical}
            quizEnded={hasEnded}
          />
        ) : (
          <TimeLeft
            time={formatTime(remainingTime)}
            isTimeCritical={isTimeCritical}
          />
        )}
        <CorrectQuestionGrid
          questionLength={quiz.exam.questions.length}
          questionStatus={questionStatus}
        />
        <div className="mt-4 flex flex-col gap-4">
          <span className="font-medium">
            Skipped Answers
            <span className="font-bold">{skippedAnswers}</span>
          </span>
        </div>
      </div>
      <div className="container col-span-4 space-y-4 bg-[#F5F4FA] py-4">
        {hasEnded ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <h2>Your {quiz.exam.name} Exam has Ended</h2>
            <h3>Check Your Score here 👇</h3>
            <Button
              className="mb-4 rounded-full bg-base px-10 py-6 text-base"
              asChild
            >
              <Link href={`/exam/${quiz.exam.slug}/quiz/${quiz.id}/results`}>
                Score
              </Link>
            </Button>
          </div>
        ) : (
          <div>
            <h2>{quiz.exam.name}</h2>
            <div className="mt-4 flex justify-between">
              <span className="font-medium">
                Question <span className="font-bold">{questionIndex + 1}</span>
              </span>
              <span className="font-medium">
                Total Questions{" "}
                <span className="font-bold">{quiz.exam.questions.length}</span>
              </span>
            </div>

            <h3 className="my-4 font-medium">{currentQuestion.question}</h3>

            <div className="space-y-4">
              {options.map((optionObj, index) => {
                // Extract the value from the object
                const optionText = Object.values(optionObj)[0];
                console.log("index of question is", index);
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSelected(index);
                    }}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-lg border border-base p-4 md:p-6",
                      {
                        "border-white bg-base": selected === index,
                      },
                    )}
                  >
                    <div
                      className={cn(
                        "size-4 rounded-full border border-base transition duration-75 ease-in",
                        {
                          "border-4 border-white": selected === index,
                        },
                      )}
                    ></div>
                    <h5
                      className={cn("", {
                        "text-white": selected === index,
                      })}
                    >
                      {optionText}
                    </h5>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex justify-between">
              <Button className="mb-4 rounded-full bg-base px-10 py-6 text-base">
                Show Answer
              </Button>
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
  questionStatus: (string | null)[]; // Add the questionStatus prop
};

function CorrectQuestionGrid({
  questionLength,
  questionStatus,
}: QuestionGridProps) {
  return (
    <div className="bg-muted p-4">
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: questionLength }).map((_, index) => {
          let statusClass = "border-base"; // Default class
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
