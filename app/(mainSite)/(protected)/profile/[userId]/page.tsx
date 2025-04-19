import { ExamHistoryCard } from "@/components/exam-history-card";
import { LearningFilters } from "@/components/learning-filters";
import { PerformanceDashboard } from "./performance-dashboard";
import { GradientButton } from "@/components/buttons/gradient-button";
import Link from "next/link";
import { getNumberedUserQuizSessions, getUserById } from "@/prisma/queries";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

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

  const userQuizSessions = await getNumberedUserQuizSessions(userId, 5);

  const allCards = userQuizSessions.map((session) => ({
    id: session.id,
    examName: session.exam.name,
    date: session.createdAt,
    status: session.passFailStatus,
    marks: session.correctAnswers,
    examMode: session.examMode,
    totalQuestions: session.questionCount,
    difficultyLevel: session.exam.examLevel,
    vendorName: session.exam.vendor.name,
    link: `/exam/${session.exam.id}/quiz/${session.id}/results`,
  }));

  return (
    <section className="">
      <div className="relative overflow-hidden">
        <div className="w-full">
          <div className="mt-4 flex items-center justify-between px-4 md:px-6">
            <h3>Exam History</h3>
            <Link href={`/profile/${userId}/learnings`}>
              <GradientButton>View All</GradientButton>
            </Link>
          </div>
          <div
            className="scrollbar-hide no-scrollbar overflow-x-auto whitespace-nowrap"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="mt-6 inline-flex space-x-4 px-4">
              {allCards.length > 0 ? (
                allCards.map((card, index) => (
                  <ExamHistoryCard
                    key={index}
                    link={card.link}
                    iconLetter={card.examName.charAt(0)}
                    title={card.examName}
                    status={card.status ? "Passed" : "Failed"}
                    marks={card.marks.toString()}
                    date={card.date.toLocaleDateString()}
                    mode={card.examMode}
                    vendorName={card.vendorName}
                    className="w-[17.5rem]"
                  />
                ))
              ) : (
                <div className="flex-shrink-0">
                  <h4>No exams taken yet</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 px-4 md:px-6 lg:px-8">
        <PerformanceDashboard userId={userId} />
      </div>
    </section>
  );
};

export default ProfilePage;
