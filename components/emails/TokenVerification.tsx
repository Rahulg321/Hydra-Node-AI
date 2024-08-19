import * as React from "react";

interface TokenVerificationEmailProps {
  tokenConfirmLink: string;
}

export const TokenVerificationEmail: React.FC<
  Readonly<TokenVerificationEmailProps>
> = ({ tokenConfirmLink }) => (
  <div>
    <h1>Welcome to Hydranode!!!!</h1>
    <p>You need to verify your email first in order to create an account</p>
    <p>
      <a href={tokenConfirmLink}>Click Here</a> to confirm your email address.
    </p>
  </div>
);
