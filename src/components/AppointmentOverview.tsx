"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, User } from "lucide-react";

interface Appointment {
  id: string;
  date: string;
  time: string;
  reason: string | null;
  status: string;
  createdAt: string;
  doctor: {
    specialization: string;
    user: {
      name: string | null;
      email: string;
    };
  };
  patient: {
    user: {
      name: string | null;
      email: string;
    };
  };
}

export default function AppointmentOverview() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/admin/appointments");
      const data = await res.json();
      setAppointments(data.appointments);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments =
    filter === "ALL"
      ? appointments
      : appointments.filter((apt) => apt.status === filter);

  const statusCounts = {
    ALL: appointments.length,
    PENDING: appointments.filter((a) => a.status === "PENDING").length,
    CONFIRMED: appointments.filter((a) => a.status === "CONFIRMED").length,
    COMPLETED: appointments.filter((a) => a.status === "COMPLETED").length,
    CANCELLED: appointments.filter((a) => a.status === "CANCELLED").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-600">Loading appointments...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A6080] to-[#156070] rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Calendar className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-black">Appointment Overview</h1>
        </div>
        <p className="text-cyan-100 font-medium">View all platform appointments</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
              filter === status
                ? "bg-[#1A6080] text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {status} ({count})
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                {/* Patient & Doctor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Patient</p>
                    <p className="font-bold text-slate-900">
                      {apt.patient.user.name || "No Name"}
                    </p>
                    <p className="text-sm text-slate-600">{apt.patient.user.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Doctor</p>
                    <p className="font-bold text-slate-900">
                      {apt.doctor.user.name || "No Name"}
                    </p>
                    <p className="text-sm text-slate-600">{apt.doctor.specialization}</p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="h-4 w-4" />
                    {new Date(apt.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="h-4 w-4" />
                    {apt.time}
                  </div>
                </div>

                {/* Reason */}
                {apt.reason && (
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold">Reason:</span> {apt.reason}
                  </p>
                )}
              </div>

              {/* Status Badge */}
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-4 py-2 rounded-full text-xs font-bold ${
                    apt.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : apt.status === "CONFIRMED"
                      ? "bg-blue-100 text-blue-700"
                      : apt.status === "COMPLETED"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {apt.status}
                </span>
                <p className="text-xs text-slate-500">
                  Created: {new Date(apt.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No {filter.toLowerCase()} appointments found
        </div>
      )}
    </div>
  );
}
