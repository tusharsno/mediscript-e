"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, User, Check, X, CheckCircle } from "lucide-react";

interface Appointment {
  id: string;
  date: string;
  time: string;
  reason: string | null;
  status: string;
  patient: {
    user: {
      name: string;
      email: string;
    };
  };
}

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    fetch("/api/appointment")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/appointment/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        alert(`Appointment ${status.toLowerCase()}`);
        fetchAppointments();
      } else {
        alert("Failed to update appointment");
      }
    } catch {
      alert("Error updating appointment");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "CONFIRMED":
        return "bg-green-50 text-green-700 border-green-200";
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200";
      case "COMPLETED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-slate-400">Loading appointments...</div>;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Calendar className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-800">Appointment Requests</h2>
            <p className="text-xs text-slate-400 font-medium">Manage your patient appointments</p>
          </div>
        </div>
        <span className="text-xs font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase">
          {appointments.length} Total
        </span>
      </div>

      <div className="p-6">
        {appointments.length === 0 ? (
          <div className="text-center py-10">
            <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 font-semibold">No appointments yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="p-5 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4 text-blue-600" />
                      <h3 className="font-black text-slate-900">
                        {apt.patient.user.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {apt.patient.user.email}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(
                      apt.status
                    )}`}
                  >
                    {apt.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">
                      {new Date(apt.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{apt.time}</span>
                  </div>
                </div>

                {apt.reason && (
                  <p className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-100 mb-3">
                    <span className="font-bold text-slate-700">Reason: </span>
                    {apt.reason}
                  </p>
                )}

                {apt.status === "PENDING" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(apt.id, "CONFIRMED")}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-lg transition-colors"
                    >
                      <Check className="h-4 w-4" />
                      Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(apt.id, "CANCELLED")}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                )}

                {apt.status === "CONFIRMED" && (
                  <button
                    onClick={() => updateStatus(apt.id, "COMPLETED")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Mark as Completed
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
