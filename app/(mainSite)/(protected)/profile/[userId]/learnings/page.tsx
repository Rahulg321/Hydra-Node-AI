import { auth } from "@/auth";
import { ExamHistoryCard } from "@/components/exam-history-card";
import { LearningFilters } from "@/components/learning-filters";
import QuizSessionPagination from "@/components/QuizSessionPagination";
import { formatDateWithSuffix } from "@/lib/utils";
import {
  GetFilteredQuizSessions,
  getUserById,
  getUserQuizSessionsCompleteHistory,
} from "@/prisma/queries";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const LearningsPage = async (props: {
  params: Promise<{
    userId: string;
  }>;
  searchParams: SearchParams;
}) => {
  const params = await props.params;
  const userId = params.userId;
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 20;
  const offset = (currentPage - 1) * limit;

  const vendorSearchQuery = searchParams?.vendor || "";
  const resultSearchQuery = searchParams?.result || "";
  const modeSearchQuery = searchParams?.mode || "";
  const sortBySearchQuery = searchParams?.sortBy || "";

  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  if (session.user.id !== userId) {
    return redirect("/login");
  }

  const loggedInUser = await getUserById(userId);

  if (!loggedInUser) {
    return redirect("/login");
  }

  const {
    data: userQuizSessions,
    totalCount,
    totalPages,
  } = await GetFilteredQuizSessions({
    userId,
    vendor: vendorSearchQuery === "all-vendors" ? undefined : vendorSearchQuery,
    result: resultSearchQuery,
    mode: modeSearchQuery,
    sortBy: sortBySearchQuery,
    offset,
    limit,
  });

  let examData = userQuizSessions.map((e) => {
    const formattedDate = formatDateWithSuffix(new Date(e.createdAt));

    return {
      id: e.id,
      examName: e.exam.name,
      date: formattedDate,
      status: e.passFailStatus,
      marks: e.correctAnswers,
      examMode: e.examMode,
      totalQuestions: e.questionCount,
      difficultyLevel: e.exam.examLevel,
      link: `/exam/${e.exam.id}/quiz/${e.id}/results`,
    };
  });

  return (
    <section className="relative">
      <div className="flex items-center md:px-6 lg:px-8">
        <div className="w-full border-b border-white/20">
          <LearningFilters />
        </div>
      </div>

      <div className="big-container">
        <div className="flex items-center justify-between">
          <h1 className="my-4 md:my-6 lg:my-8">Exams History</h1>
          <h2>{examData.length} exams</h2>
        </div>
        <div className="group-has-[[data-pending]]:animate-pulse">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {examData.length > 0 ? (
              examData.map((card, index) => (
                <div key={index} className="flex-shrink-0">
                  <ExamHistoryCard
                    link={card.link}
                    iconLetter={card.examName.charAt(0)}
                    title={card.examName}
                    status={card.status ? "Passed" : "Failed"}
                    marks={
                      card.marks === 0 ? "0" : card.marks?.toString() || "0"
                    }
                    date={card.date}
                    mode={card.examMode}
                  />
                </div>
              ))
            ) : (
              <div className="flex-shrink-0">
                <h4>No exams taken yet</h4>
              </div>
            )}
          </div>
        </div>
        <QuizSessionPagination totalPages={totalPages} />
      </div>
    </section>
  );
};

export default LearningsPage;
