import db from "@/lib/db";
import { Exam, Vendor } from "@prisma/client";
import { Award, Book, Clock, DollarSign } from "lucide-react";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Marketplace",
  description: "Welcome to Hydranode Marketplace",
};

const MarketPlacePage = async () => {
  const marketplaceExams = await db.exam.findMany({
    where: {
      vendor: {
        isUserVendor: true,
      },
    },
    include: {
      vendor: true,
    },
  });

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-extrabold">Hydranode Marketplace</h1>
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
          Explore a wide range of exams from our trusted vendors.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {marketplaceExams.map((exam) => (
            <MarketplaceExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketPlacePage;

type ExamWithVendor = Exam & { vendor: Vendor };

const MarketplaceExamCard = ({ exam }: { exam: ExamWithVendor }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-muted">
      <div className="p-6">
        <h2 className="mb-2 text-xl font-semibold">{exam.name}</h2>
        {/* <p className="mb-4 text-sm text-gray-600">
          {exam.subtitle || "No subtitle available"}
        </p> */}
        <div className="mb-2 flex items-center text-sm text-gray-500 dark:text-gray-300">
          <Award className="mr-2 h-4 w-4" />
          <span>{exam.examLevel}</span>
        </div>
        <div className="mb-2 flex items-center text-sm text-gray-500 dark:text-gray-300">
          <Clock className="mr-2 h-4 w-4" />
          <span>{exam.timeAllowed} minutes</span>
        </div>
        <div className="mb-2 flex items-center text-sm text-gray-500 dark:text-gray-300">
          <Book className="mr-2 h-4 w-4" />
          <span>{exam.questionsToShow} questions</span>
        </div>
        <div className="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-300">
          <DollarSign className="mr-2 h-4 w-4" />
          <span>${exam.price.toFixed(2)}</span>
        </div>
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          <strong>Vendor:</strong> {exam.vendor.name}
        </div>
        <Link
          href={`/exam/${exam.slug}`}
          className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-700"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};