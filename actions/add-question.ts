"use server";

import { auth } from "@/auth";
import { NewQuestionFormZodType } from "@/components/forms/new-question-form";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addNewQuestion(
  examId: string,
  values: NewQuestionFormZodType,
) {
  try {
    const session = await auth();

    if (!session) {
      return {
        type: "error",
        message: "An active session is required to upload questions.",
      };
    }

    if (!examId) {
      return {
        type: "error",
        message: "Exam ID is required to upload questions.",
      };
    }

    const {
      question,
      answerOption1,
      answerOption2,
      answerOption3,
      answerOption4,
      answerOption5,
      answerOption6,
      explanation1,
      explanation2,
      explanation3,
      explanation4,
      explanation5,
      explanation6,
      correctAnswers,
      overallExplanation,
      questionType,
      domain,
    } = values;

    const response = await db.question.create({
      data: {
        question: question,
        examId: examId,
        questionType,
        answerOption1,
        answerOption2,
        answerOption3,
        answerOption4,
        answerOption5,
        answerOption6,
        explanation1: explanation1 || "",
        explanation2: explanation2 || "",
        explanation3: explanation3 || "",
        explanation4: explanation4 || "",
        explanation5,
        explanation6,
        correctAnswers,
        domain,
        overallExplanation: overallExplanation || "",
      },
    });

    revalidatePath(`/instructor/exam/${examId}/questions`);

    return {
      type: "success",
      message: "Question added successfully",
      questionId: response.id,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return {
        type: "error",
        message:
          error.message.length > 0
            ? error.message
            : "An error occurred while deleting a question.",
      };
    }

    console.error("Error deleting questions:", error);

    return {
      type: "error",
      message: "An error occurred while deleting questions.",
    };
  }
}
