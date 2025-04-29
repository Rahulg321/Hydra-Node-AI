"use client";

import axios from "axios";
import EndQuizAction from "@/actions/end-quiz";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

import React, { useState, useTransition } from "react";
import { GradientButton } from "@/components/buttons/gradient-button";
import { Button } from "@/components/ui/button";

const FinishExamDialog = ({
  quizSessionId,
  questionsLength,
  setHasEnded,
  skippedQuestions,
  selectedQuestions,
  questionId,
  questionType,
}: {
  quizSessionId: string;
  questionsLength: number;
  selectedQuestions: number[];
  setHasEnded: (hasEnded: boolean) => void;
  skippedQuestions: number;
  questionId: string;
  questionType: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFinishing, startFinishing] = useTransition();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <GradientButton size="xl">Finish Test</GradientButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="transducer-font text-center text-xl font-bold uppercase tracking-wider">
            Are you sure you want to finish this exam?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            You have skipped {skippedQuestions} questions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Review Questions
          </Button>
          <GradientButton
            size="lg"
            className="rounded-full"
            onClick={async () => {
              startFinishing(async () => {
                console.log("Finishing quiz...");
                try {
                  if (selectedQuestions.length > 0) {
                    // Attempted the question
                    const userAnswer = selectedQuestions; // Use the state directly
                    console.log("Checking Answer:", {
                      questionId,
                      quizSessionId,
                      questionType,
                      userAnswer,
                    });
                    const response = await axios.post("/api/CheckAnswer", {
                      questionId,
                      quizSessionId,
                      questionType,
                      userAnswer,
                    });

                    if (response.status !== 200) {
                      console.error("CheckAnswer API Error:", response);
                      throw new Error("Server error while submitting answer.");
                    }

                    status = "attempted";
                    toast({ title: "Answer Submitted", variant: "default" }); // Simple confirmation
                  } else {
                    // Skipped the question
                    console.log("Skipping Answer:", {
                      questionId,
                      quizSessionId,
                    });
                    const response = await axios.post("/api/SkipAnswer", {
                      questionId,
                      quizSessionId,
                    });

                    if (response.status !== 200) {
                      console.error("SkipAnswer API Error:", response);
                      throw new Error("Server error while skipping question.");
                    }
                    toast({
                      title: "Question Skipped ⛷️",
                      variant: "default",
                    });
                    status = "skipped"; // Status remains skipped
                  }

                  const response = await EndQuizAction(
                    quizSessionId,
                    questionsLength,
                  );
                  if (response.type === "success") {
                    toast({
                      title: "Exam Finished!",
                      variant: "success",
                      description:
                        response.message ||
                        "Your exam has been submitted successfully.",
                    });
                    setHasEnded(true);
                  } else {
                    toast({
                      title: "Submission Error ❌",
                      variant: "destructive",
                      description:
                        response.message ||
                        "There was an issue finalizing your exam.",
                    });
                  }
                } catch (error) {
                  console.error("Failed to end the quiz manually:", error);
                  toast({
                    title: "Error",
                    variant: "destructive",
                    description:
                      "An unexpected error occurred while finishing the exam.",
                  });
                }
              });
            }}
            disabled={isFinishing}
          >
            {isFinishing ? "Finishing..." : "Finish Test"}
          </GradientButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FinishExamDialog;
