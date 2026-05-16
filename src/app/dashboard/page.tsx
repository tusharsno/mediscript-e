import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import {
  Calendar, Bell, FileText, FolderOpen,
  Users, MessageSquare, ArrowRight,
  CheckCircle, Clock, Stethoscope,
} from "lucide-react";

function StatCard({ label, value, icon: Icon, color, bar, href, subtitle }: {
  label: string; value: number; icon: React.ElementType;
  color: string; bar: string; href: string; subtitle?: string;
}) {
  return (
    <Link href={href} className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#1A6080]/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group overflow-hidden relative">
      <div className={`absolute top-0 left-0 right-0 h-1 ${bar}`} />
      <div className="absolute bottom-0 right-0 w-20 h-20 rounded-full bg-[#1A6080]/5 translate-x-6 translate-y-6" />
      <div className="flex items-start justify-between mt-2 mb-4">
        <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center shadow-sm`}>
          <Icon className="h-5 w-5" />
        </div>
        <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#1A6080] group-hover:translate-x-0.5 transition-all" />
      </div>
      <p className="text-3xl font-black text-slate-900 leading-none">{value}</p>
      <p className="text-xs text-slate-600 font-semibold mt-1.5">{label}</p>
      {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
    </Link>
  );
}

function QuickActionCard({ label, desc, icon: Icon, href, color }: {
  label: string; desc: string; icon: React.ElementType; href: string; color: string;
}) {
  return (
    <Link href={href} className="relative overflow-hidden flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#1A6080]/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="absolute inset-0 group-hover:bg-[#1A6080]/5 transition-all duration-200 rounded-2xl" />
      <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-md`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="relative flex-1 min-w-0">
        <p className="font-black text-slate-900 text-sm">{label}</p>
        <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
      </div>
      <ArrowRight className="relative h-4 w-4 text-slate-300 group-hover:text-[#1A6080] group-hover:translate-x-1 transition-all flex-shrink-0" />
    </Link>
  );
}

function RecentAppointments({ appointments, href }: {
  appointments: { id: string; date: Date; time: string; status: string }[];
  href: string;
}) {
  if (!appointments || appointments.length === 0) return null;
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-base font-black text-slate-800">Recent Appointments</h2>
        <Link href={href} className="text-xs font-bold text-[#1A6080] hover:underline">View all →</Link>
      </div>
      <div className="divide-y divide-slate-100">
        {appointments.slice(0, 3).map((apt) => (
          <div key={apt.id} className="px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-800">
                {new Date(apt.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{apt.time}</p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              apt.status === "CONFIRMED" ? "bg-green-50 text-green-600" :
              apt.status === "PENDING" ? "bg-yellow-50 text-yellow-600" :
              apt.status === "COMPLETED" ? "bg-blue-50 text-blue-600" :
              "bg-red-50 text-red-600"
            }`}>{apt.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = await db.user.findUnique({
    where: { email: session.user.email as string },
    include: {
      doctorProfile: true,
      patientProfile: {
        include: {
          medicalVault: true,
          medicineReminders: { where: { taken: false } },
          prescriptions: true,
          appointments: { orderBy: { date: "desc" } },
        },
      },
    },
  });

  if (!user) redirect("/login");

  // ── PATIENT ───────────────────────────────────────────────────
  if (user.role === "PATIENT") {
    const p = user.patientProfile;
    const pending = p?.appointments.filter((a) => a.status === "PENDING").length ?? 0;
    const confirmed = p?.appointments.filter((a) => a.status === "CONFIRMED").length ?? 0;
    const totalAppts = p?.appointments.length ?? 0;

    return (
      <DashboardLayout>
        <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1A6080] to-[#0d4a63] rounded-2xl p-8 text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">Welcome back</p>
                <h1 className="text-3xl font-black">{user.name}</h1>
                <p className="text-white/60 text-sm mt-1">{user.email}</p>
                {(pending > 0 || confirmed > 0) && (
                  <div className="mt-4 flex gap-3">
                    {pending > 0 && (
                      <span className="flex items-center gap-1.5 bg-yellow-400/20 text-yellow-200 text-xs font-bold px-3 py-1.5 rounded-full border border-yellow-400/30">
                        <Clock className="h-3.5 w-3.5" /> {pending} Pending
                      </span>
                    )}
                    {confirmed > 0 && (
                      <span className="flex items-center gap-1.5 bg-green-400/20 text-green-200 text-xs font-bold px-3 py-1.5 rounded-full border border-green-400/30">
                        <CheckCircle className="h-3.5 w-3.5" /> {confirmed} Confirmed
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="hidden sm:flex flex-col items-end gap-3">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-black px-3 py-1.5 rounded-full border border-white/30 uppercase tracking-wider">Patient</span>
                {user.patientProfile?.bloodGroup && (
                  <span className="bg-red-400/20 text-red-200 text-sm font-black px-4 py-2 rounded-xl border border-red-400/30">
                    {user.patientProfile.bloodGroup}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Appointments" value={totalAppts} icon={Calendar} color="bg-[#1A6080]/10 text-[#1A6080]" bar="bg-[#1A6080]" href="/appointments" subtitle="View all appointments" />
            <StatCard label="Active Reminders" value={p?.medicineReminders.length ?? 0} icon={Bell} color="bg-[#1A6080]/10 text-[#1A6080]" bar="bg-[#1A6080]" href="/reminders" subtitle="Medicine schedule" />
            <StatCard label="Prescriptions" value={p?.prescriptions.length ?? 0} icon={FileText} color="bg-[#1A6080]/10 text-[#1A6080]" bar="bg-[#1A6080]" href="/prescriptions" subtitle="From your doctors" />
            <StatCard label="Medical Records" value={p?.medicalVault.length ?? 0} icon={FolderOpen} color="bg-[#1A6080]/10 text-[#1A6080]" bar="bg-[#1A6080]" href="/vault" subtitle="Uploaded documents" />
          </div>

          <div>
            <h2 className="text-base font-black text-slate-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <QuickActionCard label="Book Appointment" desc="Schedule a visit with a doctor" icon={Calendar} href="/appointments" color="from-[#1A6080] to-[#0d4a63]" />
              <QuickActionCard label="Set Reminder" desc="Add a new medicine reminder" icon={Bell} href="/reminders" color="from-orange-500 to-orange-600" />
              <QuickActionCard label="Upload Record" desc="Store a medical document" icon={FolderOpen} href="/vault" color="from-purple-500 to-purple-600" />
              <QuickActionCard label="View Prescriptions" desc="Download your prescriptions" icon={FileText} href="/prescriptions" color="from-green-500 to-green-600" />
            </div>
          </div>

          <RecentAppointments appointments={p?.appointments ?? []} href="/appointments" />
        </div>
      </DashboardLayout>
    );
  }

  // ── DOCTOR ────────────────────────────────────────────────────
  if (user.role === "DOCTOR") {
    const doctorProfile = await db.doctorProfile.findUnique({
      where: { userId: user.id },
      include: {
        appointments: { orderBy: { date: "desc" } },
        prescriptions: true,
      },
    });

    const pending = doctorProfile?.appointments.filter((a) => a.status === "PENDING").length ?? 0;
    const confirmed = doctorProfile?.appointments.filter((a) => a.status === "CONFIRMED").length ?? 0;
    const completed = doctorProfile?.appointments.filter((a) => a.status === "COMPLETED").length ?? 0;
    const totalRx = doctorProfile?.prescriptions.length ?? 0;

    return (
      <DashboardLayout>
        <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1A6080] to-[#0d4a63] rounded-2xl p-8 text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">Welcome back</p>
                <h1 className="text-3xl font-black">Dr. {user.name}</h1>
                <p className="text-white/60 text-sm mt-1">{user.doctorProfile?.specialization} · {user.doctorProfile?.licenseNo}</p>
                {pending > 0 && (
                  <span className="mt-4 inline-flex items-center gap-1.5 bg-yellow-400/20 text-yellow-200 text-xs font-bold px-3 py-1.5 rounded-full border border-yellow-400/30">
                    <Clock className="h-3.5 w-3.5" /> {pending} Pending
                  </span>
                )}
              </div>
              <span className="hidden sm:block bg-white/20 backdrop-blur-sm text-white text-xs font-black px-3 py-1.5 rounded-full border border-white/30 uppercase tracking-wider flex-shrink-0">Doctor</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Pending" value={pending} icon={Clock} color="bg-[#1A6080]/10 text-[#1A6080]" bar="bg-[#1A6080]" href="/appointments" subtitle="Awaiting confirmation" />
            <StatCard label="Confirmed" value={confirmed} icon={CheckCircle} color="bg-[#1A6080]/10 text-[#1A6080]" bar="bg-[#1A6080]" href="/appointments" subtitle="Upcoming visits" />
            <StatCard label="Completed" value={completed} icon={CheckCircle} color="bg-[#1A6080]/10 text-[#1A6080]" bar="bg-[#1A6080]" href="/appointments" subtitle="Past appointments" />
            <StatCard label="Prescriptions" value={totalRx} icon={FileText} color="bg-[#1A6080]/10 text-[#1A6080]" bar="bg-[#1A6080]" href="/prescriptions" subtitle="Issued total" />
          </div>

          <div>
            <h2 className="text-base font-black text-slate-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <QuickActionCard label="Manage Appointments" desc="View and update patient appointments" icon={Calendar} href="/appointments" color="from-[#1A6080] to-[#0d4a63]" />
              <QuickActionCard label="Issue Prescription" desc="Write a new prescription" icon={FileText} href="/prescriptions" color="from-green-500 to-green-600" />
            </div>
          </div>

          <RecentAppointments appointments={doctorProfile?.appointments ?? []} href="/appointments" />
        </div>
      </DashboardLayout>
    );
  }

  // ── ADMIN ─────────────────────────────────────────────────────
  const [totalUsers, totalDoctors, totalPatients, totalAppts, totalRx, totalContacts] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { role: "DOCTOR" } }),
    db.user.count({ where: { role: "PATIENT" } }),
    db.appointment.count(),
    db.prescription.count(),
    db.contactMessage.count(),
  ]);

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1A6080] to-[#0d4a63] rounded-2xl p-8 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-white/70 text-sm font-medium mb-1">Welcome back</p>
              <h1 className="text-3xl font-black">{user.name}</h1>
              <p className="text-white/60 text-sm mt-1">System Administrator</p>
            </div>
            <span className="hidden sm:block bg-white/20 backdrop-blur-sm text-white text-xs font-black px-3 py-1.5 rounded-full border border-white/30 uppercase tracking-wider flex-shrink-0">Admin</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard label="Total Users" value={totalUsers} icon={Users} color="bg-[#1A6080]/10 text-[#1A6080]" bar="bg-[#1A6080]" href="/users" subtitle="All registered users" />
          <StatCard label="Doctors" value={totalDoctors} icon={Stethoscope} color="bg-[#1A6080]/10 text-[#1A6080]" bar="bg-[#1A6080]" href="/users" subtitle="Registered doctors" />
          <StatCard label="Patients" value={totalPatients} icon={Users} color="bg-[#1A6080]/10 text-[#1A6080]" bar="bg-[#1A6080]" href="/users" subtitle="Registered patients" />
          <StatCard label="Appointments" value={totalAppts} icon={Calendar} color="bg-[#1A6080]/10 text-[#1A6080]" bar="bg-[#1A6080]" href="/appointments" subtitle="Total bookings" />
          <StatCard label="Prescriptions" value={totalRx} icon={FileText} color="bg-[#1A6080]/10 text-[#1A6080]" bar="bg-[#1A6080]" href="/prescriptions" subtitle="Issued total" />
          <StatCard label="Contact Messages" value={totalContacts} icon={MessageSquare} color="bg-[#1A6080]/10 text-[#1A6080]" bar="bg-[#1A6080]" href="/contacts" subtitle="From contact form" />
        </div>
      </div>
    </DashboardLayout>
  );
}
