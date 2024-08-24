import { auth } from "@/auth";
import LoginForm from "@/components/forms/LoginForm";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  const session = await auth();
  if (session) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }

  return (
    <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="relative">
        <Image
          src={"/auth/loginSignupImage.png"}
          alt="blue background wavy for authentication pages"
          className="object-cover"
          fill
        />
      </div>
      <div className="block-space-large container content-center">
        <h3>Login TO Hydranode</h3>
        <LoginForm />
        <div className="mt-4 text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
