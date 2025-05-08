"use client";

import { newVerification } from "@/actions/new-verification";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Button } from "../ui/button";
import { GradientButton } from "../buttons/gradient-button";

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
    <div className="">
      <div className="">
        <p className="text-center text-white">
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
            <Button className="" variant={"success"} size={"sm"}>
              Your email has been successfully verified. You can now access your
              account.
            </Button>
            <GradientButton asChild className="mt-4" size={"lg"}>
              <Link href={"/login"}>Login</Link>
            </GradientButton>
          </div>
        )}

        {!loading && error && (
          <div className="mt-4 text-center">
            <Button className="" variant={"destructive"} size={"sm"}>
              {error}
            </Button>
            <p className="mt-4 text-white">
              Please ensure your verification link is correct, or try requesting
              a new one.
            </p>
            <GradientButton asChild className="mt-4" size={"lg"}>
              <Link href={"/signup"}>Signup</Link>
            </GradientButton>
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
