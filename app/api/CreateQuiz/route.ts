import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { examId, currentUserId } = await request.json();
    console.log("examId is ", examId);
    console.log("currentUserId is ", currentUserId);

    if (!examId || !currentUserId) {
      return Response.json(
        {
          success: false,
          message: "examId and currentUserId are required.",
        },
        { status: 400 },
      );
    }

    // create a new quiz session
    const quizSession = await db.quizSession.create({
      data: {
        examId: examId,
        userId: currentUserId,
        startTime: new Date(),
      },
    });

    return Response.json(
      {
        success: true,
        message: "Quiz session created successfully.",
        quizSessionId: quizSession.id,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("could not create quiz session", error);

    return Response.json(
      {
        success: false,
        message: `An unexpected error occurred. ${error}`,
      },
      { status: 500 },
    );
  }
}