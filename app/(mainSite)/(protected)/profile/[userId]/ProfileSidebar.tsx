import { ProfilePicUploadDialog } from "@/components/Dialogs/ProfilePicUploadDialog";
import { ResetUserPasswordDialog } from "@/components/Dialogs/ResetUserPasswordDialog";
import EditProfileForm from "@/components/forms/edit-profile-form";
import { getPlaceholderForRemoteImage } from "@/lib/get-placeholder";
import { User } from "@prisma/client";
import { Session } from "next-auth";
import Image from "next/image";

export default async function ProfileSidebar({
  loggedInUser,
  userSession,
}: {
  loggedInUser: User;
  userSession: Session;
}) {
  const { id, name, email, image } = loggedInUser;
  const blurData = await getPlaceholderForRemoteImage(
    image || "https://github.com/shadcn.png",
  );

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
      <div className="text-center">
        <Image
          src={image || "https://github.com/shadcn.png"}
          alt=""
          height={150}
          width={150}
          className="mx-auto rounded-full"
          blurDataURL={blurData}
        />
        <div className="mt-4 space-y-4">
          <ProfilePicUploadDialog userId={id} />
          <div className="space-y-2">
            <p className="font-semibold text-gray-900 dark:text-white">
              {name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{email}</p>
          </div>
          <EditProfileForm userId={id} name={name} email={email} />
          <ResetUserPasswordDialog userId={id} />
        </div>
      </div>
    </div>
  );
}
