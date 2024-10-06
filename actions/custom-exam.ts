"use server";

import db from "@/lib/db";
import { ExamModeValues } from "@/lib/exam-mode-context";
import { MockExamZodType } from "@/lib/schemas/mock-exam-schema";

export default async function CreateCustomExam(
  values: MockExamZodType,
  examId: string,
  currentUserId: string,
) {
  // start and create a new quiz session and send the value of the quiz session back to the frontend for redirecting
  try {
    if (!examId || !currentUserId) {
      console.error(
        "examId or currentUserId does not exist while trying to create quiz",
      );
      return {
        type: "error",
        message: "ExamId and currentUserId are required.",
      };
    }

    const { examMode, totalTime } = values;

    // we are letting the user update the time of the exam, but we should not let him update the number of questions he want to take
    await db.exam.update({
      where: {
        id: examId,
      },
      data: {
        timeAllowed: totalTime,
      },
    });

    // create a new quiz session
    const quizSession = await db.quizSession.create({
      data: {
        examId: examId,
        userId: currentUserId,
        startTime: new Date(),
        examMode: examMode,
      },
    });

    return {
      type: "success",
      message: "Quiz session created successfully.",
      quizSessionId: quizSession.id,
    };
  } catch (error) {
    console.error("an error occured setting up quiz session", error);
    return {
      type: "error",
      message: "An unexpected error occurred",
      error,
    };
  }
}
