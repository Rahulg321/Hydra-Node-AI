import NewPasswordForm from "@/components/forms/NewPasswordForm";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const ResetPasswordPage = async ({
  params,
  searchParams,
}: {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let paramsToken = searchParams?.token;
  let dbToken;

  if (paramsToken) {
    dbToken = await getPasswordResetTokenByToken(paramsToken as string);
  }

  if (!dbToken) {
    return (
      <section className="block-space container relative">
        <div className="absolute right-4 top-4">
          <Link href="/">
            <Image
              src="/hydranode_logo.png"
              alt="Hydranode official logo"
              className="object-cover"
              width={200}
              height={200}
            />
          </Link>
        </div>
        <div className="mt-8 text-center">
          <h1 className="mb-2 text-2xl font-semibold">Reset Your Password</h1>
          <p className="mb-4 text-gray-600">Enter your updated password</p>
          <p className="mb-6 text-red-600">
            The token is invalid or has expired. Please request a new password
            reset link.
          </p>
          <Link
            href="/auth/reset"
            className="inline-block rounded bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Request New Password Reset
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="block-space container">
      <div className="space-y-2">
        <h2>Set up a new Password</h2>
        <h3 className="">
          Email:- <span className="text-baseC">{dbToken.email}</span>
        </h3>
        <p>Enter your new password below.</p>
        <Suspense>
          <NewPasswordForm />
        </Suspense>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
