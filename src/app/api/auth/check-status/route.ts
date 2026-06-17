import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ status: "ok" });

    const user = await db.user.findUnique({
      where: { email },
      select: { role: true, doctorVerified: true, emailVerified: true },
    });

    // Only reveal pending status — do not reveal whether user exists
    if (user?.role === "DOCTOR" && user.emailVerified && !user.doctorVerified) {
      return NextResponse.json({ status: "DOCTOR_PENDING_APPROVAL" });
    }

    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ status: "ok" });
  }
}
