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
import { baseUrl } from "../sitemap";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import Navbar from "@/components/Navbar";
import ThemeSwitchButton from "@/components/ThemeSwitchButton";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
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
      <body className={clsx("", poppins.variable, manrope.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-background dark:text-gray-100">
              <ThemeSwitchButton />
              {/* <Header session={session} /> */}
              <Navbar session={session} />
              {children}
              <Footer />
              <Toaster />
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-TTB31XWF1N" />
    </html>
  );
}
