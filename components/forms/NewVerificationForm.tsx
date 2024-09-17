"use client";

import { newVerification } from "@/actions/new-verification";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Button } from "../ui/button";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true); // Loading state to handle async action

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("The verification token is missing or invalid.");
      setLoading(false);
      return;
    }

    try {
      const res = await newVerification(token);
      if (res.error) {
        setError(res.error);
        setSuccess(undefined); // Clear any previous success message
      } else if (res.success) {
        setSuccess(res.success);
        setError(undefined); // Clear any previous error message
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      setSuccess(undefined); // Clear any previous success message
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800">
          Email Verification
        </h1>
        <p className="text-gray-600">
          We are confirming your email address. Please wait while we process
          your request.
        </p>

        {loading && (
          <div className="flex flex-col items-center">
            <h3 className="text-blue-500">Processing your verification...</h3>
            <BeatLoader color="#3b82f6" />
          </div>
        )}

        {!loading && success && (
          <div className="text-center">
            <h3 className="text-lg font-medium text-green-600">{success}</h3>
            <p className="mt-2 text-gray-600">
              Your email has been successfully verified. You can now access your
              account.
            </p>
            <Link href={"/login"}>Login</Link>
          </div>
        )}

        {!loading && error && (
          <div className="text-center">
            <h3 className="text-lg font-medium text-red-600">{error}</h3>
            <p className="mt-2 text-gray-600">
              Please ensure your verification link is correct, or try requesting
              a new one.
            </p>
            <Button variant="default" asChild>
              <Link href={"/signup"}>Signup</Link>
            </Button>
          </div>
        )}

        {!loading && !success && !error && (
          <p className="text-gray-600">
            If you encounter any issues, please contact support.
          </p>
        )}
      </div>
    </div>
  );
};

export default NewVerificationForm;
