import db from "@/lib/db";
import { formatDateWithSuffix } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";
import ExamHistoryTable from "../ExamHistoryTable";
import { unstable_cache } from "next/cache";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

export const metadata: Metadata = {
    title: "Complete Exam History",
    description: "View your complete exam history. Filter and sort exams.",
};

export const getUserQuizSessionsCompleteHistoryUnstableCache = unstable_cache(
    async (userId: string) => {
        return await db.quizSession.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                createdAt: true,
                examMode: true,
                exam: {
                    select: {
                        id: true,
                        name: true,
                        questions: true,
                        examLevel: true,
                    },
                },
            },
        });
    },
    ['quiz_session_history', "user"], // Dynamic cache key
    { revalidate: 3600, tags: ['quiz_session_history', "user"] }
);


// const getUserQuizSessionsCompleteHistoryCache = async (userId: string) => {
//     "use cache";

//     try {
//         const quizSessions = await db.quizSession.findMany({
//             where: {
//                 userId,
//             },
//             orderBy: {
//                 createdAt: "desc",
//             },
//             select: {
//                 id: true,
//                 createdAt: true,
//                 examMode: true,
//                 exam: {
//                     select: {
//                         id: true,
//                         name: true,
//                         questions: true,
//                         examLevel: true,
//                     },
//                 },
//             },
//         });

//         cacheLife("seconds")

//         return quizSessions

//     } catch (error) {
//         console.log("Error fetching user quiz sessions", error);
//         return []
//     }
// }

const getUserQuizSessionsCompleteHistory = async (userId: string) => {
    try {
        const quizSessions = await db.quizSession.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                createdAt: true,
                examMode: true,
                exam: {
                    select: {
                        id: true,
                        name: true,
                        questions: true,
                        examLevel: true,
                    },
                },
            },
        });

        return quizSessions

    } catch (error) {
        console.log("Error fetching user quiz sessions", error);
        return []
    }
}



const CompleteExamHistoryPage = async (props: {
    params: Promise<{
        userId: string;
    }>;
}) => {
    const params = await props.params;
    const userId = params.userId;

    const userQuizSessions = await getUserQuizSessionsCompleteHistoryUnstableCache(userId);

    if (!userQuizSessions) {
        console.log("could not find a quiz session, user has not taken an exam");
    }

    let examData = userQuizSessions.map((e) => {
        const formattedDate = formatDateWithSuffix(new Date(e.createdAt));

        return {
            id: e.id,
            examName: e.exam.name,
            date: formattedDate,
            examMode: e.examMode,
            totalQuestions: e.exam.questions.length,
            difficultyLevel: e.exam.examLevel,
            link: `/exam/${e.exam.id}/quiz/${e.id}/results`,
        };
    });
    return (
        <section className="block-space big-container">
            <div>
                <h1 className="mb-4">Complete Exam History</h1>
                <ExamHistoryTable examHistoryData={examData} />
            </div>
        </section>
    );
};

export default CompleteExamHistoryPage;
