"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BsGoogle } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

const SigninGoogle = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <div>
      <Button
        type="submit"
        onClick={() => {
          signIn("google", {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
          });
        }}
        variant="outline"
        className="relative flex w-full items-center justify-center gap-2 border-gray-700 py-6 hover:bg-gradient-to-b hover:from-zinc-900 hover:to-zinc-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5"
        >
          <path
            fill="#EA4335"
            d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
          />
          <path
            fill="#34A853"
            d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
          />
          <path
            fill="#4A90E2"
            d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
          />
          <path
            fill="#FBBC05"
            d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
          />
        </svg>
        Sign in With Google
      </Button>
    </div>
  );
};

export default SigninGoogle;
