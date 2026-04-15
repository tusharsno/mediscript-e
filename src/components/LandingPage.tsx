// "use client"; // এটি আমরা ক্লায়েন্ট সাইড ইন্টারেকশনের জন্য রাখতে পারি

// import Link from "next/link";

// interface LandingPageProps {
//   isLoggedIn: boolean;
// }

// export default function LandingPage({ isLoggedIn }: LandingPageProps) {
//   return (
//     <div className="min-h-screen bg-white text-slate-900 font-sans">
//       {/* Navigation */}
//       <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
//         <div className="flex items-center gap-2">
//           <div className="bg-blue-600 p-2 rounded-lg text-white font-black text-xl">M</div>
//           <span className="text-2xl font-black tracking-tight text-blue-600">MediScript</span>
//         </div>
//         <div className="flex gap-4">
//           {isLoggedIn ? (
//             <Link href="/dashboard" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all">
//               Go to Dashboard
//             </Link>
//           ) : (
//             <>
//               <Link href="/login" className="px-5 py-2.5 text-slate-600 font-bold hover:text-blue-600 transition-colors">
//                 Log In
//               </Link>
//               <Link href="/register" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all">
//                 Join Now
//               </Link>
//             </>
//           )}
//         </div>
//       </nav>

//       {/* Hero Content */}
//       <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
//         <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest">
//           Secure Health Management
//         </div>
//         <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight max-w-4xl tracking-tighter">
//           Your Digital <span className="text-blue-600 italic">Medical Vault</span> & Prescription Pad.
//         </h1>
//         <p className="text-lg text-slate-500 mb-10 max-w-2xl font-medium leading-relaxed">
//           MediScript connects doctors and patients seamlessly. Store your medical reports securely and get digital prescriptions instantly.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
//           <Link href="/register" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform">
//             Get Started for Free
//           </Link>
//         </div>

//         {/* Features Preview */}
//         <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
//           <FeatureCard emoji="🛡️" title="Secure Vault" desc="Encrypted storage for all your medical reports." color="bg-slate-50" />
//           <FeatureCard emoji="📄" title="E-Prescription" desc="Digital prescriptions from verified doctors." color="bg-blue-50/50" />
//           <FeatureCard emoji="⚡" title="Fast Access" desc="Access history anytime, anywhere in seconds." color="bg-slate-50" />
//         </div>
//       </main>
//     </div>
//   );
// }

// function FeatureCard({ emoji, title, desc, color }: any) {
//   return (
//     <div className={`p-8 ${color} rounded-3xl border border-slate-100`}>
//       <div className="text-3xl mb-4">{emoji}</div>
//       <h3 className="font-black text-xl mb-2 italic">{title}</h3>
//       <p className="text-sm text-slate-500 font-medium">{desc}</p>
//     </div>
//   );
// }

"use client";

import Link from "next/link";

interface LandingPageProps {
  isLoggedIn: boolean;
}

export default function LandingPage({ isLoggedIn }: LandingPageProps) {
  return (
    <div className="bg-white text-slate-900 font-sans">
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest">
          Secure Health Management
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight max-w-4xl tracking-tighter">
          Your Digital{" "}
          <span className="text-blue-600 italic">Medical Vault</span> &
          Prescription Pad.
        </h1>
        <p className="text-lg text-slate-500 mb-10 max-w-2xl font-medium leading-relaxed">
          MediScript connects doctors and patients seamlessly. Store your
          medical reports securely and get digital prescriptions instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform"
            >
              Back to Dashboard
            </Link>
          ) : (
            <Link
              href="/register"
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform"
            >
              Get Started for Free
            </Link>
          )}
        </div>

        {/* Features Preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-left">
          <FeatureCard
            emoji="🛡️"
            title="Secure Vault"
            desc="Encrypted storage for all your medical reports."
            color="bg-slate-50"
          />
          <FeatureCard
            emoji="📄"
            title="E-Prescription"
            desc="Digital prescriptions from verified doctors."
            color="bg-blue-50/50"
          />
          <FeatureCard
            emoji="⚡"
            title="Fast Access"
            desc="Access history anytime, anywhere in seconds."
            color="bg-slate-50"
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ emoji, title, desc, color }: any) {
  return (
    <div className={`p-8 ${color} rounded-3xl border border-slate-100`}>
      <div className="text-3xl mb-4">{emoji}</div>
      <h3 className="font-black text-xl mb-2 italic">{title}</h3>
      <p className="text-sm text-slate-500 font-medium">{desc}</p>
    </div>
  );
}
