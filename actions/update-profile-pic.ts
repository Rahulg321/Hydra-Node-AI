"use server";

import db from "@/hooks/lib/db";
import { revalidatePath } from "next/cache";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
import { headers } from "next/headers";

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "10m"),
});

const UpdateProfilePic = async (formData: FormData, userId: string) => {
  try {
    const ip =
      (await headers()).get("x-real-ip") ||
      (await headers()).get("x-forwarded-for");

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

    console.log("Values in profile pic server action");

    const image = formData.get("image") as File;
    const fileName = formData.get("fileName") as string;

    console.log("file is", image);

    const url = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${fileName}?${process.env.AZURE_STORAGE_SAS_TOKEN}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": image.type,
      },
      body: image,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`,
      );
    }

    console.log("upload response", response.body, response.blob);

    // https://${storageAccountName}.blob.core.windows.net/${containerName}/${name}

    const imageUrl = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${fileName}`;

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        image: imageUrl,
      },
    });

    revalidatePath(`/profile/${userId}`);

    return {
      success: true,
      message: "Successfully Uploaded Image",
      imageUrl,
    };
  } catch (error) {
    return {
      success: false,
      message: `An error occured ${error}`,
    };
  }
};

export default UpdateProfilePic;
