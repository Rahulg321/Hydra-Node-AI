import {
  GetFilteredQuizSessionsHistory,
  QuizSessionHistory,
} from "@/app/types";
import db from "@/lib/db";
import { Prisma, QuizSession } from "@prisma/client";

// interface QuizSessionWithDuration extends QuizSession {
//   durationMs: number; // Add duration in milliseconds
// }

/**
 * Get the total average score for a user
 * @param userId - The ID of the user
 * @returns The total average score for the user
 */
export async function getTotalAverageScore(userId: string): Promise<number> {
  try {
    // Get the count of completed exams in a single query
    const totalExamsCompleted = await db.quizSession.count({
      where: {
        userId,
        isCompleted: true,
      },
    });

    if (totalExamsCompleted === 0) {
      return 0; // Return 0 if no exams completed to avoid division by zero
    }

    // Get the average percentage score directly from the database
    const result = await db.quizSession.aggregate({
      where: {
        userId,
        isCompleted: true,
        percentageScored: { not: null },
      },
      _avg: {
        percentageScored: true,
      },
    });

    // Return the average score or 0 if null
    return result._avg.percentageScored ?? 0;
  } catch (error) {
    console.error(
      "Error occurred while calculating total average score",
      error,
    );
    throw error;
  }
}

/**
 * Get the best overall quiz session performance for a user
 * @param userId - The ID of the user
 * @returns The best overall quiz session performance for the user
 */
export async function getBestOverallQuizSessionPerformance(userId: string) {
  try {
    const completedQuizSessions = await db.quizSession.findMany({
      where: {
        userId,
        isCompleted: true,
        percentageScored: {
          not: null,
        },
        endTime: {
          not: null,
        },
      },
      select: {
        id: true,
        percentageScored: true,

        startTime: true,
        endTime: true,
        exam: {
          select: {
            name: true,
            vendor: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!completedQuizSessions || completedQuizSessions.length === 0) {
      console.log(`No completed quiz sessions found for user ${userId}`);
      return null; // No sessions to compare
    }

    const sessionsWithDuration = completedQuizSessions.map((session) => {
      const durationMs =
        session.endTime!.getTime() - session.startTime.getTime(); // endTime is checked non-null by the query
      return {
        ...session,
        durationMs: durationMs,
      };
    });

    sessionsWithDuration.sort((a, b) => {
      if (a.percentageScored! > b.percentageScored!) {
        return -1; // a comes first (higher score)
      }
      if (a.percentageScored! < b.percentageScored!) {
        return 1; // b comes first (higher score)
      }

      // Scores are equal, compare duration (ascending)
      if (a.durationMs < b.durationMs) {
        return -1; // a comes first (shorter duration)
      }
      if (a.durationMs > b.durationMs) {
        return 1; // b comes first (shorter duration)
      }

      return 0;
    });

    const bestSession = sessionsWithDuration[0];

    console.log(
      `Best session for user ${userId}: ID=${bestSession.id}, Score=${bestSession.percentageScored}%, Duration=${(bestSession.durationMs / 1000).toFixed(2)}s`,
    );

    return bestSession;
  } catch (error) {
    console.log("error calculating best session for user", error);
    throw error;
  }
}

/**
 * Get the average time taken by a user to complete an exam
 * @param userId - The ID of the user
 * @returns The average time taken by the user to complete an exam
 */
export async function getAverageTimeTaken(userId: string): Promise<number> {
  try {
    const quizSessions = await db.quizSession.findMany({
      where: { userId },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    const totalTime = quizSessions.reduce((acc, session) => {
      const startTime = session.startTime;
      const endTime = session.endTime;

      if (!startTime || !endTime) {
        return acc;
      }

      let timeTakenMs =
        new Date(endTime).getTime() - new Date(startTime).getTime();

      let timeTakenMinutes = Math.floor(timeTakenMs / 60000);

      return acc + timeTakenMinutes;
    }, 0);

    const averageTime = totalTime / quizSessions.length;
    return averageTime;
  } catch (error) {
    console.log("error occured while calculating average time taken", error);
    throw error;
  }
}

/**
 * Get the total number of exams failed by a user
 * @param userId - The ID of the user
 * @returns The total number of exams failed by the user
 */
export async function getTotalFailedExams(userId: string) {
  try {
    return await db.quizSession.count({
      where: { userId, passFailStatus: false },
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Get the total number of exams passed by a user
 * @param userId - The ID of the user
 * @returns The total number of exams passed by the user
 */
export async function getTotalPassedExams(userId: string) {
  try {
    return await db.quizSession.count({
      where: { userId, passFailStatus: true },
    });
  } catch (error) {
    console.error("error occured while calculating total passed exams", error);
    throw error;
  }
}

/**
 * Get the total number of exams completed by a user
 * @param userId - The ID of the user
 * @returns The total number of exams completed by the user
 */
export async function getTotalExamCompletedByUser(userId: string) {
  try {
    return await db.quizSession.count({
      where: { userId, isCompleted: true },
    });
  } catch (error) {
    console.error(
      "an error occured while trying to get total exams completed by user",
      error,
    );
    throw error;
  }
}

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
    console.error("error getting user quiz Sessions complete history");
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
            vendor: {
              select: {
                name: true,
              },
            },
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

/**
 * Get all system vendors where the vendors were created by the system
 * @returns An array of vendors
 */
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
 *
 * this func returns top five vendors used by the user during their exam sessions. it first queries the databases for all the exams the user has taken.
 * it then aggregates the vendor counts in application code and returns the top five vendors.
 *
 * @param userId string
 */
export const getTopFiveVendorsForUser = async (userId: string) => {
  try {
    const sessions = await db.quizSession.findMany({
      where: {
        userId,
      },
      select: {
        exam: {
          select: {
            vendor: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    // 2. Aggregate vendor counts in application code
    const vendorCounts: {
      [vendorId: string]: { name: string; count: number };
    } = {};

    for (const session of sessions) {
      if (session.exam && session.exam.vendor) {
        const vendor = session.exam.vendor;

        if (vendorCounts[vendor.id]) {
          vendorCounts[vendor.id].count++;
        } else {
          vendorCounts[vendor.id] = {
            name: vendor.name,
            count: 1,
          };
        }
      }
    }

    const sortedVendors = Object.values(vendorCounts).sort(
      (a, b) => b.count - a.count,
    );

    return sortedVendors.slice(0, 5);
  } catch (error) {
    console.error("Error fetching top five vendors for user", error);
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
    // The userId is actually included in the where clause, but let's make it more explicit
    // and ensure it's always included since it's a required parameter
    const whereClause = {
      userId,
      ...(vendor && vendor.length > 0
        ? { exam: { vendor: { name: vendor } } }
        : {}),
      ...(result && result.length > 0
        ? { passFailStatus: result === "passed" ? true : false }
        : {}),
      ...(mode && mode.length > 0 ? { examMode: mode } : {}),
    };

    console.log("whereClause", whereClause);

    const orderByClause =
      sortBy && sortBy.length > 0
        ? {
            createdAt:
              sortBy === "recent"
                ? Prisma.SortOrder.desc
                : Prisma.SortOrder.asc,
          }
        : { createdAt: Prisma.SortOrder.desc };

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
              vendor: {
                select: {
                  name: true,
                },
              },
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
