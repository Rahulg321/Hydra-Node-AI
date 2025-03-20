"use server";

import { Resend } from "resend";
import { TokenVerificationEmail } from "@/components/emails/TokenVerification";
import { ResetPasswordEmail } from "@/components/emails/ResetPassword";
import { TwoFactorEmail } from "@/components/emails/TwoFactorEmail";
import PaymentSuccessfull from "@/components/emails/PaymentSuccessfull";
import React from "react";
import PaymentErrorEmail from "@/components/emails/PaymentError";
import ContactMessageEmail from "@/components/emails/ContactFormEmail";
import SubscriptionEndEmail from "@/components/emails/SubscriptionEndEmail";
import LifetimeAccessEmail from "@/components/emails/LifetimeAccessEmail";
import SubscriptionStartEmail from "@/components/emails/SubscriptionSuccessfulEmail";
import ExamPurchaseEmail from "@/components/emails/ExamPurchaseEmail";
import VendorExamPurchasedEmail from "@/components/emails/VendorExamPurchasedEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PROD_URL
    : process.env.NEXT_PUBLIC_APP_URL;

// this email will be sent to the user when one of their exams was purchased in the marketplace
export const sendVendorExamPurchasedEmail = async (
  vendorName: string | null,
  vendorEmail: string, // Vendor's email address
  examName: string, // Name of the purchased exam
  purchaseDate: string, // Date when the purchase was made
  examPrice: string, // Price of the exam
  buyerFirstName: string | null, // Buyer's first name (optional)
  buyerLastName: string | null, // Buyer's last name (optional)
) => {
  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
    to: [vendorEmail],
    subject: "Your Exam was Purchased in the Marketplace",
    react: React.createElement(VendorExamPurchasedEmail, {
      vendorName,
      vendorEmail, // Vendor's email address
      examName, // Name of the purchased exam
      purchaseDate, // Date when the purchase was made
      examPrice, // Price of the exam
      buyerFirstName, // Buyer's first name (optional)
      buyerLastName, // Buyer's last name (optional)
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

export const sendLifetimeAccessEmail = async (
  email: string,
  productName: string,
  dashboardLink: string,
  accessStartDate: string,
  firstName: string | null,
  lastName: string | null,
) => {
  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
    to: [email],
    subject: "🎉 You've Got Lifetime Access! 🎉", // Updated subject line
    react: LifetimeAccessEmail({
      firstName,
      lastName,
      email,
      productName,
      accessStartDate,
      dashboardLink,
    }),
  });

  if (error) {
    console.log(
      "Error sending lifetime access email:",
      error.name,
      error.message,
    );
    return {
      error: `Could not send email -> ${error.message}}`,
    };
  }

  return { data };
};
export const sendSubscriptionStartEmail = async (
  email: string,
  subscriptionPlan: string, // Matches productName in the SubscriptionStartEmail component
  dashboardLink: string,
  subscriptionStartDate: string,
  firstName: string | null,
  lastName: string | null,
) => {
  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
    to: [email],
    subject: `🎉 You've Got Access to ${subscriptionPlan}! 🎉`, // Updated subject line dynamically based on productName
    react: SubscriptionStartEmail({
      firstName,
      lastName,
      email,
      subscriptionStartDate,
      subscriptionPlan, // Passed as productName to match the prop in the component
      dashboardLink,
    }),
  });

  if (error) {
    console.log(
      "Error sending subscription start email:",
      error.name,
      error.message,
    );
    return {
      error: `Could not send email -> ${error.message}}`,
    };
  }

  return { data };
};

export const sendExamPurchaseEmail = async (
  firstName: string | null,
  lastName: string | null,
  email: string,
  examName: string,
  purchaseDate: string,
  examLink: string,
  examPrice: string,
) => {
  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
    to: [email],
    subject: `🎉 Successfully Purchased Exam ${examName}! 🎉`, // Updated subject line dynamically based on productName
    react: ExamPurchaseEmail({
      firstName,
      lastName,
      email,
      examName,
      purchaseDate,
      examLink,
      examPrice,
    }),
  });

  if (error) {
    console.log(
      "Error sending exam purchase email:",
      error.name,
      error.message,
    );
    return {
      error: `Could not send email -> ${error.message}}`,
    };
  }

  return { data };
};

export const sendSubscriptionEndedEmail = async (
  email: string,
  subscriptionPlan: string,
  renewalLink: string,
  subscriptionEndDate: string,
  firstName: string | null,
  lastName: string | null,
) => {
  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
    to: [email],
    subject: "2 FA Verification",
    react: SubscriptionEndEmail({
      firstName,
      lastName,
      email,
      subscriptionEndDate,
      subscriptionPlan,
      renewalLink,
    }),
  });

  if (error) {
    console.log("error sending email", error.name, error.message);
    return {
      error: `could not send email -> ${error.message}}`,
    };
  }
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
    from: "Hydranode <Contact@hydranode.ai>",
    to: ["contact@hydranode.ai"],
    replyTo: email,
    subject: `Contact Inquiry by ${firstName} ${lastName} from HydraNode`,
    react: ContactMessageEmail({
      firstName,
      lastName,
      email,
      message,
    }),
  });

  if (error) {
    console.log("error sending email", error.name, error.message);
    return {
      error: `could not send email -> ${error.message}}`,
    };
  }
};
