import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { enabled } = await req.json();

    await db.user.update({
      where: { id: session.user.id },
      data: { twoFactorEnabled: enabled },
    });

    return NextResponse.json({
      message: `2FA ${enabled ? "enabled" : "disabled"} successfully`,
    });
  } catch (error) {
    console.error("2FA toggle error:", error);
    return NextResponse.json({ message: "Failed to update 2FA" }, { status: 500 });
  }
}
