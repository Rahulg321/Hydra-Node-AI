import NewVerificationForm from "@/components/forms/NewVerificationForm";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "New Verification",
  description: "Verify your email address",
};

const NewVerificationPage = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <section className="block-space container">
      <div className="absolute right-4 top-4">
        <Link href={"/"}>
          <Image
            src={"/hydranode_logo.png"}
            alt="official logo for hydranode"
            className="object-cover"
            width={200}
            height={200}
          />
        </Link>
      </div>

      <div className="space-y-4 text-center">
        <h2>Email Verification</h2>
        <span>Verifying your Email Address</span>
      </div>
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </section>
  );
};

export default NewVerificationPage;
