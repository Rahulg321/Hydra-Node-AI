import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Extract userId from the request body (POST request)
    const { currentUserId } = await req.json();

    if (!currentUserId) {
      return NextResponse.json(
        { error: "Missing userId in the request body" },
        { status: 400 },
      );
    }

    // Fetch user data from the database
    const user = await db.user.findUnique({
      where: { id: currentUserId },
      select: {
        hasLifetimeAccess: true,
        stripeCurrentPeriodEnd: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the user has an active subscription
    const hasActiveSubscription =
      user.stripeCurrentPeriodEnd &&
      new Date(user.stripeCurrentPeriodEnd) > new Date();

    // Return access status
    return NextResponse.json(
      {
        hasAccess: user.hasLifetimeAccess || hasActiveSubscription,
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
}
