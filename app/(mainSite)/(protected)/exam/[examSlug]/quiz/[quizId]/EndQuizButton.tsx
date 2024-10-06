import { Button } from "@/components/ui/button";
import { QuizSession } from "@prisma/client";
import axios from "axios";
import { useTransition } from "react";

export default function EndQuizButton({
  quizSession,
  setHasEnded,
}: {
  quizSession: QuizSession;
  setHasEnded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        startTransition(async () => {
          // timeout of 3 sec
          // await new Promise((resolve) => setTimeout(resolve, 3000));

          const response = await axios.post("/api/EndQuiz", {
            quizSessionId: quizSession.id,
          });
          setHasEnded(true);
        });
      }}
      className="w-full rounded-full px-10 py-6 text-base"
      disabled={isPending}
    >
      {isPending ? "Ending Exam" : "End Exam"}
    </Button>
  );
}
