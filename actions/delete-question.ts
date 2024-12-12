"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function deleteExamQuestion(
  examId: string,
  questionId: string,
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

    if (!questionId) {
      return {
        type: "error",
        message: "Question ID is required to upload questions.",
      };
    }

    await db.question.delete({
      where: {
        id: questionId,
      },
    });

    revalidatePath(`/instructor/exam/${examId}/questions`);

    return {
      type: "success",
      message: ` questions deleted successfully!`,
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
