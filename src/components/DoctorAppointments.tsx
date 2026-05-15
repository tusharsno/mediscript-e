"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, User, Check, X, CheckCircle, Loader } from "lucide-react";

interface Appointment {
  id: string;
  date: string;
  time: string;
  reason: string | null;
  status: string;
  patient: {
    bloodGroup: string;
    user: {
      name: string;
      email: string;
    };
  };
}

const STATUS_CONFIG: Record<string, { color: string; bg: string; border: string; icon: React.ReactNode }> = {
  PENDING: { color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200", icon: <Loader className="h-3.5 w-3.5" /> },
  CONFIRMED: { color: "text-green-700", bg: "bg-green-50", border: "border-green-200", icon: <CheckCircle className="h-3.5 w-3.5" /> },
  COMPLETED: { color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", icon: <CheckCircle className="h-3.5 w-3.5" /> },
  CANCELLED: { color: "text-red-700", bg: "bg-red-50", border: "border-red-200", icon: <X className="h-3.5 w-3.5" /> },
};

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("PENDING");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    fetch("/api/appointment")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const updateStatus = async (id: string, status: string) => {
    if (status === "COMPLETED" && !confirm("Mark this appointment as Completed? This cannot be undone.")) return;
    if (status === "CANCELLED" && !confirm("Cancel this appointment?")) return;
    try {
      const res = await fetch(`/api/appointment/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchAppointments();
      else alert("Failed to update appointment");
    } catch {
      alert("Error updating appointment");
    }
  };

  const filtered = filter === "ALL" ? appointments : appointments.filter((a) => a.status === filter);

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
        <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-800">Appointment Requests</h2>
              <p className="text-xs text-slate-400 font-medium">Manage your patient appointments</p>
            </div>
          </div>
          <span className="text-xs font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
            {appointments.length} Total
          </span>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                filter === f ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f} {f !== "ALL" && `(${appointments.filter((a) => a.status === f).length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {filtered.length === 0 ? (
          <div className="text-center py-10">
            <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 font-semibold">No appointments found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((apt) => {
              const status = STATUS_CONFIG[apt.status] || STATUS_CONFIG.PENDING;
              return (
                <div key={apt.id} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all bg-slate-50/50">
                  {/* Patient Avatar */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {apt.patient.user.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <p className="font-black text-slate-900 text-sm">{apt.patient.user.name}</p>
                        <p className="text-xs text-slate-500">{apt.patient.user.email}</p>
                      </div>
                      <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${status.color} ${status.bg} ${status.border}`}>
                        {status.icon}
                        {apt.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(apt.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {apt.time}
                      </span>
                      {apt.patient.bloodGroup && (
                        <span className="bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded-full">
                          {apt.patient.bloodGroup}
                        </span>
                      )}
                    </div>

                    {apt.reason && (
                      <p className="text-xs text-slate-500 mt-2 bg-white px-3 py-2 rounded-lg border border-slate-100">
                        <span className="font-bold text-slate-700">Reason: </span>{apt.reason}
                      </p>
                    )}

                    {apt.status === "PENDING" && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => updateStatus(apt.id, "CONFIRMED")}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white font-bold text-xs rounded-lg transition-colors"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(apt.id, "COMPLETED")}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-lg transition-colors"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          Complete
                        </button>
                        <button
                          onClick={() => updateStatus(apt.id, "CANCELLED")}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-lg transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                          Cancel
                        </button>
                      </div>
                    )}

                    {apt.status === "CONFIRMED" && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => updateStatus(apt.id, "COMPLETED")}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-lg transition-colors"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          Mark as Completed
                        </button>
                        <button
                          onClick={() => updateStatus(apt.id, "CANCELLED")}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-lg transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
