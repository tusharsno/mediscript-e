"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Calendar, FileText, User, Users, X } from "lucide-react";
import { useSession } from "next-auth/react";
import UserAvatar from "@/components/UserAvatar";

interface SearchResults {
  appointments?: { id: string; doctorName?: string; patientName?: string; date: string; time: string; status: string }[];
  prescriptions?: { id: string; doctorName?: string; patientName?: string; diagnosis: string; date: string }[];
  patients?: { id: string; name: string; email: string; bloodGroup: string }[];
  doctors?: { id: string; name: string; email: string; specialization: string }[];
  users?: { id: string; name: string; email: string; role: string }[];
}

export default function DashboardHeader() {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults({}); setOpen(false); return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || {});
        setOpen(true);
      } catch { setResults({}); }
      finally { setLoading(false); }
    }, 350);
  }, [query]);

  const hasResults = Object.values(results).some((r) => Array.isArray(r) && r.length > 0);

  const scrollTo = (id: string) => {
    setOpen(false);
    setQuery("");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-4">
      {/* Search */}
      <div ref={ref} className="relative flex-1 max-w-md">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#1A6080] focus-within:ring-2 focus-within:ring-[#1A6080]/10 transition-all">
          <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search appointments, prescriptions..."
            className="flex-1 bg-transparent text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none"
          />
          {query && (
            <button onClick={() => { setQuery(""); setResults({}); setOpen(false); }}>
              <X className="h-3.5 w-3.5 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
            {loading ? (
              <div className="p-4 text-center">
                <div className="animate-spin h-4 w-4 border-2 border-[#1A6080] border-t-transparent rounded-full mx-auto" />
              </div>
            ) : !hasResults ? (
              <div className="p-4 text-center text-sm text-slate-400 font-medium">No results found.</div>
            ) : (
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {/* Appointments */}
                {results.appointments && results.appointments.length > 0 && (
                  <div>
                    <p className="px-4 py-2 text-xs font-black text-slate-400 uppercase tracking-wider bg-slate-50">Appointments</p>
                    {results.appointments.map((a) => (
                      <button key={a.id} onClick={() => scrollTo("appointments")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left">
                        <Calendar className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 truncate">
                            {a.doctorName ? `Dr. ${a.doctorName}` : a.patientName}
                          </p>
                          <p className="text-xs text-slate-400">{new Date(a.date).toLocaleDateString()} · {a.time}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                          a.status === "CONFIRMED" ? "bg-green-50 text-green-600" :
                          a.status === "PENDING" ? "bg-yellow-50 text-yellow-600" :
                          a.status === "COMPLETED" ? "bg-blue-50 text-blue-600" :
                          "bg-red-50 text-red-600"
                        }`}>{a.status}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Prescriptions */}
                {results.prescriptions && results.prescriptions.length > 0 && (
                  <div>
                    <p className="px-4 py-2 text-xs font-black text-slate-400 uppercase tracking-wider bg-slate-50">Prescriptions</p>
                    {results.prescriptions.map((p) => (
                      <button key={p.id} onClick={() => scrollTo("prescriptions")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left">
                        <FileText className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 truncate">{p.diagnosis}</p>
                          <p className="text-xs text-slate-400">
                            {p.doctorName ? `Dr. ${p.doctorName}` : p.patientName} · {new Date(p.date).toLocaleDateString()}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Patients (Doctor) */}
                {results.patients && results.patients.length > 0 && (
                  <div>
                    <p className="px-4 py-2 text-xs font-black text-slate-400 uppercase tracking-wider bg-slate-50">Patients</p>
                    {results.patients.map((p) => (
                      <button key={p.id} onClick={() => scrollTo("appointments")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left">
                        <User className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 truncate">{p.name}</p>
                          <p className="text-xs text-slate-400">{p.email}</p>
                        </div>
                        <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">{p.bloodGroup}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Users (Admin) */}
                {results.users && results.users.length > 0 && (
                  <div>
                    <p className="px-4 py-2 text-xs font-black text-slate-400 uppercase tracking-wider bg-slate-50">Users</p>
                    {results.users.map((u) => (
                      <button key={u.id} onClick={() => scrollTo("users")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left">
                        <Users className="h-4 w-4 text-purple-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 truncate">{u.name}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          u.role === "DOCTOR" ? "bg-blue-50 text-blue-600" :
                          u.role === "ADMIN" ? "bg-purple-50 text-purple-600" :
                          "bg-emerald-50 text-emerald-600"
                        }`}>{u.role}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        <UserAvatar
          name={session?.user?.name}
          image={session?.user?.image}
          size={32}
          gradient="from-[#1A6080] to-[#0d4a63]"
        />
        <div className="hidden sm:block">
          <p className="text-sm font-bold text-slate-800 leading-none">{session?.user?.name}</p>
          <p className="text-xs text-slate-400 mt-0.5">{session?.user?.role}</p>
        </div>
      </div>
    </header>
  );
}
