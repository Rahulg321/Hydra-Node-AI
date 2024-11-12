import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { quizSessionId, questionLength } = body;

    // Ensure the quizSessionId is provided
    if (!quizSessionId || !questionLength) {
      return NextResponse.json(
        {
          success: false,
          message: "quizSessionId and questionLength is required.",
        },
        { status: 400 },
      );
    }

    // Fetch the quiz session and include relevant data (including userAttempts to minimize DB calls)
    const currentQuizSession = await db.quizSession.findFirst({
      where: {
        id: quizSessionId,
      },
      include: {
        exam: {
          include: {
            questions: true,
          },
        },
        userAttempts: true, // Include userAttempts in the same query
      },
    });

    // Handle if the quiz session is not found
    if (!currentQuizSession) {
      return NextResponse.json(
        {
          success: false,
          message: "Could not find relevant quiz session with the provided ID.",
        },
        { status: 400 },
      );
    }

    let userAttempts = await db.userAttempt.findMany({
      where: {
        id: quizSessionId,
      },
    });

    const { correctQuestions, incorrectQuestions, skippedQuestions } =
      userAttempts.reduce(
        (acc, { isCorrect, skipped }) => {
          if (isCorrect) {
            acc.correctQuestions++;
          } else if (!skipped) {
            acc.incorrectQuestions++;
          }

          if (skipped) {
            acc.skippedQuestions++;
          }
          return acc;
        },
        { correctQuestions: 0, incorrectQuestions: 0, skippedQuestions: 0 },
      );

    let examScore = (correctQuestions / questionLength) * 100 || 0;

    await db.quizSession.update({
      where: {
        id: quizSessionId,
      },
      data: {
        correctAnswers: correctQuestions,
        incorrectAnswers: incorrectQuestions,
        skippedAnswers: questionLength - correctQuestions - incorrectQuestions,
        endTime: new Date(),
        isCompleted: true,
        percentageScored: examScore,
        passFailStatus: examScore >= 50 ? true : false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          correctQuestions,
          incorrectQuestions,
          skippedQuestions,
          examScore,
          passFailStatus: examScore >= 50 ? true : false,
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("An error occurred while trying to end quiz:", error);

    // Handle error more gracefully and log it properly
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
