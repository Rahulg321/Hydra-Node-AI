import {
  GetFilteredQuizSessionsHistory,
  QuizSessionHistory,
} from "@/app/types";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

/**
 * Get the complete history of quiz sessions for a user to display on the profile page
 * @param userId - The ID of the user
 * @returns An array of quiz sessions
 */
export async function getUserQuizSessionsCompleteHistory(userId: string) {
  try {
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
        passFailStatus: true,
        percentageScored: true,
        correctAnswers: true,
        questionCount: true,

        exam: {
          select: {
            id: true,
            name: true,
            examLevel: true,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Get the complete history of quiz sessions for a user to display on the profile page, limited to a certain number
 * @param userId - The ID of the user
 * @param numberOfSessions - The number of sessions to return
 * @returns An array of quiz sessions
 */
export async function getNumberedUserQuizSessions(
  userId: string,
  numberOfSessions: number,
) {
  try {
    return await db.quizSession.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: numberOfSessions,
      select: {
        id: true,
        createdAt: true,
        examMode: true,
        passFailStatus: true,
        percentageScored: true,
        correctAnswers: true,
        questionCount: true,
        exam: {
          select: {
            id: true,
            name: true,
            examLevel: true,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Get a user by their ID
 * @param userId - The ID of the user
 * @returns The user
 */
export const getUserById = async (userId: string) => {
  try {
    return await db.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getAllSystemVendors = async () => {
  try {
    return await db.vendor.findMany({
      where: {
        isUserVendor: false,
      },
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Get filtered quiz sessions with pagination and sorting
 *
 * @param userId - The ID of the user
 * @param search - Optional search query
 * @param offset - Number of records to skip (for pagination)
 * @param limit - Maximum number of records to return
 * @param vendor - Optional filter by vendor name
 * @param result - Optional filter by pass/fail status
 * @param mode - Optional filter by exam mode (PRACTICE/MOCK)
 * @param sortBy - Optional sorting parameter (recent/oldest)
 * @returns Object containing quiz session data, total count, and total pages
 */
export const GetFilteredQuizSessions = async ({
  search,
  offset = 0,
  limit = 20,
  vendor,
  result,
  mode,
  sortBy,
  userId,
}: {
  userId: string;
  search?: string | undefined;
  offset?: number;
  limit?: number;
  vendor?: string;
  result?: string;
  mode?: string;
  sortBy?: string;
}): Promise<GetFilteredQuizSessionsHistory> => {
  try {
    const whereClause = {
      ...(vendor && vendor.length > 0
        ? { exam: { vendor: { name: vendor } } }
        : {}),
      ...(result && result.length > 0
        ? { passFailStatus: result === "passed" ? true : false }
        : {}),
      ...(mode && mode.length > 0 ? { examMode: mode } : {}),
    };

    const orderByClause =
      sortBy && sortBy.length > 0
        ? {
            createdAt:
              sortBy === "recent"
                ? Prisma.SortOrder.desc
                : Prisma.SortOrder.asc,
          }
        : { createdAt: Prisma.SortOrder.desc };

    console.log("whereClause", whereClause);

    const [data, totalCount] = await Promise.all([
      db.quizSession.findMany({
        where: whereClause,
        orderBy: orderByClause,
        take: limit,
        skip: offset,
        select: {
          id: true,
          createdAt: true,
          examMode: true,
          passFailStatus: true,
          percentageScored: true,
          correctAnswers: true,
          questionCount: true,
          exam: {
            select: {
              id: true,
              name: true,
              examLevel: true,
            },
          },
        },
      }),
      db.quizSession.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return { data, totalCount, totalPages };
  } catch (error) {
    throw error;
  }
};
