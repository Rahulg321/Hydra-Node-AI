import db from "./db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const userAccount = await db.account.findFirst({
      where: {
        userId: userId,
      },
    });
    return userAccount;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in getAccountByUserId", error);
    }
    return null;
  }
};
