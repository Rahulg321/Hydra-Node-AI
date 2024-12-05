import PrimaryButton from "@/components/ComponentButtons/PrimaryButton";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import VendorsOverviewSection from "./VendorsSection";
import VendorsSheet from "@/components/Sheets/VendorsSheet";

export async function generateMetadata() {
  return {
    title: `Vendors`,
    description: `Select a vendor to view their exams and select an exam to view its particulars`,
  };
}

const ExamsPage = async () => {
  return (
    <div className="">
      <VendorsOverviewSection />
    </div>
  );
};

export default ExamsPage;
