// import React from "react";
// import { FileText, Hourglass, ShieldCheck, ArrowRight } from "lucide-react";

// export default function PowerFeatures() {
//   return (
//     <section className="relative min-h-[600px] w-full px-6 md:px-16 py-24 my-2 font-sans overflow-hidden">
//       {/* ── Background Layer ── */}
//       <div
//         className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
//         style={{ backgroundImage: "url('/power-features-bg.jpg')" }}
//       />
//       <div className="absolute inset-0 z-10 bg-black/80 backdrop-static" />

//       <div className="relative z-20 max-w-7xl mx-auto flex flex-col gap-16 text-white">
//         {/* ── Header ── */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
//           <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
//             Power Features
//           </h2>
//           <button className="group flex items-center gap-3 bg-[#1A6080] hover:bg-cyan-700 text-white rounded-full font-bold transition-all px-8 py-4 text-sm shadow-2xl">
//             Learn More
//             <span className="bg-white/20 p-2 rounded-full group-hover:translate-x-2 transition-transform">
//               <ArrowRight className="h-4 w-4" />
//             </span>
//           </button>
//         </div>

//         {/* ── Cards Grid ── */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Card 1 */}
//           <div className="bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group cursor-default">
//             <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-8 border border-cyan-500/30">
//               <FileText className="h-7 w-7 text-cyan-400" />
//             </div>
//             <h3 className="text-2xl font-bold mb-4 tracking-tight">
//               Digital Prescriptions
//             </h3>
//             <p className="text-slate-400 font-medium text-sm leading-relaxed">
//               Easy prescription creation and digital signature facility for
//               doctors.
//             </p>
//           </div>

//           {/* Card 2 */}
//           <div className="bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group cursor-default">
//             <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-8 border border-cyan-500/30">
//               <Hourglass className="h-7 w-7 text-cyan-400" />
//             </div>
//             <h3 className="text-2xl font-bold mb-4 tracking-tight">
//               Medicine Reminders
//             </h3>
//             <p className="text-slate-400 font-medium text-sm leading-relaxed">
//               An automatic alert or reminder system for patients to take their
//               medicines regularly.
//             </p>
//           </div>

//           {/* Card 3 */}
//           <div className="bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group cursor-default">
//             <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-8 border border-cyan-500/30">
//               <ShieldCheck className="h-7 w-7 text-cyan-400" />
//             </div>
//             <h3 className="text-2xl font-bold mb-4 tracking-tight">
//               Secure Medical Vault
//             </h3>
//             <p className="text-slate-400 font-medium text-sm leading-relaxed">
//               An online vault to securely store your lab reports and old
//               prescriptions.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FileText, Hourglass, ShieldCheck, ArrowRight } from "lucide-react";

// সেশন স্ট্যাটাস রিসিভ করার জন্য ইন্টারফেস
interface PowerFeaturesProps {
  isLoggedIn: boolean;
}

export default function PowerFeatures({ isLoggedIn }: PowerFeaturesProps) {
  const router = useRouter();

  // স্মার্ট রিডাইরেক্ট ফাংশন
  const handleAction = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/register"); // লগইন না থাকলে রেজিস্ট্রেশন পেজে পাঠাবে
    }
  };

  return (
    <section id="features" className="relative min-h-[600px] w-full px-6 md:px-16 py-24 my-2 font-sans overflow-hidden">
      {/* ── Background Layer ── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: "url('/power-features-bg.jpg')" }}
      />
      {/* ব্যাকগ্রাউন্ড ওভারলে - ডার্কনেস আপনার আগের মতোই রাখা হয়েছে */}
      <div className="absolute inset-0 z-10 bg-black/80 backdrop-static" />

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col gap-16 text-white">
        {/* ── Header Area ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
            Power Features
          </h2>

          {/* রিডাইরেক্ট লজিক সহ বাটন */}
          <button
            onClick={handleAction}
            className="group flex items-center gap-3 bg-[#1A6080] hover:bg-cyan-700 text-white rounded-full font-bold transition-all px-4 py-2 text-sm shadow-2xl border border-white/10 backdrop-blur-sm"
          >
            {isLoggedIn ? "Go to Dashboard" : "Get Started Now"}
            <span className="bg-white/20 p-2 rounded-full group-hover:translate-x-2 transition-transform">
              <ArrowRight className="h-5 w-5" />
            </span>
          </button>
        </div>

        {/* ── Cards Grid - আপনার আগের কালার ও ডিজাইন ঠিক রেখে ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          {/* আপনার আগের কার্ডের ব্যাকগ্রাউন্ড (bg-white/5, backdrop-blur-md) ব্যবহার করা হয়েছে */}
          <div className="bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group cursor-default">
            <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-10 border border-cyan-500/30">
              <FileText className="h-8 w-8 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight leading-tight">
              Digital Prescriptions
            </h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-[280px]">
              Easy prescription creation and digital signature facility for
              doctors.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group cursor-default">
            <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-10 border border-cyan-500/30">
              <Hourglass className="h-8 w-8 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight leading-tight">
              Medicine Reminders
            </h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-[280px]">
              An automatic alert or reminder system for patients to take their
              medicines regularly.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group cursor-default">
            <div className="w-16 h-16 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-10 border border-cyan-500/30">
              <ShieldCheck className="h-8 w-8 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight leading-tight">
              Secure Medical Vault
            </h3>
            <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-[280px]">
              An online vault to securely store your lab reports and old
              prescriptions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
