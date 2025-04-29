import db from "@/hooks/lib/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// if this endpoint gets called it means the user skipped the question, there is no need to check again
export async function POST(req: Request) {
  try {
    const { questionId, quizSessionId } = await req.json();

    // Get the current max order for this quiz session
    const maxOrderAttempt = await db.userAttempt.findFirst({
      where: { quizSessionId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const nextOrder = (maxOrderAttempt?.order ?? 0) + 1;

    await db.userAttempt.upsert({
      where: {
        quizSessionId_questionId: {
          quizSessionId: quizSessionId,
          questionId: questionId,
        },
      },
      update: {
        skipped: true,
        userAnswer: "",
        isCorrect: null,
        order: nextOrder,
      },
      create: {
        questionId: questionId,
        quizSessionId: quizSessionId,
        userAnswer: "",
        skipped: true,
        order: nextOrder,
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
