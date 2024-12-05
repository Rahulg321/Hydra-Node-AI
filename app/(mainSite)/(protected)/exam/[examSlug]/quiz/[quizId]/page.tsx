import db from "@/lib/db";
import { redirect } from "next/navigation";
import MCQ from "./MCQ";
import { getExamWithSlug } from "@/data/exam";

// export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { examSlug: string };
}) {
  const post = await getExamWithSlug(params.examSlug);

  return {
    title: `${post?.name} Quiz`,
    description: `Attempt the quiz for ${post?.name} - ${post?.description} and see how well you perform`,
  };
}

const McqQuizPage = async ({
  params,
}: {
  params: {
    examSlug: string;
    quizId: string;
  };
}) => {
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
    <div>
      <MCQ quizSession={quizSession} exam={exam} questions={sliceQuestions} />
    </div>
  );
};

export default McqQuizPage;
