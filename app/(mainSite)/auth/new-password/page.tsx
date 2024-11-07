import NewPasswordForm from "@/components/forms/NewPasswordForm";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
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
      <section className="block-space container">
        <div>
          <h1>Invalid Token</h1>
          <p>The token is invalid or has expired. Please try again.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="block-space container">
      <div>
        <h1>Set up a new Password</h1>
        <h3>Email:- {dbToken.email}</h3>
        <p>Enter your new password below.</p>
        <Suspense>
          <NewPasswordForm />
        </Suspense>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
