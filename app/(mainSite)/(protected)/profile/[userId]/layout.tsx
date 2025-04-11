import { CreditCard, GraduationCap, Home, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import LearningButton from "@/components/learning-button";
import ProfileLayoutSheet from "@/components/Sheets/ProfileLayoutSheet";
import LayoutLogoutButton from "@/components/buttons/layout-logout-button";

const ProfilePageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    userId: string;
  }>;
}) => {
  const { userId } = await params;

  return (
    <div>
      <ProfileLayoutSheet userId={userId} />
      <div className="min-h-screen flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="relative hidden h-full shrink-0 border-r border-gray-400 md:block">
          <div className="flex min-h-full flex-col items-center justify-between">
            <div className="mt-6 flex flex-col items-start gap-4">
              <h4 className="">Modules</h4>
              <LearningButton
                label="Home"
                icon={<Home />}
                href={`/profile/${userId}`}
              />
              <LearningButton
                label="My learnings"
                icon={<GraduationCap />}
                href={`/profile/${userId}/learnings`}
              />
              <LearningButton
                label="My Profile"
                icon={<UserRound />}
                href={`/profile/${userId}/info`}
              />
              <LearningButton
                label="Subscription"
                icon={<CreditCard />}
                href={`/profile/${userId}/subscription`}
              />
            </div>
            <LayoutLogoutButton />
          </div>
        </div>
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default ProfilePageLayout;
