"use client";

import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { redirect, useRouter } from "next/navigation";
import React, { useTransition } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { User } from "@prisma/client";
import { hasAccess } from "@/lib/utils";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

const StartExamButton = ({
  examId,
  examSlug,
  currentUserId,
  buttonLabel = "Start Exam",
}: {
  examId: string;
  examSlug: string;
  currentUserId: string;
  buttonLabel?: string;
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

        const userHasSubscriped = await hasAccess(currentUserId);

        if (!userHasSubscriped) {
          toast({
            variant: "destructive",
            title: "Not Subscriped ❌",
            description:
              "Subscripe to one of our pricing plans to start taking the exam",
            action: (
              <ToastAction altText="Subscribe">
                <Link href="/pricing">Subscribe</Link>
              </ToastAction>
            ),
          });
          redirect("/pricing");
        }

        // creates a quiz session
        const response = await axios.post("/api/CreateQuiz", {
          examId,
          currentUserId,
        });

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
      className="mb-4 rounded-full bg-base p-6 text-lg"
      onClick={onSubmit}
      disabled={isPending}
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Creating Quiz
        </div>
      ) : (
        buttonLabel
      )}
    </Button>
  );
};

export default StartExamButton;
