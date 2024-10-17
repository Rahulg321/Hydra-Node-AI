"use server";

import db from "@/lib/db";
import { EditProfileFormZodType } from "@/lib/schemas/EditProfileFormSchema";
import { revalidatePath } from "next/cache";

const EditUserProfile = async (
  values: EditProfileFormZodType,
  userId: string,
) => {
  try {
    const { firstName, lastName } = values;
    // Find the user by ID
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Check if user exists before updating
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Update the user profile
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
      },
    });

    revalidatePath(`/profile/${userId}`);

    return {
      success: true,
      message: "Successfully Updated Profile",
    };
  } catch (error) {
    return {
      success: false,
      message: `an error occured while trying to edit profile ${error}`,
    };
  }
};

export default EditUserProfile;
