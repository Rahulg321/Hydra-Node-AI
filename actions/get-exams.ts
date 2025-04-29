"use server";

import db from "@/hooks/lib/db";
import { Exam } from "@prisma/client";

type GetExamsResult = {
  data: Exam[];
  totalCount: number;
  totalPages: number;
};

export default async function GetMarketPlaceExams({
  search,
  offset = 0,
  limit = 20,
}: {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}): Promise<GetExamsResult> {
  const data = await db.exam.findMany({
    where: {
      vendor: {
        isUserVendor: true,
      },
    },
    skip: offset,
    take: limit,
  });

  const totalCount = await db.exam.count({
    where: {
      vendor: {
        isUserVendor: true,
      },
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}
