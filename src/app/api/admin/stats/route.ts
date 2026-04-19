import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access only" },
        { status: 403 }
      );
    }

    // Get statistics
    const [
      totalUsers,
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalPrescriptions,
      totalContactMessages,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.patientProfile.count(),
      prisma.doctorProfile.count(),
      prisma.appointment.count(),
      prisma.prescription.count(),
      prisma.contactMessage.count(),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      statistics: {
        totalUsers,
        totalPatients,
        totalDoctors,
        totalAppointments,
        totalPrescriptions,
        totalContactMessages,
      },
      recentUsers,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
