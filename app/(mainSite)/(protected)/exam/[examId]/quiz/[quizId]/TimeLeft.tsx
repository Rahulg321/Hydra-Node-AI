import React from "react";

const TimeLeft = ({
  time,
  isTimeCritical,
  quizEnded = false,
}: {
  time: string;
  isTimeCritical: boolean;
  quizEnded?: boolean;
}) => {
  return (
    <div
      className={`rounded-lg p-4 text-center ${
        isTimeCritical ? "bg-red-500" : "bg-primary"
      } text-white`}
    >
      {quizEnded ? (
        <div className="text-lg font-semibold">Exam Ended</div>
      ) : (
        <div>
          <h4 className="mb-1 text-sm font-medium">Time Left</h4>
          <h3 className="text-2xl font-bold">{time}</h3>
        </div>
      )}
    </div>
  );
};

export default TimeLeft;
