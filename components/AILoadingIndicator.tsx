import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GradientButton } from "./buttons/gradient-button";

interface LoadingStep {
  title: string;
  tagline: string;
}

const AILoadingIndicator = ({
  onProgressComplete,
  examLength,
}: {
  onProgressComplete: () => void;
  examLength: number;
}) => {
  const loadingSteps: LoadingStep[] = [
    {
      title: "GENERATING THE DATA",
      tagline: "Scraping real-time data...",
    },
    {
      title: "EMBEDDING THE DATA",
      tagline: "Embedding the data into Graph DB...",
    },
    {
      title: "CREATING GRAPH NODES",
      tagline: "Generating graph relationship data...",
    },
    {
      title: "GENERATING QUESTIONS",
      tagline: "Generating questions from GraphRAG...",
    },
  ];

  const totalSteps = loadingSteps.length;
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalLoadingTime, setTotalLoadingTime] = useState(0);

  // Set a random total loading time between 30-60 seconds when component mounts
  useEffect(() => {
    // Generate random time between 30-60 seconds
    const randomTime = Math.floor(Math.random() * 31) + 30; // 30-60 seconds
    setTotalLoadingTime(randomTime * 1000); // Convert to milliseconds
  }, []);

  // Start an interval on each step to increment progress
  useEffect(() => {
    if (!totalLoadingTime) return; // Wait until totalLoadingTime is set

    let interval: NodeJS.Timeout;
    const timePerStep = totalLoadingTime / totalSteps;
    const incrementInterval = 300; // Update every 300ms
    const totalIncrements = timePerStep / incrementInterval;
    const avgIncrementSize = 100 / totalIncrements;

    const startStep = () => {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          // Add some randomness to the increment size but maintain overall timing
          const next = prev + avgIncrementSize * (0.7 + Math.random() * 0.6);
          return next >= 100 ? 100 : next;
        });
      }, incrementInterval);
    };

    startStep();

    return () => clearInterval(interval);
  }, [currentStep, totalLoadingTime, totalSteps]);

  // When progress hits 100, move to next step or complete
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          setCurrentStep((prev) => prev + 1);
        } else if (currentStep === totalSteps - 1) {
          // Last step completed
          setCurrentStep(totalSteps);
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [progress, currentStep, totalSteps, onProgressComplete]);

  const currentData =
    currentStep < totalSteps ? loadingSteps[currentStep] : null;
  const circumference = 2 * Math.PI * 45;

  return (
    <div className="flex flex-col items-center justify-between">
      {currentStep < totalSteps ? (
        <>
          {/* Progress Circle */}
          <div className="relative flex h-24 w-24 items-center justify-center">
            <svg className="h-full w-full -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="45"
                stroke="rgba(255,98,24,0.2)"
                strokeWidth="6"
                fill="none"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="45"
                stroke="rgb(255,98,24)"
                strokeWidth="6"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress / 100)}
                className="transition-all duration-300 ease-in-out"
              />
            </svg>
            <span className="absolute text-lg font-semibold text-orange-500">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Step Title and Description */}
          <div className="text-center">
            <h2 className="transducer-font text-2xl font-bold tracking-wider text-white">
              {currentData?.title}
            </h2>
            <p className="mt-2">{currentData?.tagline}</p>
          </div>

          {/* Step Indicators */}
          <div className="mt-4 w-full space-y-4">
            <div className="flex justify-center gap-2">
              {loadingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-16 rounded-full transition-all duration-300 ${
                    index < currentStep
                      ? "bg-orange-500"
                      : index === currentStep
                        ? "bg-orange-300"
                        : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-gray-400">
              {currentStep} of {totalSteps} steps completed
            </p>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="mb-2 font-semibold">
            We Generated{" "}
            <span className="bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] bg-clip-text text-transparent">
              {examLength} Questions
            </span>{" "}
            for you
          </h2>
          <GradientButton
            className="mt-4"
            size="lg"
            onClick={onProgressComplete}
          >
            Select Exam Mode
          </GradientButton>
        </div>
      )}
    </div>
  );
};

export default AILoadingIndicator;
