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
};

export default CorrectQuestionGrid;
