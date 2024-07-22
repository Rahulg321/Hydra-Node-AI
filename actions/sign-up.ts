"use server";

import {
  SignUpFormSchema,
  SignUpFormZodType,
} from "@/lib/schemas/SignUpFormSchema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export async function SignUpUser(values: SignUpFormSchema) {
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
      error: "User email already exists, try with a different email",
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

  //  TODO:- send a token verification email

  return {
    success: "user created successfully",
  };
}
