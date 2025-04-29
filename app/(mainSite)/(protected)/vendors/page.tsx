import PrimaryButton from "@/components/ComponentButtons/PrimaryButton";
import db from "@/hooks/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import VendorsOverviewSection from "./VendorsSection";

export async function generateMetadata() {
  return {
    title: `Vendors`,
    description: `Select a vendor to view their exams and select an exam to view its particulars`,
  };
}

const ExamsPage = async () => {
  redirect(`/vendors/cm4ef4y9c0006ocj2zwci7sdb`);
  return (
    <div className="">
      <VendorsOverviewSection />
    </div>
  );
};

export default ExamsPage;
