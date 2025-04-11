import { auth } from "@/auth";
import { ProfilePicUploadDialog } from "@/components/Dialogs/ProfilePicUploadDialog";
import { ResetUserPasswordDialog } from "@/components/Dialogs/ResetUserPasswordDialog";
import AccountInfoForm from "@/components/forms/account-info-form";
import SocialInfoForm from "@/components/forms/social-info-form";
import { getPlaceholderForRemoteImage } from "@/lib/get-placeholder";
import { getUserById } from "@/prisma/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const ProfileInfoPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  if (session.user.id !== userId) {
    return redirect("/login");
  }

  const loggedInUser = await getUserById(userId);

  if (!loggedInUser) {
    return redirect("/login");
  }

  const {
    id,
    name,
    email,
    image,
    firstName,
    lastName,
    linkedinUrl,
    twitterUrl,
  } = loggedInUser;

  const blurData = await getPlaceholderForRemoteImage(
    image || "https://github.com/shadcn.png",
  );

  return (
    <section className="big-container py-4 md:py-6 lg:py-8">
      <h4>My Profile</h4>
      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 md:gap-6 lg:mt-8 lg:grid-cols-5">
        <div className="col-span-3 rounded-lg border bg-[#0C0C0C] p-4 md:p-6 lg:p-8">
          <h3 className="transducer-font uppercase tracking-wider">
            Account Info
          </h3>
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-6 lg:gap-12">
            <AccountInfoForm
              userId={id}
              firstName={firstName || ""}
              lastName={lastName || ""}
            />
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src={image || "https://github.com/shadcn.png"}
                alt="profile picture of the logged in user"
                height={150}
                width={150}
                className="rounded-full"
                blurDataURL={blurData}
              />
              <ProfilePicUploadDialog userId={id} />
            </div>
          </div>
        </div>
        <div className="col-span-2 rounded-lg border bg-[#0C0C0C] p-4 md:p-6 lg:p-8">
          <SocialInfoForm
            userId={id}
            linkedinLink={linkedinUrl || ""}
            twitterLink={twitterUrl || ""}
          />
        </div>

        <div className="col-span-5 border bg-[#0C0C0C] p-4 md:p-6 lg:p-8">
          <h4 className="transducer-font uppercase tracking-wider">
            Login Info
          </h4>
          <div className="mt-4">
            <ResetUserPasswordDialog userId={id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfoPage;
