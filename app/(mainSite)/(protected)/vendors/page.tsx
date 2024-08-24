import PrimaryButton from "@/components/ComponentButtons/PrimaryButton";
import db from "@/lib/db";
import React from "react";

const ExamsPage = async ({
  searchParams,
}: {
  searchParams?: {
    examLevel?: string;
    examType?: string;
  };
}) => {
  return (
    <div>
      <h2>Select an Exam to view its Particulars</h2>
    </div>
  );
};

export default ExamsPage;
