import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "PATIENT") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { medicineName, dosage, frequency, time, startDate, endDate } = body;

    if (!medicineName || !dosage || !frequency || !time || !startDate || !endDate) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const patient = await db.patientProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!patient) {
      return NextResponse.json({ message: "Patient profile not found" }, { status: 404 });
    }

    const reminder = await db.medicineReminder.create({
      data: {
        medicineName,
        dosage,
        frequency,
        time,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        patientId: patient.id,
      },
    });

    return NextResponse.json(reminder, { status: 201 });
  } catch (error) {
    console.error("CREATE_REMINDER_ERROR:", error);
    return NextResponse.json({ message: "Failed to create reminder" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "PATIENT") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const patient = await db.patientProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!patient) {
      return NextResponse.json({ message: "Patient profile not found" }, { status: 404 });
    }

    const reminders = await db.medicineReminder.findMany({
      where: { patientId: patient.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reminders, { status: 200 });
  } catch (error) {
    console.error("GET_REMINDERS_ERROR:", error);
    return NextResponse.json({ message: "Failed to fetch reminders" }, { status: 500 });
  }
}
