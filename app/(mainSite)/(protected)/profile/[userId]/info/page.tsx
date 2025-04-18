import { auth } from "@/auth";
import { ProfilePicUploadDialog } from "@/components/Dialogs/ProfilePicUploadDialog";
import { ResetUserPasswordDialog } from "@/components/Dialogs/ResetUserPasswordDialog";
import AccountInfoForm from "@/components/forms/account-info-form";
import SocialInfoForm from "@/components/forms/social-info-form";
import { getPlaceholderForRemoteImage } from "@/lib/get-placeholder";
import { getUserById } from "@/prisma/queries";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { Label } from "@/components/ui/label";

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
      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 lg:mt-8 lg:grid-cols-5">
        <div className="rounded-lg border bg-[#0C0C0C] p-4 md:p-6 lg:col-span-3 lg:p-8">
          <h4 className="transducer-font uppercase tracking-wider">
            Account Info
          </h4>
          <div className="flex flex-col-reverse gap-4 p-4 md:flex-row md:gap-6 lg:gap-12">
            <div className="flex-1">
              <AccountInfoForm
                userId={id}
                firstName={firstName || ""}
                lastName={lastName || ""}
              />
            </div>
            <div className="relative h-fit">
              <Image
                src={image || "https://github.com/shadcn.png"}
                alt="profile picture of the logged in user"
                height={150}
                width={150}
                className="rounded-full"
                blurDataURL={blurData}
              />
              <div className="absolute bottom-0 right-0">
                <ProfilePicUploadDialog userId={id} />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-[#0C0C0C] p-4 md:p-6 lg:col-span-2 lg:p-8">
          <SocialInfoForm
            userId={id}
            linkedinLink={linkedinUrl || ""}
            twitterLink={twitterUrl || ""}
          />
        </div>

        <div className="border bg-[#0C0C0C] p-4 md:p-6 lg:col-span-5 lg:p-8">
          <h4 className="transducer-font uppercase tracking-wider">
            Login Info
          </h4>
          <div className="mt-4 space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input value={email} className="p-2 text-white" />
            </div>
            <div className="flex overflow-hidden rounded-md border border-white/10 bg-black/40">
              <Input
                className="border-0 bg-none text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="New Password"
              />
              <ResetUserPasswordDialog userId={id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfoPage;
