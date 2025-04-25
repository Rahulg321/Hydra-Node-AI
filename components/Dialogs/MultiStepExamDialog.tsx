"use client";

import React, { useState, useTransition, useEffect, useRef } from "react"; // Added useEffect, useRef
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
// Assume these imports exist and work
// import CreateCustomExam from "@/actions/custom-exam";
import CreateMultiStepExam from "@/actions/create-multistep-exam";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AILoadingIndicator from "../AILoadingIndicator";
import { GradientButton } from "../buttons/gradient-button";
import { Clock, Lightbulb, Trophy } from "lucide-react";
import { NumericInput } from "../ui/numeric-input";

// --- Configuration ---
const SESSION_STORAGE_KEY_PREFIX = "multiStepExamLastRender_";
const SKIP_THRESHOLD_MS = 60 * 1000; // 1 minute in milliseconds
// --- End Configuration ---

export const MultiStepExamDialog = ({
  examId,
  examSlug,
  examTime,
  examLevel,
  examName,
  currentUserId,
  buttonLabel = "Generate Questions",
  examLength,
  questionsToShow,
}: {
  examId: string;
  examSlug: string;
  examTime: number;
  examLevel: string;
  examName: string;
  currentUserId: string;
  buttonLabel?: string;
  examLength: number;
  questionsToShow: number;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [timeForExam, setExamForTime] = useState(examTime > 0 ? examTime : 1); // Use default or prop
  const [numberOfQuestions, setNumberOfQuestions] = useState(
    questionsToShow > 0 ? questionsToShow : 1, // Use default or prop
  );

  // Initialize step state - default to 1
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  let totalSteps = 2; // We now only have 2 logical steps (loader and selection)
  const [examMode, setExamMode] = useState<string>("MOCK"); // Track selected mode

  // Ref to prevent effect running multiple times unnecessarily in strict mode
  const initEffectRan = useRef(false);

  // Key specific to this exam instance
  const sessionStorageKey = `${SESSION_STORAGE_KEY_PREFIX}${examId}`;

  // Effect to check timestamp and potentially skip step 1 on mount
  useEffect(() => {
    // Ensure this runs only on the client and only once per mount
    if (typeof window !== "undefined" && !initEffectRan.current) {
      const now = Date.now();
      const storedTimeStr = sessionStorage.getItem(sessionStorageKey);
      let shouldSkipStep1 = false;

      if (storedTimeStr) {
        const lastRenderTime = parseInt(storedTimeStr, 10);
        if (
          !isNaN(lastRenderTime) &&
          now - lastRenderTime < SKIP_THRESHOLD_MS
        ) {
          console.log(
            "MultiStepExamDialog: Last render within 1 min. Skipping step 1.",
          );
          shouldSkipStep1 = true;
        }
      }

      // Always update the timestamp for the *next* potential render
      sessionStorage.setItem(sessionStorageKey, now.toString());

      if (shouldSkipStep1) {
        setStep(2);
      } else {
        setStep(1);
      }

      initEffectRan.current = true;
    }

    return () => {
      initEffectRan.current = false;
    };
  }, [sessionStorageKey]);

  const handleModeSelect = (value: string) => {
    setExamMode(value); // Update local state
  };

  const handleTimeChange = (value: number) => {
    setExamForTime(value > 0 ? value : 1); // Ensure time is at least 1
  };

  const handleNumberOfQuestionsChange = (value: number) => {
    // Ensure value is within bounds
    const maxQ = examLength > 0 ? examLength : 1;
    const validValue = Math.max(1, Math.min(value, maxQ));
    setNumberOfQuestions(validValue);
  };

  // Function to proceed to the next step (now just step 2)
  const handleGoToSelection = () => {
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      // Step 1: Loading Indicator (only shown if not skipped)
      case 1:
        return (
          <DialogContent className="pt-12">
            <AILoadingIndicator
              // Make the loader automatically proceed after its internal logic/delay
              onProgressComplete={handleGoToSelection}
              examLength={examLength} // Pass necessary props
            />
          </DialogContent>
        );

      // Step 2: Mode Selection
      case 2:
        return (
          <DialogContent className="pt-12 lg:max-w-6xl">
            {/* Title and Description can be added here if needed */}
            <DialogHeader className="mb-6 text-center">
              <DialogTitle className="text-2xl font-bold">
                Choose Your Exam Mode
              </DialogTitle>
              <DialogDescription>
                Select how you want to take the {examName} exam.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Practice Mode Form */}
              <div className="space-y-4 rounded-lg border-t-8 border-orange-400 p-6 shadow-md">
                <div className="mx-auto w-fit rounded-full bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] p-2">
                  <Lightbulb className="h-6 w-6 text-white md:h-8 md:w-8" />
                </div>
                <div className="text-center">
                  <h3 className="mt-4 text-lg font-semibold md:mt-6">
                    Practice Mode
                  </h3>
                  <span className="mt-2 block text-sm leading-tight text-gray-500 dark:text-gray-400">
                    Stress-free practice. Review answers after each question.
                    Set your own pace.
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4 border-t-2 pt-4 md:grid-cols-3">
                  {/* Total Questions Input */}
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex items-center gap-1.5">
                      <Trophy className="h-4 w-4 text-orange-500" />
                      <Label
                        htmlFor={`practice-questions-${examId}`}
                        className="text-sm font-medium"
                      >
                        Questions
                      </Label>
                    </div>
                    <NumericInput
                      id={`practice-questions-${examId}`}
                      min={1}
                      placeholder="Num..."
                      value={numberOfQuestions}
                      max={examLength > 0 ? examLength : 100} // Provide a sensible max if examLength is 0
                      className="mt-1 w-full" // Removed text-white for broader theme compatibility
                      onChange={handleNumberOfQuestionsChange}
                    />
                  </div>
                  {/* Time Input */}
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <Label
                        htmlFor={`practice-time-${examId}`}
                        className="text-sm font-medium"
                      >
                        Time (min)
                      </Label>
                    </div>
                    <NumericInput
                      id={`practice-time-${examId}`}
                      min={1}
                      placeholder="Mins..."
                      value={timeForExam}
                      onChange={handleTimeChange}
                      className="mt-1 w-full"
                    />
                  </div>
                  {/* Passing Marks (Display Only) */}
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex items-center gap-1.5">
                      <Trophy className="h-4 w-4 text-orange-500" />
                      <Label className="text-sm font-medium">Passing</Label>
                    </div>
                    <p className="mt-1 pt-1 text-lg font-semibold">70%</p>{" "}
                    {/* Adjusted alignment slightly */}
                  </div>
                </div>
                <div className="mt-6">
                  <GradientButton
                    onClick={() => handleExamStartButton("PRACTICE")}
                    className="w-full"
                    disabled={isPending} // Disable while processing
                  >
                    {isPending && examMode === "PRACTICE"
                      ? "Starting..."
                      : "Start Practice"}
                  </GradientButton>
                </div>
              </div>
              <div className="space-y-4 rounded-lg border-t-8 border-orange-500 p-6 shadow-md">
                <div className="mx-auto w-fit rounded-full bg-gradient-to-r from-orange-300 to-orange-500 p-2">
                  <Trophy className="h-6 w-6 text-white md:h-8 md:w-8" />
                </div>
                <div className="text-center">
                  <h3 className="mt-4 text-lg font-semibold md:mt-6">
                    Mock Mode
                  </h3>
                  <span className="mt-2 block text-sm leading-tight text-gray-500 dark:text-gray-400">
                    Simulates the real test. Fixed time and questions. Results
                    at the end.
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 border-t-2 pt-4">
                  {/* Total Questions (Display Only) */}
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex items-center gap-1.5">
                      <Trophy className="h-4 w-4 text-orange-500" />
                      <h5 className="text-sm font-medium">Questions</h5>
                    </div>
                    <p className="mt-1 pt-1 text-lg font-semibold">
                      {questionsToShow > 0 ? questionsToShow : "N/A"}
                    </p>
                  </div>
                  {/* Time (Display Only) */}
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <h5 className="text-sm font-medium">Time (min)</h5>
                    </div>
                    <p className="mt-1 pt-1 text-lg font-semibold">
                      {examTime > 0 ? examTime : "N/A"}
                    </p>
                  </div>
                  {/* Passing Marks (Display Only) */}
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex items-center gap-1.5">
                      <Trophy className="h-4 w-4 text-orange-500" />
                      <h5 className="text-sm font-medium">Passing</h5>
                    </div>
                    <p className="mt-1 pt-1 text-lg font-semibold">70%</p>
                  </div>
                </div>
                <div className="mt-6">
                  <GradientButton
                    onClick={() => handleExamStartButton("MOCK")}
                    className="w-full" // Consider different gradient/color for mock
                    disabled={isPending} // Disable while processing
                  >
                    {isPending && examMode === "MOCK"
                      ? "Starting..."
                      : "Start Mock Exam"}
                  </GradientButton>
                </div>
              </div>
            </div>
          </DialogContent>
        );
      default:
        return null; // Should not happen
    }
  };

  const showSubscriptionToast = () => {
    toast({
      variant: "destructive",
      title: "Not Subscribed ❌",
      description:
        "Subscribe to one of our pricing plans or purchase this exam to access it.",
      action: (
        <ToastAction altText="Subscribe">
          <Link href="/pricing">Subscribe</Link>
        </ToastAction>
      ),
    });
  };

  // Removed handleNext and handlePrevious as they are not needed in this simplified flow

  const handleExamStartButton = async (mode: "PRACTICE" | "MOCK") => {
    // Set the mode for visual feedback (e.g., disabling the correct button)
    setExamMode(mode);

    // Basic validation before starting transition
    if (mode === "PRACTICE" && (numberOfQuestions <= 0 || timeForExam <= 0)) {
      toast({
        title: "Invalid Input",
        variant: "destructive",
        description:
          "Please enter a valid number of questions and time for practice mode.",
      });
      return;
    }
    if (mode === "MOCK" && (questionsToShow <= 0 || examTime <= 0)) {
      toast({
        title: "Configuration Error",
        variant: "destructive",
        description:
          "Mock exam details (questions/time) are not set correctly.",
      });
      // Potentially prevent button click if config is bad, or handle server-side
      // return; // Decide if mock should be startable with bad config
    }

    startTransition(async () => {
      try {
        // Determine parameters based on mode
        const selectedTime = mode === "PRACTICE" ? timeForExam : examTime;
        const selectedNumQuestions =
          mode === "PRACTICE" ? numberOfQuestions : questionsToShow;

        // Ensure valid numbers are passed, fallback if needed
        const finalTime = selectedTime > 0 ? selectedTime : 60; // Default to 60 min if invalid
        const finalNumPracticeQuestions =
          numberOfQuestions > 0 ? numberOfQuestions : 10; // Default for practice
        const finalNumMockQuestions =
          questionsToShow > 0 ? questionsToShow : examLength; // Use questionsToShow for mock, fallback to examLength

        const response = await CreateMultiStepExam(
          mode,
          finalTime,
          examId,
          currentUserId,
          examLength, // Pass the original full length
          finalNumMockQuestions, // Pass the intended number for Mock
          finalNumPracticeQuestions, // Pass the intended number for Practice
        );

        if (response.type === "error") {
          // Consider specific error handling like subscription checks
          if (response.message?.toLowerCase().includes("subscribe")) {
            showSubscriptionToast();
          } else {
            toast({
              title: "Could not Start Quiz 🥲",
              variant: "destructive",
              description: response.message || "An unknown error occurred.",
            });
          }
        } else if (response.type === "success") {
          toast({
            title: "Quiz Created 🎉",
            description: response.message || "Successfully started Quiz",
          });
          // Redirect to the quiz session
          router.push(`/exam/${examId}/quiz/${response.quizSessionId}`);
          // Optionally close the dialog here if needed, though redirect might handle it
        } else {
          // Handle unexpected response structure
          toast({
            title: "Unexpected Response",
            variant: "destructive",
            description: "Received an unexpected response from the server.",
          });
        }
      } catch (error) {
        console.error("Error starting exam:", error); // Log the actual error
        toast({
          title: "Could not Start Quiz 🥲",
          variant: "destructive",
          description: "An error occurred. Please try again later!",
        });
      }
      // No need to manually set isPending to false, useTransition handles it
    });
  };

  return (
    // The Dialog component now manages its own open/closed state
    <Dialog>
      <DialogTrigger asChild>
        <GradientButton className="" size={"xl"}>
          {buttonLabel}
        </GradientButton>
      </DialogTrigger>
      {/* Render the content based on the current step */}
      {renderStep()}
      {/* No need for external previous/next buttons for this 2-step flow */}
      {/* Removed the external Start Exam button block as buttons are now inside Step 2 */}
    </Dialog>
  );
};
