"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Question, QuizSession, UserAttempt } from "@prisma/client";
import { Loader2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

type ReviewMcqProps = {
  quiz: QuizSession & {
    userAttempts: (UserAttempt & {
      question: Question;
    })[];
  };
};
type Option = {
  [key: string]: string;
};

const ReviewMcq = ({ quiz }: ReviewMcqProps) => {
  const [userAttemptIndex, setUserAttemptIndex] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(false);

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

  return (
    <section className="py-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="col-span-1"></div>
        <div
          className={cn("container col-span-4", {
            "bg-green-400": answerCorrect,
            "bg-red-400": !answerCorrect,
          })}
        >
          <h2>{currentAttempt.question.question}</h2>
          <div className="space-y-4">
            {options.map((optionObj, index) => {
              // Extract the value from the object
              const optionText = Object.values(optionObj)[0];
              console.log("option text is", optionText);
              return (
                <div
                  key={index}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-lg border border-base p-4 md:p-6",
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
          <div className="mt-4 flex justify-between">
            <Button className="mb-4 rounded-full bg-base px-10 py-6 text-base">
              Show Answer
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
