import db from "@/lib/db";
import { redirect } from "next/navigation";
import MCQ from "./MCQ";
import { shuffleArray } from "@/lib/utils";
import { getExamWithSlug } from "@/data/exam";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { examSlug: string };
}) {
  const post = await getExamWithSlug(params.examSlug);

  if (!post) {
    return;
  }

  return {
    title: post.name,
    description: post.description,
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

  // Apply limit based on quiz session mode
  // default mode is MOCK
  let questionsLimit = exam.questionsToShow; // Default to the exam's limit

  if (quizSession.examMode === "TRIAL") {
    questionsLimit = 50; // Trial mode has a fixed limit of 50 questions
  } else if (quizSession.examMode === "PRACTICE") {
    questionsLimit = questions.length; // No limit in practice mode (all questions)
  }

  console.log(
    "Applying questions limit based on mode:",
    quizSession.examMode,
    questionsLimit,
  );

  // Shuffle the questions and apply the limit
  const shuffledQuestions = shuffleArray(questions).slice(0, questionsLimit);

  // Shuffle options for each question
  const shuffledQuestionsWithOptions = shuffledQuestions.map((question) => ({
    ...question,
    options: shuffleArray(question.options),
  }));

  console.log("Shuffled questions with options:", shuffledQuestionsWithOptions);

  return (
    <MCQ
      quizSession={quizSession}
      exam={exam}
      questions={shuffledQuestionsWithOptions}
    />
  );
};

export default McqQuizPage;
