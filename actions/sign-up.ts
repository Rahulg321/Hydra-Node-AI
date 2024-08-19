"use server";

import {
  SignUpFormSchema,
  SignUpFormZodType,
} from "@/lib/schemas/SignUpFormSchema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationTokenEmail } from "@/lib/mail";

export async function SignUpUser(values: SignUpFormSchema) {
  try {
    const validatedFields = SignUpFormZodType.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: validatedFields.error.message,
      };
    }

    const { firstName, lastName, email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return {
        error:
          "User email already exists, try with a different email or log in",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    // generate a token and send a email
    const verificationToken = await generateVerificationToken(email);

    const response = await sendVerificationTokenEmail(
      email,
      verificationToken.token,
    );

    if (response?.error) {
      return {
        error: "Could not send email",
      };
    }

    return {
      success: "Confirmation Email Sent",
    };
  } catch (error) {
    console.log("an error occured in signup user", error);

    if (error instanceof z.ZodError) {
      console.log("zod error occured in signup user", error.message);
      return {
        error: error.message,
      };
    }

    return {
      error: "An unexpected error occurred",
    };
  }
}
