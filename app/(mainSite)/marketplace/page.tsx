import db from "@/lib/db";
import { Exam, Vendor } from "@prisma/client";
import { Award, Book, Clock, DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { Suspense } from "react";

import ExamCardPlaceholder from "@/public/placeholder/exam-card-placeholder.webp";
import { MarketplaceExamCardSkeleton } from "@/components/skeletons/marketplace-exam-card-skeleton";
import GetMarketPlaceExams from "@/actions/get-exams";
import Pagination from "@/components/pagination";
import { resolve } from "path";

export const metadata = {
  title: "Marketplace",
  description: "Welcome to Hydranode Marketplace",
};

// After
type SearchParams = Promise<{ [key: string]: string | undefined }>;

const MarketPlacePage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const search = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 20;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages, totalCount } = await GetMarketPlaceExams({
    search,
    offset,
    limit,
  });

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <span>Total Pages:- {totalPages}</span>
          <span>Total Exams Available:- {totalCount}</span>
        </div>
        <Pagination totalPages={totalPages} />
        <h1 className="mb-6 text-3xl font-extrabold">Hydranode Marketplace</h1>
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
          Explore a wide range of exams from our trusted vendors.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((exam) => (
            <MarketplaceExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketPlacePage;

const MarketplaceExamCard = ({ exam }: { exam: Exam }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-muted shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="relative aspect-video w-full">
        {exam.coverImage ? (
          <Image
            src={exam.coverImage}
            alt={exam.name}
            layout="fill"
            objectFit="cover"
          />
        ) : exam.coverVideo ? (
          <video
            src={exam.coverVideo}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <Image
            src={ExamCardPlaceholder}
            alt="Placeholder"
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <div className="p-6">
        <h2 className="mb-2 text-xl font-semibold">{exam.name}</h2>
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
