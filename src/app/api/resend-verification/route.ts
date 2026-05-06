import db from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // User খুঁজে বের করা
    const user = await db.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Already verified কিনা চেক
    if (user.emailVerified) {
      return NextResponse.json({ message: "Email already verified" }, { status: 400 });
    }

    // নতুন verification token generate করা
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Token update করা
    await db.user.update({
      where: { id: user.id },
      data: {
        verificationToken,
        verificationExpires
      }
    });

    // Verification email পাঠানো
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({ 
      message: "Verification email sent! Please check your inbox." 
    }, { status: 200 });

  } catch (error: unknown) {
    console.error("RESEND_VERIFICATION_ERROR", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Internal Error", error: errorMessage }, { status: 500 });
  }
}
