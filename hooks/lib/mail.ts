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

/**
 * This email will be sent to the vendor when one of their exams was purchased in the marketplace.
 *
 * @param vendorName - The name of the vendor.
 * @param vendorEmail - The email address of the vendor.
 * @param examName - The name of the purchased exam.
 * @param purchaseDate - The date when the purchase was made.
 * @param examPrice - The price of the exam.
 * @param buyerFirstName - The first name of the buyer.
 * @param buyerLastName - The last name of the buyer.
 * @returns - The data and error of the email.
 */
export const sendVendorExamPurchasedEmail = async (
  vendorName: string | null,
  vendorEmail: string,
  examName: string,
  purchaseDate: string,
  examPrice: string, // Price of the exam
  buyerFirstName: string | null,
  buyerLastName: string | null,
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

/**
 * This email will be sent to the user when they purchase an exam.
 *
 * @param customerName - The name of the customer.
 * @param amount - The amount of the payment.
 * @param currency - The currency of the payment.
 * @param paymentDate - The date of the payment.
 * @param productName - The name of the product.
 * @param email - The email address of the user.
 * @returns - The data and error of the email.
 */
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

/**
 * This email will be sent to the user when they purchase a lifetime access.
 *
 * @param email - The email address of the user.
 * @param productName - The name of the product.
 * @param dashboardLink - The link to the dashboard.
 * @param accessStartDate - The date of the access start.
 * @param firstName - The first name of the user.
 * @param lastName - The last name of the user.
 * @param invoiceLink - The link to the invoice.
 * @returns - The data and error of the email.
 */
export const sendLifetimeAccessEmail = async (
  email: string,
  productName: string,
  dashboardLink: string,
  accessStartDate: string,
  firstName: string | null,
  lastName: string | null,
  invoiceLink: string,
) => {
  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
    to: [email],
    subject: "You're All Set for LifeTime Certification Success with HydraNode",
    react: LifetimeAccessEmail({
      firstName,
      lastName,
      email,
      productName,
      accessStartDate,
      dashboardLink,
      invoiceLink,
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

/**
 * This email will be sent to the user when they purchase a lifetime access.
 *
 * @param email - The email address of the user.
 * @param subscriptionPlan - The name of the subscription plan.
 * @param subscriptionStartDate - The date of the subscription start.
 * @param firstName - The first name of the user.
 * @param lastName - The last name of the user.
 * @param invoiceLink - The link to the invoice.
 * @returns - The data and error of the email.
 */
export const sendSubscriptionStartEmail = async (
  email: string,
  subscriptionPlan: string,
  subscriptionStartDate: string,
  firstName: string | null,
  lastName: string | null,
  invoiceLink: string,
) => {
  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
    to: [email],
    subject: `Confirmed! You're ready to supercharge your certification preparation with HydraNode`,
    react: SubscriptionStartEmail({
      firstName,
      lastName,
      subscriptionStartDate,
      subscriptionPlan,
      invoiceLink,
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

/**
 * This email will be sent to the user when they purchase an exam.
 *
 * @param firstName - The first name of the user.
 * @param lastName - The last name of the user.
 * @param email - The email address of the user.
 * @param examName - The name of the exam.
 * @param purchaseDate - The date of the purchase.
 * @param examLink - The link to the exam.
 * @param examPrice - The price of the exam.
 * @param invoiceLink - The link to the invoice.
 * @returns - The data and error of the email.
 */
export const sendExamPurchaseEmail = async (
  firstName: string | null,
  lastName: string | null,
  email: string,
  examName: string,
  purchaseDate: string,
  examLink: string,
  examPrice: string,
  invoiceLink: string,
) => {
  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
    to: [email],
    subject: `🎉 Successfully Purchased Exam ${examName}! 🎉`,
    react: ExamPurchaseEmail({
      firstName,
      lastName,
      email,
      examName,
      purchaseDate,
      examLink,
      examPrice,
      invoiceLink,
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

/**
 * This email will be sent to the user when their subscription is ended.
 *
 * @param email - The email address of the user.
 * @param subscriptionPlan - The name of the subscription plan.
 * @param renewalLink - The link to the renewal page.
 * @param subscriptionEndDate - The date of the subscription end.
 * @param firstName - The first name of the user.
 * @param lastName - The last name of the user.
 * @returns - The data and error of the email.
 */
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
    subject: `Sad to see you go, ${firstName ? firstName : ""}... but is this goodbye for good?`,
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

  return { data };
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

  return { data };
};

export const sendVerificationTokenEmail = async (
  email: string,
  token: string,
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
    to: [email],
    subject: "Almost there! Please verify your email for HydraNode",
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

  return { data };
};

export const sendContactFormEmail = async (
  email: string,
  firstName: string,
  lastName: string,
  message: string,
) => {
  const { data, error } = await resend.emails.send({
    from: "Hydranode <Contact@hydranode.ai>",
    to: ["rg5353070@gmail.com"],
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

  return { data };
};
