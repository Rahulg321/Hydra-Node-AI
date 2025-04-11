import db from "@/lib/db";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getUserByName = () => {};

export const getAllUsersWithUnstableCache = unstable_cache(
  async () => {
    return await db.user.findMany();
  },
  ["user"],
  { revalidate: 3600, tags: ["user"] },
);

export const getUserWithReactCache = cache(async (userId: string) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) notFound();
  return user;
});

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getCurrentUser = () => {};
