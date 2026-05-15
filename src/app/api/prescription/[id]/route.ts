import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

async function getDoctorProfile(email: string) {
  const doctor = await db.user.findUnique({
    where: { email },
    include: { doctorProfile: true },
  });
  return doctor?.doctorProfile;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "DOCTOR") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const doctorProfile = await getDoctorProfile(session.user.email as string);
    if (!doctorProfile) {
      return NextResponse.json({ message: "Doctor profile not found" }, { status: 404 });
    }

    const prescription = await db.prescription.findUnique({ where: { id } });
    if (!prescription) {
      return NextResponse.json({ message: "Prescription not found" }, { status: 404 });
    }
    if (prescription.doctorId !== doctorProfile.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { diagnosis, medications, archivedByDoctor } = await req.json();

    // Archive toggle
    if (typeof archivedByDoctor === "boolean") {
      const updated = await db.prescription.update({
        where: { id },
        data: { archivedByDoctor },
      });
      return NextResponse.json({ message: "Prescription updated", prescription: updated }, { status: 200 });
    }

    if (!diagnosis || !medications) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const updated = await db.prescription.update({
      where: { id },
      data: { diagnosis, medications },
    });

    return NextResponse.json({ message: "Prescription updated", prescription: updated }, { status: 200 });
  } catch (error) {
    console.error("PATCH Prescription Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "DOCTOR") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const doctorProfile = await getDoctorProfile(session.user.email as string);
    if (!doctorProfile) {
      return NextResponse.json({ message: "Doctor profile not found" }, { status: 404 });
    }

    const prescription = await db.prescription.findUnique({ where: { id } });
    if (!prescription) {
      return NextResponse.json({ message: "Prescription not found" }, { status: 404 });
    }
    if (prescription.doctorId !== doctorProfile.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await db.prescription.delete({ where: { id } });
    return NextResponse.json({ message: "Prescription deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Prescription Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
