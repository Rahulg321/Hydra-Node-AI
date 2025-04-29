import { Check } from "lucide-react";
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
    <div className="rounded-lg bg-muted">
      <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent max-h-[200px] overflow-y-auto">
        <div className="grid grid-cols-4 gap-1 px-2 py-4 sm:grid-cols-6">
          {Array.from({ length: questionLength }).map((_, index) => {
            let statusClass = "border-primary";
            if (questionStatus[index] === "attempted") {
              statusClass = "bg-orange-700";
            } else if (questionStatus[index] === "skipped") {
              statusClass = "bg-yellow-500 border-yellow-500";
            }
            return (
              <div
                key={index}
                className={`aspect-square rounded-lg border ${statusClass} flex items-center justify-center p-2 text-xs font-medium`}
              >
                {questionStatus[index] === "attempted" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <div className="text-xs">{index + 1}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CorrectQuestionGrid;
