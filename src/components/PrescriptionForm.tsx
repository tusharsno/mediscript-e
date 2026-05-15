"use client";

import { useState, useEffect } from "react";
import { FileText, User, ChevronDown, CheckCircle } from "lucide-react";

interface Appointment {
  id: string;
  date: string;
  status: string;
  patient: {
    id: string;
    bloodGroup: string;
    user: { name: string; email: string };
  };
}

export default function PrescriptionForm() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetch("/api/appointment")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        const confirmed = list.filter((a: Appointment) =>
          a.status === "CONFIRMED" || a.status === "PENDING"
        );
        // Deduplicate by patient id — keep latest appointment per patient
        const seen = new Set();
        const unique = confirmed.filter((a: Appointment) => {
          if (seen.has(a.patient.id)) return false;
          seen.add(a.patient.id);
          return true;
        });
        setAppointments(unique);
      })
      .catch(console.error);
  }, []);

  const selectedAppointment = appointments.find(
    (a) => a.patient.id === selectedPatientId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId || !diagnosis || !medicines) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/prescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: selectedPatientId,
          appointmentId: selectedAppointment?.id,
          diagnosis,
          medications: medicines,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setSelectedPatientId("");
        setDiagnosis("");
        setMedicines("");
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const err = await res.json();
        alert("Error: " + err.message);
      }
    } catch {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-semibold text-sm">
          <CheckCircle className="h-5 w-5" />
          Prescription issued successfully!
        </div>
      )}

      {/* Patient Selection */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">
          <User className="inline h-4 w-4 mr-1" />
          Select Patient *
        </label>
        {appointments.length === 0 ? (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-400 text-sm text-center">
            No confirmed appointments found
          </div>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border-2 text-left transition-all ${
                selectedPatientId ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"
              }`}
            >
              {selectedAppointment ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-sm">
                    {selectedAppointment.patient.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{selectedAppointment.patient.user.name}</p>
                    <p className="text-xs text-slate-500">{selectedAppointment.patient.user.email}</p>
                  </div>
                </div>
              ) : (
                <span className="text-slate-400 text-sm font-medium">Choose a patient</span>
              )}
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-10 overflow-hidden">
                {appointments.map((apt) => (
                  <button
                    key={apt.id}
                    type="button"
                    onClick={() => { setSelectedPatientId(apt.patient.id); setDropdownOpen(false); }}
                    className={`w-full flex items-center gap-3 p-3 text-left hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-0 ${
                      selectedPatientId === apt.patient.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                      {apt.patient.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 text-sm">{apt.patient.user.name}</p>
                      <p className="text-xs text-slate-500">{apt.patient.user.email}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                        {apt.patient.bloodGroup}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        apt.status === "CONFIRMED" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Diagnosis */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Diagnosis *</label>
        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Patient symptoms and diagnosis..."
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 font-medium resize-none"
        />
      </div>

      {/* Medications */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Medications *</label>
        <textarea
          value={medicines}
          onChange={(e) => setMedicines(e.target.value)}
          placeholder="e.g., Napa 500mg - 1+0+1 for 5 days&#10;Antacid - 1+1+1 after meals"
          rows={4}
          className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 font-medium resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !selectedPatientId}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Issuing..." : "Issue Prescription"}
      </button>
    </form>
  );
}
