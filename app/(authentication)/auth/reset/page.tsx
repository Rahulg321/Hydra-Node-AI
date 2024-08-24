import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import React, { Suspense } from "react";

const PasswordResetPage = () => {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default PasswordResetPage;
