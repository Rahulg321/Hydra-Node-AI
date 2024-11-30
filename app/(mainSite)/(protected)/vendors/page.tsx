import PrimaryButton from "@/components/ComponentButtons/PrimaryButton";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import VendorsOverviewSection from "./VendorsSection";

export async function generateMetadata() {
  return {
    title: `Vendors`,
    description: `Select a vendor to view their exams and select an exam to view its particulars`,
  };
}

const ExamsPage = async ({}: {}) => {
  return (
    <>
      <VendorsOverviewSection />
    </>
  );
};

export default ExamsPage;
