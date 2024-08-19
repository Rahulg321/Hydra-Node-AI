import { Resend } from "resend";
import { TokenVerificationEmail } from "@/components/emails/TokenVerification";
import { ResetPasswordEmail } from "@/components/emails/ResetPassword";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Hydranode <rahul@rahulguptadev.in>",
    to: [email],
    subject: "Reset your Password",
    react: ResetPasswordEmail({
      resetPasswordLink: resetLink,
    }),
  });

  if (error) {
    console.log("error sending email", error.name, error.message);
    return {
      error: `could not send email -> ${error.message}}`,
    };
  }
};

export const sendVerificationTokenEmail = async (
  email: string,
  token: string,
) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Hydranode <rahul@rahulguptadev.in>",
    to: [email],
    subject: "Verify your email address",
    react: TokenVerificationEmail({
      tokenConfirmLink: confirmLink,
    }),
  });

  if (error) {
    console.log("error sending email", error.name, error.message);
    return {
      error: `could not send email -> ${error.message}}`,
    };
  }
};
