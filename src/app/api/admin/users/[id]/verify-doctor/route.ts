import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const { approve } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id },
      include: { doctorProfile: true },
    });

    if (!user || user.role !== "DOCTOR") {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    if (approve) {
      await prisma.user.update({ where: { id }, data: { doctorVerified: true } });
      return NextResponse.json({ message: "Doctor approved" });
    } else {
      if (user.doctorProfile) {
        await prisma.prescription.deleteMany({ where: { doctorId: user.doctorProfile.id } });
        await prisma.appointment.deleteMany({ where: { doctorId: user.doctorProfile.id } });
        await prisma.doctorProfile.delete({ where: { id: user.doctorProfile.id } });
      }
      await prisma.user.delete({ where: { id } });
      return NextResponse.json({ message: "Doctor rejected and removed" });
    }
  } catch (error) {
    console.error("VERIFY_DOCTOR_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
