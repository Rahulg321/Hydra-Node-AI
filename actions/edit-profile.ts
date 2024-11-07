"use server";

import { getUserByEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { sendVerificationTokenEmail } from "@/lib/mail";
import { EditProfileFormZodType } from "@/lib/schemas/EditProfileFormSchema";
import { generateVerificationToken } from "@/lib/tokens";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

const EditUserProfile = async (
  values: EditProfileFormZodType,
  userId: string,
) => {
  try {
    const loggedInUser = await currentUser();

    if (!loggedInUser) {
      console.log("user is not logged in");
      return {
        success: false,
        message: "UnAuthorized to make changes....",
      };
    }

    // Find the user by ID
    const dbUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Check if user exists before updating
    if (!dbUser) {
      console.log("Could not find user in db");
      return {
        success: false,
        message: "User not found",
      };
    }

    if (loggedInUser.isOAuth) {
      values.email = undefined;
    }

    if (values.email && values.email !== dbUser.email) {
      console.log("changing user email");
      console.log("changing user email");

      const existingUser = await getUserByEmail(values.email);

      if (existingUser && existingUser.id !== userId) {
        console.log("changing user email, email already exists");
        return {
          success: false,
          message: "Email already exists",
        };
      }

      const verificationToken = await generateVerificationToken(values.email);

      console.log("changing user email, sending email");
      await sendVerificationTokenEmail(values.email, verificationToken.token);
      console.log("changing user email, email sent!!!!");

      return {
        success: true,
        message: "Verification email sent to your new email address",
      };
    }

    // if (values.password && values.newPassword && dbUser.password) {
    //   // check whether the user entered the correct password or not
    //   console.log("changing passwords");
    //   const passwordsMatch = await bcrypt.compare(
    //     values.password,
    //     dbUser.password,
    //   );

    //   if (!passwordsMatch) {
    //     console.log("passwords do not match");
    //     console.log("passwords do not match");
    //     return {
    //       success: false,
    //       message: "Incorrect Password, passwords does not match",
    //     };
    //   }

    //   console.log("generating hash");
    //   const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    //   values.password = hashedPassword;
    //   values.newPassword = undefined;
    // }

    // Update the user profile
    console.log("updating with new values");

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        ...values,
      },
    });

    console.log("revalidating path");
    revalidatePath(`/profile/${userId}`);

    return {
      success: true,
      message: "Successfully Updated Profile",
    };
  } catch (error) {
    console.log("an error occured, could not edit profile", error);
    return {
      success: false,
      message: `an error occured while trying to edit profile ${error}`,
    };
  }
};

export default EditUserProfile;
