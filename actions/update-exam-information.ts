"use server";

import { examInfoFormSchemaType } from "@/app/(manage-exam)/instructor/exam/[uid]/manage/basics/exam-info-form";
import { auth } from "@/auth";
import { TransformedQuestion } from "@/components/Dialogs/bulk-import-dialog";
import db from "@/lib/db";
import { ExamLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export default async function UpdateExamInformation(
  examId: string,
  values: examInfoFormSchemaType,
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

    const { name, subtitle, category, level, description } = values;

    // Insert cleaned data in bulk
    await db.exam.update({
      where: {
        id: examId,
      },
      data: {
        name,
        slug: slugify(name, {
          lower: true,
        }),
        subtitle,
        category,
        examLevel: level as ExamLevel,
        description,
      },
    });

    revalidatePath(`/instructor/exam/${examId}/manage/basics`);

    return {
      type: "success",
      message: `questions uploaded successfully!`,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return {
        type: "error",
        message:
          error.message.length > 0
            ? error.message
            : "An error occurred while updating exam information",
      };
    }

    console.error("Error updating exam information", error);

    return {
      type: "error",
      message: "An error occurred while updating exam information",
    };
  }
}
