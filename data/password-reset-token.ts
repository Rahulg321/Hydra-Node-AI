import db from "@/hooks/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const returnedToken = await db.passwordResetToken.findUnique({
      where: {
        token: token,
      },
    });
    return returnedToken;
  } catch (error) {
    console.error("could not return password reset token", error);
    return null;
  }
};

/**
 * Get a password reset token by email
 * @param email - The email of the user to get the password reset token for
 * @returns The password reset token
 */
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
