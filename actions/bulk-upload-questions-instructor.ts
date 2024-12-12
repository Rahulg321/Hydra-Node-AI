"use server";

import { auth } from "@/auth";
import { TransformedQuestion } from "@/components/Dialogs/bulk-import-dialog";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function BulkUploadQuestionsInstructor(
  examId: string,
  questions: TransformedQuestion[],
) {
  try {
    const session = await auth();

    if (!session) {
      return {
        type: "error",
        message: "An active session is required to upload questions.",
      };
    }

    if (!questions || questions.length === 0) {
      return {
        type: "error",
        message: "No questions to upload.",
      };
    }

    if (!examId) {
      return {
        type: "error",
        message: "Exam ID is required to upload questions.",
      };
    }

    // Insert cleaned data in bulk
    await db.question.createMany({
      data: questions,
      skipDuplicates: true, // Optional: skips entries with duplicate IDs
    });

    revalidatePath(`/instructor/exam/${examId}/questions`);

    return {
      type: "success",
      message: `${questions.length} questions uploaded successfully!`,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return {
        type: "error",
        message:
          error.message.length > 0
            ? error.message
            : "An error occurred while uploading questions.",
      };
    }

    console.error("Error uploading questions:", error);

    return {
      type: "error",
      message: "An error occurred while uploading questions.",
    };
  }
}
