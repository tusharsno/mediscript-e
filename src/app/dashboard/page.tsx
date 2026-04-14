// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import db from "@/lib/db";
// import FileUpload from "@/components/FileUpload"; // নতুন কম্পোনেন্ট ইমপোর্ট

// export default async function DashboardPage() {
//   // ১. সেশন চেক করা
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect("/login");
//   }

//   // ২. ডাটাবেস থেকে ইউজারের ডাটা এবং রিলেটেড ফাইলগুলো আনা
//   const user = await db.user.findUnique({
//     where: { email: session.user.email },
//     include: {
//       doctorProfile: true,
//       patientProfile: {
//         include: {
//           medicalVault: true, // ইউজারের আপলোড করা ফাইলগুলোও নিয়ে আসা
//         }
//       },
//     },
//   });

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-8 border-b pb-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">
//               Welcome, <span className="text-blue-600">{user?.name}</span>
//             </h1>
//             <p className="text-sm text-gray-500">{user?.email}</p>
//           </div>
//           <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold uppercase">
//             {user?.role}
//           </span>
//         </div>

//         <div className="grid grid-cols-1 gap-8">

//           {/* PATIENT SECTION */}
//           {user?.role === "PATIENT" && (
//             <div className="space-y-6">
//               <div className="p-6 border border-green-200 rounded-xl bg-green-50">
//                 <h2 className="text-xl font-bold mb-4 text-green-800">Medical Vault</h2>
//                 <p className="text-sm text-green-700 mb-4">Upload your prescriptions or test reports safely.</p>

//                 {/* ফাইল আপলোড কম্পোনেন্ট এখানে বসানো হলো */}
//                 <FileUpload />
//               </div>

//               {/* আপলোড করা ফাইলের লিস্ট */}
//               <div className="p-6 border border-gray-200 rounded-xl">
//                 <h2 className="text-xl font-bold mb-4">Your Records</h2>
//                 {user.patientProfile?.medicalVault.length === 0 ? (
//                   <p className="text-gray-500 italic">No records uploaded yet.</p>
//                 ) : (
//                   <div className="space-y-3">
//                     {user.patientProfile?.medicalVault.map((record) => (
//                       <div key={record.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
//                         <span className="font-medium text-gray-700">{record.fileName}</span>
//                         <a
//                           href={record.fileUrl}
//                           target="_blank"
//                           className="text-blue-600 hover:underline text-sm font-bold"
//                         >
//                           View File
//                         </a>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* DOCTOR SECTION */}
//           {user?.role === "DOCTOR" && (
//             <div className="p-6 border border-blue-200 rounded-xl bg-blue-50">
//               <h2 className="text-xl font-bold mb-4 text-blue-800">Doctor Panel</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <p><strong>Specialization:</strong> {user.doctorProfile?.specialization}</p>
//                 <p><strong>License:</strong> {user.doctorProfile?.licenseNo}</p>
//               </div>
//               <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">
//                 Create Prescription
//               </button>
//             </div>
//           )}

//           {/* Logout Section */}
//           <div className="mt-4 pt-4 border-t text-center">
//             <a href="/api/auth/signout" className="text-red-500 font-bold hover:text-red-700 transition">
//               Logout from Account
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

export default async function DashboardPage() {
  // 1. Check Session
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // 2. Fetch User Data with Medical Vault
  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      doctorProfile: true,
      patientProfile: {
        include: {
          medicalVault: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, <span className="text-blue-600">{user?.name}</span>
            </h1>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold uppercase">
            {user?.role}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* PATIENT SECTION */}
          {user?.role === "PATIENT" && (
            <div className="space-y-6">
              <div className="p-6 border border-green-200 rounded-xl bg-green-50">
                <h2 className="text-xl font-bold mb-4 text-green-800">
                  Medical Vault
                </h2>
                <p className="text-sm text-green-700 mb-4">
                  Upload your prescriptions or test reports safely.
                </p>

                <FileUpload />
              </div>

              {/* List of uploaded files */}
              <div className="p-6 border border-gray-200 rounded-xl">
                <h2 className="text-xl font-bold mb-4">Your Records</h2>
                {user.patientProfile?.medicalVault.length === 0 ? (
                  <p className="text-gray-500 italic">
                    No records uploaded yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {user.patientProfile?.medicalVault.map((record) => (
                      <div
                        key={record.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border"
                      >
                        <span className="font-medium text-gray-700">
                          {record.fileName}
                        </span>
                        <a
                          href={record.fileUrl}
                          target="_blank"
                          className="text-blue-600 hover:underline text-sm font-bold"
                        >
                          View File
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DOCTOR SECTION */}
          {user?.role === "DOCTOR" && (
            <div className="p-6 border border-blue-200 rounded-xl bg-blue-50">
              <h2 className="text-xl font-bold mb-4 text-blue-800">
                Doctor Panel
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Specialization:</strong>{" "}
                  {user.doctorProfile?.specialization}
                </p>
                <p>
                  <strong>License:</strong> {user.doctorProfile?.licenseNo}
                </p>
              </div>
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">
                Create Prescription
              </button>
            </div>
          )}

          {/* Logout Section */}
          <div className="mt-4 pt-4 border-t text-center">
            <a
              href="/api/auth/signout"
              className="text-red-500 font-bold hover:text-red-700 transition"
            >
              Logout from Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
