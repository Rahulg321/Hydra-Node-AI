import EndQuizAction from "@/actions/end-quiz";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { QuizSession } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

export default function EndQuizButton({
  quizSessionId,
  mcqQuestionLength,
  setHasEnded,
}: {
  quizSessionId: string;
  mcqQuestionLength: number;
  setHasEnded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        startTransition(async () => {
          // timeout of 3 sec
          // await new Promise((resolve) => setTimeout(resolve, 3000));

          const response = await EndQuizAction(
            quizSessionId,
            mcqQuestionLength,
          );

          if (response.type === "success") {
            toast({
              title: "Successfully Ended Mcq Exam",
              variant: "success",
              description:
                response.message || "Your exam was ended successfully",
            });
            setHasEnded(true);
          }

          if (response.type === "error") {
            toast({
              title: "Could not End Exam ❌",
              variant: "destructive",
              description:
                response.message || "Your exam was ended successfully",
            });
          }
        });
      }}
      className="w-full rounded-full px-10 py-6 text-base"
      disabled={isPending}
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Ending Exam
        </div>
      ) : (
        "End Exam"
      )}
    </Button>
  );
}
