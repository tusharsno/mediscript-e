import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email },
      select: { twoFactorCode: true, twoFactorExpires: true },
    });

    if (!user || !user.twoFactorCode || !user.twoFactorExpires) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
    }

    if (new Date() > user.twoFactorExpires) {
      await db.user.update({
        where: { email },
        data: { twoFactorCode: null, twoFactorExpires: null },
      });
      return NextResponse.json({ message: "OTP has expired" }, { status: 400 });
    }

    if (user.twoFactorCode !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    // Clear OTP after successful verification
    await db.user.update({
      where: { email },
      data: { twoFactorCode: null, twoFactorExpires: null },
    });

    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("2FA verify error:", error);
    return NextResponse.json({ message: "Verification failed" }, { status: 500 });
  }
}
