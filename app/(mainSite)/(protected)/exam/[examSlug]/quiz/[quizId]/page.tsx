import db from "@/lib/db";
import { redirect } from "next/navigation";
import MCQ from "./MCQ";
import { shuffleArray } from "@/lib/utils";
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

  console.log("shuffled quesitons length", shuffledQuestions.length);

  return (
    <div>
      <MCQ
        quizSession={quizSession}
        exam={exam}
        questions={shuffledQuestions}
      />
    </div>
  );
};

export default McqQuizPage;
