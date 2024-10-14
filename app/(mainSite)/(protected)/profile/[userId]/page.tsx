import React, { Suspense } from "react";
import TokenGraph from "./TokenGraph";
import ProfileForm from "@/components/forms/ProfileForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ConnectWalletForm from "@/components/forms/ConnectWalletForm";
import ExamHistoryTable from "./ExamHistoryTable";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import SignOutButton from "@/components/sign-out-button";
import { Session } from "next-auth";
import db from "@/lib/db";
import { User } from "@prisma/client";
import { formatDateWithSuffix } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import CancelSubscriptionButton from "@/components/CancelSubscriptionButton";

type ProfilePageProps = {
  params: {
    userId: string;
  };
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <React.Fragment>
      <section className="grid min-h-screen grid-cols-5 gap-6 bg-[#F5F4FA] px-4 py-4">
        <ProfileSidebar session={session} />
        <Suspense
          fallback={
            <div>
              <Skeleton className="h-[200px] w-full" />
            </div>
          }
        >
          <PurchasedExamHistorySection currentSession={session} />
        </Suspense>
        <Suspense
          fallback={
            <div>
              <Skeleton className="h-[150px] w-full" />
            </div>
          }
        >
          <CurrentPlanSection loggedInUser={session} />
        </Suspense>
        <Suspense
          fallback={
            <div>
              <Skeleton className="h-[200px] w-full" />
            </div>
          }
        >
          <ExamHistorySection loggedInUser={session} />
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
          <Link href="/pricing">Purchase an Exam</Link>
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

function CertificateUploadSection() {
  return (
    <div className="container col-span-2 rounded-xl bg-white py-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Purchased Exam</Label>
        <Input id="picture" type="file" className="" />
        <span className="text-sm text-muted-foreground">
          Only supports .jpg, .png, .svg, .pdf and .zip files
        </span>
      </div>
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

async function CurrentPlanSection({ loggedInUser }: { loggedInUser: Session }) {
  // wait for 3 sec

  const { id } = loggedInUser.user;

  const existingUser = await db.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!existingUser) {
    return null;
  }

  // if (existingUser.hasLifetimeAccess) {
  //   return (
  //     <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4">
  //       <h3 className="font-semibold text-baseC">You have Lifetime Access</h3>
  //       <p className="text-muted-foreground">
  //         Enjoy unlimited access to all services. No further payments required.
  //       </p>
  //     </div>
  //   );
  // }

  if (existingUser.stripeCurrentPeriodEnd) {
    const subscriptionEndDate = new Date(existingUser.stripeCurrentPeriodEnd);

    const formattedEndDate = formatDateWithSuffix(subscriptionEndDate); // E.g., '24th Feb, 2024'

    const existingUserSubscription: any = await stripe.subscriptions.retrieve(
      existingUser.stripeSubscriptionId as string,
    );

    console.log(
      "fetched subscription from stripe is",
      existingUserSubscription as any,
    );

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
        <CancelSubscriptionButton userId={id!} />
      </div>
    );
  }

  if (existingUser.trialEndsAt && !existingUser.stripeSubscriptionId) {
    const trialEndDate = new Date(existingUser.trialEndsAt);
    const formattedTrialEndDate = formatDateWithSuffix(trialEndDate); // Format as '24th Feb, 2024'

    return (
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4">
        <h3 className="font-semibold text-baseC">Active Trial</h3>
        <p className="text-muted-foreground">
          Your free trial is active and will expire on {formattedTrialEndDate}.
          After your trial ends, consider subscribing to continue enjoying
          premium services.
        </p>
        <Button
          className="mb-4 w-full rounded-full border border-base bg-base px-10 py-6 text-base font-semibold text-white"
          asChild
        >
          <Link className="" href={"/pricing"}>
            Purchase a Plan
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4">
      <h3 className="font-semibold text-baseC">No Active Plan</h3>
      <p className="text-muted-foreground">
        You currently don’t have any active subscriptions or lifetime access.
        Consider purchasing a plan to access premium features.
      </p>
      <Button className="mb-4 w-full rounded-full border border-base bg-base px-10 py-6 text-base font-semibold text-white">
        Purchase a Plan
      </Button>
    </div>
  );
}

async function ProfileSidebar({ session }: { session: Session }) {
  return (
    <div className="col-span-1 row-span-2 rounded-xl bg-white py-4">
      <Image
        src={session?.user.image || "https://github.com/shadcn.png"}
        alt=""
        height={150}
        width={150}
        className="mx-auto rounded-full"
      />
      <div className="mt-2 space-y-2 px-2">
        <div className="flex items-center justify-between gap-2">
          <span>Name:-</span>
          <span className="text-sm font-semibold text-baseC">
            {session?.user.name || "No Name"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>Email:-</span>
          <span className="text-sm font-semibold text-baseC">
            {session?.user.email || "No Email"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>TwoFactorEnabled:-</span>
          <span className="text-sm font-semibold text-baseC">
            {session?.user.isTwoFactorEnabled ? "true" : "false"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>OAuth Login:-</span>
          <span className="text-sm font-semibold text-baseC">
            {session?.user.isCredentialsLogin ? "true" : "false"}
          </span>
        </div>
      </div>
      <ProfileForm name={session?.user.name || ""} session={session} />
      <Button variant={"link"} className="mt-4 w-full text-baseC">
        Purchase a Plan
      </Button>
      <SignOutButton />
    </div>
  );
}

function ConnectWalletSection() {
  return (
    <div className="container col-span-1 space-y-4 rounded-xl bg-white py-4">
      <h4>Connect your Wallet</h4>
      <span className="block text-sm text-muted-foreground">
        Upload wallet address to receive reward direct in your wallet
      </span>
      <ConnectWalletForm />
    </div>
  );
}
