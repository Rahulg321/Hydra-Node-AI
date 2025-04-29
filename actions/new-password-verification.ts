"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import db from "@/hooks/lib/db";
import {
  NewPasswordFormSchema,
  NewPasswordFormZodType,
} from "@/hooks/lib/schemas/NewPasswordSchema";
import bcrypt from "bcryptjs";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/hooks/lib/redis";
import { headers } from "next/headers";

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "60m"),
});

export const newPasswordVerification = async (
  values: NewPasswordFormZodType,
  token?: string | null,
) => {
  // TODO: Implement rate limiting and error handling
  const ip =
    (await headers()).get("x-real-ip") ||
    (await headers()).get("x-forwarded-for");

  const {
    remaining,
    limit,
    success: limitReached,
  } = await rateLimit.limit(ip!);

  console.log({ remaining, limit, limitReached });

  if (!limitReached) {
    console.log(
      "Rate limit reached for new password verification at 3 requests per hour",
    );

    return {
      status: false,
      message:
        "You have reached the limit of contact form submissions. Please try again later after 2 minutes",
    };
  }

  try {
    if (!token) {
      return {
        error: "Missing Token! It does not exist",
      };
    }

    const validatedFields = NewPasswordFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: validatedFields.error.message,
      };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      console.error("token does not exist", existingToken);
      return {
        error: "Invalid token, it does not exist on the server",
      };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return {
        error: "Your token has expired, please try again later",
      };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return {
        error: "Email does not exist",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      success: "Successfully set new password",
      message: "your password was successfully updated",
    };
  } catch (error) {
    console.log("an error occured during new password setting", error);
    return {
      error: "An unexpected error occurred",
      message: "there was an error updating your password",
    };
  }
};
