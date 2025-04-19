import { Check, CircleOff, CircleX, SkipBack } from "lucide-react";

import { CircleCheckBig } from "lucide-react";

interface CorrectQuestionGridProps {
  totalQuestions: number;
  questionStatus: (string | null)[];
  onSelectQuestion?: (index: number) => void;
  currentQuestionIndex?: number;
}

const CorrectQuestionGrid = ({
  totalQuestions,
  questionStatus,
  onSelectQuestion,
  currentQuestionIndex,
}: CorrectQuestionGridProps) => {
  console.log("question status in correct question grid", questionStatus);
  return (
    <div className="rounded-lg bg-muted">
      <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent max-h-[250px] overflow-y-auto">
        <div className="grid grid-cols-3 gap-1 px-2 py-4 lg:grid-cols-4">
          {Array.from({ length: totalQuestions }).map((_, index) => {
            let statusClass = "bg-gray-400 dark:bg-muted";

            if (questionStatus[index] === "correct") {
              statusClass = "bg-[#065A1D]";
            } else if (questionStatus[index] === "incorrect") {
              statusClass = "bg-[#600000]";
            } else if (
              questionStatus[index] === "skipped" ||
              questionStatus[index] === null
            ) {
              statusClass = "bg-[#E8A600]";
            } else {
              statusClass = "bg-[#E8A600]";
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
