import db from "@/lib/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// if this endpoint gets called it means the user skipped the question, there is no need to check again
export async function POST(req: Request) {
  try {
    const { questionId, quizSessionId } = await req.json();

    await db.userAttempt.upsert({
      where: {
        quizSessionId_questionId: {
          quizSessionId: quizSessionId,
          questionId: questionId,
        },
      },
      update: {
        skipped: true, // Ensures the question is marked as skipped if already present
        userAnswer: "", // Ensure userAnswer is set to empty when skipping
        isCorrect: null, // Optional: If skipped, isCorrect is irrelevant or set to null
      },
      create: {
        questionId: questionId,
        quizSessionId: quizSessionId,
        userAnswer: "",
        skipped: true,
      },
    });

    console.log("successfully skipped question");

    return NextResponse.json(
      {
        effect: "success",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error skipping question:", error);
    return NextResponse.json(
      {
        effect: "failure",
        message: `An error occurred while skipping the question. Error: ${error}`,
      },
      {
        status: 500,
      },
    );
  }
}
