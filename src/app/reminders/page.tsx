import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import AddMedicineReminder from "@/components/AddMedicineReminder";
import MedicineReminders from "@/components/MedicineReminders";

export default async function RemindersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session.user.role !== "PATIENT") redirect("/dashboard");

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Medicine Reminders</h1>
          <p className="text-sm text-slate-500 mt-1">Set and manage your medication schedules</p>
        </div>
        <AddMedicineReminder />
        <MedicineReminders />
      </div>
    </DashboardLayout>
  );
}
