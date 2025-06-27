import React from "react";
import { manrope, poppins } from "../fonts";
import { cn } from "@/hooks/lib/utils";
import { Metadata } from "next";
import "../globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { baseUrl } from "../sitemap";
import { ThemeProvider } from "@/components/theme-provider";
import Image from "next/image";
import LoginBackground from "@/public/auth/Background.avif";
import Head from "next/head";
import ThemeSwitchButton from "@/components/ThemeSwitchButton";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
// Font files can be colocated inside of `app`
const transducerFont = localFont({
  src: "../fonts/extended-transducer.otf",
  variable: "--font-transducer",
  display: "swap",
});

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
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="HydraNode" content="HydraNode" />
      </Head>
      <body className={cn("", GeistSans.variable, transducerFont.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>

      <GoogleTagManager gtmId="GTM-NW46K7ZF" />
      <GoogleAnalytics gaId="G-TTB31XWF1N" />
    </html>
  );
};

export default RootLayout;
