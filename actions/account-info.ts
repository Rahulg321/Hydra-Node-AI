"use server";

import { auth } from "@/auth";
import db from "@/hooks/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Updates the account info of the user, changing the first name and last name
 * @param param0
 * @returns
 */
export async function updateAccountInfo({
  userId,
  firstName,
  lastName,
}: {
  userId: string;
  firstName: string;
  lastName: string;
}) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("User is not Authenticated");
    }

    if (!userId) {
      throw new Error("User Id is not Available");
    }

    await db.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
      },
    });

    revalidatePath(`/profile/${userId}/info`);

    return { success: true };
  } catch (error) {
    console.error("Failed to update account info:", error);
    throw error;
  }
}
