"use client";

import { useState } from "react";

export default function PrescriptionForm() {
  const [patientId, setPatientId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!patientId || !diagnosis || !medicines) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/prescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId, diagnosis, medications: medicines }),
      });

      if (res.ok) {
        alert("Prescription Issued Successfully!");
        setPatientId("");
        setDiagnosis("");
        setMedicines("");
      } else {
        const err = await res.json();
        alert("Error: " + err.message);
      }
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input 
        type="text" 
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        placeholder="Patient ID (Get from Patient)" 
        className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-slate-500 text-slate-900 font-medium" 
      />
      <textarea 
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        placeholder="Diagnosis / Patient Symptoms" 
        rows={2} 
        className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-slate-500 text-slate-900 font-medium"
      ></textarea>
      <textarea 
        value={medicines}
        onChange={(e) => setMedicines(e.target.value)}
        placeholder="Medicines (e.g., Napa 500mg 1+0+1)" 
        rows={4} 
        className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-slate-500 text-slate-900 font-medium"
      ></textarea>
      <button 
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:bg-slate-400"
      >
        {loading ? "Processing..." : "Save & Issue Prescription"}
      </button>
    </div>
  );
}