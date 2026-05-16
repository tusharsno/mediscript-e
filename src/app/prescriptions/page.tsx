import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import DashboardLayout from "@/components/DashboardLayout";
import DownloadPDF from "@/components/DownloadPDF";
import PrescriptionForm from "@/components/PrescriptionForm";
import DoctorPrescriptionList from "@/components/DoctorPrescriptionList";
import { FileText } from "lucide-react";

export default async function PrescriptionsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Prescriptions</h1>
          <p className="text-sm text-slate-500 mt-1">
            {session.user.role === "PATIENT" ? "Your digital prescriptions" : "Issue and manage prescriptions"}
          </p>
        </div>

        {session.user.role === "PATIENT" && <PatientPrescriptions userId={session.user.id} />}

        {session.user.role === "DOCTOR" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-800">Issue New Prescription</h2>
                  <p className="text-xs text-slate-400 font-medium">Write a prescription for a patient</p>
                </div>
              </div>
              <div className="p-6">
                <PrescriptionForm />
              </div>
            </div>
            <DoctorPrescriptionList />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

async function PatientPrescriptions({ userId }: { userId: string }) {
  const patient = await db.patientProfile.findUnique({
    where: { userId },
    include: {
      prescriptions: {
        include: { doctor: { include: { user: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const prescriptions = patient?.prescriptions ?? [];

  if (prescriptions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 font-semibold">No prescriptions yet</p>
        <p className="text-slate-400 text-xs mt-1">Prescriptions from your doctor will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {prescriptions.map((px) => (
        <div key={px.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-start gap-3 p-4 bg-slate-50 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
              {px.doctor.user.name?.charAt(0).toUpperCase() ?? "D"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-slate-900 text-sm">Dr. {px.doctor.user.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {new Date(px.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Diagnosis</p>
              <p className="text-sm font-semibold text-slate-800">{px.diagnosis}</p>
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Medications</p>
              <p className="text-sm font-semibold text-slate-800 whitespace-pre-line">{px.medications}</p>
            </div>
            <DownloadPDF prescription={px} doctorName={px.doctor.user.name} />
          </div>
        </div>
      ))}
    </div>
  );
}
