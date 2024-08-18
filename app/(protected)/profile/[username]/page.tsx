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

type ProfilePageProps = {
  params: {
    username: string;
  };
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const currentAuth = await auth();
  if (!currentAuth) {
    // IF WE DONT HAVE A SESSION
    redirect(DEFAULT_LOGIN_REDIRECT);
  }
  return (
    <React.Fragment>
      <section className="grid min-h-screen grid-cols-5 gap-6 bg-[#F5F4FA] px-4 py-4">
        <div className="container col-span-1 row-span-2 rounded-xl bg-white py-4">
          <Image
            src={"https://github.com/shadcn.png"}
            alt=""
            height={150}
            width={150}
            className="mx-auto rounded-full"
          />
          <ProfileForm />
          <Button variant={"link"} className="mt-4 w-full text-baseC">
            Purchase a Plan
          </Button>
          <Button variant={"link"} className="w-full text-baseC">
            Log out
          </Button>
        </div>
        <div className="container col-span-2 rounded-xl bg-white py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" className="" />
            <span className="text-sm text-muted-foreground">
              Only supports .jpg, .png, .svg, .pdf and .zip files
            </span>
          </div>
        </div>
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
        <div className="container col-span-4 rounded-xl bg-white py-4">
          <div className="mb-4 flex items-center justify-between">
            <h4>Exam History</h4>
            <Button className="rounded-full bg-base">View All</Button>
          </div>
          <ExamHistoryTable />
        </div>
        <div className="container col-span-1 space-y-4 rounded-xl bg-white py-4">
          <h4>Connect your Wallet</h4>
          <span className="block text-sm text-muted-foreground">
            Upload wallet address to receive reward direct in your wallet
          </span>
          <ConnectWalletForm />
        </div>
        <div className="container col-span-4 rounded-xl bg-white py-4">
          <h4>Earned Reward</h4>
          <h2 className="text-center text-muted-foreground">
            Not Recieved any Reward Yet
          </h2>
        </div>
      </section>
      <section>
        <TokenGraph />
      </section>
    </React.Fragment>
  );
};

export default ProfilePage;
