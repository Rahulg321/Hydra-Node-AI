import db from "@/lib/db";
import { redirect } from "next/navigation";
import MCQ from "./MCQ";
import { shuffleArray } from "@/lib/utils";

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
      questionsToShow: true,
      attempts: true,
      examLevel: true,
      description: true,
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

  // shuffling the questions
  // shuffling the questions
  const shuffled = questions.sort(() => Math.random() - 0.5);
  // console.log("shuffled questions", shuffled);

  // fetching the limit of questions to show
  const shuffledQuestions = shuffled.slice(0, exam.questionsToShow);
  // console.log("shuffled questions with limit", shuffledQuestions);

  // shuffling the options of those shuffled Questions so that everytime a new quiz session we get a shuffled response
  const shuffledQuestionsWithOptions = shuffledQuestions.map((el) => {
    return {
      ...el,
      options: shuffleArray(el.options),
    };
  });

  return (
    <MCQ
      quizSession={quizSession}
      exam={exam}
      questions={shuffledQuestionsWithOptions}
    />
  );
};

export default McqQuizPage;
