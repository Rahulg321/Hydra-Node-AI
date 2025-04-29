"use server";

import { currentUser } from "@/hooks/lib/auth";
import db from "@/hooks/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import {
  ResetLoggedUserPasswordSchema,
  ResetLoggedUserPasswordType,
} from "@/hooks/lib/schemas/ResetLoggedUserPassword";

/**
 * Resets the password for a logged-in user.
 *
 * @param {string} userId - The unique identifier of the user whose password is to be reset.
 * @param {ResetLoggedUserPasswordType} values - An object containing the new password and any additional required information.
 * @returns {Promise<void>} - A promise that resolves when the password reset operation is complete.
 */
export default async function resetLoggedInUserPassword(
  userId: string,
  values: ResetLoggedUserPasswordType,
) {
  let newHashedPassword = "";

  try {
    const loggedInUser = await currentUser();

    if (!loggedInUser) {
      console.log("user is not logged in");
      return {
        type: "error",
        message: "UnAuthorized to make changes....",
      };
    }

    // Find the user by ID
    const dbUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Check if user exists before updating
    if (!dbUser) {
      console.log("Could not find user in db");
      return {
        type: "error",
        message: "User not found",
      };
    }

    const validatedFields = ResetLoggedUserPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        type: "error",
        message: "Old and New Password Validation Failed!!!",
      };
    }

    const { oldPassword, newPassword } = validatedFields.data;

    // Check if the user entered the correct password

    if (oldPassword && newPassword && dbUser.password) {
      // check whether the user entered the correct password or not
      console.log("changing passwords");
      const passwordsMatch = await bcrypt.compare(oldPassword, dbUser.password);

      if (!passwordsMatch) {
        console.log("passwords do not match");
        return {
          type: "error",
          message: "Incorrect Password, passwords does not match",
        };
      }

      console.log("generating hash");
      newHashedPassword = await bcrypt.hash(newPassword, 10);
    }

    // Update the user profile
    console.log("updating with new values");

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newHashedPassword,
      },
    });

    console.log("revalidating path");
    revalidatePath(`/profile/${userId}`);

    return {
      type: "success",
      message: "password reset successfully",
    };
  } catch (error) {
    console.log("an error occured while trying to reset password", error);

    if (error instanceof Error) {
      return {
        type: "error",
        message: error.message,
      };
    }

    return {
      type: "error",
      message: "an error occured while trying to reset password",
    };
  }
}
