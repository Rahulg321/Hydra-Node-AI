import * as React from "react";

interface ResetPasswordEmailProps {
  resetPasswordLink: string;
}

export const ResetPasswordEmail: React.FC<
  Readonly<ResetPasswordEmailProps>
> = ({ resetPasswordLink }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f7f7f7",
      borderRadius: "5px",
    }}
  >
    <h1
      style={{
        color: "#333",
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      Reset Your Password
    </h1>
    <p
      style={{
        color: "#666",
        lineHeight: "1.5",
        marginBottom: "20px",
      }}
    >
      You&apos;ve requested to reset your password for your Hydranode account.
      Click the button below to set a new password:
    </p>
    <div
      style={{
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      <a
        href={resetPasswordLink}
        style={{
          backgroundColor: "#007bff",
          color: "#ffffff",
          padding: "10px 20px",
          borderRadius: "5px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Reset Password
      </a>
    </div>
    <p
      style={{
        color: "#666",
        fontSize: "14px",
        textAlign: "center",
      }}
    >
      If you didn&apos;t request a password reset, please ignore this email or
      contact support if you have concerns.
    </p>
  </div>
);
