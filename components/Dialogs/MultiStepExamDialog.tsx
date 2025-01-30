"use client";

import React, { useEffect, useState, useTransition } from "react";
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
                        <DialogDescription>
                            Welcome to the exam onboarding process. Please enter your name to
                            continue.
                        </DialogDescription>
                        <div>
                            <span className="text-sm">
                                Please answer the following questions to continue
                            </span>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="w-full">
                        <DialogDescription>Please provide the exam mode.</DialogDescription>
                        <div>
                            <Select onValueChange={handleModeSelect} value={examMode}>
                                <SelectTrigger className="">
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
                        <div>
                            {examMode === "PRACTICE" && (
                                <div className="mt-4 space-y-2">
                                    <div>
                                        <span className="text-xs text-muted-foreground">
                                            When in practice mode you can set the time for the exam
                                        </span>
                                    </div>
                                    <Label>Time for Exam (in minutes)</Label>
                                    <Input
                                        type="number"
                                        placeholder="Exam Time......"
                                        value={timeForExam}
                                        onChange={handleTimeChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div>
                        <DialogDescription>
                            Review the details below and start the exam when you&apos;re
                            ready.
                        </DialogDescription>

                        <div className="mt-4 rounded-md bg-card p-4 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold">Exam Details</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="block text-sm font-bold text-muted-foreground">
                                        Exam Name
                                    </span>
                                    <span className="block text-base">{examName}</span>
                                </div>

                                <div>
                                    <span className="block text-sm font-bold text-muted-foreground">
                                        Time Allowed
                                    </span>
                                    <span className="block text-base">
                                        {examMode === "PRACTICE" ? (
                                            <div>
                                                <span>{timeForExam} minutes</span>
                                            </div>
                                        ) : (
                                            <div>
                                                <span>{examTime} minutes</span>
                                            </div>
                                        )}
                                    </span>
                                </div>

                                <div>
                                    <span className="block text-sm font-bold text-muted-foreground">
                                        Exam Mode
                                    </span>
                                    <span className="block text-base capitalize">{examMode}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="text-sm text-muted-foreground">
                                Please make sure you are ready to begin the exam. Once you
                                start, the timer will begin...
                            </p>
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
                <Button className="hover:bg-primary-dark text-white">
                    {buttonLabel}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {step < totalSteps ? `Step ${step}` : "Start Exam"}
                    </DialogTitle>
                </DialogHeader>
                <div>{renderStep()}</div>
                <div className="mt-4 flex items-center justify-between">
                    {step > 1 && <Button onClick={handlePrevious}>Previous</Button>}

                    {step < totalSteps ? (
                        <Button onClick={handleNext} className="justify-end">
                            Next
                        </Button>
                    ) : (
                        <Button disabled={isPending} onClick={handleExamStartButton}>
                            {isPending ? "Creating Exam" : "Start Exam"}
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
