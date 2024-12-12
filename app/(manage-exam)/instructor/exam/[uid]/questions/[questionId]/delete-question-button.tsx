"use client";

import deleteExamQuestion from "@/actions/delete-question";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteQuestionButton = ({
  examId,
  questionId,
}: {
  examId: string;
  questionId: string;
}) => {
  const router = useRouter();

  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  async function handleDelete() {
    startTransition(async () => {
      console.log("Deleting question", questionId);
      const response = await deleteExamQuestion(examId, questionId);

      if (response.type === "success") {
        toast({
          title: "Question Deleted Successfully",
          description: response.message || "Successfully deleted question",
        });

        // navigate to the new question route after deleting the question
        router.push(`/instructor/exam/${examId}/questions/new`);
      }

      if (response.type === "error") {
        toast({
          title: "Error Deleting Question",
          variant: "destructive",
          description: response.message || "Successfully deleted question",
        });
      }
    });
  }

  return (
    <Button variant={"destructive"} onClick={handleDelete} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete Question"}
    </Button>
  );
};

export default DeleteQuestionButton;
