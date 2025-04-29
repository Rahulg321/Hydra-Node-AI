"use server";

import { revalidatePath } from "next/cache";
import db from "@/hooks/lib/db";
import { auth } from "@/auth";

export default async function addReply(questionId: string, content: string) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("You must be logged in to reply");
    }

    const reply = await db.reply.create({
      data: {
        content,
        authorId: session.user.id!,
        questionId,
      },
    });

    revalidatePath(`/community/forum/${questionId}`);
    return reply;
  } catch (error) {
    console.error("Error adding reply:", error);
    throw new Error("Failed to add reply. Please try again.");
  }
}
