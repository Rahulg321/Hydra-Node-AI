"use server";

import { Resend } from "resend";
import { TokenVerificationEmail } from "@/components/emails/TokenVerification";
import { ResetPasswordEmail } from "@/components/emails/ResetPassword";
import { TwoFactorEmail } from "@/components/emails/TwoFactorEmail";
import PaymentSuccessfull from "@/components/emails/PaymentSuccessfull";
import React from "react";
import PaymentErrorEmail from "@/components/emails/PaymentError";
import ContactMessageEmail from "@/components/emails/ContactFormEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPaymentErrorEmail = async (
  customerName: string,
  amount: string,
  currency: string,
  paymentDate: string,
  productName: string,
  email: string,
) => {
  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
    to: [email],
    subject: "Payment Error",
    react: React.createElement(PaymentErrorEmail, {
      customerName,
      amount,
      currency,
      paymentDate,
      productName,
      supportEmail: "rg5353070@gmail.com",
    }),
  });

  if (error) {
    console.log("error sending email", error.name, error.message);
    return {
      error: `could not send email -> ${error.message}`,
    };
  }

  return { data };
};

export const sendPaymentSuccessfulEmail = async (
  customerName: string,
  amount: string,
  currency: string,
  paymentDate: string,
  invoiceNumber: string,
  productName: string,
  invoiceLink: string,
  email: string,
) => {
  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
    to: [email],
    subject: "Payment Successful",
    react: React.createElement(PaymentSuccessfull, {
      customerName,
      amount,
      currency,
      paymentDate,
      invoiceNumber,
      productName,
      invoiceLink,
    }),
  });

  if (error) {
    console.log("error sending email", error.name, error.message);
    return {
      error: `could not send email -> ${error.message}`,
    };
  }

  return { data };
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
    to: [email],
    subject: "2 FA Verification",
    react: TwoFactorEmail({
      token,
    }),
  });

  if (error) {
    console.log("error sending email", error.name, error.message);
    return {
      error: `could not send email -> ${error.message}}`,
    };
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
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
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
    to: [email],
    subject: "Verify your email address",
    react: TokenVerificationEmail({
      tokenConfirmLink: confirmLink,
    }),
  });

  console.log("sending verification token email", data, error);

  if (error) {
    console.log("error sending email", error.name, error.message);
    return {
      error: `could not send email -> ${error.message}}`,
    };
  }
};

export const sendContactFormEmail = async (
  email: string,
  firstName: string,
  lastName: string,
  message: string,
) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["rg5353070@gmail.com", "contact@hydranode.ai"],
    replyTo: email,
    subject: "Contact Inquiry from HydraNode",
    react: ContactMessageEmail({
      firstName,
      lastName,
      email,
      message,
    }),
  });

  console.log("sending contact form email", data, error);

  if (error) {
    console.log("error sending email", error.name, error.message);
    return {
      error: `could not send email -> ${error.message}}`,
    };
  }
};
