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
    const { doctorId, date, time, reason } = body;

    if (!doctorId || !date || !time) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Validate date is not in the past
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      return NextResponse.json({ message: "Cannot book appointment in the past" }, { status: 400 });
    }

    let patient = await db.patientProfile.findUnique({
      where: { userId: session.user.id },
    });

    // If patient profile doesn't exist, create it
    if (!patient) {
      try {
        patient = await db.patientProfile.create({
          data: {
            userId: session.user.id,
            dob: new Date(),
            bloodGroup: "O+",
          },
        });
      } catch (profileError) {
        console.error("Error creating patient profile:", profileError);
        return NextResponse.json({ message: "Failed to create patient profile" }, { status: 500 });
      }
    }

    const conflict = await db.appointment.findFirst({
      where: {
        doctorId,
        date: new Date(date),
        time,
        status: { not: "CANCELLED" },
      },
    });

    if (conflict) {
      return NextResponse.json(
        { message: "This time slot is already booked. Please choose a different time." },
        { status: 409 }
      );
    }

    const appointment = await db.appointment.create({
      data: {
        doctorId,
        patientId: patient.id,
        date: new Date(date),
        time,
        reason: reason || null,
        status: "PENDING",
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("CREATE_APPOINTMENT_ERROR:", error);
    return NextResponse.json({ message: "Failed to create appointment" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let appointments;

    if (session.user.role === "PATIENT") {
      let patient = await db.patientProfile.findUnique({
        where: { userId: session.user.id },
      });

      // If patient profile doesn't exist, create it
      if (!patient) {
        try {
          patient = await db.patientProfile.create({
            data: {
              userId: session.user.id,
              dob: new Date(),
              bloodGroup: "O+",
            },
          });
        } catch (profileError) {
          console.error("Error creating patient profile:", profileError);
          return NextResponse.json({ message: "Failed to create patient profile" }, { status: 500 });
        }
      }

      appointments = await db.appointment.findMany({
        where: { patientId: patient.id },
        include: {
          doctor: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: { date: "desc" },
      });
    } else if (session.user.role === "DOCTOR") {
      const doctor = await db.doctorProfile.findUnique({
        where: { userId: session.user.id },
      });

      if (!doctor) {
        return NextResponse.json({ message: "Doctor profile not found" }, { status: 404 });
      }

      appointments = await db.appointment.findMany({
        where: { doctorId: doctor.id },
        include: {
          patient: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: { date: "desc" },
      });
    } else {
      return NextResponse.json({ message: "Invalid role" }, { status: 403 });
    }

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error("GET_APPOINTMENTS_ERROR:", error);
    return NextResponse.json({ message: "Failed to fetch appointments" }, { status: 500 });
  }
}
