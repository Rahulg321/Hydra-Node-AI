"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import {
  LoginFormSchema,
  LoginFormZodType,
} from "@/hooks/lib/schemas/LoginFormSchema";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/hooks/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import * as z from "zod";
import { Resend } from "resend";
import { TokenVerificationEmail } from "@/components/emails/TokenVerification";
import {
  sendTwoFactorEmail,
  sendVerificationTokenEmail,
} from "@/hooks/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import db from "@/hooks/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/hooks/lib/redis";
import { headers } from "next/headers";
import { extractClientIp } from "@/hooks/lib/utils";

const loginIpLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1m"),
});

export async function LoginUser(
  values: LoginFormSchema,
  callbackUrl?: string | null,
) {
  const hdrs = await headers();
  const ip = extractClientIp(hdrs);

  const { success: ipAllowed, pending: ipPending } =
    await loginIpLimiter.limit(ip);

  if (!ipAllowed) {
    await ipPending;
    return {
      error: "Too many login attempts. Please wait a minute.",
    };
  }

  const validatedFields = LoginFormZodType.safeParse(values);

  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error.message ||
        "Invalid Credentials" ||
        "An unexpected error occurred",
    };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  // they need to create an account first or they need to login with OAuth
  if (!existingUser) {
    return {
      error: "Your account does not exist, please sign up!!",
    };
  }

  if (!existingUser.password) {
    return {
      error: "Password does not exist, try logging in using Google",
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

  // check if they had 2fa enabled
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // verify 2fa code
      const faToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!faToken) {
        return {
          error: "2FA token does not exist",
        };
      }

      // we check for expiration first and then verify the token

      const hasExpired = new Date(faToken.expires) < new Date();

      if (hasExpired) {
        return {
          error: "2FA token has expired",
        };
      }

      if (faToken.token !== code) {
        console.log("an invalid code was entered", code);
        return {
          error: "you entered an invalid code",
        };
      }

      await db.twoFactorToken.delete({
        where: {
          id: faToken.id,
        },
      });

      // delete the existing confirmation if it exists, because we want to ask for the code evertytime
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      // create a new confirmation
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      const response = await sendTwoFactorEmail(
        existingUser.email,
        twoFactorToken.token,
      );

      // error sending email
      if (response?.error) {
        return {
          error: "Could not genearate 2FA token, along with email",
        };
      }

      return {
        twoFactorToken: true,
      };
    }
  }

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return {
      successful_login: true,
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
