import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import DashboardLayout from "@/components/DashboardLayout";
import FileUpload from "@/components/FileUpload";
import RecordItem from "@/components/RecordItem";
import { FolderOpen } from "lucide-react";

export default async function VaultPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session.user.role !== "PATIENT") redirect("/dashboard");

  const patient = await db.patientProfile.findUnique({
    where: { userId: session.user.id },
    include: { medicalVault: { orderBy: { createdAt: "desc" } } },
  });

  const records = patient?.medicalVault ?? [];

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Medical Vault</h1>
          <p className="text-sm text-slate-500 mt-1">Securely store and manage your medical documents</p>
        </div>

        {/* Upload */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <FolderOpen className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-800">Upload Document</h2>
                <p className="text-xs text-slate-400 font-medium">Add a new medical record</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <FileUpload />
          </div>
        </div>

        {/* Records */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <FolderOpen className="h-5 w-5 text-emerald-600" />
              </div>
              <h2 className="text-base font-black text-slate-800">Your Records</h2>
            </div>
            <span className="text-xs font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
              {records.length} Files
            </span>
          </div>
          <div className="p-6">
            {records.length === 0 ? (
              <div className="text-center py-10">
                <FolderOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 font-semibold">No records uploaded yet</p>
                <p className="text-slate-300 text-xs mt-1">Upload your first medical document above</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {records.map((record, index) => (
                  <RecordItem key={record.id} record={record} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
