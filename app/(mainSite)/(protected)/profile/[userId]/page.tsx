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
            className="mt-6 flex gap-4 overflow-x-auto px-4"
            style={{
              scrollbarWidth: "none",
              width: "100%",
              whiteSpace: "nowrap",
              scrollBehavior: "smooth",
              maskImage:
                "linear-gradient(to right, black 95%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 95%, transparent 100%)",
            }}
          >
            {allCards.length > 0 ? (
              allCards.map((card, index) => (
                <div key={index} className="">
                  <ExamHistoryCard
                    link={card.link}
                    iconLetter={card.examName.charAt(0)}
                    title={card.examName}
                    status={card.status ? "Passed" : "Failed"}
                    marks={card.marks.toString()}
                    date={card.date.toLocaleDateString()}
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
      </div>
      <div className="mt-4 px-4 md:px-6 lg:px-8">
        <PerformanceDashboard />
      </div>
    </section>
  );
};

export default ProfilePage;
