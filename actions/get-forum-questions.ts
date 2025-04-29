"use server";

import db from "@/hooks/lib/db";
import { Exam, ForumQuestion } from "@prisma/client";

type GetExamsResult = {
  data: ForumQuestion[];
  totalCount: number;
  totalPages: number;
};

export default async function GetCommunityForumQuestions({
  search,
  offset = 0,
  limit = 20,
}: {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}): Promise<GetExamsResult> {
  const data = await db.forumQuestion.findMany({
    skip: offset,
    take: limit,
  });

  const totalCount = await db.forumQuestion.count();

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}
