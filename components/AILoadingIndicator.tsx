import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Circle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils"; // Corrected import path
import { GradientButton } from "./buttons/gradient-button";

interface LoadingStep {
  title: string;
  tagline: string;
  completed: boolean;
}

const AILoadingIndicator = ({
  onProgressComplete,
}: {
  onProgressComplete: () => void;
}) => {
  const [steps, setSteps] = useState<LoadingStep[]>([
    {
      title: "Generating live data",
      tagline: "Scraping real-time data",
      completed: false,
    },
    {
      title: "Embedding live data",
      tagline: "Embedding data into graph db",
      completed: false,
    },
    {
      title: "Creating graph nodes",
      tagline: "Generating graph relationship data",
      completed: false,
    },
    {
      title: "Generating questions",
      tagline: "Generating questions from graphRAG",
      completed: false,
    },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalSteps = steps.length;
  const [displayStep, setDisplayStep] = useState(0); // Track the step to display

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < totalSteps) {
        // Simulate progress within each step
        setProgress((prevProgress) => {
          const stepProgress =
            prevProgress + Math.floor(Math.random() * (20 - 5 + 1)) + 5; // Further reduced speed
          if (stepProgress >= 100) {
            // Mark step as completed and move to the next
            const newSteps = [...steps];
            newSteps[currentStep].completed = true;
            setSteps(newSteps);
            setCurrentStep(currentStep + 1);
            setDisplayStep(currentStep + 1);
            return 0;
          }
          return stepProgress;
        });
      } else {
        clearInterval(interval);
      }
    }, 300); // Increased interval for slower animation

    return () => clearInterval(interval);
  }, [currentStep, totalSteps, steps, onProgressComplete]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        {currentStep === totalSteps ? (
          <div className="mt-4 text-center font-semibold">
            <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-500" />
            <h3>
              We Generated{" "}
              <span className="bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] bg-clip-text text-transparent">
                350 Questions
              </span>{" "}
              for you
            </h3>
            <GradientButton
              className="mt-4"
              size={"lg"}
              onClick={onProgressComplete}
            >
              Select Exam Mode
            </GradientButton>
          </div>
        ) : (
          <AnimatePresence>
            {steps.map((step, index) => {
              // Only display steps up to the current displayStep
              if (index <= displayStep) {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "mb-6 last:mb-0",
                      index > currentStep && "opacity-50", // Fade out future steps
                      step.completed && "opacity-50",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {step.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="animate-spin-slow h-6 w-6 text-gray-400" />
                      )}
                      <div>
                        <h2
                          className={cn(
                            "text-lg font-semibold",
                            step.completed ? "text-gray-400" : "text-white",
                          )}
                        >
                          {step.title}
                        </h2>
                        <p className="text-sm text-gray-500">{step.tagline}</p>
                      </div>
                    </div>

                    {index === currentStep && !step.completed && (
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.2 }} // Reduced duration for smoother animation
                        className="mt-2 h-2 rounded-full bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)]"
                      />
                    )}
                  </motion.div>
                );
              }
              return null; // Don't render steps beyond the current displayStep
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default AILoadingIndicator;
