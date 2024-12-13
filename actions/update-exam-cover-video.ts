"use server";

import { revalidatePath } from "next/cache";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
import { headers } from "next/headers";
import db from "@/lib/db";
import { auth } from "@/auth";

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "10m"),
});

export async function UpdateExamCoverVideo(formData: FormData, examId: string) {
  try {
    const session = await auth();

    if (!session) {
      return {
        success: false,
        message: "An active session is required to upload video.",
      };
    }

    const ip = (await headers()).get("x-real-ip") || (await headers()).get("x-forwarded-for");

    const {
      remaining,
      limit,
      success: limitReached,
    } = await rateLimit.limit(ip!);

    console.log({ remaining, limit, limitReached });

    if (!limitReached) {
      return {
        success: false,
        message:
          "Too Many requests!!!. Please try again later after 10 minutes",
      };
    }

    const fileName = formData.get("fileName") as string;
    const video = formData.get("video") as File;

    console.log(`Uploading video: ${fileName} for exam: ${examId}`);

    const url = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${fileName}?${process.env.AZURE_STORAGE_SAS_TOKEN}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": video.type,
      },
      body: video,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`,
      );
    }

    console.log("upload response", response.body, response.blob);

    // https://${storageAccountName}.blob.core.windows.net/${containerName}/${name}

    const videoUrl = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${fileName}`;

    await db.exam.update({
      where: {
        id: examId,
      },
      data: {
        coverVideo: videoUrl,
      },
    });

    revalidatePath(`/instructor/${examId}/manage/basics`);
    revalidatePath(`/instructor/exams`);

    return {
      success: true,
      message: "Video uploaded successfully",
      videoUrl,
    };
  } catch (error) {
    console.error("Error uploading video:", error);
    return {
      success: false,
      message: "Failed to upload video",
    };
  }
}
