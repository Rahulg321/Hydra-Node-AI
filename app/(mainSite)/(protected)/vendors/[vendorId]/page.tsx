import React from "react";
import ExamTags from "../ExamTags";
import db from "@/lib/db";
import Link from "next/link";
import { ExamLevel } from "@prisma/client";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";

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

const getAllCurrentCachedExams = unstable_cache(
  async (vendorId: string, examLevel: ExamLevel) => {
    return await db.exam.findMany({
      where: {
        vendorId,
        examLevel: examLevel,
      },
      select: {
        id: true,
        name: true,
      },
    });
  },
  ["vendor-exams"],
  { revalidate: 3600, tags: ["vendor-exams"] },
);

const getCurrentVendorExams = async (
  vendorId: string,
  examLevel: ExamLevel,
) => {
  let exams = await db.exam.findMany({
    where: {
      vendorId,
      examLevel: examLevel,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return exams;
};

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
  const examLevel: ExamLevel = searchParams.examLevel || "FREE";
  const allExams = await getCurrentVendorExams(vendorId, examLevel);

  return (
    <section className="big-container block-space-mini relative">
      <div className="absolute left-1/2 top-3/4 z-[-10] h-[16rem] w-64 -translate-x-1/2 rounded-full bg-orange-500/60 opacity-40 blur-3xl" />

      <div className="mb-6 md:mb-8 lg:mb-12">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Certificates</h3>
          <Suspense>
            <ExamTags />
          </Suspense>
        </div>
      </div>
      {allExams && allExams.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {allExams.map((exam) => {
            return (
              <ExamNameComponent
                key={exam.id}
                examName={exam.name}
                examId={exam.id}
              />
            );
          })}
        </div>
      )}

      {allExams.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-medium">
            No{" "}
            <span className="bg-gradient-to-r from-[rgba(255,195,177,0.9)] to-[rgba(255,98,24,0.9)] bg-clip-text text-transparent">
              Exams Found
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            No exams available for this level. Please try another level or check
            back later.
          </p>
        </div>
      )}
    </section>
  );
};

export default VendorPage;

function ExamNameComponent({
  examName,
  examId,
}: {
  examName: string;
  examId: string;
}) {
  return (
    <Link href={`/exam/${examId}`} className="text-sm">
      <div className="h-fit rounded-full border border-[#242424] bg-[#19191961] p-4 text-center shadow-[0px_4px_4px_0px_#6C6C6C8A_inset,0px_-4px_4.6px_0px_#181818_inset]">
        {examName}
      </div>
    </Link>
  );
}
