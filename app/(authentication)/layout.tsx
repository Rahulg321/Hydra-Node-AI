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
      <body className={cn("", poppins.variable, manrope.variable)}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
