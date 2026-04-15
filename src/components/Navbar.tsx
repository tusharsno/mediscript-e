// "use client";

// import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";

// export default function Navbar() {
//   const { data: session } = useSession();

//   return (
//     <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
//         {/* Logo Section */}
//         <Link href="/" className="flex items-center gap-2 group">
//           <div className="bg-blue-600 p-2 rounded-lg text-white font-black text-xl transition-transform group-hover:scale-110">M</div>
//           <span className="text-2xl font-black tracking-tighter text-blue-600">MediScript</span>
//         </Link>

//         {/* Action Buttons Section */}
//         <div className="flex items-center gap-4">
//           {session ? (
//             <>
//               <Link
//                 href="/dashboard"
//                 className="px-5 py-2.5 text-slate-600 font-bold hover:text-blue-600 transition-colors hidden md:block"
//               >
//                 My Dashboard
//               </Link>
//               <button
//                 onClick={() => signOut({ callbackUrl: '/' })}
//                 className="px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
//               >
//                 Sign Out
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 href="/login"
//                 className="px-5 py-2.5 text-slate-600 font-bold hover:text-blue-600 transition-colors"
//               >
//                 Log In
//               </Link>
//               <Link
//                 href="/register"
//                 className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all active:scale-95"
//               >
//                 Join Now
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white font-black text-xl">
            M
          </div>
          <span className="text-2xl font-black tracking-tighter text-blue-600">
            MediScript
          </span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="hidden md:block px-5 py-2.5 text-slate-600 font-bold hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold border border-red-100 hover:bg-red-500 hover:text-white transition-all active:scale-95"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2.5 text-slate-600 font-bold hover:text-blue-600"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
              >
                Join Now
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
