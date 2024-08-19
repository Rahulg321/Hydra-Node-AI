"use client";

import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Token does not exist.");
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
      setError("An unexpected error occurred.");
      setSuccess(undefined); // Clear any previous success message
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="space-y-4 text-center">
      <h1>Email Verification Page</h1>
      {loading && (
        <div>
          <h2 className="text-baseC">Confirming your Email Address...</h2>
          <BeatLoader />
        </div>
      )}
      {!loading && success && (
        <div>
          <h3 className="text-green-600">{success}</h3>
        </div>
      )}
      {!loading && error && (
        <div>
          <h3 className="text-red-600">{error}</h3>
        </div>
      )}
    </div>
  );
};

export default NewVerificationForm;
