import type { Metadata } from "next";
import { Inter, Manrope, Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { manrope, poppins } from "../fonts";
import { ExamModeProvider } from "@/lib/exam-mode-context";

export const metadata: Metadata = {
  title: "Hydronode AI",
  description: "AI Powered Remote Learning Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Hydranode" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={clsx("", poppins.variable, manrope.variable)}>
        <ExamModeProvider>
          <SessionProvider>
            <Header session={session} />
            {children}
            <Footer />
            <Toaster />
          </SessionProvider>
        </ExamModeProvider>
      </body>
    </html>
  );
}
