"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import {
  LoginFormSchema,
  LoginFormZodType,
} from "@/lib/schemas/LoginFormSchema";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import * as z from "zod";
import { Resend } from "resend";
import { TokenVerificationEmail } from "@/components/emails/TokenVerification";
import { sendVerificationTokenEmail } from "@/lib/mail";

export async function LoginUser(values: LoginFormSchema) {
  const validatedFields = LoginFormZodType.safeParse(values);
  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error.message ||
        "Invalid Credentials" ||
        "An unexpected error occurred",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  // they need to create an account first or they need to login with OAuth
  if (!existingUser || !existingUser.password || !existingUser.email) {
    return {
      error:
        "Email Does not exist, please create an account or try again later",
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    const response = await sendVerificationTokenEmail(
      existingUser.email,
      verificationToken.token,
    );

    if (response?.error) {
      return {
        error: "Could not send email",
      };
    }

    return {
      success: "Verification Email Sent",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
    });

    return {
      success: "successfully logged in ",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: `Invalid Credentials: ${error.message}`,
          };
        case "CallbackRouteError":
          return {
            error: `Invalid Email or Password`,
          };
        case "AccessDenied":
          return {
            error: `Access Denied: ${error.message}`,
          };
        default:
          return {
            error: `An unexpected error occurred`,
          };
      }
    }

    throw error;
  }
}
