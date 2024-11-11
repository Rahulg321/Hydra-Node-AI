import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const PasswordResetPage = () => {
  return (
    <section className="block-space big-container">
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
      <h1>Reset Your Password</h1>
      <p>Enter your email address below to reset your password.</p>

      <div>
        <span className="text-muted-foreground">Forgot your password?</span>
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </section>
  );
};

export default PasswordResetPage;
