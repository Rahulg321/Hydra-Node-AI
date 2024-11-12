"use server";

import db from "@/lib/db";
/**
 * Creates a new quiz session for a user with the specified exam mode and time.
 *
 * @param {string} examMode - The mode of the exam (e.g., "PRACTICE" or "MOCK").
 * @param {number} totalTime - The total time allotted for the exam in minutes.
 * @param {string} examId - The unique identifier of the exam.
 * @param {string} currentUserId - The unique identifier of the user taking the exam.
 * @param {number} examLength - The total number of questions in the exam.
 * @param {number} questionsToShow - The total number of questions that will be shown to the user as per admin.
 *
 * @returns {Promise<QuizSessionResponse>} - A promise that resolves to an object containing the success or error status, message, and quiz session ID if successful.
 *
 * @typedef {Object} QuizSessionResponse
 * @property {"success" | "error"} type - Indicates whether the quiz session creation was successful.
 * @property {string} message - A message detailing the result of the operation.
 * @property {string} [quizSessionId] - The unique identifier of the created quiz session, if successful.
 * @property {unknown} [error] - The error object, if an error occurred during the operation.
 *
 * @example
 * // Example usage:
 * const response = await CreateMultiStepExam("PRACTICE", 30, "exam123", "user456");
 * if (response.type === "success") {
 *   console.log("Quiz session created with ID:", response.quizSessionId);
 * } else {
 *   console.error("Error creating quiz session:", response.message);
 * }
 */

export default async function CreateMultiStepExam(
  examMode: string,
  totalTime: number,
  examId: string,
  currentUserId: string,
  examLength: number,
  questionsToShow: number,
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

    let totalLengthOfQuestions;

    if (examMode === "PRACTICE") {
      // if it is a practice exam, the total length of questions is the total length of the exam

      totalLengthOfQuestions = examLength;
    }

    if (examMode === "MOCK") {
      console.log("exam mode", examMode);
      if (questionsToShow > examLength) {
        // if it is a mock exam and the total number of questions is less than the allowed questions that the admin has set, then the total length of questions is the total number of questions
        console.log("questions to show is greater than exam length");
        totalLengthOfQuestions = examLength;
        console.log("total length of questions", totalLengthOfQuestions);
      } else {
        console.log("questions to show is less than exam length");
        totalLengthOfQuestions = questionsToShow;
        console.log("total length of questions", totalLengthOfQuestions);
      }
    }

    // Set up quiz session data
    const quizSessionData = {
      examId,
      userId: currentUserId,
      startTime: new Date(),
      examMode,
      examTime: totalTime,
      questionCount: totalLengthOfQuestions,
    };

    // Create a new quiz session
    const quizSession = await db.quizSession.create({
      data: quizSessionData,
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
