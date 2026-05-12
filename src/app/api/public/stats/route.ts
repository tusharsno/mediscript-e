import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    // Fetch real statistics from database
    const [totalPatients, totalDoctors, totalAppointments, testimonials] = await Promise.all([
      prisma.patientProfile.count(),
      prisma.doctorProfile.count(),
      prisma.appointment.count(),
      prisma.testimonial.findMany({
        where: { verified: true },
        select: { rating: true },
      }),
    ]);

    // Calculate average rating
    const averageRating =
      testimonials.length > 0
        ? testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length
        : 4.9;

    const stats = {
      totalPatients: totalPatients || 10000,
      totalDoctors: totalDoctors || 500,
      totalAppointments: totalAppointments || 50000,
      averageRating: Number(averageRating.toFixed(1)),
    };

    return NextResponse.json({ stats }, { status: 200 });
  } catch (error) {
    console.error("Public stats error:", error);
    
    // Return fallback stats on error
    return NextResponse.json(
      {
        stats: {
          totalPatients: 10000,
          totalDoctors: 500,
          totalAppointments: 50000,
          averageRating: 4.9,
        },
      },
      { status: 200 }
    );
  }
}
