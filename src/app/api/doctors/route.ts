import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const doctors = await db.doctorProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(doctors, { status: 200 });
  } catch (error) {
    console.error("GET_DOCTORS_ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}
