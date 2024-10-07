import React from "react";
import { manrope, poppins } from "../fonts";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Hydronode AI",
  description: "AI Powered Remote Learning Platform",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
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
      <body className={cn("", poppins.variable, manrope.variable)}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
