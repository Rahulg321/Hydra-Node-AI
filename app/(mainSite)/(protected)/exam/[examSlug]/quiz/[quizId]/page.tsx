import db from "@/lib/db";
import { redirect } from "next/navigation";
import MCQ from "./MCQ";

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
        select: {
          slug: true,
          name: true,
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

  // Fetch the exam and its questions separately
  const exam = await db.exam.findUnique({
    where: {
      slug: params.examSlug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      timeAllowed: true,
    },
  });

  if (!exam) {
    console.log("The exam was not found");
    return redirect("/vendors");
  }

  const questions = await db.question.findMany({
    where: {
      examId: exam?.id,
    },
    include: {
      options: true,
      correctAnswers: true,
    },
  });

  // console.log("questions passed to mcq are", questions);

  return <MCQ quizSession={quizSession} exam={exam} questions={questions} />;
};

export default McqQuizPage;
