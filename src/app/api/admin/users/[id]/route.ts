import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access only" },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Prevent admin from deleting themselves
    if (session.user.id === id) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    // Delete related data first, then user
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        doctorProfile: true,
        patientProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Delete doctor-related data
    if (user.doctorProfile) {
      await prisma.prescription.deleteMany({
        where: { doctorId: user.doctorProfile.id },
      });
      await prisma.appointment.deleteMany({
        where: { doctorId: user.doctorProfile.id },
      });
      await prisma.doctorProfile.delete({
        where: { id: user.doctorProfile.id },
      });
    }

    // Delete patient-related data
    if (user.patientProfile) {
      await prisma.medicineReminder.deleteMany({
        where: { patientId: user.patientProfile.id },
      });
      await prisma.medicalVault.deleteMany({
        where: { patientId: user.patientProfile.id },
      });
      await prisma.prescription.deleteMany({
        where: { patientId: user.patientProfile.id },
      });
      await prisma.appointment.deleteMany({
        where: { patientId: user.patientProfile.id },
      });
      await prisma.patientProfile.delete({
        where: { id: user.patientProfile.id },
      });
    }

    // Finally delete user
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Admin delete user error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
