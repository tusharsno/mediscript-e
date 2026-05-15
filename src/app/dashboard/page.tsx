// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import db from "@/lib/db";
// import FileUpload from "@/components/FileUpload";
// import PrescriptionForm from "@/components/PrescriptionForm";
// import DownloadPDF from "@/components/DownloadPDF"; // নতুন ইমপোর্ট

// export default async function DashboardPage() {
//   // 1. Authenticate Session
//   const session = await getServerSession(authOptions);
//   if (!session) redirect("/login");

//   // 2. Fetch User Profile with all relations
//   const user = await db.user.findUnique({
//     where: { email: session.user.email as string },
//     include: {
//       doctorProfile: true,
//       patientProfile: {
//         include: {
//           medicalVault: true,
//           prescriptions: {
//             include: {
//               doctor: {
//                 include: {
//                   user: true,
//                 },
//               },
//             },
//             orderBy: {
//               createdAt: "desc",
//             },
//           },
//         },
//       },
//     },
//   });

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-12">
//       <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-extrabold tracking-tight">
//                 Welcome, {user?.name}
//               </h1>
//               <p className="opacity-90 mt-1 font-medium text-blue-50">
//                 {user?.email}
//               </p>
//             </div>
//             <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold border border-white/30 uppercase">
//               {user?.role}
//             </span>
//           </div>
//         </div>

//         <div className="p-8">
//           {/* PATIENT INTERFACE */}
//           {user?.role === "PATIENT" && (
//             <div className="space-y-8">
//               {/* Medical Vault Section */}
//               <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl shadow-sm">
//                 <h2 className="text-xl font-bold text-emerald-900 mb-2">
//                   Medical Vault
//                 </h2>
//                 <p className="text-emerald-700 mb-6 font-medium text-sm">
//                   Safely upload and manage your prescriptions or test reports.
//                 </p>
//                 <FileUpload />
//               </div>

//               {/* Digital Prescriptions Section */}
//               <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
//                 <h2 className="text-xl font-bold p-6 border-b text-slate-800 flex items-center gap-2">
//                   <span className="text-blue-600">📄</span> Issued Prescriptions
//                 </h2>
//                 <div className="p-6">
//                   {!user.patientProfile?.prescriptions ||
//                   user.patientProfile.prescriptions.length === 0 ? (
//                     <p className="text-slate-400 italic text-center py-4">
//                       No digital prescriptions issued yet.
//                     </p>
//                   ) : (
//                     <div className="grid gap-4">
//                       {user.patientProfile.prescriptions.map((px) => (
//                         <div
//                           key={px.id}
//                           className="p-5 bg-blue-50/50 rounded-xl border border-blue-100 hover:shadow-md transition-all"
//                         >
//                           <div className="flex justify-between items-start mb-3">
//                             <div>
//                               <p className="font-extrabold text-slate-900 text-lg">
//                                 {px.diagnosis}
//                               </p>
//                               <p className="text-sm text-slate-500 font-medium tracking-tight">
//                                 By{" "}
//                                 <span className="text-blue-700 font-bold">
//                                   Dr. {px.doctor.user.name}
//                                 </span>
//                               </p>
//                             </div>
//                             <span className="text-[10px] font-black bg-white px-2 py-1 rounded-md border border-blue-200 text-blue-600 uppercase">
//                               {new Date(px.createdAt).toLocaleDateString()}
//                             </span>
//                           </div>
//                           <div className="bg-white p-4 rounded-lg border border-blue-50 text-slate-700 text-sm mb-4 leading-relaxed font-medium">
//                             <span className="text-blue-500 font-bold block mb-1 text-[10px] uppercase">
//                               Medicines:
//                             </span>
//                             {/* সেশন ডাটা অনুযায়ী medicines বা medications ফিল্ড ব্যবহার করুন */}
//                             {px.medications}
//                           </div>

//                           {/* PDF Download Component */}
//                           <DownloadPDF
//                             prescription={px}
//                             doctorName={px.doctor.user.name}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Uploaded Records Section */}
//               <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
//                 <h2 className="text-xl font-bold p-6 border-b text-slate-800">
//                   Your Records
//                 </h2>
//                 <div className="p-6">
//                   {!user.patientProfile?.medicalVault ||
//                   user.patientProfile.medicalVault.length === 0 ? (
//                     <p className="text-slate-400 italic text-center py-4">
//                       No records uploaded yet.
//                     </p>
//                   ) : (
//                     <div className="grid gap-3">
//                       {user.patientProfile.medicalVault.map((record) => (
//                         <div
//                           key={record.id}
//                           className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-all"
//                         >
//                           <span className="font-bold text-slate-700 text-sm truncate max-w-[200px] md:max-w-xs">
//                             {record.fileName}
//                           </span>
//                           <a
//                             href={record.fileUrl}
//                             target="_blank"
//                             className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-blue-600 font-bold text-xs hover:bg-blue-50 transition-colors"
//                           >
//                             View Report
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* DOCTOR INTERFACE */}
//           {user?.role === "DOCTOR" && (
//             <div className="space-y-8">
//               <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl shadow-sm">
//                 <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
//                   <span className="p-2 bg-blue-600 rounded-lg text-white text-xs">
//                     Dr.
//                   </span>{" "}
//                   Doctor Panel
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm">
//                     <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">
//                       Specialization
//                     </p>
//                     <p className="text-slate-900 font-black text-xl">
//                       {user.doctorProfile?.specialization ||
//                         "General Physician"}
//                     </p>
//                   </div>
//                   <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm">
//                     <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">
//                       License No
//                     </p>
//                     <p className="text-slate-900 font-black text-xl">
//                       {user.doctorProfile?.licenseNo || "N/A"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-inner">
//                   <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
//                     Write New Prescription
//                   </h3>
//                   <PrescriptionForm />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Logout Action */}
//           <div className="mt-12 pt-8 border-t border-slate-100 text-center">
//             <a
//               href="/api/auth/signout"
//               className="text-slate-400 font-black hover:text-red-500 transition-colors duration-200 uppercase text-[10px] tracking-[0.3em]"
//             >
//               Sign Out from Account
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import FileUpload from "@/components/FileUpload";
import PrescriptionForm from "@/components/PrescriptionForm";
import DownloadPDF from "@/components/DownloadPDF";
import RecordItem from "@/components/RecordItem";
import DashboardLayout from "@/components/DashboardLayout";
import BookAppointment from "@/components/BookAppointment";
import MyAppointments from "@/components/MyAppointments";
import DoctorAppointments from "@/components/DoctorAppointments";
import DoctorPrescriptionList from "@/components/DoctorPrescriptionList";
import AddMedicineReminder from "@/components/AddMedicineReminder";
import MedicineReminders from "@/components/MedicineReminders";
import SubmitTestimonial from "@/components/SubmitTestimonial";
import AdminDashboard from "@/components/AdminDashboard";
import UserManagement from "@/components/UserManagement";
import AppointmentOverview from "@/components/AppointmentOverview";
import ContactMessages from "@/components/ContactMessages";
import TestimonialsManagement from "@/components/TestimonialsManagement";
import { Calendar, Bell, FileText, FolderOpen, Stethoscope, Users, BarChart3 } from "lucide-react";

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
          medicineReminders: true,
          prescriptions: {
            include: { doctor: { include: { user: true } } },
            orderBy: { createdAt: "desc" },
          },
          appointments: true,
        },
      },
    },
  });

  return (
    <DashboardLayout>
      <div className="p-6 md:p-12">
        <div className="max-w-5xl mx-auto">
          {/* Header Card */}
          {user?.role === "PATIENT" && (
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1A6080] to-[#0d4a63] rounded-2xl p-8 mb-8 text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-white/70 text-sm font-medium mb-1">Welcome back</p>
                    <h1 className="text-3xl font-black">{user?.name}</h1>
                    <p className="text-white/60 text-sm mt-1">{user?.email}</p>
                  </div>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-black px-3 py-1.5 rounded-full border border-white/30 uppercase tracking-wider">
                    Patient
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-white/70" />
                      <span className="text-white/70 text-xs font-medium">Appointments</span>
                    </div>
                    <p className="text-2xl font-black">{user.patientProfile?.appointments?.length ?? 0}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell className="h-4 w-4 text-white/70" />
                      <span className="text-white/70 text-xs font-medium">Reminders</span>
                    </div>
                    <p className="text-2xl font-black">{user.patientProfile?.medicineReminders?.length ?? 0}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-white/70" />
                      <span className="text-white/70 text-xs font-medium">Prescriptions</span>
                    </div>
                    <p className="text-2xl font-black">{user.patientProfile?.prescriptions?.length ?? 0}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <FolderOpen className="h-4 w-4 text-white/70" />
                      <span className="text-white/70 text-xs font-medium">Records</span>
                    </div>
                    <p className="text-2xl font-black">{user.patientProfile?.medicalVault?.length ?? 0}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {user?.role === "DOCTOR" && (
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium mb-1">Welcome back</p>
                    <h1 className="text-3xl font-black">Dr. {user?.name}</h1>
                    <p className="text-white/60 text-sm mt-1">{user.doctorProfile?.specialization}</p>
                  </div>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-black px-3 py-1.5 rounded-full border border-white/30 uppercase tracking-wider">
                    Doctor
                  </span>
                </div>
              </div>
            </div>
          )}

          {user?.role === "ADMIN" && (
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 mb-8 text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium mb-1">Welcome back</p>
                    <h1 className="text-3xl font-black">{user?.name}</h1>
                    <p className="text-white/60 text-sm mt-1">System Administrator</p>
                  </div>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-black px-3 py-1.5 rounded-full border border-white/30 uppercase tracking-wider">
                    Admin
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* PATIENT INTERFACE */}
          {user?.role === "PATIENT" && (
            <div className="space-y-6">
              {/* Book Appointment Section */}
              <BookAppointment />

              {/* My Appointments Section */}
              <MyAppointments />

              {/* Medicine Reminders Section */}
              <div id="reminders" className="scroll-mt-20">
                <AddMedicineReminder />
              </div>
              <MedicineReminders />

              <div id="vault" className="scroll-mt-20">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 rounded-lg">
                        <FolderOpen className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h2 className="text-base font-black text-slate-800">Medical Vault</h2>
                        <p className="text-xs text-slate-400 font-medium">Securely store your medical documents</p>
                      </div>
                    </div>
                    <span className="text-xs font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                      {user.patientProfile?.medicalVault.length ?? 0} Files
                    </span>
                  </div>
                  <div className="p-6">
                    <FileUpload />
                  </div>
                </div>
              </div>

              <div id="records" className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden scroll-mt-20">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <FolderOpen className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-base font-black text-slate-800">Uploaded Records</h2>
                      <p className="text-xs text-slate-400 font-medium">All your medical documents</p>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                    {user.patientProfile?.medicalVault.length ?? 0} Files
                  </span>
                </div>
                <div className="p-6">
                  {!user.patientProfile?.medicalVault || user.patientProfile.medicalVault.length === 0 ? (
                    <div className="text-center py-10">
                      <FolderOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-400 font-semibold">No records uploaded yet</p>
                      <p className="text-slate-300 text-xs mt-1">Upload your first medical document above</p>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {user.patientProfile.medicalVault.map((record, index) => (
                        <RecordItem key={record.id} record={record} index={index} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div id="prescriptions" className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden scroll-mt-20">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-base font-black text-slate-800">Prescriptions</h2>
                      <p className="text-xs text-slate-400 font-medium">Issued by your doctors</p>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-green-50 text-green-600 px-3 py-1 rounded-full">
                    {user.patientProfile?.prescriptions.length ?? 0} Total
                  </span>
                </div>
                <div className="p-6">
                  {!user.patientProfile?.prescriptions || user.patientProfile.prescriptions.length === 0 ? (
                    <div className="text-center py-10">
                      <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-400 font-semibold">No prescriptions yet</p>
                      <p className="text-slate-300 text-xs mt-1">Prescriptions from your doctor will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {user.patientProfile.prescriptions.map((px) => (
                        <div key={px.id} className="rounded-xl border border-slate-200 overflow-hidden">
                          <div className="flex items-start gap-3 p-4 bg-slate-50">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                              {px.doctor.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-slate-900 text-sm">Dr. {px.doctor.user.name}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{new Date(px.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                            </div>
                          </div>
                          <div className="p-4 space-y-3">
                            <div>
                              <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Diagnosis</p>
                              <p className="text-sm font-semibold text-slate-800">{px.diagnosis}</p>
                            </div>
                            <div>
                              <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Medications</p>
                              <p className="text-sm font-semibold text-slate-800">{px.medications}</p>
                            </div>
                            <DownloadPDF prescription={px} doctorName={px.doctor.user.name} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Testimonial - last */}
              <div id="testimonial" className="scroll-mt-20">
                <SubmitTestimonial />
              </div>
            </div>
          )}

          {/* DOCTOR INTERFACE */}
          {user?.role === "DOCTOR" && (
            <div className="space-y-6">
              <DoctorAppointments />

              <div id="prescriptions" className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden scroll-mt-20">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-800">Issue Prescription</h2>
                    <p className="text-xs text-slate-400 font-medium">Write a new prescription for a patient</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Specialization</p>
                      <p className="font-black text-slate-900">{user.doctorProfile?.specialization || "General"}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">License No</p>
                      <p className="font-black text-slate-900">{user.doctorProfile?.licenseNo || "N/A"}</p>
                    </div>
                  </div>
                  <PrescriptionForm />
                </div>
              </div>

              <DoctorPrescriptionList />

              {/* Submit Testimonial - last */}
              <div id="testimonial" className="scroll-mt-20">
                <SubmitTestimonial />
              </div>
            </div>
          )}

          {/* ADMIN INTERFACE */}
          {user?.role === "ADMIN" && (
            <div className="space-y-6">
              <div id="overview" className="scroll-mt-20">
                <AdminDashboard />
              </div>
              
              <div id="users" className="scroll-mt-20">
                <UserManagement />
              </div>
              
              <div id="appointments" className="scroll-mt-20">
                <AppointmentOverview />
              </div>
              
              <div id="testimonials" className="scroll-mt-20">
                <TestimonialsManagement />
              </div>
              
              <div id="contacts" className="scroll-mt-20">
                <ContactMessages />
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
