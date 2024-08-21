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

  console.log("Session in page", session);
  return (
    <React.Fragment>
      <section className="grid min-h-screen grid-cols-5 gap-6 bg-[#F5F4FA] px-4 py-4">
        <ProfileSidebar session={session} />
        <CertificateUploadSection />
        <CurrentPlanSection />
        <ExamHistorySection />
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

function ExamHistorySection() {
  return (
    <div className="container col-span-4 rounded-xl bg-white py-4">
      <div className="mb-4 flex items-center justify-between">
        <h4>Exam History</h4>
        <Button className="rounded-full bg-base">View All</Button>
      </div>
      <ExamHistoryTable />
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

function CurrentPlanSection() {
  return (
    <div className="container col-span-2 space-y-4 rounded-xl bg-white py-4">
      <span className="block font-semibold">Current Plan</span>
      <div>
        <h5 className="text-muted-foreground">6 days left</h5>
        <h4 className="text-baseC">Free Trial</h4>
      </div>
      <div>
        <h4>Next Payment</h4>
        <h3 className="text-baseC">9th July, 2024</h3>
      </div>
      <Button className="mb-4 w-full rounded-full border border-base bg-white px-10 py-6 text-base font-semibold text-baseC hover:bg-base hover:text-white">
        Previous Question
      </Button>
      <Button className="mb-4 w-full rounded-full border border-base bg-base px-10 py-6 text-base font-semibold text-white">
        Cancel Plan
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
      </div>
      <ProfileForm name={session?.user.name || ""} session={session} />
      <Button variant={"link"} className="mt-4 w-full text-baseC">
        Purchase a Plan
      </Button>
      <SignOutButton />
    </div>
  );
}
