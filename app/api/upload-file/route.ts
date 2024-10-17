import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    console.log("image", image);

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("an error while tring to upload files", error);
    return NextResponse.json(
      { success: false },
      {
        status: 400,
      },
    );
  }
}
