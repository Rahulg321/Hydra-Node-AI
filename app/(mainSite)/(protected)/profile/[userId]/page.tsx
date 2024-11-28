import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import ExamHistoryTable from "./ExamHistoryTable";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import db from "@/lib/db";
import { User } from "@prisma/client";
import { formatDateWithSuffix } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import CancelSubscriptionButton from "@/components/CancelSubscriptionButton";
import { ProfilePicUploadDialog } from "@/components/Dialogs/ProfilePicUploadDialog";
import EditProfileForm from "@/components/forms/edit-profile-form";
import type { Metadata, ResolvingMetadata } from "next";
import { getPlaceholderForRemoteImage } from "@/lib/get-placeholder";
import { ResetUserPasswordDialog } from "@/components/Dialogs/ResetUserPasswordDialog";
import ParticleBackground from "@/components/ParticleBackground";
import PaymentHistorySection from "./payment-history";
import PurchasedExamHistorySection from "./purchase-history";

// Types remain unchanged

export async function generateMetadata(
  { params }: { params: { userId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const userId = params.userId;
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  return {
    title: `${user?.name} - Profile`,
    description: `Profile page of ${user?.name} for HydraNode AI`,
    openGraph: {
      images: ["/about_hero.png"],
    },
  };
}

const ProfilePage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const existingLoggedInUser = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!existingLoggedInUser) {
    console.error("user is not logged in");
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-8 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Profile Sidebar - Full width on mobile, 1 column on larger screens */}
          <div className="md:col-span-1">
            <Suspense
              fallback={<Skeleton className="h-[400px] w-full rounded-xl" />}
            >
              <ProfileSidebar
                loggedInUser={existingLoggedInUser}
                userSession={session}
              />
            </Suspense>
          </div>

          {/* Main Content Area - Full width on mobile, 2-3 columns on larger screens */}
          <div className="space-y-8 md:col-span-2 lg:col-span-3">
            {/* Current Plan Section */}
            <Suspense
              fallback={<Skeleton className="h-[200px] w-full rounded-xl" />}
            >
              <CurrentPlanSection existingUser={existingLoggedInUser} />
            </Suspense>

            {/* Purchased Exam History Section */}
            <Suspense
              fallback={<Skeleton className="h-[300px] w-full rounded-xl" />}
            >
              <PurchasedExamHistorySection currentSession={session} />
            </Suspense>

            {/* Exam History Section */}
            <Suspense
              fallback={<Skeleton className="h-[300px] w-full rounded-xl" />}
            >
              <ExamHistorySection loggedInUser={session} />
            </Suspense>

            {/* Payment History Section */}
            <Suspense
              fallback={<Skeleton className="h-[300px] w-full rounded-xl" />}
            >
              <PaymentHistorySection loggedInUser={session} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

// Component functions remain the same but with updated className props for better responsiveness

async function ExamHistorySection({ loggedInUser }: { loggedInUser: Session }) {
  const userQuizSessions = await db.quizSession.findMany({
    where: { userId: loggedInUser.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      createdAt: true,
      examMode: true,
      exam: {
        select: {
          name: true,
          examLevel: true,
          questions: { select: { id: true } },
        },
      },
    },
    take: 5,
  });

  const examData = userQuizSessions.map((e) => ({
    id: e.id,
    examName: e.exam.name,
    date: formatDateWithSuffix(new Date(e.createdAt)),
    examMode: e.examMode,
    totalQuestions: e.exam.questions.length,
    difficultyLevel: e.exam.examLevel,
    link: `/exam/${e.id}/quiz/${e.id}/results`,
  }));

  return (
    <div className="rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Exam History</h2>
          <Button variant="link" asChild>
            <Link href={`/profile/${loggedInUser.user.id}/exam-history`}>
              View All
            </Link>
          </Button>
        </div>
        <ExamHistoryTable examHistoryData={examData} />
      </div>
    </div>
  );
}

async function ProfileSidebar({
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

function CurrentPlanSection({ existingUser }: { existingUser: User }) {
  const currentDate = new Date();

  // Helper function to render subscription status
  const renderSubscriptionStatus = (
    title: string,
    description: string,
    buttonLabel: string,
    buttonLink: string,
  ) => {
    return (
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
        <h3 className="font-semibold text-baseC">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <Button
          className="mb-4 w-full rounded-full border border-base bg-base px-10 py-6 text-base font-semibold text-white"
          asChild
        >
          <Link href={buttonLink}>{buttonLabel}</Link>
        </Button>
      </div>
    );
  };

  // 1. Lifetime Access
  if (existingUser.hasLifetimeAccess) {
    return renderSubscriptionStatus(
      "You have Lifetime Access",
      "Enjoy unlimited access to all services. No further payments required.",
      "Learn More",
      "#",
    );
  }

  // 2. Expired Subscription
  if (
    existingUser.stripeCurrentPeriodEnd &&
    new Date(existingUser.stripeCurrentPeriodEnd) <= currentDate
  ) {
    const formattedEndDate = formatDateWithSuffix(
      new Date(existingUser.stripeCurrentPeriodEnd),
    );
    return renderSubscriptionStatus(
      "Subscription Ended",
      `Your subscription ended on ${formattedEndDate}. Renew to regain access to premium services.`,
      "Renew Plan",
      "/pricing",
    );
  }

  // 3. Active Subscription which was cancelled
  if (
    existingUser.stripeSubscriptionId &&
    new Date(existingUser.stripeCurrentPeriodEnd as Date) > currentDate &&
    !existingUser.hasActiveSubscription
  ) {
    const formattedEndDate = formatDateWithSuffix(
      new Date(existingUser.stripeCurrentPeriodEnd as Date),
    );

    return renderSubscriptionStatus(
      "Cancelled Subscription",
      `Your subscription was cancelled. Supposed to expire on ${formattedEndDate}`,
      "Get Subcription",
      "/pricing",
    );
  }

  // 4. Active Subscription
  if (
    existingUser.stripeSubscriptionId &&
    new Date(existingUser.stripeCurrentPeriodEnd as Date) > currentDate
  ) {
    const formattedEndDate = formatDateWithSuffix(
      new Date(existingUser.stripeCurrentPeriodEnd as Date),
    );

    return renderSubscriptionStatus(
      "Current Plan",
      `Expires on ${formattedEndDate}`,
      "Manage Subscription",
      "#",
    );
  }

  // 5. Expired Trial Period
  if (
    existingUser.trialEndsAt &&
    new Date(existingUser.trialEndsAt) <= currentDate
  ) {
    const formattedTrialEndDate = formatDateWithSuffix(
      new Date(existingUser.trialEndsAt),
    );
    return renderSubscriptionStatus(
      "Trial Ended",
      `Your trial period ended on ${formattedTrialEndDate}. Subscribe to unlock premium services.`,
      "Subscribe Now",
      "/pricing",
    );
  }

  // 6. Active Trial Period
  if (existingUser.trialEndsAt && !existingUser.stripeSubscriptionId) {
    const formattedTrialEndDate = formatDateWithSuffix(
      new Date(existingUser.trialEndsAt),
    );
    return renderSubscriptionStatus(
      "Active Trial",
      `Your trial is active until ${formattedTrialEndDate}. Subscribe to continue enjoying premium services.`,
      "Subscribe Now",
      "/pricing",
    );
  }

  // 7. No Active Plan (Default Case)
  return renderSubscriptionStatus(
    "No Active Plan",
    "You don’t have any active plans or purchases. Subscribe to unlock premium features.",
    "Subscribe Now",
    "/pricing",
  );
}
