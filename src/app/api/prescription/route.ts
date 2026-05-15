import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "DOCTOR") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const doctor = await db.user.findUnique({
      where: { email: session.user.email as string },
      include: { doctorProfile: true },
    });

    if (!doctor?.doctorProfile) {
      return NextResponse.json({ message: "Doctor profile not found" }, { status: 404 });
    }

    const prescriptions = await db.prescription.findMany({
      where: { doctorId: doctor.doctorProfile.id },
      include: { patient: { include: { user: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ prescriptions }, { status: 200 });
  } catch (error) {
    console.error("GET Prescription Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Check Authentication
    if (!session || session.user.role !== "DOCTOR") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { patientId, appointmentId, diagnosis, medications } = body;

    if (!patientId || !diagnosis || !medications) {
      console.log("Missing fields check:", { patientId, diagnosis, medications });
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const doctor = await db.user.findUnique({
      where: { email: session.user.email as string },
      include: { doctorProfile: true },
    });

    if (!doctor?.doctorProfile) {
      return NextResponse.json({ message: "Doctor profile not found" }, { status: 404 });
    }

    // Verify patient exists
    const patient = await db.patientProfile.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      return NextResponse.json({ message: "Patient not found" }, { status: 404 });
    }

    const newPrescription = await db.prescription.create({
      data: {
        diagnosis,
        medications,
        doctorId: doctor.doctorProfile.id,
        patientId: patientId,
      },
    });

    // Mark the specific appointment as COMPLETED
    if (appointmentId) {
      await db.appointment.update({
        where: { id: appointmentId },
        data: { status: "COMPLETED" },
      });
    } else {
      // Fallback: complete the latest CONFIRMED/PENDING appointment
      await db.appointment.updateMany({
        where: {
          doctorId: doctor.doctorProfile.id,
          patientId: patientId,
          status: { in: ["CONFIRMED", "PENDING"] },
        },
        data: { status: "COMPLETED" },
      });
    }

    return NextResponse.json(
      {
        message: "Prescription created!",
        id: newPrescription.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Prescription Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
