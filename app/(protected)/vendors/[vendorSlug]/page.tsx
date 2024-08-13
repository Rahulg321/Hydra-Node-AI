import React from "react";
import ExamTags from "../ExamTags";
import db from "@/lib/db";
import Link from "next/link";
import { ExamLevel } from "@prisma/client";

const page = async ({
  params,
  searchParams,
}: {
  params: {
    vendorSlug: string;
  };
  searchParams: {
    examLevel?: ExamLevel;
  };
}) => {
  const vendorSlug = params.vendorSlug;
  const examLevel: ExamLevel = searchParams.examLevel || "ASSOCIATE";

  // querying for the current vendor as to further query by vendorId as to improve performance
  const currentVendor = await db.vendor.findUnique({
    where: {
      slug: vendorSlug,
    },
  });

  // we are using the current vendor id so as to improve performance
  const allExams = await db.exam.findMany({
    where: {
      vendorId: currentVendor?.id,
      examLevel: examLevel,
    },
  });

  //   db.exam.findMany();
  return (
    <section className="big-container">
      <div className="mb-12">
        <ExamTags />
      </div>
      {allExams && allExams.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {allExams.map((exam) => {
            return (
              <Link
                href={`/exam/${exam.slug}`}
                key={exam.id}
                className="cursor-pointer"
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

export default page;
