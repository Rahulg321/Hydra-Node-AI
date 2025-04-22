"use client";

import React, { useState, useTransition } from "react";
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
import CreateCustomExam from "@/actions/custom-exam";
import CreateMultiStepExam from "@/actions/create-multistep-exam";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AILoadingIndicator from "../AILoadingIndicator";
import { GradientButton } from "../buttons/gradient-button";
import { Clock, Lightbulb, Trophy } from "lucide-react";
import { NumericInput } from "../ui/numeric-input";

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
  const [timeForExam, setExamForTime] = useState(1);
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  let totalSteps = 3;
  const [examMode, setExamMode] = useState<string>("MOCK"); // Track selected mode

  console.log("questions to show", questionsToShow);

  const handleModeSelect = (value: string) => {
    setExamMode(value); // Update local state
  };

  const handleTimeChange = (value: number) => {
    setExamForTime(value);
  };

  const handleNumberOfQuestionsChange = (value: number) => {
    setNumberOfQuestions(value);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <DialogContent className="pt-12">
            <AILoadingIndicator
              onProgressComplete={handleNext}
              examLength={examLength}
            />
          </DialogContent>
        );

      case 2:
        return (
          <DialogContent className="pt-12 lg:max-w-6xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Practice Mode Form */}
              <div className="space-y-4 rounded-lg border-t-8 border-orange-400 p-6">
                <div className="mx-auto w-fit rounded-full bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] p-2">
                  <Lightbulb className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8" />
                </div>
                <div className="text-center">
                  <h3 className="mt-4 text-lg font-semibold md:mt-6">
                    Practice Mode
                  </h3>
                  <span className="mt-4 block text-sm leading-tight text-[#A6A6A6]">
                    Practice answering questions in a stress-free environment
                    and review each response before proceeding to the next one.
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 border-t-2 pt-4">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-orange-500" />
                      <Label className="font-medium">Total Questions</Label>
                    </div>
                    <NumericInput
                      min={1}
                      placeholder="Enter number of questions..."
                      value={numberOfQuestions}
                      max={examLength}
                      className="mt-1 w-full text-white"
                      onChange={handleNumberOfQuestionsChange}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <Label className="font-medium">Time (minutes)</Label>
                    </div>
                    <NumericInput
                      min={1}
                      placeholder="Enter exam time..."
                      value={timeForExam}
                      onChange={handleTimeChange}
                      className="mt-1 w-full text-white"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-orange-500" />
                      <Label className="font-medium">Passing Marks</Label>
                    </div>
                    <p className="mt-1 text-lg font-semibold">70%</p>
                  </div>
                </div>
                <div className="mt-6">
                  <GradientButton
                    onClick={() => handleExamStartButton("PRACTICE")}
                    className="w-full"
                  >
                    Start Practice
                  </GradientButton>
                </div>
              </div>

              {/* Mock Mode Form */}
              <div className="space-y-4 rounded-lg border-t-8 border-orange-400 p-6">
                <div className="mx-auto w-fit rounded-full bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] p-2">
                  <Trophy className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8" />
                </div>
                <div className="text-center">
                  <h3 className="mt-4 text-lg font-semibold md:mt-6">
                    Mock Mode
                  </h3>
                  <span className="mt-4 block text-sm leading-tight text-[#A6A6A6]">
                    Experience a timed exam environment that simulates the real
                    test. All questions must be completed within the allocated
                    time.
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 border-t-2 pt-4">
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-orange-500" />
                      <h5 className="font-medium">Total Questions</h5>
                    </div>
                    <p className="text-lg font-semibold">{questionsToShow}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <h5 className="font-medium">Time (minutes)</h5>
                    </div>
                    <p className="text-lg font-semibold">{examTime}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-orange-500" />
                      <h5 className="font-medium">Passing Marks</h5>
                    </div>
                    <p className="text-lg font-semibold">70%</p>
                  </div>
                </div>
                <div className="mt-6">
                  <GradientButton
                    onClick={() => handleExamStartButton("MOCK")}
                    className="w-full"
                  >
                    Start Mock Exam
                  </GradientButton>
                </div>
              </div>
            </div>
          </DialogContent>
        );
      default:
        return null;
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

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleExamStartButton = async (mode: "PRACTICE" | "MOCK") => {
    startTransition(async () => {
      try {
        const response = await CreateMultiStepExam(
          mode,
          mode === "PRACTICE" ? timeForExam : examTime,
          examId,
          currentUserId,
          examLength,
          questionsToShow,
          numberOfQuestions,
        );

        if (response.type === "error") {
          toast({
            title: "Could not Start Quiz 🥲",
            variant: "destructive",
            description: response.message || "Could not find your account",
          });
        }

        if (response.type === "success") {
          toast({
            title: "Quiz Created🎉",
            description: response.message || "Successfully started Quiz",
          });

          router.push(`/exam/${examId}/quiz/${response.quizSessionId}`);
        }
      } catch (error) {
        toast({
          title: "Could not Start Quiz 🥲",
          variant: "destructive",
          description: "An error occured, please try again later!!",
        });
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <GradientButton className="" size={"xl"}>
          {buttonLabel}
        </GradientButton>
      </DialogTrigger>
      <div>{renderStep()}</div>
      <div className="mt-4 flex items-center justify-between">
        {step === totalSteps && (
          <GradientButton
            disabled={isPending}
            onClick={() => handleExamStartButton("MOCK")}
            className="rounded-none"
          >
            {isPending ? "Creating Exam" : "Start Exam"}
          </GradientButton>
        )}
      </div>
    </Dialog>
  );
};
