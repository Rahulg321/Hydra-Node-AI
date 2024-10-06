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
      className={`rounded-lg p-4 text-center ${isTimeCritical ? "bg-red-500" : "bg-base"} text-white`}
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
};

export default TimeLeft;
