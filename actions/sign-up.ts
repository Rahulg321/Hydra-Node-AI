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
import { addDays } from "date-fns";

import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
import { headers } from "next/headers";

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1m"),
});

export async function SignUpUser(values: SignUpFormZodType) {
  const ip = headers().get("x-real-ip") || headers().get("x-forwarded-for");

  const {
    remaining,
    limit,
    success: limitReached,
  } = await rateLimit.limit(ip!);

  console.log({ remaining, limit, limitReached });

  if (!limitReached) {
    return {
      error:
        "You have reached the limit of contact form submissions. Please try again later after 2 minutes",
    };
  }

  try {
    const validatedFields = SignUpFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.message,
      };
    }

    const { name, email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      // Check if the user is already verified
      if (existingUser.emailVerified) {
        return {
          error:
            "A user with this email already exists, try creating a new user",
        };
      } else {
        // If the user is not verified, resend the verification email
        const verificationToken = await generateVerificationToken(email);

        // Resend verification email
        let emailSent = false;

        const response = await sendVerificationTokenEmail(
          email,
          verificationToken.token,
        );
        if (!response?.error) {
          emailSent = true;
        }

        if (!emailSent) {
          return {
            error: "Could not send verification email, please try again later",
          };
        }

        return {
          success: "A verification email has been resent to your address",
        };
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        trialEndsAt: addDays(new Date(), 7), // Adds 7 days from now
      },
    });

    // generate a token and send a email
    const verificationToken = await generateVerificationToken(email);

    const response = await sendVerificationTokenEmail(
      email,
      verificationToken.token,
    );

    if (response?.error) {
      // at this point the email was not sent but the account was created in the database and the signup function does not work beacuse of the earlier control check
      await db.user.delete({
        where: {
          id: newUser.id,
        },
      });

      return {
        error: "Could not send email, please try again later",
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
