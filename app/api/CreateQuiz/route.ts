import db from "@/lib/db";

export async function GET(request: Request) {
  return Response.json(
    {
      success: true,
    },
    {
      status: 200,
    },
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("body is ", body);
    const { examId, currentUserId } = body;
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
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "An unexpected error occurred.",
      },
      { status: 500 },
    );
  }
}
