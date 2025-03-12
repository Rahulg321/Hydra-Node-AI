"use client";

import type React from "react";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Clock,
  BookOpen,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { checkIfUserHasAccessToExam } from "@/lib/utils";
import CreateMultiStepExam from "@/actions/create-multistep-exam";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MultiStepExamDialogProps {
  examId: string;
  examSlug: string;
  examTime: number;
  examLevel: string;
  examName: string;
  currentUserId: string;
  buttonLabel?: string;
  examLength: number;
  questionsToShow: number;
}

export const MultiStepExamDialog: React.FC<MultiStepExamDialogProps> = ({
  examId,
  examSlug,
  examTime,
  examLevel,
  examName,
  currentUserId,
  buttonLabel = "Start Exam",
  examLength,
  questionsToShow,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [timeForExam, setTimeForExam] = useState(examTime);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [examMode, setExamMode] = useState<string>("PRACTICE");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState<string>(
    "Initializing your exam...",
  );

  const totalSteps = 3;

  const handleModeSelect = (value: string) => {
    setExamMode(value);
    if (value === "MOCK") {
      setTimeForExam(examTime);
    }
  };

  const handleNumberOfQuestionsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number.parseInt(e.target.value);
    setNumberOfQuestions(isNaN(value) ? 0 : value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    setTimeForExam(isNaN(value) ? 0 : value);
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

  const renderStepIndicator = () => (
    <div className="mb-6">
      <div className="mb-2 flex justify-between">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                step >= stepNumber
                  ? "border-primary bg-primary text-white"
                  : "border-muted-foreground bg-muted text-muted-foreground"
              }`}
            >
              {stepNumber}
            </div>
            <span
              className={`mt-1 text-xs ${step >= stepNumber ? "text-primary" : "text-muted-foreground"}`}
            >
              {stepNumber === 1
                ? "Welcome"
                : stepNumber === 2
                  ? "Settings"
                  : "Review"}
            </span>
          </div>
        ))}
      </div>
      <Progress value={(step / totalSteps) * 100} className="h-2" />
    </div>
  );

  const handleExamStartButton = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setLoadingMessage("Initializing your exam...");

    // Array of loading messages to display sequentially
    const loadingMessages = [
      "Generating questions using AI...",
      "Crawling live documentation...",
      "Analyzing difficulty patterns...",
      "Personalizing your exam experience...",
      "Generating your custom exam...",
      "Finalizing exam setup...",
    ];

    // Show each message sequentially with delays
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < loadingMessages.length) {
        setLoadingMessage(loadingMessages[messageIndex]);
        messageIndex++;
      } else {
        clearInterval(messageInterval);
      }
    }, 2000); // Change message every 2 seconds

    // Simulate progress for better UX with slower initial progress
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        // Slower progress at the beginning, faster towards the end
        const increment = prev < 30 ? 3 : prev < 60 ? 5 : 8;
        const newProgress = prev + Math.random() * increment;
        return newProgress > 90 ? 90 : newProgress;
      });
    }, 800);

    startTransition(async () => {
      try {
        const hasAccessResponse = await checkIfUserHasAccessToExam(
          currentUserId,
          examId,
        );

        if (!hasAccessResponse) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setIsGenerating(false);
          showSubscriptionToast();
          return;
        }

        // Add artificial delay to ensure loading animation is visible
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await CreateMultiStepExam(
          examMode,
          examMode === "PRACTICE" ? timeForExam : examTime,
          examId,
          currentUserId,
          examLength,
          questionsToShow,
          numberOfQuestions,
        );

        clearInterval(progressInterval);
        clearInterval(messageInterval);
        setGenerationProgress(100);
        setLoadingMessage("Exam ready! Redirecting...");

        if (response.type === "error") {
          setIsGenerating(false);
          toast({
            title: "Could not Start Exam",
            variant: "destructive",
            description: response.message || "Could not find your account",
          });
        }

        if (response.type === "success") {
          toast({
            title: "Exam Created Successfully",
            description: response.message || "Successfully started exam",
          });

          // Short delay to show 100% progress before redirecting
          setTimeout(() => {
            setOpen(false);
            router.push(`/exam/${examId}/quiz/${response.quizSessionId}`);
          }, 1000);
        }
      } catch (error) {
        clearInterval(progressInterval);
        clearInterval(messageInterval);
        setIsGenerating(false);
        toast({
          title: "Could not Start Exam",
          variant: "destructive",
          description: "An error occurred, please try again later",
        });
      }
    });
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Welcome to {examName}</CardTitle>
                <CardDescription>
                  You&apos;re about to start your exam preparation journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <BookOpen className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Exam Overview</h4>
                    <p className="text-sm text-muted-foreground">
                      This is a {examLevel} level exam with {examLength}{" "}
                      questions. You&apos;ll be shown {questionsToShow}{" "}
                      questions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Time Allocation</h4>
                    <p className="text-sm text-muted-foreground">
                      Standard time for this exam is {examTime} minutes, but you
                      can adjust this in Practice mode.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Exam Settings</CardTitle>
                <CardDescription>
                  Customize how you want to take this exam
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="exam-mode">Exam Mode</Label>
                  <Select onValueChange={handleModeSelect} value={examMode}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an Exam Mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Exam Mode</SelectLabel>
                        <SelectItem value="PRACTICE">
                          <div className="flex items-center">
                            <span>Practice Mode</span>
                            <Badge variant="outline" className="ml-2">
                              Flexible
                            </Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="MOCK">
                          <div className="flex items-center">
                            <span>Mock Exam</span>
                            <Badge variant="outline" className="ml-2">
                              Realistic
                            </Badge>
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {examMode === "PRACTICE"
                      ? "Practice mode allows you to customize time and review answers as you go."
                      : "Mock exam simulates real exam conditions with standard timing."}
                  </p>
                </div>

                {examMode === "PRACTICE" && (
                  <div className="space-y-2 pt-2">
                    <div>
                      <Label htmlFor="number-questions">
                        Select Number of Questions
                      </Label>
                      <Input
                        id="number-questions"
                        type="number"
                        min="1"
                        maxLength={examLength}
                        placeholder="Select Number of questions"
                        value={numberOfQuestions}
                        onChange={handleNumberOfQuestionsChange}
                      />
                      <p className="mt-1 text-xs text-muted-foreground">
                        Total Questions Available ({examLength})
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="exam-time">Time for Exam (minutes)</Label>
                      <Input
                        id="exam-time"
                        type="number"
                        min="1"
                        placeholder="Enter time in minutes"
                        value={timeForExam}
                        onChange={handleTimeChange}
                      />
                      <p className="mt-1 text-xs text-muted-foreground">
                        Recommended time: {examTime} minutes
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Ready to Begin</CardTitle>
                <CardDescription>
                  Review your exam settings before starting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-muted/50 p-4">
                  <h3 className="mb-3 font-medium">Exam Summary</h3>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div className="text-muted-foreground">Exam Name:</div>
                    <div className="font-medium">{examName}</div>

                    <div className="text-muted-foreground">
                      Difficulty Level:
                    </div>
                    <div className="font-medium capitalize">{examLevel}</div>

                    <div className="text-muted-foreground">Exam Mode:</div>
                    <div className="font-medium">
                      <Badge
                        variant={
                          examMode === "PRACTICE" ? "outline" : "secondary"
                        }
                      >
                        {examMode === "PRACTICE" ? "Practice" : "Mock Exam"}
                      </Badge>
                    </div>

                    <div className="text-muted-foreground">Time Allowed:</div>
                    <div className="font-medium">
                      {examMode === "PRACTICE" ? timeForExam : examTime} minutes
                    </div>

                    <div className="text-muted-foreground">Questions:</div>
                    <div className="font-medium">
                      {numberOfQuestions} of {examLength}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-800 dark:bg-amber-950/20">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                  <div className="text-amber-800 dark:text-amber-300">
                    Once you start the exam, the timer will begin immediately.
                    Make sure you&apos;re ready to proceed.
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const renderGeneratingState = () => (
    <div className="space-y-6 py-8">
      <div className="space-y-3 text-center">
        <div className="mb-4 flex justify-center">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium">
                {Math.round(generationProgress)}%
              </span>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-medium">Generating Your Exam</h3>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          {loadingMessage}
        </p>
      </div>

      <Progress value={generationProgress} className="mx-auto h-2 max-w-md" />

      <div className="animate-pulse text-center text-sm text-muted-foreground">
        Please don&apos;t close this window
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-white transition-colors hover:bg-primary/90"
          size="lg"
        >
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        {!isGenerating ? (
          <>
            <DialogHeader>
              <DialogTitle>
                {step < totalSteps
                  ? `Step ${step} of ${totalSteps}`
                  : "Start Exam"}
              </DialogTitle>
              <DialogDescription>
                {step === 1
                  ? "Welcome to the exam setup process"
                  : step === 2
                    ? "Configure your exam preferences"
                    : "Review and start your exam"}
              </DialogDescription>
            </DialogHeader>

            {renderStepIndicator()}

            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

            <DialogFooter className="mt-6 flex gap-2 sm:justify-between">
              <div>
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={isPending}
                  >
                    Back
                  </Button>
                )}
              </div>
              <div>
                {step < totalSteps ? (
                  <Button onClick={handleNext}>Continue</Button>
                ) : (
                  <Button
                    onClick={handleExamStartButton}
                    disabled={isPending}
                    className="min-w-[120px]"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Starting...
                      </>
                    ) : (
                      "Start Exam"
                    )}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </>
        ) : (
          renderGeneratingState()
        )}
      </DialogContent>
    </Dialog>
  );
};
