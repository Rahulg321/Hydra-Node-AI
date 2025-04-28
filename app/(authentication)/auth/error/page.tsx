import React from "react";
import AuthHeroSection from "../../auth-hero-section";
import Link from "next/link";

const ErrorPage = async () => {
  return (
    <section className="flex min-h-screen flex-col md:flex-row">
      <AuthHeroSection
        headline="Welcome Back To The HydraNode"
        tagline="Experience the future of exam preparation with Hydranode's advanced AI technology. Get realistic practice, instant feedback, and personalized learning paths."
      />
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6 rounded-lg border border-destructive bg-destructive/10 p-8 text-center shadow-lg">
          {/* You might need to import an icon component, e.g., from lucide-react */}
          {/* <XCircle className="mx-auto h-12 w-12 text-destructive" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto text-destructive" // Using inline SVG as placeholder
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <h2 className="text-2xl font-semibold text-destructive">
            Authentication Error
          </h2>
          <p className="text-muted-foreground">
            Sorry, we encountered a problem trying to sign you in. Please check
            your connection or try again later.
          </p>
          <Link href="/login">Return to Login</Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
