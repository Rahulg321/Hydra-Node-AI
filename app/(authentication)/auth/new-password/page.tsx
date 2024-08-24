import NewPasswordForm from "@/components/forms/NewPasswordForm";
import React, { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
