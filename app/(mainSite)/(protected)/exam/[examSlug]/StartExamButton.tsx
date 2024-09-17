"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

interface StartExamButtonProps {
  examId: string;
  examSlug: string;
  currentUserId: string;
  buttonLabel?: string;
}

const StartExamButton = ({
  examId,
  examSlug,
  currentUserId,
  buttonLabel = "Start Exam",
}: StartExamButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  // Reusable function for showing subscription toast
  const showSubscriptionToast = () => {
    toast({
      variant: "destructive",
      title: "Not Subscribed ❌",
      description:
        "Subscribe to one of our pricing plans to start taking the exam.",
      action: (
        <ToastAction altText="Subscribe">
          <Link href="/pricing">Subscribe</Link>
        </ToastAction>
      ),
    });
  };

  const createQuizSession = async () => {
    try {
      // Check if the user has access (subscription)
      const hasAccessResponse = await axios.post("/api/hasAccess", {
        currentUserId,
      });

      // If user is not subscribed
      if (
        hasAccessResponse.status !== 200 ||
        !hasAccessResponse.data.hasAccess
      ) {
        showSubscriptionToast();
        return router.push("/pricing");
      }

      // Create quiz session
      const quizResponse = await axios.post("/api/CreateQuiz", {
        examId,
        currentUserId,
      });

      if (quizResponse.status === 200) {
        const { quizSessionId } = quizResponse.data;
        toast({
          variant: "success",
          title: "Quiz Successful 🎉",
          description: "Quiz session created successfully.",
        });
        router.push(`/exam/${examSlug}/quiz/${quizSessionId}`);
      } else {
        throw new Error("Unexpected response status.");
      }
    } catch (error) {
      // Log error and show toast
      console.error("Error in quiz creation:", error);
      toast({
        variant: "destructive",
        title: "Error Occurred ❌",
        description: "Error creating the quiz. Please try again.",
      });
    }
  };

  // Handle form submission
  const onSubmit = () => {
    startTransition(createQuizSession);
  };

  return (
    <Button
      className="mb-4 rounded-full bg-base p-6 text-lg"
      onClick={onSubmit}
      disabled={isPending}
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Creating Quiz...
        </div>
      ) : (
        buttonLabel
      )}
    </Button>
  );
};

export default StartExamButton;
