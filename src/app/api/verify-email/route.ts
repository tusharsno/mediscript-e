import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }

    // Token দিয়ে user খুঁজে বের করা
    const user = await db.user.findUnique({
      where: { verificationToken: token }
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid verification token" }, { status: 400 });
    }

    // Token expire হয়ে গেছে কিনা চেক
    if (user.verificationExpires && user.verificationExpires < new Date()) {
      return NextResponse.json({ message: "Verification token has expired" }, { status: 400 });
    }

    // Already verified কিনা চেক
    if (user.emailVerified) {
      return NextResponse.json({ message: "Email already verified" }, { status: 400 });
    }

    // Email verify করা এবং token remove করা
    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationExpires: null
      }
    });

    return NextResponse.json({ 
      message: "Email verified successfully! You can now login." 
    }, { status: 200 });

  } catch (error: unknown) {
    console.error("VERIFICATION_ERROR", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Internal Error", error: errorMessage }, { status: 500 });
  }
}
