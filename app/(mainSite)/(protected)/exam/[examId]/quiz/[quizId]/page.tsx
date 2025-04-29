import db from "@/hooks/lib/db";
import { redirect } from "next/navigation";
import MCQ from "./MCQ";

// export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ examId: string }>;
}) {
  const params = await props.params;
  const post = await db.exam.findUnique({
    where: { id: params.examId },
    select: {
      name: true,
      description: true,
    },
  });

  return {
    title: `${post?.name} Quiz`,
    description: `Attempt the quiz for ${post?.name} - ${post?.description} and see how well you perform`,
  };
}

const McqQuizPage = async (props: {
  params: Promise<{
    examId: string;
    quizId: string;
  }>;
}) => {
  const params = await props.params;
  // Fetch the quiz session
  const quizSession = await db.quizSession.findUnique({
    where: {
      id: params.quizId,
    },
    include: {
      exam: {
        include: {
          questions: true,
        },
      },
    },
  });

  if (!quizSession) {
    console.log("The quiz session was not created");
    return redirect("/vendors");
  }

  if (quizSession.isCompleted) {
    console.log("The quiz session was completed");
    return redirect(
      `/exam/${quizSession.exam.slug}/quiz/${quizSession.id}/results`,
    );
  }

  const exam = quizSession.exam;
  const questions = exam.questions;
  let questionsLimit = quizSession.questionCount;

  const sliceQuestions = questions.slice(0, questionsLimit);

  return (
    <MCQ
      quizSession={{
        ...quizSession,
        examMode: quizSession.examMode as "PRACTICE" | "EXAM",
      }}
      exam={exam}
      questions={sliceQuestions}
    />
  );
};

export default McqQuizPage;
