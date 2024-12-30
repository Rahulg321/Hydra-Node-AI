import React from "react";

type QuestionGridProps = {
  questionLength: number;
  questionStatus: (string | null)[];
};

const CorrectQuestionGrid = ({
  questionLength,
  questionStatus,
}: QuestionGridProps) => {
  return (
    <div className="rounded-lg bg-muted p-4">
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {Array.from({ length: questionLength }).map((_, index) => {
          let statusClass = "border-primary";
          if (questionStatus[index] === "attempted") {
            statusClass = "bg-green-500 border-green-500";
          } else if (questionStatus[index] === "skipped") {
            statusClass = "bg-yellow-500 border-yellow-500";
          }
          return (
            <div
              key={index}
              className={`aspect-square rounded-lg border ${statusClass} flex items-center justify-center p-2 text-xs font-medium`}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CorrectQuestionGrid;
