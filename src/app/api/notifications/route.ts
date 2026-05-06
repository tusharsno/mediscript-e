import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        patientProfile: true,
        doctorProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const notifications = [];

    // Patient notifications
    if (user.patientProfile) {
      // Upcoming appointments
      const upcomingAppointments = await prisma.appointment.findMany({
        where: {
          patientId: user.patientProfile.id,
          status: "CONFIRMED",
          date: {
            gte: new Date(),
          },
        },
        include: {
          doctor: {
            include: {
              user: true,
            },
          },
        },
        take: 3,
      });

      notifications.push(
        ...upcomingAppointments.map((apt) => ({
          id: `apt-${apt.id}`,
          type: "appointment",
          title: "Upcoming Appointment",
          message: `Appointment with Dr. ${apt.doctor.user.name} on ${new Date(apt.date).toLocaleDateString()}`,
          time: new Date(apt.date).toISOString(),
          read: false,
        }))
      );

      // Recent prescriptions
      const recentPrescriptions = await prisma.prescription.findMany({
        where: {
          patientId: user.patientProfile.id,
        },
        include: {
          doctor: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 2,
      });

      notifications.push(
        ...recentPrescriptions.map((presc) => ({
          id: `presc-${presc.id}`,
          type: "prescription",
          title: "New Prescription",
          message: `Dr. ${presc.doctor.user.name} issued a new prescription`,
          time: presc.createdAt.toISOString(),
          read: false,
        }))
      );

      // Active medicine reminders
      const activeReminders = await prisma.medicineReminder.findMany({
        where: {
          patientId: user.patientProfile.id,
          endDate: {
            gte: new Date(),
          },
        },
        orderBy: {
          time: "asc",
        },
        take: 2,
      });

      notifications.push(
        ...activeReminders.map((reminder) => ({
          id: `reminder-${reminder.id}`,
          type: "reminder",
          title: "Medicine Reminder",
          message: `Time to take ${reminder.medicineName} (${reminder.dosage})`,
          time: reminder.createdAt.toISOString(),
          read: reminder.taken,
        }))
      );
    }

    // Doctor notifications
    if (user.doctorProfile) {
      // Pending appointments
      const pendingAppointments = await prisma.appointment.findMany({
        where: {
          doctorId: user.doctorProfile.id,
          status: "PENDING",
        },
        include: {
          patient: {
            include: {
              user: true,
            },
          },
        },
        take: 3,
      });

      notifications.push(
        ...pendingAppointments.map((apt) => ({
          id: `pending-${apt.id}`,
          type: "appointment",
          title: "New Appointment Request",
          message: `${apt.patient.user.name} requested an appointment`,
          time: apt.createdAt.toISOString(),
          read: false,
        }))
      );
    }

    // Sort by time (newest first)
    notifications.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

    return NextResponse.json({
      notifications: notifications.slice(0, 10),
      unreadCount: notifications.filter((n) => !n.read).length,
    });
  } catch (error) {
    console.error("Notifications error:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}
