import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const newTwoFactorToken = db.twoFactorToken.create({
    data: {
      token: token,
      expires: expires,
      email: email,
    },
  });

  return newTwoFactorToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();

  //   expire the token after 1 hour
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const newVerificationToken = await db.verificationToken.create({
    data: {
      token: token,
      expires: expires,
      email: email,
    },
  });

  return newVerificationToken;
};

export const generatePasswordVerificationToken = async (email: string) => {
  const token = uuidv4();

  //   expire the token after 1 hour
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    // delete if a token already exists for the same email
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const newVerificationToken = await db.passwordResetToken.create({
    data: {
      token: token,
      expires: expires,
      email: email,
    },
  });

  return newVerificationToken;
};
