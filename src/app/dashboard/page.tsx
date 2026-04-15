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
          prescriptions: {
            include: { doctor: { include: { user: true } } },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Updated Header with Prominent Logout Button */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Welcome, {user?.name}
              </h1>
              <p className="opacity-90 mt-1 font-medium text-blue-50">
                {user?.email}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black border border-white/30 uppercase tracking-widest">
                {user?.role}
              </span>

              {/* New Visible Logout Button */}
              <a
                href="/api/auth/signout"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg transition-all active:scale-95 flex items-center gap-2 border border-red-400"
              >
                <span>Logout</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* PATIENT INTERFACE */}
          {user?.role === "PATIENT" && (
            <div className="space-y-8">
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-bold text-emerald-900 mb-2">
                  Medical Vault
                </h2>
                <FileUpload />
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <h2 className="text-xl font-bold p-6 border-b text-slate-800">
                  Issued Prescriptions
                </h2>
                <div className="p-6">
                  {user.patientProfile?.prescriptions.map((px) => (
                    <div
                      key={px.id}
                      className="p-5 bg-blue-50/50 rounded-xl border border-blue-100 mb-4"
                    >
                      <p className="font-extrabold text-slate-900">
                        {px.diagnosis}
                      </p>
                      <div className="mt-2 bg-white p-3 rounded-lg text-sm border border-blue-50 font-medium">
                        <span className="text-blue-500 font-bold text-[10px] block uppercase mb-1">
                          Medicines:
                        </span>
                        {px.medications}
                      </div>
                      <DownloadPDF
                        prescription={px}
                        doctorName={px.doctor.user.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DOCTOR INTERFACE */}
          {user?.role === "DOCTOR" && (
            <div className="space-y-8">
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                  <span className="p-2 bg-blue-600 rounded-lg text-white text-[10px] font-black uppercase tracking-widest">
                    Doctor Panel
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm font-black italic">
                    <p className="text-[10px] text-blue-500 uppercase tracking-[0.2em] mb-1">
                      Specialization
                    </p>
                    <p className="text-slate-900 text-xl">
                      {user.doctorProfile?.specialization || "General"}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm font-black italic">
                    <p className="text-[10px] text-blue-500 uppercase tracking-[0.2em] mb-1">
                      License No
                    </p>
                    <p className="text-slate-900 text-xl">
                      {user.doctorProfile?.licenseNo || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-inner">
                  <h3 className="font-bold text-slate-800 mb-4 tracking-tighter italic">
                    Write New Prescription
                  </h3>
                  <PrescriptionForm />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Brand Footer */}
        <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">
            MediScript Digital Health System
          </p>
        </div>
      </div>
    </div>
  );
}
