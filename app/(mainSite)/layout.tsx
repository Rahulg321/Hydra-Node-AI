import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { baseUrl } from "../sitemap";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import ThemeSwitchButton from "@/components/ThemeSwitchButton";
import Head from "next/head";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import { caveat } from "@/app/fonts";
import { GoogleTagManager } from "@next/third-parties/google";

const transducerFont = localFont({
  src: "../fonts/extended-transducer.otf",
  variable: "--font-transducer",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Hydranode AI",
    template: "%s | Hydranode AI",
  },
  description: "AI Powered Remote Learning Platform",
  openGraph: {
    title: "Hydranode AI",
    description: "AI Powered Remote Learning Platform",
    url: baseUrl,
    siteName: "Hydranode AI",
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
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="HydraNode" content="HydraNode" />
      </Head>

      <body
        className={clsx(
          "",
          GeistSans.variable,
          transducerFont.variable,
          caveat.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <div className="">
              <Navbar session={session} />
              {children}
              <Footer />
              <Toaster />
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
      <GoogleTagManager gtmId="GTM-NW46K7ZF" />
      <GoogleAnalytics gaId="G-TTB31XWF1N" />
    </html>
  );
}
