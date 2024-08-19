import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (session?.user?.role === "ADMIN") {
    return NextResponse.json(
      { status: "success", message: "Admin access granted" },
      { status: 200 },
    );
  } else if (session?.user) {
    return NextResponse.json(
      {
        status: "denied",
        message: "Access denied. Admin privileges required.",
      },
      { status: 403 },
    );
  } else {
    return NextResponse.json(
      { status: "denied", message: "Not authenticated" },
      { status: 401 },
    );
  }
}
