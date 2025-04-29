import db from "@/hooks/lib/db";
import { NextRequest, NextResponse } from "next/server";

function areAnswersCorrect(correctAnswersStr: string, userAnswer: number[]) {
  // Step 1: Convert correctAnswersStr to an array of numbers and sort it
  const correctAnswersArr = correctAnswersStr
    .split(",")
    .map(Number)
    .sort((a, b) => a - b);

  // Step 2: Sort the userAnswer array as well
  const sortedUserAnswer = [...userAnswer].sort((a, b) => a - b);

  // Step 3: Compare both arrays for equality
  if (correctAnswersArr.length !== sortedUserAnswer.length) {
    return false;
  }

  return correctAnswersArr.every(
    (val, index) => val === sortedUserAnswer[index],
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questionId, quizSessionId, questionType, userAnswer } = body;

    if (
      !questionId ||
      !quizSessionId ||
      !questionType ||
      !Array.isArray(userAnswer)
    ) {
      return NextResponse.json(
        {
          message: "Invalid request body. Missing fields or incorrect format.",
        },
        { status: 400 },
      );
    }

    // Retrieve question from database
    const databaseQuestion = await db.question.findFirst({
      where: { id: questionId },
      select: { correctAnswers: true, questionType: true },
    });

    if (!databaseQuestion) {
      return NextResponse.json(
        { message: "Question not found." },
        { status: 404 },
      );
    }

    // Determine if the user's answer is correct
    const correctAnswers = databaseQuestion.correctAnswers;
    const answerResult = areAnswersCorrect(correctAnswers, userAnswer);

    console.log("correct answers", correctAnswers);
    console.log("user answers", userAnswer);
    console.log("answerResult", answerResult);

    // Track if the user skipped the question
    const isSkipped = userAnswer.length === 0;

    // Get the current max order for this quiz session
    const maxOrderAttempt = await db.userAttempt.findFirst({
      where: { quizSessionId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const nextOrder = (maxOrderAttempt?.order ?? 0) + 1;

    // Upsert UserAttempt with the result
    await db.userAttempt.upsert({
      where: {
        quizSessionId_questionId: {
          quizSessionId,
          questionId,
        },
      },
      create: {
        quizSessionId,
        questionId,
        userAnswer: userAnswer.join(","),
        isCorrect: answerResult,
        skipped: isSkipped,
        order: nextOrder,
      },
      update: {
        userAnswer: userAnswer.join(","),
        isCorrect: answerResult,
        skipped: isSkipped,
        order: nextOrder,
      },
    });

    return NextResponse.json(
      { message: "Answer was evaluated successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error evaluating question", error);
    return NextResponse.json(
      { message: "Error evaluating question" },
      { status: 500 },
    );
  }
}
