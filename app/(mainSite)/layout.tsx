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
      <body className={clsx("", poppins.variable, manrope.variable)}>
        <SessionProvider>
          <Header session={session} />
          {children}
          <Footer />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
