import { withAuth } from "@/hooks/lib/auth";
import { checkIfUserHasPurchasedExam } from "@/hooks/lib/utils";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = withAuth(async (req: Request, user: User) => {
  try {
    const { currentUserId, examId } = await req.json();

    if (!currentUserId || !examId) {
      return NextResponse.json(
        { error: "Missing userId or examId in the request body" },
        { status: 400 },
      );
    }

    const hasActiveSubscription =
      user.stripeCurrentPeriodEnd &&
      new Date(user.stripeCurrentPeriodEnd) > new Date();

    const hasPurchasedExam = await checkIfUserHasPurchasedExam(
      currentUserId,
      examId,
    );

    console.log("give user access in api he has purchased exam");

    return NextResponse.json(
      {
        hasAccess:
          user.hasLifetimeAccess || hasActiveSubscription || hasPurchasedExam,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    console.error("Error checking access:", error);
    return NextResponse.json(
      {
        error: "failure",
        message: `An error occurred while checking access. Error: ${error.message || error}`,
      },
      {
        status: 500,
      },
    );
  }
});
