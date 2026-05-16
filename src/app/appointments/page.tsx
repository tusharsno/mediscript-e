import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import BookAppointment from "@/components/BookAppointment";
import MyAppointments from "@/components/MyAppointments";
import DoctorAppointments from "@/components/DoctorAppointments";
import AppointmentOverview from "@/components/AppointmentOverview";

export default async function AppointmentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Appointments</h1>
          <p className="text-sm text-slate-500 mt-1">
            {session.user.role === "PATIENT" && "Book and manage your appointments"}
            {session.user.role === "DOCTOR" && "Manage your patient appointments"}
            {session.user.role === "ADMIN" && "Overview of all appointments"}
          </p>
        </div>

        {session.user.role === "PATIENT" && (
          <>
            <BookAppointment />
            <MyAppointments />
          </>
        )}

        {session.user.role === "DOCTOR" && <DoctorAppointments />}

        {session.user.role === "ADMIN" && <AppointmentOverview />}
      </div>
    </DashboardLayout>
  );
}
