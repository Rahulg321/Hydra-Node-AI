import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { quizSessionId } = body;

    // Ensure the quizSessionId is provided
    if (!quizSessionId) {
      return NextResponse.json(
        {
          success: false,
          message: "quizSessionId is required.",
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

    const totalQuestions = currentQuizSession.exam.questions.length;
    const userAttempts = currentQuizSession.userAttempts;

    // Use reduce to calculate correct, incorrect, and skipped questions in a single pass
    const { correctQuestions, incorrectQuestions, skippedQuestions } =
      userAttempts.reduce(
        (acc, { isCorrect, skipped }) => {
          if (isCorrect) {
            acc.correctQuestions++;
          } else {
            acc.incorrectQuestions++;
          }
          if (skipped) {
            acc.skippedQuestions++;
          }
          return acc;
        },
        { correctQuestions: 0, incorrectQuestions: 0, skippedQuestions: 0 },
      );

    // Calculate score percentage
    const examScore = (correctQuestions / totalQuestions) * 100;

    // Define a passing score, could be moved to an environment variable or config
    const PASSING_SCORE = 50;

    // Update the quiz session with the results
    await db.quizSession.update({
      where: {
        id: quizSessionId,
      },
      data: {
        isCompleted: true,
        endTime: new Date(),
        correctAnswers: correctQuestions,
        incorrectAnswers: incorrectQuestions,
        skippedAnswers: skippedQuestions,
        percentageScored: examScore,
        passFailStatus: examScore >= PASSING_SCORE, // Simplified boolean condition
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
          passFailStatus: examScore >= PASSING_SCORE,
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
