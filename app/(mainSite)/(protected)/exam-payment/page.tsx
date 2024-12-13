import { getSession } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation"; // For navigation
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AfterExamPaymentPage = async (
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const searchParams = await props.searchParams;
  const sessionId = searchParams.session_id || "";

  const currentStripeCheckoutSession = await getSession(sessionId as string);

  if (!sessionId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <h1 className="mb-4 text-3xl font-bold text-red-600">Payment Error</h1>
        <p className="mb-6 text-gray-700">
          No payment session ID found. Please try again or contact support.
        </p>
        <Button
          className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
          asChild
        >
          <Link href={`/vendors`}>Back to Vendors</Link>
        </Button>
      </div>
    );
  }

  if (currentStripeCheckoutSession?.status === "complete") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-green-50">
        <h1 className="mb-4 text-4xl font-bold text-green-700">
          Payment Successful 🎉
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          Your exam purchase has been successfully completed! You can now start
          taking the exam.
        </p>
        <div className="flex space-x-4">
          <Button
            className="rounded bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
            asChild
          >
            <Link
              href={`/exam/${currentStripeCheckoutSession.metadata?.examSlug}`}
            >
              Start Exam
            </Link>
          </Button>
          <Button
            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
            asChild
          >
            <Link href={`/vendors`}>Back to Vendors</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50">
      <h1 className="mb-4 text-3xl font-bold text-red-700">
        Payment Failed ❌
      </h1>
      <p className="mb-6 text-gray-700">
        There was an issue processing your payment. Please try again or contact
        support if the issue persists.
      </p>
      <Button
        className="rounded bg-red-600 px-6 py-2 text-white transition hover:bg-red-700"
        asChild
      >
        <Link href={`/vendors`}>Back to Vendors</Link>
      </Button>
    </div>
  );
};

export default AfterExamPaymentPage;
