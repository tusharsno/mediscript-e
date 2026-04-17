import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name || name.trim().length === 0) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    await db.user.update({
      where: { email: session.user.email as string },
      data: { name: name.trim() },
    });

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("UPDATE_PROFILE_ERROR:", error);
    return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
  }
}
