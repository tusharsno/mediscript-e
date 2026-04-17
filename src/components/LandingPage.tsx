// // "use client";

// // import Link from "next/link";
// // import Image from "next/image";
// // import { motion } from "framer-motion";
// // import { Shield, FileText, Zap, ArrowRight } from "lucide-react";

// // interface LandingPageProps {
// //   isLoggedIn: boolean;
// // }

// // export default function LandingPage({ isLoggedIn }: LandingPageProps) {
// //   return (
// //     <div className="bg-white text-slate-900 font-sans overflow-x-hidden">

// //       {/* ── Hero Section - Strict Split Screen ── */}
// //       <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-2 rounded-[2rem] overflow-hidden mt-3 mx-2">

// //         {/* Left Column - Image (White Background) */}
// //         <motion.div
// //           initial={{ opacity: 0, x: -30 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.7 }}
// //           className="relative flex items-center justify-center bg-teal-50 overflow-hidden min-h-screen rounded-[2rem]"
// //         >
// //           {/* Subtle background circle */}
// //           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-100/50 rounded-full blur-3xl opacity-60" />
// //           <Image
// //             src="/heroSecImg.png"
// //             alt="MediScript Hero"
// //             width={560}
// //             height={600}
// //             className="relative z-10 w-full h-full object-cover"
// //             priority
// //           />
// //         </motion.div>

// //         {/* Right Column - Content (Slate Background) */}
// //         <div className="relative flex items-center bg-slate-50 px-8 md:px-16 pt-36 pb-16 rounded-[2rem]">

// //           {/* Subtle top-right decoration */}
// //           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

// //           <div className="relative z-10 max-w-lg">

// //             {/* Badge */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5 }}
// //               className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white border border-slate-200 shadow-sm"
// //             >
// //               <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
// //               <span className="text-slate-600 text-sm font-semibold">Secure Digital Health Platform</span>
// //             </motion.div>

// //             {/* Heading */}
// //             <motion.h1
// //               initial={{ opacity: 0, y: 30 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.1 }}
// //               className="text-4xl md:text-5xl lg:text-[3.25rem] font-black mb-6 leading-[1.1] tracking-tight text-slate-900"
// //             >
// //               Digital Healthcare,{" "}
// //               <span className="block">Redefined.</span>
// //             </motion.h1>

// //             {/* Subtitle */}
// //             <motion.p
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.2 }}
// //               className="text-base md:text-lg text-slate-500 mb-10 font-normal leading-relaxed"
// //             >
// //               Experience the future of medical care with MediScript. Seamlessly
// //               connect with your healthcare providers and manage your health
// //               records like never before.
// //             </motion.p>

// //             {/* CTA Buttons */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //               className="flex flex-col sm:flex-row gap-3"
// //             >
// //               {isLoggedIn ? (
// //                 <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
// //                   <Link
// //                     href="/dashboard"
// //                     className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-full font-bold text-sm shadow-lg hover:opacity-90 transition-opacity"
// //                     style={{ backgroundColor: '#1A6080' }}
// //                   >
// //                     Go to Dashboard <ArrowRight className="h-4 w-4" />
// //                   </Link>
// //                 </motion.div>
// //               ) : (
// //                 <>
// //                   <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
// //                     <Link
// //                       href="/login"
// //                       className="inline-flex items-center gap-2 px-4 py-1 text-white rounded-full font-bold text-sm shadow-lg hover:opacity-90 transition-opacity"
// //                       style={{ backgroundColor: '#1A6080' }}
// //                     >
// //                       Get Started Free
// //                       <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
// //                         <ArrowRight className="h- w-5" />
// //                       </span>
// //                     </Link>
// //                   </motion.div>
// //                   <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
// //                     <Link
// //                       href="/register"
// //                       className="inline-flex items-center gap-2 px-7 py-4 bg-white text-slate-700 rounded-full font-bold text-sm border border-slate-200 shadow-sm hover:border-slate-400 transition-all"
// //                     >
// //                       Log In
// //                     </Link>
// //                   </motion.div>
// //                 </>
// //               )}
// //             </motion.div>

// //             {/* Trust Badge */}
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ duration: 0.6, delay: 0.5 }}
// //               className="mt-10 flex items-center gap-2 text-slate-400 text-sm"
// //             >
// //               <Shield className="h-4 w-4 text-emerald-500 flex-shrink-0" />
// //               <span>End-to-end encrypted • HIPAA compliant • Free to start</span>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── Features Section ── */}
// //       <section id="features" className="py-24 px-6 bg-white">
// //         <div className="max-w-5xl mx-auto">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
// //               Everything you need in one place
// //             </h2>
// //             <p className="text-slate-500 text-lg max-w-xl mx-auto">
// //               Built for modern healthcare — simple, secure, and fast.
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             {[
// //               { icon: Shield, title: "Secure Vault", desc: "Encrypted storage for all your medical reports and documents.", color: "bg-blue-50", iconColor: "text-blue-600", border: "border-blue-100" },
// //               { icon: FileText, title: "E-Prescription", desc: "Digital prescriptions from verified doctors, instantly accessible.", color: "bg-indigo-50", iconColor: "text-indigo-600", border: "border-indigo-100" },
// //               { icon: Zap, title: "Fast Access", desc: "Access your complete medical history anytime, anywhere.", color: "bg-teal-50", iconColor: "text-teal-600", border: "border-teal-100" },
// //             ].map((feature, i) => {
// //               const Icon = feature.icon;
// //               return (
// //                 <motion.div
// //                   key={feature.title}
// //                   initial={{ opacity: 0, y: 30 }}
// //                   whileInView={{ opacity: 1, y: 0 }}
// //                   viewport={{ once: true }}
// //                   transition={{ duration: 0.5, delay: i * 0.1 }}
// //                   className={`p-8 ${feature.color} rounded-3xl border ${feature.border} hover:shadow-lg transition-shadow`}
// //                 >
// //                   <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm">
// //                     <Icon className={`h-6 w-6 ${feature.iconColor}`} />
// //                   </div>
// //                   <h3 className="font-black text-xl text-slate-900 mb-2">{feature.title}</h3>
// //                   <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
// //                 </motion.div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Shield, FileText, Zap, ArrowRight } from "lucide-react";
// import PowerFeatures from "@/components/PowerFeatures"; // নতুন কম্পোনেন্ট ইমপোর্ট

// interface LandingPageProps {
//   isLoggedIn: boolean;
// }

// export default function LandingPage({ isLoggedIn }: LandingPageProps) {
//   return (
//     <div className="bg-white text-slate-900 font-sans overflow-x-hidden">
//       {/* ── Hero Section - Strict Split Screen ── */}
//       <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-2 rounded-[2rem] overflow-hidden mt-3 mx-2">
//         {/* Left Column - Image (White Background) */}
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7 }}
//           className="relative flex items-center justify-center bg-teal-50 overflow-hidden min-h-screen rounded-[2rem]"
//         >
//           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-100/50 rounded-full blur-3xl opacity-60" />
//           <Image
//             src="/heroSecImg.png"
//             alt="MediScript Hero"
//             width={560}
//             height={600}
//             className="relative z-10 w-full h-full object-cover"
//             priority
//           />
//         </motion.div>

//         {/* Right Column - Content (Slate Background) */}
//         <div className="relative flex items-center bg-[#f0f4f8] px-8 md:px-16 pt-36 pb-16 rounded-[2rem]">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

//           <div className="relative z-10 max-w-lg">
//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white border border-slate-200 shadow-sm"
//             >
//               <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
//               <span className="text-slate-600 text-sm font-semibold">
//                 Secure Digital Health Platform
//               </span>
//             </motion.div>

//             {/* Heading */}
//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="text-4xl md:text-5xl lg:text-[3.25rem] font-black mb-6 leading-[1.1] tracking-tight text-slate-900"
//             >
//               Digital Healthcare, <span className="block">Redefined.</span>
//             </motion.h1>

//             {/* Subtitle */}
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-base md:text-lg text-slate-500 mb-10 font-normal leading-relaxed"
//             >
//               Experience the future of medical care with MediScript. Seamlessly
//               connect with your healthcare providers and manage your health
//               records like never before.
//             </motion.p>

//             {/* CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="flex flex-col sm:flex-row gap-3"
//             >
//               {isLoggedIn ? (
//                 <motion.div
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   <Link
//                     href="/dashboard"
//                     className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-full font-bold text-sm shadow-lg hover:opacity-90 transition-opacity"
//                     style={{ backgroundColor: "#1A6080" }}
//                   >
//                     Go to Dashboard <ArrowRight className="h-4 w-4" />
//                   </Link>
//                 </motion.div>
//               ) : (
//                 <>
//                   <motion.div
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                   >
//                     <Link
//                       href="/register"
//                       className="inline-flex items-center gap-2 px-4 py-1 text-white rounded-full font-bold text-sm shadow-lg hover:opacity-90 transition-opacity"
//                       style={{ backgroundColor: "#1A6080" }}
//                     >
//                       <span className="pl-0">Get Started Free</span>
//                       <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
//                         <ArrowRight className="h-5 w-5" />
//                       </span>
//                     </Link>
//                   </motion.div>
//                   <motion.div
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                   >
//                     <Link
//                       href="/login"
//                       className="inline-flex items-center gap-2 px-7 py-4 bg-white text-slate-700 rounded-full font-bold text-sm border border-slate-200 shadow-sm hover:border-slate-400 transition-all"
//                     >
//                       Log In
//                     </Link>
//                   </motion.div>
//                 </>
//               )}
//             </motion.div>

//             {/* Trust Badge */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//               className="mt-10 flex items-center gap-2 text-slate-400 text-sm"
//             >
//               <Shield className="h-4 w-4 text-emerald-500 flex-shrink-0" />
//               <span>
//                 End-to-end encrypted • HIPAA compliant • Free to start
//               </span>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ── Features Section ── */}
//       {/* <section id="features" className="py-24 px-6 bg-white">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
//               Everything you need in one place
//             </h2>
//             <p className="text-slate-500 text-lg max-w-xl mx-auto">
//               Built for modern healthcare — simple, secure, and fast.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               {
//                 icon: Shield,
//                 title: "Secure Vault",
//                 desc: "Encrypted storage for all your medical reports and documents.",
//                 color: "bg-blue-50",
//                 iconColor: "text-blue-600",
//                 border: "border-blue-100",
//               },
//               {
//                 icon: FileText,
//                 title: "E-Prescription",
//                 desc: "Digital prescriptions from verified doctors, instantly accessible.",
//                 color: "bg-indigo-50",
//                 iconColor: "text-indigo-600",
//                 border: "border-indigo-100",
//               },
//               {
//                 icon: Zap,
//                 title: "Fast Access",
//                 desc: "Access your complete medical history anytime, anywhere.",
//                 color: "bg-teal-50",
//                 iconColor: "text-teal-600",
//                 border: "border-teal-100",
//               },
//             ].map((feature, i) => {
//               const Icon = feature.icon;
//               return (
//                 <motion.div
//                   key={feature.title}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: i * 0.1 }}
//                   className={`p-8 ${feature.color} rounded-3xl border ${feature.border} hover:shadow-lg transition-shadow`}
//                 >
//                   <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm">
//                     <Icon className={`h-6 w-6 ${feature.iconColor}`} />
//                   </div>
//                   <h3 className="font-black text-xl text-slate-900 mb-2">
//                     {feature.title}
//                   </h3>
//                   <p className="text-slate-500 font-medium leading-relaxed">
//                     {feature.desc}
//                   </p>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section> */}

//       {/* ── Power Features Section (Imported Component) ── */}
//       <PowerFeatures />
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import PowerFeatures from "@/components/PowerFeatures";
import SecuritySection from "@/components/SecuritySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import useScrollHash from "@/hooks/useScrollHash";

interface LandingPageProps {
  isLoggedIn: boolean;
}

export default function LandingPage({ isLoggedIn }: LandingPageProps) {
  useScrollHash();
  
  return (
    <>
    <div className="bg-white text-slate-900 font-sans overflow-x-hidden pt-[0.5rem]">
      {/* ── Hero Section - Updated to match the requested look ── */}
      <section className="min-h-[97vh] grid grid-cols-1 md:grid-cols-2 gap-2.5 mx-2.5">
        {/* Left Column - Image (Refined Roundness) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex items-center justify-center bg-white overflow-hidden rounded-2xl border border-slate-100 shadow-sm"
        >
          {/* Background subtle glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-teal-50/30 rounded-full blur-3xl opacity-60" />

          <Image
            src="/heroSecImg.png"
            alt="MediScript Hero"
            width={560}
            height={600}
            className="relative z-10 w-full h-full object-cover"
            priority
          />
        </motion.div>

        {/* Right Column - Content (Updated Background & Roundness) */}
        <div className="relative flex items-center bg-[#f0f4f8] px-8 md:px-16 py-16 rounded-2xl shadow-sm border border-slate-100">
          {/* Simple corner blur element */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 max-w-lg w-full mt-20">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white border border-slate-200 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-slate-600 text-xs md:text-sm font-semibold">
                Secure Digital Health Platform
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-black mb-6 leading-[1.1] tracking-tight text-slate-900"
            >
              Digital Healthcare, <span className="block">Redefined.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-slate-500 mb-10 font-medium leading-relaxed"
            >
              Experience the future of medical care with MediScript. Seamlessly
              connect with your healthcare providers and manage your health
              records like never before.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {isLoggedIn ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all"
                    style={{ backgroundColor: "#1A6080" }}
                  >
                    Go to Dashboard <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/register"
                      className="h-[3.5rem] inline-flex items-center gap-3 pr-2 pl-6 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all"
                      style={{ backgroundColor: "#1A6080" }}
                    >
                      Get Started Free
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/login"
                      className="inline-flex items-center px-8 py-4 bg-white text-slate-700 rounded-full font-bold text-sm border border-slate-200 shadow-sm hover:border-slate-400 transition-all"
                    >
                      Log In
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex items-center gap-2 text-slate-400 text-[13px]"
            >
              <Shield className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span>
                End-to-end encrypted • HIPAA compliant • Free to start
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Power Features Section ── */}
      <div className="mt-0">
        <PowerFeatures isLoggedIn={isLoggedIn} />
      </div>

      {/* ── Security Section ── */}
      <SecuritySection />

      {/* ── Contact Section ── */}
      <ContactSection />
    </div>
    
    {/* Footer */}
    <Footer />
    </>
  );
}
