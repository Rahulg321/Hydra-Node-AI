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
import CurrentPlanSection from "./CurrentPlanSection";
import ProfileSidebar from "./ProfileSidebar";

// Types remain unchanged

export async function generateMetadata(props: { params: Promise<{ userId: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
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
