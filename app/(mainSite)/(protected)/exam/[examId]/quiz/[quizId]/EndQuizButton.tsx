import EndQuizAction from "@/actions/end-quiz";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { QuizSession } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useTransition, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GradientButton } from "@/components/buttons/gradient-button";

export default function EndQuizButton({
  quizSessionId,
  mcqQuestionLength,
  remainingQuestions,
  setHasEnded,
}: {
  quizSessionId: string;
  mcqQuestionLength: number;
  remainingQuestions: number;
  setHasEnded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button
          variant={"destructive"}
          size={"xl"}
          className="w-full rounded-full"
        >
          End Exam
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="transducer-font text-center text-2xl font-bold">
            Are you sure you want to end the exam?
          </DialogTitle>
          <DialogDescription className="mt-4 text-center text-sm md:mt-6 md:text-lg lg:mt-8">
            You still have {remainingQuestions} questions remaining. If you
            don&apos;t want to submit this attempt now, you can always pause the
            test and return to it later. Remember that you can take this test as
            many times as you want.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4">
          <Button
            variant={"outline"}
            onClick={() => setIsOpen(false)}
            className="rounded-full"
          >
            Cancel
          </Button>
          <GradientButton
            variant={"destructive"}
            onClick={() => {
              startTransition(async () => {
                try {
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
                } catch (error) {
                  console.error("Error ending exam", error);
                  toast({
                    title: "Could not End Exam ❌",
                    variant: "destructive",
                    description: "Your exam was ended successfully",
                  });
                }
              });
            }}
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Ending Exam
              </div>
            ) : (
              "Yes"
            )}
          </GradientButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
