"use server";

import db from "@/hooks/lib/db";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/hooks/lib/redis";
import { headers } from "next/headers";
import { extractClientIp } from "@/hooks/lib/utils";
import { auth } from "@/auth";

/**
 * Creates a new quiz session for a user with the specified exam mode and time.
 *
 * @param {string} examMode - The mode of the exam (e.g., "PRACTICE" or "MOCK").
 * @param {number} totalTime - The total time allotted for the exam in minutes.
 * @param {string} examId - The unique identifier of the exam.
 * @param {string} currentUserId - The unique identifier of the user taking the exam.
 * @param {number} examLength - The total number of questions in the exam.
 * @param {number} questionsToShow - The total number of questions that will be shown to the user as per admin.
 *@param {number} numberOfQuestions number of question as selected by the user in admin mode
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

const createExamIpLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1m"),
});

export default async function CreateMultiStepExam(
  examMode: string,
  totalTime: number,
  examId: string,
  currentUserId: string,
  examLength: number,
  questionsToShow: number,
  numberOfQuestions?: number,
) {
  const userSession = await auth();
  if (!userSession) {
    return {
      type: "error",
      message: "You must be logged in to create an exam",
    };
  }

  const hdrs = await headers();
  const ip = extractClientIp(hdrs);

  const { success: ipAllowed, pending: ipPending } =
    await createExamIpLimiter.limit(ip);

  if (!ipAllowed) {
    await ipPending;
    return {
      type: "error",
      message: "Too many exam attempts. Please wait a minute.",
    };
  }

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
      if (numberOfQuestions) {
        totalLengthOfQuestions = numberOfQuestions;
      } else {
        totalLengthOfQuestions = examLength;
      }
    }

    if (examMode === "MOCK") {
      if (questionsToShow > examLength) {
        // if it is a mock exam and the total number of questions is less than the allowed questions that the admin has set, then the total length of questions is the total number of questions
        totalLengthOfQuestions = examLength;
      } else {
        totalLengthOfQuestions = questionsToShow;
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
