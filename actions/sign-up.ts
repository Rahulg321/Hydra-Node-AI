"use server";

import {
  SignUpFormSchema,
  SignUpFormZodType,
} from "@/hooks/lib/schemas/SignUpFormSchema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import db from "@/hooks/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/hooks/lib/tokens";
import { sendVerificationTokenEmail } from "@/hooks/lib/mail";
import { addDays } from "date-fns";

import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/hooks/lib/redis";
import { headers } from "next/headers";
import { extractClientIp } from "@/hooks/lib/utils";

const signUpIpLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1m"),
});

const userLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10m"),
});

export async function SignUpUser(values: SignUpFormZodType) {
  const hdrs = await headers();
  const ip = extractClientIp(hdrs);

  const { success: ipAllowed, pending: ipPending } =
    await signUpIpLimiter.limit(ip);

  if (!ipAllowed) {
    await ipPending;
    return {
      error: "Too many login attempts. Please wait a minute.",
    };
  }
  try {
    const validatedFields = SignUpFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.message,
      };
    }

    const { name, email, password, confirmPassword } = validatedFields.data;

    if (password !== confirmPassword) {
      return {
        error: "Passwords do not match",
      };
    }

    const { success: userAllowed, pending: userPending } =
      await userLimiter.limit(`signup:${email.toLowerCase()}`);

    if (!userAllowed) {
      await userPending;
      return {
        error: "Too many attempts for this account. Try again later.",
      };
    }

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
