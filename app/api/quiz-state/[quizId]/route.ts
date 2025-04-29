import { auth } from "@/auth";
import db from "@/hooks/lib/db";
import { Question } from "@prisma/client";
import { NextResponse } from "next/server";

const formatUserAnswer = (
  selectedOptions: number[],
  isMultiSelect: boolean,
): string => {
  if (!selectedOptions || selectedOptions.length === 0) return "";
  if (isMultiSelect) {
    return selectedOptions.sort((a, b) => a - b).join(",");
  } else {
    return selectedOptions[0]?.toString() ?? ""; // Take the first element for single choice
  }
};

const parseUserAnswer = (
  answerString: string | null,
  isMultiSelect: boolean,
): number[] => {
  if (!answerString) return [];
  if (isMultiSelect) {
    return answerString
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));
  } else {
    const num = parseInt(answerString, 10);
    return isNaN(num) ? [] : [num];
  }
};

function areAnswersCorrect(correctAnswersStr: string, userAnswer: number[]) {
  // Step 1: Convert correctAnswersStr to an array of numbers and sort it
  const correctAnswersArr = correctAnswersStr
    .split(",")
    .map(Number)
    .sort((a, b) => a - b);

  // Step 2: Sort the userAnswer array as well
  const sortedUserAnswer = [...userAnswer].sort((a, b) => a - b);

  // Step 3: Compare both arrays for equality
  if (correctAnswersArr.length !== sortedUserAnswer.length) {
    return false;
  }

  return correctAnswersArr.every(
    (val, index) => val === sortedUserAnswer[index],
  );
}

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ quizId: string }> },
) => {
  try {
    const userSession = await auth();
    if (!userSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { quizId } = await params;

    if (typeof quizId !== "string") {
      return NextResponse.json({ message: "Invalid quizId" }, { status: 400 });
    }

    const session = await db.quizSession.findUnique({
      where: { id: quizId },
      include: {
        userAttempts: {
          select: {
            questionId: true,
            userAnswer: true,
            skipped: true,
            question: { select: { questionType: true } },
          },
        },
        exam: {
          select: { timeAllowed: true },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    // Structure the response for the frontend
    const userAnswersMap: Record<string, number[]> = {};
    const questionStatusesMap: Record<
      string,
      "attempted" | "skipped" | "unanswered"
    > = {};

    session.userAttempts.forEach((attempt) => {
      const isMulti = attempt.question.questionType === "multi_select"; // Get type from included question
      userAnswersMap[attempt.questionId] = parseUserAnswer(
        attempt.userAnswer,
        isMulti,
      );

      if (attempt.skipped) {
        questionStatusesMap[attempt.questionId] = "skipped";
      } else if (attempt.userAnswer && attempt.userAnswer !== "") {
        // Check userAnswer is not null or empty string
        questionStatusesMap[attempt.questionId] = "attempted";
      } else {
        questionStatusesMap[attempt.questionId] = "unanswered"; // Default if no status fits
      }
    });

    return NextResponse.json({
      startTime: session.createdAt.toISOString(), // Or a dedicated startTime field
      timeAllowed: session.exam.timeAllowed, // Send time allowed
      isCompleted: session.isCompleted,
      userAnswers: userAnswersMap,
      questionStatuses: questionStatusesMap,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
};

export const POST = async (
  request: Request,
  { params }: { params: Promise<{ quizId: string }> },
) => {
  console.log("POST /api/quiz-state/[quizId] called");
  try {
    const userSession = await auth();
    if (!userSession) {
      console.log("Unauthorized access attempt");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log("User authenticated:", userSession.user?.id);

    const { quizId } = await params;
    console.log("Received quizId:", quizId);

    // We need questionType from the frontend OR fetch it here.
    // Passing from frontend is more efficient if `MCQ` component knows it.
    const body = await request.json();
    console.log("Received request body:", body);
    const { questionId, userAnswer, status, questionType } = body as {
      questionId: string;
      userAnswer: number[]; // Expecting array from frontend
      status: "attempted" | "skipped";
      questionType: Question["questionType"]; // e.g., 'multiple_choice' or 'multi_select'
    };

    console.log("Parsed data:", {
      questionId,
      userAnswer,
      status,
      questionType,
    });

    if (
      !questionId ||
      !status ||
      !["attempted", "skipped"].includes(status) ||
      !questionType
    ) {
      console.error("Validation failed: Missing required fields", {
        questionId,
        status,
        questionType,
      });
      return NextResponse.json(
        { error: "Invalid data: Missing questionId, status, or questionType" },
        { status: 400 },
      );
    }
    if (status === "attempted" && (!userAnswer || userAnswer.length === 0)) {
      // Allow empty array for attempted if user deselects all? Or treat as skipped?
      // For now, let's require non-empty for 'attempted' - ADJUSTED LOGIC TO CHECK FOR NULL/UNDEFINED AS WELL
      console.error(
        "Validation failed: 'attempted' status requires non-empty userAnswer",
        { userAnswer },
      );
      return NextResponse.json(
        {
          error:
            "Invalid data: 'attempted' status requires a non-empty userAnswer array.",
        },
        { status: 400 },
      );
    }

    const isMulti = questionType === "multi_select";
    const answerString =
      status === "attempted" ? formatUserAnswer(userAnswer, isMulti) : ""; // Format array to string
    const isSkipped = status === "skipped";
    console.log("Calculated values:", { isMulti, answerString, isSkipped });

    console.log("Fetching question from DB:", questionId);
    const databaseQuestion = await db.question.findFirst({
      where: { id: questionId },
      select: { correctAnswers: true },
    });

    if (!databaseQuestion) {
      console.error("Question not found in DB:", questionId);
      return NextResponse.json(
        { message: "Question not found." },
        { status: 404 },
      );
    }
    console.log(
      "Found question, correctAnswers:",
      databaseQuestion.correctAnswers,
    );

    const correctAnswers = databaseQuestion.correctAnswers;
    // Ensure userAnswer is an array even if status is skipped for the check function
    const answerToCheck = status === "attempted" ? userAnswer : [];
    const isCorrect = areAnswersCorrect(correctAnswers, answerToCheck);
    console.log("Calculated isCorrect:", isCorrect);

    const upsertData = {
      where: {
        quizSessionId_questionId: {
          quizSessionId: quizId,
          questionId: questionId,
        },
      },
      update: {
        userAnswer: answerString,
        skipped: isSkipped,
        isCorrect: isCorrect, // Update if calculated
      },
      create: {
        quizSessionId: quizId,
        questionId: questionId,
        userAnswer: answerString,
        skipped: isSkipped,
        isCorrect: isCorrect, // Set if calculated
        // No need to set user relation directly if not defined in schema for create
      },
    };
    console.log(
      "Attempting upsert with data:",
      JSON.stringify(upsertData, null, 2),
    );

    await db.userAttempt.upsert(upsertData);
    console.log(
      "Upsert successful for question:",
      questionId,
      "in quiz:",
      quizId,
    );

    return NextResponse.json(
      { message: "State saved successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in POST /api/quiz-state/[quizId]:", error); // Log the full error
    // Check if error is an instance of Error to access message property safely
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error saving post quiz state", error: errorMessage }, // Optionally include error message in response for debugging
      { status: 500 },
    );
  }
};
