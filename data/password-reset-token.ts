import db from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const returnedToken = await db.passwordResetToken.findUnique({
      where: {
        token: token,
      },
    });
    return returnedToken;
  } catch (error) {
    console.log("prisma error occured", error);
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const token = await db.passwordResetToken.findFirst({
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
