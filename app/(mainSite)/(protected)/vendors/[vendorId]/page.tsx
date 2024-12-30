import React from "react";
import ExamTags from "../ExamTags";
import db from "@/lib/db";
import Link from "next/link";
import { ExamLevel } from "@prisma/client";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ vendorId: string }>;
}) {
  const params = await props.params;
  let { vendorId } = params;
  const singleVendor = await db.vendor.findFirst({
    where: {
      id: vendorId,
    },
    select: {
      name: true,
    },
  });

  return {
    title: `${singleVendor?.name} Exams`,
    description: `See the exams for Vendor ${singleVendor?.name} and pick the one which you like`,
  };
}

const VendorPage = async (props: {
  params: Promise<{
    vendorId: string;
  }>;
  searchParams: Promise<{
    examLevel?: ExamLevel;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const vendorId = params.vendorId;
  const examLevel: ExamLevel = searchParams.examLevel || "ASSOCIATE";

  // querying for the current vendor as to further query by vendorId as to improve performance
  const currentVendor = await db.vendor.findUnique({
    where: {
      id: vendorId,
    },
    select: {
      name: true,
      id: true,
    },
  });

  // we are using the current vendor id so as to improve performance
  const allExams = await db.exam.findMany({
    where: {
      vendorId,
      examLevel: examLevel,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <section className="big-container block-space-mini">
      <div className="mb-6 md:mb-8 lg:mb-12">
        <Suspense>
          <ExamTags />
        </Suspense>
      </div>
      {allExams && allExams.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {allExams.map((exam) => {
            return (
              <Link
                href={`/exam/${exam.id}`}
                key={exam.id}
                className="cursor-pointer underline-offset-2 transition-all duration-300 ease-in-out hover:underline"
              >
                {exam.name}
              </Link>
            );
          })}
        </div>
      )}

      {allExams.length === 0 && (
        <div>
          <h2>
            No{" "}
            <span className="via-[#AF89EE]/80.89% ml-2 bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
              Exams Found
            </span>
          </h2>
          <p>Try Again Later.....</p>
        </div>
      )}
    </section>
  );
};

export default VendorPage;
