"use server";

import { auth } from "@/auth";
import db from "@/hooks/lib/db";
import { revalidatePath } from "next/cache";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/hooks/lib/redis";
import { headers } from "next/headers";
import { extractClientIp } from "@/hooks/lib/utils";

const socialInfoIpLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1m"),
});

/**
 * Updates the social info of the user, changing the linkedin and twitter links
 * @param userId - The id of the user
 * @param linkedinLink - The linkedin link of the user
 * @param twitterLink - The twitter link of the user
 * @returns
 */
export async function updateSocialInfo({
  userId,
  linkedinLink,
  twitterLink,
}: {
  userId: string;
  linkedinLink: string;
  twitterLink: string;
}) {
  const hdrs = await headers();
  const ip = extractClientIp(hdrs);

  const { success: ipAllowed, pending: ipPending } =
    await socialInfoIpLimiter.limit(ip);

  if (!ipAllowed) {
    await ipPending;
    return {
      error: "Too many social info update attempts. Please wait a minute.",
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
        linkedinUrl: linkedinLink,
        twitterUrl: twitterLink,
      },
    });

    revalidatePath(`/profile/${userId}/info`);

    return { success: true };
  } catch (error) {
    console.error("Failed to update social info:", error);
    throw error;
  }
}
