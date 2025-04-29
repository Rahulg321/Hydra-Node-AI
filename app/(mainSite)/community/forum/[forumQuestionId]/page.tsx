import QuestionReplyDialog from "@/components/Dialogs/question-reply-dialog";
import ForumQuestion from "@/components/forum-question";
import HtmlContent from "@/components/html-content";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import db from "@/hooks/lib/db";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React, { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuestionReplySkeleton } from "@/components/skeletons/question-reply-skeleton";

const ForumQuestionPage = async (props: {
  params: Promise<{ forumQuestionId: string }>;
}) => {
  const params = await props.params;
  const specificForumQuestion = await db.forumQuestion.findUnique({
    where: { id: params.forumQuestionId },
    select: {
      id: true,
      title: true,
      content: true,
      tags: true,
      createdAt: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      votes: true,
      _count: {
        select: {
          votes: true,
          replies: true,
        },
      },
    },
  });

  if (!specificForumQuestion) return <p>Question not found</p>;

  const { id, title, tags, createdAt, author, content } = specificForumQuestion;

  const metrics = {
    upvotes: specificForumQuestion.votes.filter((vote) => vote.value === 1)
      .length,
    downvotes: specificForumQuestion.votes.filter((vote) => vote.value === -1)
      .length,
    replies: specificForumQuestion._count.replies,
  };

  return (
    <section className="block-space big-container">
      <div className="flex items-center justify-between">
        <h2>Specific Question</h2>
        <div>
          <QuestionReplyDialog questionId={id} />
        </div>
      </div>
      <div className="mt-4">
        <ForumQuestion
          key={id}
          id={id}
          author={{
            name: author.name!,
            avatarUrl: author.image!,
          }}
          timestamp={createdAt} // 20 hours ago
          title={title}
          content={content}
          tags={tags}
          metrics={metrics}
        />
      </div>
      <div className="mt-4">
        <Suspense
          fallback={
            <div className="space-y-4">
              <QuestionReplySkeleton />
              <QuestionReplySkeleton />
              <QuestionReplySkeleton />
            </div>
          }
        >
          <FetchQuestionReplies questionId={id} />
        </Suspense>
      </div>
    </section>
  );
};

export default ForumQuestionPage;

async function FetchQuestionReplies({ questionId }: { questionId: string }) {
  const replies = await db.reply.findMany({
    where: { questionId },
    take: 10,
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h3>{replies.length} Replies</h3>
      <div className="mt-4 space-y-4">
        {replies.length > 0 ? (
          replies.map((reply) => (
            <QuestionReply
              key={reply.id}
              timeStamp={reply.createdAt}
              questionId={questionId}
              content={reply.content}
              author={{
                name: reply.author.name!,
                avatarUrl: reply.author.image!,
              }}
            />
          ))
        ) : (
          <p>No replies yet</p>
        )}
      </div>
    </div>
  );
}

function QuestionReply({
  questionId,
  content,
  author,
  timeStamp,
}: {
  questionId: string;
  content: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  timeStamp: Date;
}) {
  return (
    <Card className="border-l-4 bg-muted">
      <CardHeader className="flex">
        <Avatar>
          <AvatarImage src={author.avatarUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{author.name}</span>
        <span className="text-gray-500">
          {formatDistanceToNow(new Date(timeStamp), { addSuffix: true })}
        </span>
      </CardHeader>
      <CardContent>
        <HtmlContent content={content} />
      </CardContent>
    </Card>
  );
}
