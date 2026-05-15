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
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { status } = body;

    const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    // Ownership check
    const appointment = await db.appointment.findUnique({ where: { id } });
    if (!appointment) return NextResponse.json({ message: "Not found" }, { status: 404 });

    if (session.user.role === "DOCTOR") {
      const doctor = await db.doctorProfile.findUnique({ where: { userId: session.user.id } });
      if (!doctor || appointment.doctorId !== doctor.id)
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    } else if (session.user.role === "PATIENT") {
      const patient = await db.patientProfile.findUnique({ where: { userId: session.user.id } });
      if (!patient || appointment.patientId !== patient.id)
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updated = await db.appointment.update({ where: { id }, data: { status } });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("UPDATE_APPOINTMENT_ERROR:", error);
    return NextResponse.json({ message: "Failed to update appointment" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const appointment = await db.appointment.findUnique({ where: { id } });
    if (!appointment) return NextResponse.json({ message: "Not found" }, { status: 404 });

    if (session.user.role === "PATIENT") {
      const patient = await db.patientProfile.findUnique({ where: { userId: session.user.id } });
      if (!patient || appointment.patientId !== patient.id)
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await db.appointment.delete({ where: { id } });
    return NextResponse.json({ message: "Appointment deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE_APPOINTMENT_ERROR:", error);
    return NextResponse.json({ message: "Failed to delete appointment" }, { status: 500 });
  }
}
