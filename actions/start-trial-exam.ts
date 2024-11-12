"use server";

import db from "@/lib/db";

/**
 * Starts a new quiz session for the user on trial exam mode and time.
 * This function handles both practice and other exam modes, creating a new quiz session in the database.
 *
 * @param {number} totalTime - The total time allocated for the exam (in minutes).
 * @param {string} examId - The unique identifier for the exam.
 * @param {string} currentUserId - The unique identifier for the user starting the quiz.
 * @param {number} examLength - the total number of questions in the exam.
 *
 *
 *
 * @returns {Promise<{ type: string, message: string, quizSessionId?: string, error?: any }>}
 * - A promise resolving to an object containing the status, message, and quiz session ID (if successful).
 * - If an error occurs, the error details are also returned.
 */
export default async function StartTrialExam(
  totalTime: number,
  examId: string,
  currentUserId: string,
  examLength: number,
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

    if (!examLength) {
      console.error("examLength does not exist while trying to create quiz");
      return {
        type: "error",
        message: "examLength is required.",
      };
    }

    // we are letting the user update the time of the exam, but we should not let him update the number of questions he want to take

    let quizSession;

    let totalQuestionsToShow;

    if (examLength < 50) {
      totalQuestionsToShow = examLength;
    } else {
      totalQuestionsToShow = 50;
    }

    // for practice mode let user change the time
    quizSession = await db.quizSession.create({
      data: {
        examId: examId,
        userId: currentUserId,
        startTime: new Date(),
        examMode: "TRIAL",
        examTime: totalTime,
        questionCount: totalQuestionsToShow,
      },
    });

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
