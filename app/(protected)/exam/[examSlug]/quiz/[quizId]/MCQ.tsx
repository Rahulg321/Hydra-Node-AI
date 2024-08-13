"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Exam, Question, QuizSession } from "@prisma/client";
import axios from "axios";
import { Metadata } from "next";
import React, { useCallback, useMemo, useState, useTransition } from "react";

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
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const currentQuestion = useMemo(() => {
    return quiz.exam.questions[questionIndex];
  }, [questionIndex, quiz]);

  const options: Option[] = useMemo(() => {
    return JSON.parse(currentQuestion.options as string);
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    startTransition(async () => {
      const response = await axios.post("/api/CheckAnswer", {
        questionId: currentQuestion.id,
        quizSessionId: quiz.id,
        userAnswer: options[selected],
      });
    });
  }, []);

  return (
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
          <Button className="mb-4 rounded-full border border-base bg-white px-10 py-6 text-base font-semibold text-baseC">
            Previous Question
          </Button>
          <Button className="mb-4 rounded-full bg-base px-10 py-6 text-base">
            Next Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MCQ;

// export function Option({ value }: { value: string }) {
//   const [selected, setSelected] = useState(false);

//   const onClick = () => {
//     setSelected((prevState) => !prevState);
//   };

//   return (
//     <div
//       onClick={onClick}
//       className={cn(
//         "flex cursor-pointer items-center gap-2 rounded-lg border border-base p-4 md:p-6",
//         {
//           "border-white bg-base": selected,
//         },
//       )}
//     >
//       <div
//         className={cn(
//           "size-4 rounded-full border border-base transition duration-75 ease-in",
//           {
//             "border-4 border-white": selected,
//           },
//         )}
//       ></div>
//       <h5
//         className={cn("", {
//           "text-white": selected,
//         })}
//       >
//         {value}
//       </h5>
//     </div>
//   );
// }
