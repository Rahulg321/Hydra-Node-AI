import { auth } from "@/auth";
import LoginForm from "@/components/forms/LoginForm";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const LoginPage = async () => {
  const session = await auth();
  if (session) {
    console.log("logged in users accessing the login page");
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
      <div className="block-space-large relative content-center">
        <div className="absolute right-4 top-4">
          <Image
            src={"/hydranode_logo.png"}
            alt="official logo for hydranode"
            className="object-cover"
            width={200}
            height={200}
          />
        </div>
        <div className="mx-auto max-w-xl">
          <h3>Login TO Hydranode</h3>
          <Suspense>
            <LoginForm />
          </Suspense>
          <div className="mt-4 text-center">
            <p>
              Need an account?
              <Link href="/signup" className="ml-1 text-blue-500 underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
