import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { quizSessionId } = body;

    if (!quizSessionId) {
      return Response.json(
        {
          success: false,
          message: "quizSessionId is required.",
        },
        { status: 400 },
      );
    }

    await db.quizSession.update({
      where: {
        id: quizSessionId,
      },
      data: {
        isCompleted: true,
        endTime: new Date(),
      },
    });

    return Response.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("an error occured while trying to end quiz", error);
    return Response.json(
      {
        success: false,
        error,
      },
      { status: 500 },
    );
  }
}
