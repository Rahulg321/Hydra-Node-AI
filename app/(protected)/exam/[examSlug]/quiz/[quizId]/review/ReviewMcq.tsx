"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Exam, Question, QuizSession, UserAttempt } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import StartExamButton from "../../../StartExamButton";

type ReviewMcqProps = {
  quiz: QuizSession & {
    userAttempts: (UserAttempt & {
      question: Question;
    })[];
    exam: Exam; // Add this line to include the 'exam' object
  };
};

type Option = {
  [key: string]: string;
};

const ReviewMcq = ({ quiz }: ReviewMcqProps) => {
  const [userAttemptIndex, setUserAttemptIndex] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentAttempt = useMemo(() => {
    return quiz.userAttempts[userAttemptIndex];
  }, [userAttemptIndex, quiz]);

  const options: Option[] = useMemo(() => {
    return JSON.parse(currentAttempt.question.options as string);
  }, [currentAttempt]);

  useEffect(() => {
    if (currentAttempt.isCorrect) {
      setAnswerCorrect(true);
    } else {
      setAnswerCorrect(false);
    }
  }, [currentAttempt]);

  const handleNext = () => {
    setUserAttemptIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setUserAttemptIndex((prev) => prev - 1);
  };

  let startTime = quiz.startTime;
  let endTime = quiz.endTime;

  if (!endTime || !startTime) {
    console.error("Start time or end time is missing");
    throw new Error("Start time or end time is missing");
  }

  // calculate the time taken
  let timeTakenMs = new Date(endTime).getTime() - new Date(startTime).getTime();
  let timeTakenMinutes = Math.floor(timeTakenMs / 60000); // Convert milliseconds to minutes

  let totalTimeTaken = "";

  // formatted time less than 1min
  if (timeTakenMinutes < 1) {
    totalTimeTaken = "less than 1 min";
  } else {
    totalTimeTaken = `${timeTakenMinutes} minutes`;
  }

  let skippedQuestions = 0;
  let correctQuestions = 0;
  let incorrectQuestions = 0;

  quiz.userAttempts.forEach((e) => {
    if (e.isCorrect) {
      correctQuestions++;
    } else {
      incorrectQuestions++;
    }

    if (e.skipped) {
      skippedQuestions++;
    }
  });

  let examScore = (correctQuestions / quiz.userAttempts.length) * 100;

  return (
    <section className="">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="container col-span-1 space-y-4">
          <h4 className="text-baseC">Exam Content</h4>
          <CorrectQuestionGrid
            questionLength={quiz.userAttempts.length}
            questionStatus={quiz.userAttempts.map((attempt) =>
              attempt.skipped
                ? "skipped"
                : attempt.isCorrect
                  ? "correct"
                  : "incorrect",
            )}
          />
          <div className="space-y-4">
            <h5>
              Attempted Questions{" "}
              <span className="font-semibold text-baseC">
                {" "}
                {quiz.userAttempts.length}
              </span>
            </h5>
            <h5>
              Correct Questions{" "}
              <span className="font-semibold text-baseC">
                {" "}
                {correctQuestions}
              </span>
            </h5>
            <h5>
              Incorrect Questions{" "}
              <span className="font-semibold text-baseC">
                {" "}
                {incorrectQuestions}
              </span>
            </h5>
            <h5>
              Skipped Questions{" "}
              <span className="font-semibold text-baseC">
                {" "}
                {skippedQuestions}
              </span>
            </h5>
            <h5>
              No of Questions{" "}
              <span className="font-semibold text-baseC">
                {" "}
                {quiz.userAttempts.length}
              </span>
            </h5>
            <h5>
              Time Taken:-
              <span className="font-semibold text-baseC">{totalTimeTaken}</span>
            </h5>
            <h5>
              Exam Score{" "}
              <span className="font-semibold text-baseC">{examScore}%</span>
            </h5>
          </div>
          <StartExamButton
            buttonLabel="Retake Exam"
            examId={quiz.examId}
            examSlug={quiz.exam.slug}
            currentUserId="clzz72ekf0000qaa4eyyzlons"
          />
        </div>
        <div
          className={cn("container col-span-4 py-4", {
            "bg-green-200": answerCorrect,
            "bg-red-200": !answerCorrect,
          })}
        >
          <div className="mb-4 flex justify-between">
            <h5>
              Question{" "}
              <span className="font-semibold text-baseC">
                {userAttemptIndex + 1}
              </span>
            </h5>
            <h5>
              Total Questions{" "}
              <span className="font-semibold text-baseC">
                {" "}
                {quiz.userAttempts.length}
              </span>
            </h5>
          </div>
          <div className="my-4">
            {currentAttempt.skipped ? (
              <div>
                <h3 className="text-baseC">Skipped</h3>
              </div>
            ) : (
              <div>
                <h3 className="text-baseC">Attempted</h3>
              </div>
            )}
          </div>
          <h2>{currentAttempt.question.question}</h2>
          <div className="mt-4 space-y-4">
            {options.map((optionObj, index) => {
              // Extract the value from the object

              const optionText = Object.values(optionObj)[0];

              // check whether this option was the correct option of the question regardless of the whether the user answer was correct or wrong
              const isCorrectOption =
                currentAttempt.question.answer.toLowerCase().trim() ===
                optionText.toLowerCase().trim();

              // Determine if this option is the user's selected (and incorrect) answer
              const isUserIncorrectSelection =
                !currentAttempt.isCorrect &&
                currentAttempt.userAnswer.toLowerCase().trim() ===
                  optionText.toLowerCase().trim();

              console.log("isCorrectOption", isCorrectOption);
              console.log("isUserIncorrectSelection", isUserIncorrectSelection);

              return (
                <div
                  key={index}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-lg border border-base p-4 md:p-6",
                    {
                      "border-green-500 bg-green-500 text-white":
                        isCorrectOption,
                      "border-red-500 bg-red-500 text-white":
                        isUserIncorrectSelection,
                    },
                  )}
                >
                  <div
                    className={cn(
                      "size-4 rounded-full border border-base transition duration-75 ease-in",
                    )}
                  ></div>
                  <h5 className={cn("")}>{optionText}</h5>
                </div>
              );
            })}
          </div>
          {showAnswer ? (
            <div className="mt-6 space-y-4">
              <h4 className="font-medium text-green-600">
                {currentAttempt.question.answer}
              </h4>
              <span className="block font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                tenetur vitae rem doloribus vero, necessitatibus nulla quaerat,
                officiis voluptatem laboriosam illum blanditiis, porro ullam
                consequuntur dolores incidunt neque magnam nostrum.
              </span>
            </div>
          ) : (
            <div></div>
          )}
          <div className="mt-4 flex justify-between">
            <Button
              className="mb-4 rounded-full bg-base px-10 py-6 text-base"
              onClick={() => setShowAnswer((prev) => !prev)}
            >
              {showAnswer ? "Hide Answer" : "Show Answer"}
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
                disabled={userAttemptIndex === quiz.userAttempts.length - 1}
              >
                <div className="flex items-center gap-2">Next</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewMcq;

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
