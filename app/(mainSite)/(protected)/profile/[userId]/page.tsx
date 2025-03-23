import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import ExamHistoryTable from "./ExamHistoryTable";
import Image from "next/image";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { Session } from "next-auth";
import db from "@/lib/db";
import { ExamLevel, User } from "@prisma/client";
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
import { getAllUsersWithUnstableCache } from "@/data/user";
import { unstable_cache } from "next/cache";

// Types remain unchanged
// export async function generateStaticParams() {
//     const users = await db.user.findMany()
//     return users.map((user: User) => ({
//         id: String(user.id),
//     }))
// }

// Define the cached function outside
const getUserByIdUnstableCache = unstable_cache(
  async (userId: string) => {
    return await db.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
  ["user"], // Dynamic cache key
  { revalidate: 3600, tags: ["user"] },
);

const getUserPaymentHistoryUnstableCache = unstable_cache(
  async (userId: string) => {
    return await db.payment.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },
  ["user_payment", "user"], // Dynamic cache key
  { revalidate: 3600, tags: ["user_payment", "user"] },
);

const getUserQuizSessionsUnstableCache = unstable_cache(
  async (userId: string) => {
    return await db.quizSession.findMany({
      where: { userId },
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
  },
  ["user_payment", "user"], // Dynamic cache key
  { revalidate: 3600, tags: ["user_payment", "user"] },
);

const getUserPurchasedExamHistoryUnstableCache = unstable_cache(
  async (userId: string) => {
    return await db.purchase.findMany({
      where: {
        userId,
      },
      include: {
        exam: true,
      },
    });
  },
  ["user_payment", "user"], // Dynamic cache key
  { revalidate: 3600, tags: ["user_payment", "user"] },
);

export async function generateMetadata(
  props: { params: Promise<{ userId: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const userId = params.userId;
  const user = await getUserByIdUnstableCache(userId);

  return {
    title: `${user?.name} - Profile`,
    description: `Profile page of ${user?.name} for HydraNode AI`,
    openGraph: {
      images: ["/about_hero.png"],
    },
  };
}

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const [
    existingLoggedInUser,
    userPaymentHistory,
    userPurchasedExams,
    userQuizSessions,
  ] = await Promise.all([
    getUserByIdUnstableCache(userId),
    getUserPaymentHistoryUnstableCache(userId),
    getUserPurchasedExamHistoryUnstableCache(userId),
    getUserQuizSessionsUnstableCache(userId),
  ]);

  if (!existingLoggedInUser) {
    notFound();
  }

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Profile Sidebar - Full width on mobile, 1 column on larger screens */}
          <div className="md:col-span-1">
            <Suspense
              fallback={<Skeleton className="h-[400px] w-full rounded-xl" />}
            >
              <ProfileSidebar loggedInUser={existingLoggedInUser} />
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
              <PurchasedExamHistorySection
                purchasedExams={userPurchasedExams}
              />
            </Suspense>

            {/* Exam History Section */}
            <Suspense
              fallback={<Skeleton className="h-[300px] w-full rounded-xl" />}
            >
              <ExamHistorySection
                userQuizSessions={userQuizSessions}
                userId={userId}
              />
            </Suspense>

            {/* Payment History Section */}
            <Suspense
              fallback={<Skeleton className="h-[300px] w-full rounded-xl" />}
            >
              <PaymentHistorySection paymentHistory={userPaymentHistory} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

// Component functions remain the same but with updated className props for better responsiveness

type UserQuizSession = {
  exam: {
    name: string;
    examLevel: ExamLevel;
    questions: {
      id: string;
    }[];
  };
  id: string;
  createdAt: Date;
  examMode: string;
};

async function ExamHistorySection({
  userQuizSessions,
  userId,
}: {
  userQuizSessions: UserQuizSession[];
  userId: string;
}) {
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
    <div className="rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-6 shadow-lg backdrop-blur transition-shadow hover:shadow-xl dark:bg-dark-card">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Exam History</h2>
          <Button variant="link" asChild>
            <Link href={`/profile/${userId}/exam-history`}>View All</Link>
          </Button>
        </div>
        <ExamHistoryTable examHistoryData={examData} />
      </div>
    </div>
  );
}
