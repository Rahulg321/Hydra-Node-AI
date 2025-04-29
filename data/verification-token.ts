import db from "@/hooks/lib/db";
import { VerificationToken } from "@prisma/client";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const returnedToken = await db.verificationToken.findUnique({
      where: {
        token: token,
      },
    });
    return returnedToken;
  } catch (error) {
    console.log("prisma error occured", error);
  }
};

export const getVerificationTokenByEmail = async (
  email: string,
): Promise<VerificationToken | null> => {
  try {
    const token = await db.verificationToken.findFirst({
      where: {
        email: email,
      },
    });
    return token;
  } catch (error) {
    console.error("prisma error occured", error);
    return null;
  }
};
