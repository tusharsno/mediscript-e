import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Check Authentication
    if (!session || session.user.role !== "DOCTOR") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { patientId, diagnosis, medications } = body;

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

    const newPrescription = await db.prescription.create({
      data: {
        diagnosis,
        medications,
        doctorId: doctor.doctorProfile.id,
        patientId: patientId,
      },
    });

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
