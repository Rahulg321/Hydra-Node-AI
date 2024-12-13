import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

async function getSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error("Error retrieving session:", error);
    return null;
  }
}

async function getCustomer(customerId: string) {
  if (!customerId) return null;

  const customer = await stripe.customers.retrieve(customerId);
  return customer;
}

const ProductConfirmationPage = async (
  props: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const searchParams = await props.searchParams;
  const currentAuthSession = await auth();
  const sessionId = searchParams.session_id || "";

  const currentCheckoutSession = await getSession(sessionId as string);

  if (!currentCheckoutSession) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-yellow-50 dark:bg-dark">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-dark-card">
          <FaExclamationTriangle className="mx-auto mb-4 text-6xl text-yellow-500" />
          <h2 className="mb-4 text-3xl font-bold text-yellow-700 dark:text-yellow-400">
            Session Not Found
          </h2>
          <p className="mb-6 dark:text-gray-200">
            We couldn&apos;t retrieve your session information. Please try again
            or contact support.
          </p>
          <Button asChild className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </section>
    );
  }

  const customer = await getCustomer(currentCheckoutSession.customer as string);

  if (currentCheckoutSession.status === "open") {
    return (
      <section className="flex min-h-screen items-center justify-center bg-yellow-50 dark:bg-dark">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-dark-card">
          <FaExclamationTriangle className="mx-auto mb-4 text-6xl text-yellow-500" />
          <h2 className="mb-4 text-3xl font-bold text-yellow-700 dark:text-yellow-400">
            Payment Failed
          </h2>
          <p className="mb-6 dark:text-gray-200">
            Could not process your payment
          </p>
          <Button asChild className="w-full">
            <Link href="/pricing">Try Again</Link>
          </Button>
        </div>
      </section>
    );
  }

  if (currentCheckoutSession.status === "complete") {
    return (
      <section className="flex min-h-screen items-center justify-center bg-green-50 dark:bg-dark">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-dark-card">
          <FaCheckCircle className="mx-auto mb-4 text-6xl text-green-500" />
          <h1 className="mb-2 text-3xl font-bold text-green-700 dark:text-green-400">
            Payment Successful 🎉
          </h1>
          <h2 className="mb-6 text-xl">Welcome to HydraNode!</h2>
          <p className="mb-6 dark:text-white">
            Your account has been activated. You now have access to all the
            features of your plan.
          </p>
          <Button asChild className="w-full">
            <Link href="/vendors">Explore the Product</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen items-center justify-center dark:bg-dark">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-dark-card">
        <FaExclamationTriangle className="mx-auto mb-4 text-6xl text-yellow-500" />
        <h2 className="mb-4 text-3xl font-bold text-yellow-700">
          Something Went Wrong
        </h2>
        <h3 className="mb-6 text-xl text-gray-700">Please Try Again Later</h3>
        <p className="mb-6 text-gray-600">
          We apologize for the inconvenience. If the problem persists, please
          contact our support team.
        </p>
        <Button asChild className="w-full">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  );
};

export default ProductConfirmationPage;
