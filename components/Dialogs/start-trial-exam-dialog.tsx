"use client";

import React, { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Assuming Button component exists
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import StartTrialExam from "@/actions/start-trial-exam";

const StartTrialExamDialog = ({
  examId,
  userId,
  examSlug,
  examTime,
}: {
  examId: string;
  examSlug: string;
  userId: string;
  examTime: number;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const handleStartTrial = async () => {
    console.log("Trial exam started!");
    // Logic to start the trial exam can be placed here
    startTransition(async () => {
      const response = await StartTrialExam(examTime, examId, userId);
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

        router.push(`/exam/${examSlug}/quiz/${response.quizSessionId}`);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default">Start Trial Exam</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start Your Trial Exam</DialogTitle>
          <DialogDescription>
            You are about to begin a trial exam. Please note that:
            <ul className="mt-2 list-inside list-disc">
              <li>Only 50 questions will be provided in the trial.</li>
              <li>
                The trial exam is designed to give you a preview of the full
                experience.
              </li>
              <li>Your progress will not be saved beyond this session.</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => console.log("Dialog closed")}
          >
            Cancel
          </Button>
          <Button
            variant="hydraPrimary"
            onClick={handleStartTrial}
            disabled={isPending}
          >
            {isPending ? "Starting Exam" : "Start Exam"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartTrialExamDialog;
