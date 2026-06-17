import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get("doctorId");
  const date = searchParams.get("date");

  if (!doctorId || !date) {
    return NextResponse.json({ bookedSlots: [] });
  }

  const appointments = await db.appointment.findMany({
    where: {
      doctorId,
      date: new Date(date),
      status: { not: "CANCELLED" },
    },
    select: { time: true },
  });

  return NextResponse.json({ bookedSlots: appointments.map((a) => a.time) });
}
