import db from "@/hooks/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: {
        token: token,
      },
    });

    return twoFactorToken;
  } catch (error) {
    console.error("An error occured while fetching two factor token", error);
    return null;
  }
};
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: {
        email,
      },
    });

    return twoFactorToken;
  } catch (error) {
    console.error("An error occured while fetching two factor token", error);
    return null;
  }
};
