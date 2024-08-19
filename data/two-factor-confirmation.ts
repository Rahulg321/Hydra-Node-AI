import db from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        userId: userId,
      },
    });
    return twoFactorConfirmation;
  } catch (error) {
    console.log(
      "an error occured while fetching two factor confirmation",
      error,
    );
    return null;
  }
};
