import db from "@/lib/db";
import { z, ZodError } from "zod";

// Update schema to accept both string (for MCQ) and array (for MULTI_SELECT)
const checkAnswerSchema = z.object({
  questionId: z.string(),
  quizSessionId: z.string(),
  userAnswer: z.union([z.string(), z.array(z.string())]), // Can be a string for MCQ or an array for MULTI_SELECT
});

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const { questionId, userAnswer, quizSessionId } =
      checkAnswerSchema.parse(body);

    // Fetch the current question with related correct answers
    const currentQuestion = await db.question.findUnique({
      where: { id: questionId },
      include: {
        correctAnswers: true, // Fetch the correct answers
      },
    });

    if (!currentQuestion) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Question not found.",
        }),
        { status: 404 },
      );
    }

    if (currentQuestion.type === "MCQ") {
      // Handle MCQ: userAnswer is expected to be a single string
      let singleAnswer = userAnswer as string;

      const isCorrect = currentQuestion.correctAnswers.some(
        (correctAnswer) =>
          correctAnswer.answer.toLowerCase().trim() ===
          singleAnswer.toLowerCase().trim(),
      );

      // Upsert the user's attempt (create or update the record)
      await db.userAttempt.upsert({
        where: {
          quizSessionId_questionId: {
            quizSessionId,
            questionId,
          },
        },
        update: {
          userAnswer: singleAnswer,
          isCorrect,
        },
        create: {
          questionId,
          quizSessionId,
          userAnswer: singleAnswer,
          isCorrect,
        },
      });

      return new Response(
        JSON.stringify({
          success: true,
          isCorrect,
          message: "Answer recorded successfully.",
        }),
        { status: 200 },
      );
    } else if (currentQuestion.type === "MULTI_SELECT") {
      // Handle MULTI_SELECT: userAnswer is expected to be an array of strings
      if (!Array.isArray(userAnswer)) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Invalid answer format for MULTI_SELECT question.",
          }),
          { status: 400 },
        );
      }

      const correctAnswers = currentQuestion.correctAnswers.map((answer) =>
        answer.answer.toLowerCase().trim(),
      );

      const userSelectedAnswers = userAnswer.map((answer) =>
        answer.toLowerCase().trim(),
      );

      console.log(
        "all user selected answers in a multi select question are",
        userSelectedAnswers,
      );
      console.log(
        "correct answers in a multi select question are",
        correctAnswers,
      );

      // Check if all correct answers are selected, and no additional incorrect answers are selected
      const isCorrect =
        userSelectedAnswers.length === correctAnswers.length &&
        userSelectedAnswers.every((answer) => correctAnswers.includes(answer));

      console.log("correct answer in multi select question", isCorrect);

      // Upsert the user's attempt (create or update the record)
      await db.userAttempt.upsert({
        where: {
          quizSessionId_questionId: {
            quizSessionId,
            questionId,
          },
        },
        update: {
          userAnswer: userAnswer.join(", "), // Store as a comma-separated string for readability
          isCorrect,
        },
        create: {
          questionId,
          quizSessionId,
          userAnswer: userAnswer.join(", "), // Store as a comma-separated string for readability
          isCorrect,
        },
      });

      return new Response(
        JSON.stringify({
          success: true,
          isCorrect,
          message: "Answer recorded successfully.",
        }),
        { status: 200 },
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Unsupported question type.",
        }),
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error occurred in checkAnswer API:", error);

    if (error instanceof ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          message: error.issues[0].message,
        }),
        { status: 400 },
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: "An unexpected error occurred.",
      }),
      { status: 500 },
    );
  }
}
