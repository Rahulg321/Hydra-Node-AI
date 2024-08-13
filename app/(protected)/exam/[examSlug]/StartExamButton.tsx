"use client";

import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const StartExamButton = ({
  examId,
  examSlug,
  currentUserId,
}: {
  examId: string;
  examSlug: string;
  currentUserId: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  function onSubmit() {
    startTransition(async () => {
      try {
        // wait for 2sec
        console.log("examId", examId);
        console.log("currentUserId", currentUserId);

        const response = await axios.post("/api/CreateQuiz", {
          examId,
          currentUserId,
        });

        console.log("response data", response.data);

        if (response.status === 200) {
          console.log("Quiz session created successfully:", response.data);
          const { quizSessionId } = response.data;
          toast({
            variant: "success",
            title: "Quiz Successful 🎉",
            description: "Quiz session created successfully",
          });
          router.push(`/exam/${examSlug}/quiz/${quizSessionId}`);
        } else {
          console.error("Unexpected response status:", response);
          toast({
            variant: "destructive",
            title: "Error Occurred ❌",
            description: "Error Creating Quiz, Please try again",
          });
        }
      } catch (error) {
        // Something else happened while setting up the request
        console.error("Error in setting up the request:", error);
        toast({
          variant: "destructive",
          title: "Error Occurred ❌",
          description: "Error Creating Quiz, Please try again",
        });
      }
    });
  }

  return (
    <Button
      className="mb-4 rounded-full bg-base p-6 text-lg font-bold"
      onClick={onSubmit}
      disabled={isPending}
    >
      {isPending ? (
        <div>
          <div
            className="text-surface inline-block size-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        "Start Exam"
      )}
    </Button>
  );
};

export default StartExamButton;
