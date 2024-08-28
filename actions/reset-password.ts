"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import {
  ResetPasswordFormSchema,
  ResetPasswordFormZodType,
} from "@/lib/schemas/ResetPasswordFormSchema";
import { generatePasswordVerificationToken } from "@/lib/tokens";

export async function resetPassword(values: ResetPasswordFormZodType) {
  try {
    const validatedFields = ResetPasswordFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "invalid email!!",
      };
    }
    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return {
        error: "Could not find email address!!",
      };
    }

    if (!existingUser.password) {
      return {
        error: "Your password does not exist already!!!",
      };
    }

    // after verifying the email address, generate token and send verification email
    const newPasswordToken = await generatePasswordVerificationToken(email);

    const response = await sendPasswordResetEmail(
      email,
      newPasswordToken.token,
    );

    if (response?.error) {
      return {
        error: response.error,
      };
    }

    return {
      success: "Reset Password Email sent!!!",
    };
  } catch (error) {
    console.log("an error occured in reset password server action", error);
    return {
      error: `An error occured in server action ${error}`,
    };
  }
}
