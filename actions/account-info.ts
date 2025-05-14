"use server";

import { auth } from "@/auth";
import db from "@/hooks/lib/db";
import { revalidatePath } from "next/cache";

import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/hooks/lib/redis";
import { headers } from "next/headers";
import { extractClientIp } from "@/hooks/lib/utils";

const accountInfoIpLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1m"),
});

/**
 * Updates the account info of the user, changing the first name and last name
 * @param param0
 * @returns
 */
export async function updateAccountInfo({
  userId,
  firstName,
  lastName,
}: {
  userId: string;
  firstName: string;
  lastName: string;
}) {
  const hdrs = await headers();
  const ip = extractClientIp(hdrs);

  const { success: ipAllowed, pending: ipPending } =
    await accountInfoIpLimiter.limit(ip);

  if (!ipAllowed) {
    await ipPending;
    return {
      error: "Too many account info update attempts. Please wait a minute.",
    };
  }

  try {
    const session = await auth();

    if (!session) {
      throw new Error("User is not Authenticated");
    }

    if (!userId) {
      throw new Error("User Id is not Available");
    }

    await db.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
      },
    });

    revalidatePath(`/profile/${userId}/info`);

    return { success: true };
  } catch (error) {
    console.error("Failed to update account info:", error);
    throw error;
  }
}
