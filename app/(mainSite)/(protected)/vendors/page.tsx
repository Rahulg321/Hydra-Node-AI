import PrimaryButton from "@/components/ComponentButtons/PrimaryButton";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata() {
  return {
    title: `Vendors`,
    description: `Select a vendor to view their exams and select an exam to view its particulars`,
  };
}

const ExamsPage = async ({
  searchParams,
}: {
  searchParams?: {
    examLevel?: string;
    examType?: string;
  };
}) => {
  redirect("/vendors/amazon-exams");
  return (
    <section className="block-space big-container">
      <h2>Select an Exam to view its Particulars</h2>
      <p>
        We have a list of vendors on the left, select a vendor from the list and
        then select an exam to undertake
      </p>
    </section>
  );
};

export default ExamsPage;
