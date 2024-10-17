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
  { params, searchParams }: MetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.userId;

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return {
    title: `${user?.firstName} ${user?.lastName} ${user?.name} - Profile`,
    description: `Profile page of ${user?.firstName} ${user?.lastName} for HydraNode AI`,
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
      <section className="grid min-h-screen grid-cols-5 gap-6 bg-[#F5F4FA] px-4 py-4">
        <ProfileSidebar loggedInUser={existingLoggedInUser} />
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
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4 text-center">
        <h2 className="text-lg font-semibold text-gray-700">
          You have not purchased any exams
        </h2>
        <p className="text-sm text-gray-500">
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
    <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4">
      <h2 className="text-lg font-semibold text-gray-700">
        Purchased Exam History
      </h2>
      <table className="min-w-full table-auto border-collapse bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Exam Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Purchase Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Price
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
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
                <td className="px-4 py-2 text-sm text-gray-700">
                  {exam.exam.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {formattedDate}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  ${exam.amount.toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/exam/${exam.exam.slug}`}
                    className="text-baseC hover:underline"
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
      <div className="container col-span-5 space-y-4 rounded-xl bg-white py-4 text-center">
        <h2 className="text-lg font-semibold text-gray-700">
          No Payment History Found
        </h2>
        <p className="text-sm text-gray-500">
          It looks like you haven&apos;t made any payments yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container col-span-5 space-y-4 rounded-xl bg-white py-4">
      <h2 className="text-lg font-semibold text-gray-700">Payment History</h2>
      <table className="min-w-full table-auto border-collapse bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Amount
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Currency
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Payment Type
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
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
                <td className="px-4 py-2 text-sm text-gray-700">
                  {formattedDate}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  ${payment.amount.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {payment.currency.toUpperCase()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
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
    include: {
      exam: {
        include: {
          questions: true,
        },
      },
    },
  });

  if (!userQuizSessions) {
    console.log("could not find a quiz session, user has not taken an exam");
  }

  let examData = userQuizSessions.map((e) => {
    const percentageScored = e.percentageScored ?? null; // Assign null if undefined

    const flooredPercentageScored = percentageScored?.toFixed(2);

    const passFailStatus =
      percentageScored !== null && percentageScored >= 50 ? "Pass" : "Fail";
    const statusClass =
      percentageScored !== null && percentageScored >= 50
        ? "text-green-500"
        : "text-red-500";

    const formattedDate = formatDateWithSuffix(new Date(e.createdAt));

    return {
      id: e.id,
      examName: e.exam.name,
      date: formattedDate,
      examMode: e.examMode,
      percentageScored:
        flooredPercentageScored !== null ? flooredPercentageScored : 0, // Handle display if undefined
      totalQuestions: e.exam.questions.length,
      difficultyLevel: e.exam.examLevel,
      correctAnswers: e.correctAnswers,
      incorrectAnswers: e.incorrectAnswers,
      passFailStatus, // Safe assignment
      statusClass, // Safe assignment
      link: `/exam/${e.id}/quiz/${e.id}/results`,
    };
  });

  return (
    <div className="container col-span-4 rounded-xl bg-white py-4">
      <div className="mb-4 flex items-center justify-between">
        <h4>Exam History</h4>
        <Button className="rounded-full bg-base">View All</Button>
      </div>
      <ExamHistoryTable examHistoryData={examData} />
    </div>
  );
}
async function CurrentPlanSection({ existingUser }: { existingUser: User }) {
  // Case 1: Lifetime Access
  if (existingUser.hasLifetimeAccess) {
    return (
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4">
        <h3 className="font-semibold text-baseC">You have Lifetime Access</h3>
        <p className="text-muted-foreground">
          Enjoy unlimited access to all services. No further payments required.
        </p>
      </div>
    );
  }

  // Case 2: Active Subscription
  if (
    existingUser.hasActiveSubscription &&
    existingUser.stripeCurrentPeriodEnd &&
    new Date(existingUser.stripeCurrentPeriodEnd) > new Date()
  ) {
    const subscriptionEndDate = new Date(existingUser.stripeCurrentPeriodEnd);
    const formattedEndDate = formatDateWithSuffix(subscriptionEndDate);

    const existingUserSubscription: any = await stripe.subscriptions.retrieve(
      existingUser.stripeSubscriptionId as string,
    );

    console.log("fetched subscription from stripe:", existingUserSubscription);

    return (
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4">
        <span className="block font-semibold">Current Plan</span>
        <div>
          <h5 className="text-muted-foreground">Subscription Plan</h5>
          <h4 className="text-baseC">Expires on {formattedEndDate}</h4>
        </div>
        <div>
          <h4>Next Payment</h4>
          <h3 className="text-baseC">
            ${existingUserSubscription.plan.amount / 100} on {formattedEndDate}
          </h3>
        </div>
        <Button className="mb-4 w-full rounded-full border border-base bg-white px-10 py-6 text-base font-semibold text-baseC hover:bg-base hover:text-white">
          Manage Subscription
        </Button>
        <CancelSubscriptionButton userId={existingUser.id} />
      </div>
    );
  }

  // Case 3: Expired Subscription (Grace Period)
  if (
    existingUser.stripeCurrentPeriodEnd &&
    new Date(existingUser.stripeCurrentPeriodEnd) <= new Date()
  ) {
    const formattedEndDate = formatDateWithSuffix(
      new Date(existingUser.stripeCurrentPeriodEnd),
    );

    return (
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4">
        <h3 className="font-semibold text-baseC">Subscription Ended</h3>
        <p className="text-muted-foreground">
          Your subscription ended on {formattedEndDate} but you can still
          continue to access service until you renew till your expiry. Renew
          your plan to regain access to premium services.
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

  // Case 4: Active Trial Period
  if (existingUser.trialEndsAt && !existingUser.stripeSubscriptionId) {
    const trialEndDate = new Date(existingUser.trialEndsAt);
    const formattedTrialEndDate = formatDateWithSuffix(trialEndDate);

    return (
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4">
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

  // Case 5: Expired Trial Period
  if (
    existingUser.trialEndsAt &&
    new Date(existingUser.trialEndsAt) <= new Date()
  ) {
    const formattedTrialEndDate = formatDateWithSuffix(
      new Date(existingUser.trialEndsAt),
    );

    return (
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4">
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

  // Case 6: No Plan (Default Case)
  return (
    <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4">
      <h3 className="font-semibold text-baseC">No Active Plan</h3>
      <p className="text-muted-foreground">
        You don&apos;t have any active plans. Subscribe to unlock premium
        features.
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

async function ProfileSidebar({ loggedInUser }: { loggedInUser: User }) {
  const { id, firstName, lastName, email, image, isTwoFactorEnabled } =
    loggedInUser;

  return (
    <div className="col-span-1 row-span-2 rounded-xl bg-white py-4">
      <Image
        src={image || "https://github.com/shadcn.png"}
        alt=""
        height={150}
        width={150}
        className="mx-auto rounded-full"
      />
      <div className="mt-2 space-y-2 px-2">
        <div className="block">
          <ProfilePicUploadDialog />
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-baseC">
            {`${firstName} ${lastName}`}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-baseC">{email}</span>
        </div>
        <EditProfileForm
          userId={id}
          firstName={firstName}
          lastName={lastName}
        />
      </div>
      {/* <ProfileForm name={session?.user.name || ""} session={session} /> */}
      <Button variant={"link"} className="mt-4 text-baseC" asChild>
        <Link href={"/pricing"}>Purchase a Plan</Link>
      </Button>
    </div>
  );
}
