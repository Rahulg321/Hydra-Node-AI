import ForumQuestionDialog from "@/components/Dialogs/forum-question-dialog";
import ForumQuestion from "@/components/forum-question";
import ForumCategories from "@/components/sections/forum/ForumCategories";
import ForumHeader from "@/components/sections/forum/ForumHeader";
import PopularTags from "@/components/sections/forum/PopularTags";
import QuestionList from "@/components/sections/forum/QuestionsList";
import db from "@/lib/db";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
    title: "Forum",
    description: "Ask questions and get your doubts cleared by the community.",
};

export default async function ForumPage() {
    const data = await db.forumQuestion.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 10,
        select: {
            id: true,
            title: true,
            content: true,
            tags: true,
            createdAt: true,
            author: {
                select: {
                    name: true,
                    image: true
                }
            },
            votes: true,
            _count: {
                select: {
                    votes: true,
                    replies: true
                }
            }
        },
    })

    const questionsWithMetrics = data.map(question => ({
        ...question,
        metrics: {
            upvotes: question.votes.filter(vote => vote.value === 1).length,
            downvotes: question.votes.filter(vote => vote.value === -1).length,
            replies: question._count.replies
        },
    }))



    return (
        <section className="block-space big-container">
            <div className="flex justify-between items-center">
                <div>
                    <h1>Questions</h1>
                    <span>Please maintain a respectful and civil tone in all interactions</span>
                </div>

                <div>
                    <ForumQuestionDialog />
                </div>

            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                {
                    questionsWithMetrics && questionsWithMetrics.length > 0 ? (
                        questionsWithMetrics.map((question) => (
                            <Link key={question.id} href={`/community/forum/${question.id}`}>
                                <ForumQuestion
                                    key={question.id}
                                    id={question.id}
                                    author={{
                                        name: question.author.name!,
                                        avatarUrl: question.author.image!
                                    }}
                                    timestamp={question.createdAt}
                                    title={question.title}
                                    content={question.content}
                                    tags={question.tags}
                                    metrics={question.metrics}
                                    classname="hover:-translate-y-2 transition-transform duration-300"
                                />
                            </Link>
                        ))
                    ) : (
                        <p>No questions found</p>
                    )
                }
            </div>
        </section>
    );
}
