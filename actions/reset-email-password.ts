"use server";

import { auth } from "@/auth";
import db from "@/hooks/lib/db";
import {
  ProfileFormSchema,
  ProfileFormZodType,
} from "@/lib/schemas/ProfileFormSchema";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function resetEmailPassword(
  values: ProfileFormZodType,
  userProfileId: string,
) {
  try {
    const session = await auth();
    if (!session) {
      console.log("user not authenticated");
      return {
        error: "user is not authenticated. Cannot complete request!",
      };
    }

    if (!userProfileId) {
      return {
        error: "profile id is not provided. Cannot complete request!",
      };
    }

    const validatedFields = ProfileFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "invalid email or password!!",
      };
    }
    const { name, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        password: hashedPassword,
      },
    });

    revalidatePath(`/profile/${userProfileId}`);

    return {
      success: "Successfully updated name and password",
    };
  } catch (error) {
    console.log("error occured in reset email password server action", error);
    return {
      error: `An error occured in server action ${error}`,
    };
  }
}
