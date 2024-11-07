import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import React, { Suspense } from "react";

const PasswordResetPage = () => {
  return (
    <section className="block-space big-container">
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
