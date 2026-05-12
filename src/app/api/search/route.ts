import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q")?.trim() || "";

    if (!query) {
      return NextResponse.json({ results: {} }, { status: 200 });
    }

    const results: any = {};

    // Public search (no session) - Only doctors
    if (!session) {
      const doctors = await prisma.doctorProfile.findMany({
        where: {
          OR: [
            { user: { name: { contains: query, mode: "insensitive" } } },
            { specialization: { contains: query, mode: "insensitive" } },
            { licenseNo: { contains: query, mode: "insensitive" } },
          ],
        },
        include: {
          user: { select: { id: true, name: true, email: true } },
        },
        take: 5,
      });

      results.doctors = doctors.map((d) => ({
        id: d.user.id,
        name: d.user.name,
        email: d.user.email,
        specialization: d.specialization,
        licenseNo: d.licenseNo,
      }));

      return NextResponse.json({ results }, { status: 200 });
    }

    const userId = session.user.id;
    const userRole = session.user.role;

    // PATIENT search
    if (userRole === "PATIENT") {
      // Get patient profile ID
      const patientProfile = await prisma.patientProfile.findUnique({
        where: { userId: userId },
        select: { id: true },
      });

      if (!patientProfile) {
        return NextResponse.json({ results: {} }, { status: 200 });
      }

      const patientId = patientProfile.id;
      // Search doctors
      const doctors = await prisma.doctorProfile.findMany({
        where: {
          OR: [
            { user: { name: { contains: query, mode: "insensitive" } } },
            { specialization: { contains: query, mode: "insensitive" } },
            { licenseNo: { contains: query, mode: "insensitive" } },
          ],
        },
        include: {
          user: { select: { id: true, name: true, email: true } },
        },
        take: 5,
      });

      results.doctors = doctors.map((d) => ({
        id: d.user.id,
        name: d.user.name,
        email: d.user.email,
        specialization: d.specialization,
        licenseNo: d.licenseNo,
      }));

      // Search my appointments
      const appointments = await prisma.appointment.findMany({
        where: {
          patientId: patientId,
        },
        include: {
          doctor: { include: { user: { select: { name: true } } } },
        },
        orderBy: { date: "desc" },
        take: 100,
      });

      // Filter appointments by query
      const filteredAppointments = appointments.filter((a) => {
        const doctorName = a.doctor.user.name?.toLowerCase() || "";
        const status = a.status.toLowerCase();
        const searchQuery = query.toLowerCase();
        return doctorName.includes(searchQuery) || status.includes(searchQuery);
      });

      results.appointments = filteredAppointments.slice(0, 5).map((a) => ({
        id: a.id,
        doctorName: a.doctor.user.name,
        date: a.date,
        time: a.time,
        status: a.status,
      }));

      // Search my prescriptions
      const prescriptions = await prisma.prescription.findMany({
        where: {
          patientId: patientId,
          OR: [
            { diagnosis: { contains: query, mode: "insensitive" } },
            { medications: { contains: query, mode: "insensitive" } },
          ],
        },
        include: {
          doctor: { include: { user: { select: { name: true } } } },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      });

      results.prescriptions = prescriptions.map((p) => ({
        id: p.id,
        doctorName: p.doctor.user.name,
        diagnosis: p.diagnosis,
        date: p.createdAt,
      }));
    }

    // DOCTOR search
    if (userRole === "DOCTOR") {
      // Get doctor profile ID
      const doctorProfile = await prisma.doctorProfile.findUnique({
        where: { userId: userId },
        select: { id: true },
      });

      if (!doctorProfile) {
        return NextResponse.json({ results: {} }, { status: 200 });
      }

      const doctorId = doctorProfile.id;
      // Search patients
      const patients = await prisma.patientProfile.findMany({
        where: {
          OR: [
            { user: { name: { contains: query, mode: "insensitive" } } },
            { user: { email: { contains: query, mode: "insensitive" } } },
            { bloodGroup: { contains: query, mode: "insensitive" } },
          ],
        },
        include: {
          user: { select: { id: true, name: true, email: true } },
        },
        take: 5,
      });

      results.patients = patients.map((p) => ({
        id: p.user.id,
        name: p.user.name,
        email: p.user.email,
        bloodGroup: p.bloodGroup,
      }));

      // Search my appointments
      const appointments = await prisma.appointment.findMany({
        where: {
          doctorId: doctorId,
        },
        include: {
          patient: { include: { user: { select: { name: true } } } },
        },
        orderBy: { date: "desc" },
        take: 100,
      });

      // Filter appointments by query
      const filteredAppointments = appointments.filter((a) => {
        const patientName = a.patient.user.name?.toLowerCase() || "";
        const status = a.status.toLowerCase();
        const searchQuery = query.toLowerCase();
        return patientName.includes(searchQuery) || status.includes(searchQuery);
      });

      results.appointments = filteredAppointments.slice(0, 5).map((a) => ({
        id: a.id,
        patientName: a.patient.user.name,
        date: a.date,
        time: a.time,
        status: a.status,
      }));

      // Search my prescriptions
      const prescriptions = await prisma.prescription.findMany({
        where: {
          doctorId: doctorId,
          OR: [
            { patient: { user: { name: { contains: query, mode: "insensitive" } } } },
            { diagnosis: { contains: query, mode: "insensitive" } },
            { medications: { contains: query, mode: "insensitive" } },
          ],
        },
        include: {
          patient: { include: { user: { select: { name: true } } } },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      });

      results.prescriptions = prescriptions.map((p) => ({
        id: p.id,
        patientName: p.patient.user.name,
        diagnosis: p.diagnosis,
        date: p.createdAt,
      }));
    }

    // ADMIN search
    if (userRole === "ADMIN") {
      // Search all users
      const allUsers = await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          emailVerified: true,
        },
        take: 100,
      });

      // Filter by role if query matches
      const searchQuery = query.toLowerCase();
      const users = allUsers.filter((u) => {
        const name = u.name?.toLowerCase() || "";
        const email = u.email.toLowerCase();
        const role = u.role.toLowerCase();
        return name.includes(searchQuery) || email.includes(searchQuery) || role.includes(searchQuery);
      }).slice(0, 10);

      results.users = users;

      // Search all appointments
      const appointments = await prisma.appointment.findMany({
        include: {
          patient: { include: { user: { select: { name: true } } } },
          doctor: { include: { user: { select: { name: true } } } },
        },
        orderBy: { date: "desc" },
        take: 100,
      });

      // Filter appointments by query
      const filteredAppointments = appointments.filter((a) => {
        const patientName = a.patient.user.name?.toLowerCase() || "";
        const doctorName = a.doctor.user.name?.toLowerCase() || "";
        const status = a.status.toLowerCase();
        const searchQuery = query.toLowerCase();
        return patientName.includes(searchQuery) || doctorName.includes(searchQuery) || status.includes(searchQuery);
      });

      results.appointments = filteredAppointments.slice(0, 10).map((a) => ({
        id: a.id,
        patientName: a.patient.user.name,
        doctorName: a.doctor.user.name,
        date: a.date,
        time: a.time,
        status: a.status,
      }));

      // Search contact messages
      const contacts = await prisma.contactMessage.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      });

      results.contacts = contacts;
    }

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search" },
      { status: 500 }
    );
  }
}
