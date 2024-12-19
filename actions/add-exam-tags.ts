"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addTagsToExam({
  examId,
  tags,
}: {
  examId: string;
  tags: string[];
}) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("User is not Authenticated");
    }

    if (!examId) {
      throw new Error("Exam Id is not Available");
    }

    const tagRecords = await Promise.all(
      tags.map(async (tag) => {
        let tagRecord = await db.tag.findUnique({
          where: { name: tag },
        });

        if (!tagRecord) {
          tagRecord = await db.tag.create({
            data: { name: tag },
          });
        }

        return tagRecord;
      }),
    );

    await db.exam.update({
      where: { id: examId },
      data: {
        tags: {
          connect: tagRecords.map((tag) => ({ id: tag.id })),
        },
      },
    });

    revalidatePath(`/instructor/exam/${examId}/manage/basics`);
    revalidatePath(`/instructor/exam/${examId}/manage`);

    return { success: true };
  } catch (error) {
    console.error("Failed to add tags to exam:", error);
    throw error;
  }
}
