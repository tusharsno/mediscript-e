import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "PATIENT") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { taken } = body;

    const reminder = await db.medicineReminder.update({
      where: { id },
      data: { 
        taken,
        takenAt: taken ? new Date() : null,
      },
    });

    return NextResponse.json(reminder, { status: 200 });
  } catch (error) {
    console.error("UPDATE_REMINDER_ERROR:", error);
    return NextResponse.json({ message: "Failed to update reminder" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "PATIENT") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await db.medicineReminder.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Reminder deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE_REMINDER_ERROR:", error);
    return NextResponse.json({ message: "Failed to delete reminder" }, { status: 500 });
  }
}
