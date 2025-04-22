"use server";

import db from "@/lib/db";

// this server action will be used to the quiz

/**
 * Ends an active quiz session by updating its status and calculating results.
 *
 * @param {string} quizSessionId - The unique identifier of the quiz session to be ended.
 * @param {number} questionLength - The total number of questions user took in the exam
 *
 * @returns {Promise<{ type: "success" | "error", message: string, data?: any, error?: unknown }>}
 * A promise that resolves to an object indicating the success or failure of the operation.
 *
 * @typedef {Object} EndQuizResponse
 * @property {"success" | "error"} type - Indicates whether the quiz session was successfully ended.
 * @property {string} message - A message detailing the result of the operation.
 * @property {any} [data] - Any relevant data, such as final scores or statistics, if applicable.
 * @property {unknown} [error] - The error object, if an error occurred during the operation.
 *
 * @example
 * // Example usage:
 * const response = await EndQuiz("session123");
 * if (response.type === "success") {
 *   console.log("Quiz ended successfully:", response.data);
 * } else {
 *   console.error("Error ending quiz:", response.message);
 * }
 */
export default async function EndQuizAction(
  quizSessionId: string,
  questionLength: number,
) {
  try {
    let userAttempts = await db.userAttempt.findMany({
      where: {
        quizSessionId,
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
        isCompleted: true,
        incorrectAnswers: incorrectQuestions,
        skippedAnswers: questionLength - correctQuestions - incorrectQuestions,
        endTime: new Date(),
        percentageScored: examScore,
        passFailStatus: examScore >= 70 ? true : false,
      },
    });

    return {
      type: "success",
      message: "Successfully Ended Quiz",
    };
  } catch (error) {
    console.log("an error occured while ending quizx", error);

    return {
      type: "error",
      message: "an error occured while trying to end quiz",
    };
  }
}
