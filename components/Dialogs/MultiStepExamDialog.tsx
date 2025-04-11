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
import { Button } from "../ui/button";
import MockExamForm from "../forms/mock-exam-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExamModeContext } from "@/lib/exam-mode-context";
import { checkIfUserHasAccessToExam } from "@/lib/utils";
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

export const MultiStepExamDialog = ({
  examId,
  examSlug,
  examTime,
  examLevel,
  examName,
  currentUserId,
  buttonLabel = "Start Exam",
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
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  let totalSteps = 3;
  const [examMode, setExamMode] = useState<string>("PRACTICE"); // Track selected mode

  const handleModeSelect = (value: string) => {
    setExamMode(value); // Update local state
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value); // Convert string to number
    setExamForTime(isNaN(value) ? 0 : value); // Handle NaN case
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <AILoadingIndicator onProgressComplete={handleNext} />
          </div>
        );

      case 2:
        return (
          <div className="w-full space-y-6">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] p-3">
                <Lightbulb className="h-5 w-5 text-white md:h-6 md:w-6 lg:h-8 lg:w-8" />
              </div>
              <h3 className="mt-4 text-center text-lg font-semibold md:mt-5">
                Choose Your Exam Mode
              </h3>
              <p className="mt-2 max-w-md text-center text-sm text-gray-400">
                Select the mode that best fits your learning style and
                preparation needs
              </p>
            </div>

            <div className="mx-auto max-w-md">
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:bg-gray-50/5 ${examMode === "PRACTICE" ? "border-orange-400 bg-orange-50/10" : "border-gray-200/20"}`}
                  onClick={() => handleModeSelect("PRACTICE")}
                >
                  <div className="flex flex-col items-center text-center">
                    <Lightbulb
                      className={`mb-2 h-6 w-6 ${examMode === "PRACTICE" ? "text-orange-400" : "text-gray-400"}`}
                    />
                    <h4 className="font-medium">Practice</h4>
                    <p className="mt-1 text-xs text-gray-400">
                      Learn at your own pace
                    </p>
                  </div>
                </div>

                <div
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:bg-gray-50/5 ${examMode === "MOCK" ? "border-orange-400 bg-orange-50/10" : "border-gray-200/20"}`}
                  onClick={() => handleModeSelect("MOCK")}
                >
                  <div className="flex flex-col items-center text-center">
                    <Trophy
                      className={`mb-2 h-6 w-6 ${examMode === "MOCK" ? "text-orange-400" : "text-gray-400"}`}
                    />
                    <h4 className="font-medium">Mock</h4>
                    <p className="mt-1 text-xs text-gray-400">
                      Simulate real exam conditions
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 hidden">
                <Select onValueChange={handleModeSelect} value={examMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an Exam Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Exam Mode</SelectLabel>
                      <SelectItem value="PRACTICE">Practice</SelectItem>
                      <SelectItem value="MOCK">Mock</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        if (examMode === "PRACTICE") {
          return (
            <div className="space-y-4">
              <div className="mx-auto w-fit rounded-full bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] p-2">
                <Lightbulb className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8" />
              </div>
              <div className="text-center">
                <h3 className="mt-4 text-lg font-semibold md:mt-6">
                  Practice Mode
                </h3>
                <span className="mt-4 block text-sm leading-tight text-[#A6A6A6]">
                  Practice answering questions in a stress-free environment and
                  review each response before proceeding to the next one.
                </span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t-2 pt-4">
                <div className="flex flex-col items-center">
                  <div className="mb-2 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-orange-500" />
                    <h5 className="font-medium">Total Questions</h5>
                  </div>
                  <p className="text-lg font-semibold">{examLength}</p>
                </div>
                <div className="flex flex-col">
                  <div className="mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <Label className="font-medium">Time (minutes)</Label>
                  </div>
                  <Input
                    type="number"
                    placeholder="Enter exam time..."
                    value={timeForExam}
                    onChange={handleTimeChange}
                    className="mt-1 text-white"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div className="mb-2 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-orange-500" />
                    <h5 className="font-medium">Passing Marks</h5>
                  </div>
                  <p className="text-lg font-semibold">80%</p>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-4">
            <div className="mx-auto w-fit rounded-full bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] p-2">
              <Lightbulb className="h-4 w-4 md:h-6 md:w-6 lg:h-8 lg:w-8" />
            </div>
            <div className="text-center">
              <h3 className="mt-4 text-lg font-semibold md:mt-6">Mock Mode</h3>
              <span className="mt-4 block text-sm leading-tight text-[#A6A6A6]">
                Experience a timed exam environment that simulates the real
                test. All questions must be completed within the allocated time.
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
                <p className="text-lg font-semibold">80%</p>
              </div>
            </div>
          </div>
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

  const handleExamStartButton = async () => {
    startTransition(async () => {
      console.log("exam mode values", examMode);
      console.log("time for exam", timeForExam);

      try {
        const hasAccessResponse = await checkIfUserHasAccessToExam(
          currentUserId,
          examId,
        );

        console.log("user has access to exam");

        if (!hasAccessResponse) {
          showSubscriptionToast();
          return;
        }

        console.log(
          "creating session",
          examMode,
          examTime,
          examId,
          timeForExam,
        );

        const response = await CreateMultiStepExam(
          examMode,
          examMode === "PRACTICE" ? timeForExam : examTime,
          examId,
          currentUserId,
          examLength,
          questionsToShow,
        );

        console.log("recieved response");

        if (response.type === "error") {
          console.log("could not start quiz session from dialog");
          toast({
            title: "Could not Start Quiz 🥲",
            variant: "destructive",
            description: response.message || "Could not find your account",
          });
        }

        if (response.type === "success") {
          console.log("successfully started quiz session from dialog");
          toast({
            title: "Quiz Created🎉",
            description: response.message || "Successfully started Quiz",
          });

          router.push(`/exam/${examId}/quiz/${response.quizSessionId}`);
        }

        console.log("exam mode is", examMode);
      } catch (error) {
        console.error("error in quiz session form", error);
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
      <DialogContent>
        <div>{renderStep()}</div>
        <div className="mt-4 flex items-center justify-between">
          {step > 2 && (
            <GradientButton onClick={handlePrevious} className="rounded-none">
              Previous
            </GradientButton>
          )}

          {step < totalSteps && step !== 1 ? (
            <GradientButton
              onClick={handleNext}
              className="justify-end rounded-none"
            >
              Next
            </GradientButton>
          ) : null}
          {step === totalSteps && (
            <GradientButton
              disabled={isPending}
              onClick={handleExamStartButton}
              className="rounded-none"
            >
              {isPending ? "Creating Exam" : "Start Exam"}
            </GradientButton>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
