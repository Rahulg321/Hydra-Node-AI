import React from "react";
import { manrope, poppins } from "../fonts";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import "../globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { baseUrl } from "../sitemap";
import { ThemeProvider } from "@/components/theme-provider";
import Image from "next/image";
import LoginBackground from "@/public/auth/loginSignupImage.png";
import Head from "next/head";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Hydronode AI",
    template: "%s | Hydronode AI",
  },
  description: "AI Powered Remote Learning Platform",
  openGraph: {
    title: "Hydronode AI",
    description: "AI Powered Remote Learning Platform",
    url: baseUrl,
    siteName: "Hydronode AI",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "HydraNode AI",

    card: "summary_large_image",
  },
  verification: {
    google: "4RCrNU4mc2UMomzqwPASL7m0L_Mv_fePZrGOPHe0MIU",
  },
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className={cn("", poppins.variable, manrope.variable)}>
        <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <Image
              src={LoginBackground}
              alt="blue background wavy for authentication pages"
              className="object-cover"
              placeholder="blur"
              fill
            />
          </div>
          <div>{children}</div>
        </section>
      </body>
      <GoogleAnalytics gaId="G-TTB31XWF1N" />
    </html>
  );
};

export default RootLayout;
