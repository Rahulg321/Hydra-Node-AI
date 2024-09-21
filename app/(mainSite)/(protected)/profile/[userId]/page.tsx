import React from "react";
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

type ProfilePageProps = {
  params: {
    userId: string;
  };
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const session = await auth();

  if (!session) {
    // IF WE DONT HAVE A SESSION
    redirect("/login");
  }

  const existingUser = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!existingUser) {
    console.log("could not find an user in the database");
    return redirect("/login");
  }

  return (
    <React.Fragment>
      <section className="grid min-h-screen grid-cols-5 gap-6 bg-[#F5F4FA] px-4 py-4">
        <ProfileSidebar session={session} />
        <CertificateUploadSection />
        <CurrentPlanSection loggedInUser={existingUser} />
        <ExamHistorySection loggedInUser={existingUser} />
        <ConnectWalletSection />
        <EarnedRewardSection />
      </section>
      <section>
        <TokenGraph />
      </section>
    </React.Fragment>
  );
};

export default ProfilePage;

function CertificateUploadSection() {
  return (
    <div className="container col-span-2 rounded-xl bg-white py-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Certificate Upload</Label>
        <Input id="picture" type="file" className="" />
        <span className="text-sm text-muted-foreground">
          Only supports .jpg, .png, .svg, .pdf and .zip files
        </span>
      </div>
    </div>
  );
}

async function ExamHistorySection({ loggedInUser }: { loggedInUser: User }) {
  const { id } = loggedInUser;

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
    const passFailStatus =
      percentageScored !== null && percentageScored >= 50 ? "Pass" : "Fail";
    const statusClass =
      percentageScored !== null && percentageScored >= 50
        ? "text-green-500"
        : "text-red-500";

    return {
      id: e.id,
      examName: e.exam.name,
      date: e.createdAt.toLocaleString(),
      examMode: e.examMode,
      percentageScored: percentageScored !== null ? percentageScored : 0, // Handle display if undefined
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

function EarnedRewardSection() {
  return (
    <div className="container col-span-4 rounded-xl bg-white py-4">
      <h4>Earned Reward</h4>
      <h2 className="text-center text-muted-foreground">
        Not Recieved any Reward Yet
      </h2>
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

async function CurrentPlanSection({ loggedInUser }: { loggedInUser: User }) {
  if (loggedInUser.hasLifetimeAccess) {
    return (
      <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4">
        <h3 className="font-semibold text-baseC">You have Lifetime Access</h3>
        <p className="text-muted-foreground">
          Enjoy unlimited access to all services. No further payments required.
        </p>
      </div>
    );
  }

  if (loggedInUser.stripeCurrentPeriodEnd) {
    const subscriptionEndDate = new Date(loggedInUser.stripeCurrentPeriodEnd);

    const formattedEndDate = formatDateWithSuffix(subscriptionEndDate); // E.g., '24th Feb, 2024'

    const existingUserSubscription: any = await stripe.subscriptions.retrieve(
      loggedInUser.stripeSubscriptionId as string,
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
        <Button className="mb-4 w-full rounded-full border border-base bg-base px-10 py-6 text-base font-semibold text-white">
          Cancel Plan
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
