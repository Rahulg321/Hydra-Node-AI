import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

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
