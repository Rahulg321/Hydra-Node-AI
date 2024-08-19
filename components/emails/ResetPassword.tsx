import * as React from "react";

interface ResetPasswordEmailProps {
  resetPasswordLink: string;
}

export const ResetPasswordEmail: React.FC<
  Readonly<ResetPasswordEmailProps>
> = ({ resetPasswordLink }) => (
  <div>
    <h1>Hello by Hydranode!!!!</h1>
    <p>Set your new password by clicking the link below</p>
    <p>
      <a href={resetPasswordLink}>Click Here</a> to reset your password.
    </p>
  </div>
);
