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

type ProfilePageProps = {
  params: {
    userId: string;
  };
};

type MetadataProps = {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // Extract the user ID from route parameters
  const userId = params.userId;

  // Fetch the user data from the database
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

const ProfilePage = async ({ params }: ProfilePageProps) => {
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
    <React.Fragment>
      <section className="block-space grid min-h-screen grid-cols-5 gap-6 px-4 py-4">
        <ProfileSidebar
          loggedInUser={existingLoggedInUser}
          userSession={session}
        />
        <Suspense
          fallback={
            <div>
              <Skeleton className="h-[200px] w-full" />
            </div>
          }
        >
          <PurchasedExamHistorySection currentSession={session} />
        </Suspense>

        <CurrentPlanSection existingUser={existingLoggedInUser} />

        <Suspense
          fallback={
            <div>
              <Skeleton className="h-[200px] w-full" />
            </div>
          }
        >
          <ExamHistorySection loggedInUser={session} />
        </Suspense>
        <Suspense
          fallback={
            <div>
              <Skeleton className="h-[200px] w-full" />
            </div>
          }
        >
          <PaymentHistorySection loggedInUser={session} />
        </Suspense>
      </section>
    </React.Fragment>
  );
};

export default ProfilePage;

async function PurchasedExamHistorySection({
  currentSession,
}: {
  currentSession: Session;
}) {
  // Simulate loading delay

  const purchasedExams = await db.purchase.findMany({
    where: {
      userId: currentSession.user.id,
    },
    include: {
      exam: true, // Include the related exam details
    },
  });

  if (!purchasedExams || purchasedExams.length === 0) {
    return (
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4 text-center shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
        <h2 className="text-lg font-semibold">
          You have not purchased any exams
        </h2>
        <p className="dark:text-gray-200">
          It looks like you haven&apos;t purchased any exams yet. Purchase an
          exam to start practicing.
        </p>
        <Button
          className="mt-4 w-full rounded-full border border-base bg-base px-10 py-6 text-base font-semibold text-white"
          asChild
        >
          <Link href="/vendors">Purchase an Exam</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4 text-center shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
      <h2 className="text-lg font-semibold">Purchased Exam History</h2>
      <table className="min-w-full table-auto border-collapse bg-white dark:bg-dark-card">
        <thead className="">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Exam Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Purchase Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Price</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {purchasedExams.map((exam) => {
            const formattedDate = formatDateWithSuffix(
              new Date(exam.purchaseDate),
            );
            return (
              <tr key={exam.id} className="border-t">
                <td className="py-2 text-left text-sm text-gray-700 dark:text-gray-400">
                  {exam.exam.name}
                </td>
                <td className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  {formattedDate}
                </td>
                <td className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  ${exam.amount.toFixed(2)}
                </td>
                <td className="py-2">
                  <Link
                    href={`/exam/${exam.exam.slug}`}
                    className="text-primary hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

async function PaymentHistorySection({
  loggedInUser,
}: {
  loggedInUser: Session;
}) {
  const { id } = loggedInUser.user;

  // Fetch payment history from the database
  const paymentHistory = await db.payment.findMany({
    where: { userId: id },
    orderBy: { createdAt: "desc" }, // Show latest payments first
  });

  if (!paymentHistory || paymentHistory.length === 0) {
    return (
      <div className="col-span-5 rounded-xl bg-white px-2 py-4 text-center shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
        <h2 className="text-lg font-semibold">No Payment History Found</h2>
        <h4 className="text-sm">
          It looks like you haven&apos;t made any payments yet.
        </h4>
      </div>
    );
  }

  return (
    <div className="col-span-5 rounded-xl bg-white px-2 py-4 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
      <h2 className="text-lg font-semibold text-gray-700">Payment History</h2>
      <table className="min-w-full table-auto border-collapse bg-white dark:bg-dark-card">
        <thead className="">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Amount
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Currency
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Payment Type
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment) => {
            const formattedDate = formatDateWithSuffix(
              new Date(payment.createdAt),
            );
            return (
              <tr key={payment.id} className="border-t">
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">
                  {formattedDate}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">
                  ${payment.amount.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">
                  {payment.currency.toUpperCase()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">
                  {payment.paymentType.replace("_", " ")}
                </td>
                <td
                  className={`px-4 py-2 text-sm ${
                    payment.status === "SUCCEEDED"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {payment.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

async function ExamHistorySection({ loggedInUser }: { loggedInUser: Session }) {
  const { id } = loggedInUser.user;
  // wait for 3 sec
  const userQuizSessions = await db.quizSession.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      createdAt: true,
      examMode: true,
      exam: {
        select: {
          name: true,
          examLevel: true,
          questions: {
            select: {
              id: true, // Selecting 'id' to count the number of questions
            },
          },
        },
      },
    },
    take: 5,
  });

  if (!userQuizSessions) {
    console.log("could not find a quiz session, user has not taken an exam");
  }

  let examData = userQuizSessions.map((e) => {
    const formattedDate = formatDateWithSuffix(new Date(e.createdAt));

    return {
      id: e.id,
      examName: e.exam.name,
      date: formattedDate,
      examMode: e.examMode,
      totalQuestions: e.exam.questions.length,
      difficultyLevel: e.exam.examLevel,
      link: `/exam/${e.id}/quiz/${e.id}/results`,
    };
  });

  return (
    <div className="container col-span-4 rounded-xl bg-white p-4 py-4 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
      <div className="mb-4 flex items-center justify-between">
        <h4>Exam History</h4>
        <Button className="" variant={"link"} asChild>
          <Link href={`/profile/${id}/exam-history`}>View All</Link>
        </Button>
      </div>
      <ExamHistoryTable examHistoryData={examData} />
    </div>
  );
}

async function CurrentPlanSection({ existingUser }: { existingUser: User }) {
  const currentDate = new Date();

  // 1. Lifetime Access
  if (existingUser.hasLifetimeAccess) {
    return (
      <div className="col-span-1 row-span-2 rounded-xl bg-white p-4 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
        <h3 className="font-semibold text-baseC">You have Lifetime Access</h3>
        <p className="text-muted-foreground">
          Enjoy unlimited access to all services. No further payments required.
        </p>
      </div>
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

    return (
      <div className="col-span-1 row-span-2 rounded-xl bg-white p-4 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
        <h3 className="font-semibold text-baseC">Subscription Ended</h3>
        <p className="text-muted-foreground">
          Your subscription ended on {formattedEndDate}. Renew to regain access
          to premium services.
        </p>
        <Button
          className="mb-4 w-full rounded-full border border-base bg-base px-10 py-6 text-base font-semibold text-white"
          asChild
        >
          <Link href="/pricing">Renew Plan</Link>
        </Button>
      </div>
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

    const existingUserSubscription = await stripe.subscriptions.retrieve(
      existingUser.stripeSubscriptionId as string,
    );

    return (
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
        <span className="block font-semibold">Cancelled Subscription</span>
        <span className="block font-semibold">
          Your subscription was cancelled
        </span>
        <div>
          <h5 className="text-muted-foreground">Subscription Plan</h5>
          <h4 className="text-baseC">
            Supposed to expire on {formattedEndDate}
          </h4>
        </div>

        <Button className="mb-4 w-full rounded-full border border-base bg-white px-10 py-6 text-base font-semibold text-baseC hover:bg-base hover:text-white">
          Manage Subscription
        </Button>
      </div>
    );
  }

  // 3. Active Subscription
  if (
    existingUser.stripeSubscriptionId &&
    new Date(existingUser.stripeCurrentPeriodEnd as Date) > currentDate
  ) {
    const formattedEndDate = formatDateWithSuffix(
      new Date(existingUser.stripeCurrentPeriodEnd as Date),
    );

    const existingUserSubscription = await stripe.subscriptions.retrieve(
      existingUser.stripeSubscriptionId as string,
    );

    return (
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
        <span className="block font-semibold">Current Plan</span>
        <div>
          <h5 className="text-muted-foreground">Subscription Plan</h5>
          <h4 className="text-baseC">Expires on {formattedEndDate}</h4>
        </div>
        <div>
          <h4>Next Payment</h4>
          {/* @ts-ignore */}
          <h3 className="text-baseC">{formattedEndDate}</h3>
        </div>
        <Button className="mb-4 w-full rounded-full border border-base bg-white px-10 py-6 text-base font-semibold text-baseC hover:bg-base hover:text-white">
          Manage Subscription
        </Button>
        <CancelSubscriptionButton userId={existingUser.id} />
      </div>
    );
  }

  if (
    existingUser.trialEndsAt &&
    new Date(existingUser.trialEndsAt) <= currentDate
  ) {
    const formattedTrialEndDate = formatDateWithSuffix(
      new Date(existingUser.trialEndsAt),
    );

    return (
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
        <h3 className="font-semibold text-baseC">Trial Ended</h3>
        <p className="text-muted-foreground">
          Your trial period ended on {formattedTrialEndDate}. Subscribe to
          unlock premium services.
        </p>
        <Button
          className="mb-4 w-full rounded-full border border-base bg-base px-10 py-6 text-base font-semibold text-white"
          asChild
        >
          <Link href="/pricing">Subscribe Now</Link>
        </Button>
      </div>
    );
  }

  // 4. Active Trial Period
  if (existingUser.trialEndsAt && !existingUser.stripeSubscriptionId) {
    const trialEndDate = new Date(existingUser.trialEndsAt);
    const formattedTrialEndDate = formatDateWithSuffix(trialEndDate);

    return (
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
        <h3 className="font-semibold text-baseC">Active Trial</h3>
        <p className="text-muted-foreground">
          Your trial is active until {formattedTrialEndDate}. Subscribe to
          continue enjoying premium services after the trial ends.
        </p>
        <Button
          className="mb-4 w-full rounded-full border border-base bg-base px-10 py-6 text-base font-semibold text-white"
          asChild
        >
          <Link href="/pricing">Subscribe Now</Link>
        </Button>
      </div>
    );
  }

  // 5. Expired Trial Period

  // 6. No Active Plan (Default Case)
  return (
    <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
      <h3 className="font-semibold text-baseC">No Active Plan</h3>
      <p className="text-muted-foreground">
        You don&apos;t have any active plans or purchases. Subscribe to unlock
        premium features.
      </p>
      <Button
        className="mb-4 w-full rounded-full border border-base bg-base px-10 py-6 text-base font-semibold text-white"
        asChild
      >
        <Link href="/pricing">Subscribe Now</Link>
      </Button>
    </div>
  );
}

async function ProfileSidebar({
  loggedInUser,
}: {
  loggedInUser: User;
  userSession: Session;
}) {
  const { id, firstName, lastName, name, email, image, isTwoFactorEnabled } =
    loggedInUser;

  let blurData = await getPlaceholderForRemoteImage(
    image || "https://github.com/shadcn.png",
  );

  return (
    <div className="col-span-1 row-span-2 rounded-xl bg-white p-4 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-card">
      <Image
        src={image || "https://github.com/shadcn.png"}
        alt=""
        height={150}
        width={150}
        className="mx-auto rounded-full"
        blurDataURL={blurData}
      />
      <div className="mt-2 space-y-2 px-2">
        <div className="block">
          <ProfilePicUploadDialog userId={id} />
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-primary">{`${name}`}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-primary">{email}</span>
        </div>
        <EditProfileForm userId={id} name={name} email={email} />
      </div>
      {/* <ProfileForm name={session?.user.name || ""} session={session} /> */}
      <ResetUserPasswordDialog userId={id} />
    </div>
  );
}
