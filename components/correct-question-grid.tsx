import { Check, CircleOff, CircleX, SkipBack } from "lucide-react";

import { CircleCheckBig } from "lucide-react";

interface CorrectQuestionGridProps {
  totalQuestions: number;
  questionStatus: (string | null)[];
}

const CorrectQuestionGrid = ({
  totalQuestions,
  questionStatus,
}: CorrectQuestionGridProps) => {
  return (
    <div className="rounded-lg bg-muted">
      <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent max-h-[250px] overflow-y-auto">
        <div className="grid grid-cols-3 gap-1 px-2 py-4 lg:grid-cols-4">
          {Array.from({ length: totalQuestions }).map((_, index) => {
            let statusClass = "border-primary";
            if (questionStatus[index] === "correct") {
              statusClass = "bg-[#065A1D]";
            } else if (questionStatus[index] === "incorrect") {
              statusClass = "bg-[#600000]";
            } else if (questionStatus[index] === "attempted") {
              statusClass = "bg-orange-700";
            } else if (questionStatus[index] === "skipped") {
              statusClass = "bg-yellow-500 border-yellow-500";
            }

            return (
              <div
                key={index}
                className={`aspect-square w-full rounded-lg border ${statusClass} relative flex items-center justify-center p-2 text-xs font-medium`}
              >
                <span className="flex items-center justify-center text-xs font-bold text-white">
                  {questionStatus[index] === "incorrect" ? (
                    <div>
                      <CircleX className="text-white" />
                    </div>
                  ) : questionStatus[index] === "correct" ? (
                    <div>
                      <Check className="text-white" />
                    </div>
                  ) : (
                    <div>
                      <CircleOff className="text-white" />
                    </div>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CorrectQuestionGrid;
