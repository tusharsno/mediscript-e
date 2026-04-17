import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import SettingsForm from "@/components/SettingsForm";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <DashboardLayout>
      <div className="p-6 md:p-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Settings</h1>
            <p className="text-slate-500 font-medium">Manage your account settings and preferences</p>
          </div>

          <SettingsForm user={session.user} />
        </div>
      </div>
    </DashboardLayout>
  );
}
