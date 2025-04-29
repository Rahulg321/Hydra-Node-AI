import React, { useState, useEffect, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { formatTime } from "@/hooks/lib/utils";

function CountDownTimer({
  startTime, // ISO string of when the quiz started
  timeAllowedMinutes, // Duration in minutes
  quizSessionId,
  mcqQuizEnded,
  setMcqQuizEnded,
  mcqQuestionsLength,
  onTimerEnd, // Callback function when timer hits zero
}: {
  startTime: string | null; // Can be null initially while fetching
  timeAllowedMinutes: number;
  mcqQuestionsLength: number;
  quizSessionId: string;
  mcqQuizEnded: boolean;
  setMcqQuizEnded: React.Dispatch<React.SetStateAction<boolean>>;
  onTimerEnd: () => Promise<void>; // Make it async if EndQuizAction is async
}) {
  const { toast } = useToast();
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  // Calculate end time based on start time and duration
  const endTime = useMemo(() => {
    if (!startTime) return null;
    const start = new Date(startTime);
    return start.getTime() + timeAllowedMinutes * 60 * 1000;
  }, [startTime, timeAllowedMinutes]);

  useEffect(() => {
    if (mcqQuizEnded || !endTime) {
      // If already ended or end time not calculated, clear interval
      setRemainingTime(mcqQuizEnded ? 0 : null); // Show 0 if ended, null otherwise
      return;
    }

    const calculateRemaining = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.round((endTime - now) / 1000));
      setRemainingTime(remaining);
      return remaining;
    };

    // Initial calculation
    const initialRemaining = calculateRemaining();

    if (initialRemaining <= 0 && !mcqQuizEnded) {
      // If time already expired on load
      console.log("Timer already expired on load, ending quiz...");
      onTimerEnd(); // Call the end quiz logic passed from parent
      return; // Don't start interval
    }

    // Start interval
    const interval = setInterval(() => {
      const currentRemaining = calculateRemaining();
      if (currentRemaining <= 0) {
        clearInterval(interval);
        if (!mcqQuizEnded) {
          // Check again to prevent race conditions
          console.log("Timer ended, ending quiz...");
          onTimerEnd(); // Call the end quiz logic
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, mcqQuizEnded, onTimerEnd]); // Rerun when endTime or mcqQuizEnded changes

  const isTimeCritical = remainingTime !== null && remainingTime <= 60;

  return (
    <div
      className={`rounded-lg p-4 text-center ${
        isTimeCritical ? "bg-red-600/80" : "bg-orange-700/80"
      } text-white`}
    >
      {mcqQuizEnded ? (
        <div>
          <h3 className="font-semibold">Exam Ended</h3>
        </div>
      ) : remainingTime === null ? (
        <div>
          <h4 className="text-sm font-medium uppercase tracking-wide">
            Time Left
          </h4>
          <h3 className="transducer-font mt-1 text-2xl font-bold tracking-wider">
            --:--:--
          </h3>
        </div>
      ) : (
        <div>
          <h4 className="text-sm font-medium uppercase tracking-wide">
            Time Left
          </h4>
          <h3 className="transducer-font mt-1 text-2xl font-bold tracking-wider">
            {formatTime(remainingTime)}
          </h3>
        </div>
      )}
    </div>
  );
}

export default CountDownTimer;
