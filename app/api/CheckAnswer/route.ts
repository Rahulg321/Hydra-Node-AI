import db from "@/lib/db";
import { z, ZodError } from "zod";

const checkAnswerSchema = z.object({
  questionId: z.string(),
  quizSessionId: z.string(),
  userAnswer: z.string(),
});

export async function POST(request: Request) {
  try {
    const { questionId, userAnswer, quizSessionId } = await request.json();

    const currentQuestion = await db.question.findUnique({
      where: {
        id: questionId,
      },
    });

    console.log("currentQuestion in route for checking is", currentQuestion);

    if (!currentQuestion) {
      return Response.json(
        {
          success: false,
          message: "Question not found.",
        },
        {
          status: 404,
        },
      );
    }

    // update for the user answer we recieved
    const isCorrect =
      currentQuestion.answer.toLowerCase().trim() ===
      userAnswer.toLowerCase().trim();

    await db.userAttempt.upsert({
      where: {
        quizSessionId_questionId: {
          quizSessionId: quizSessionId,
          questionId: questionId,
        },
      },
      update: {
        userAnswer,
        isCorrect,
      },
      create: {
        questionId: questionId,
        quizSessionId: quizSessionId,
        userAnswer: userAnswer,
        isCorrect,
      },
    });

    return Response.json(
      {
        success: true,
        isCorrect,
        message: "Answer recorded successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("error occured in api route", error);

    if (error instanceof ZodError) {
      return Response.json(
        {
          success: false,
          message: error.issues[0].message,
        },
        {
          status: 400,
        },
      );
    }
    return Response.json(
      {
        success: false,
        message: "An unexpected error occurred.",
      },
      { status: 500 },
    );
  }
}