"use server";

import db from "@/lib/db";

export default async function CreateMultiStepExam(
  examMode: string,
  totalTime: number,
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

    console.log("values", totalTime, examMode);

    // we are letting the user update the time of the exam, but we should not let him update the number of questions he want to take

    let quizSession;

    if (examMode === "PRACTICE") {
      // for practice mode let user change the time
      quizSession = await db.quizSession.create({
        data: {
          examId: examId,
          userId: currentUserId,
          startTime: new Date(),
          examMode: examMode,
          examTime: totalTime,
        },
      });
    } else {
      quizSession = await db.quizSession.create({
        data: {
          examId: examId,
          userId: currentUserId,
          startTime: new Date(),
          examMode: examMode,
          examTime: totalTime,
        },
      });
    }
    // create a new quiz session

    console.log("successfully created quiz session", quizSession);

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
