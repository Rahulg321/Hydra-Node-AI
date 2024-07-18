import type { Metadata } from "next";
import { Inter, Manrope, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { manrope, poppins } from "./fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hydronode AI",
  description: "AI Powered Remote Learning Platform",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx("", poppins.variable, manrope.variable)}>
        <Header />
        {modal}
        {children}
        <Footer />
      </body>
    </html>
  );
}
