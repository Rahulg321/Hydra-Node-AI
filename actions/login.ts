"use server";

import { signIn } from "@/auth";
import {
  LoginFormSchema,
  LoginFormZodType,
} from "@/lib/schemas/LoginFormSchema";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import * as z from "zod";

export async function LoginUser(values: LoginFormSchema) {
  const validatedFields = LoginFormZodType.safeParse(values);
  if (!validatedFields.success) {
    return (
      validatedFields.error.message ||
      "Invalid Credentials" ||
      "An unexpected error occurred"
    );
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return `Invalid Credentials: ${error.message}`;
        default:
          return `An unexpected error occurred`;
      }
    }

    throw error;
  }
}
