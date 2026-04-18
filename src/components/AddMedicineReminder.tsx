"use client";

import { useState } from "react";
import { Bell, Calendar, Clock, Pill } from "lucide-react";

export default function AddMedicineReminder() {
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [time, setTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/medicine-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          medicineName,
          dosage,
          frequency,
          time,
          startDate,
          endDate,
        }),
      });

      if (res.ok) {
        alert("Medicine reminder added successfully!");
        setMedicineName("");
        setDosage("");
        setFrequency("");
        setTime("");
        setStartDate("");
        setEndDate("");
        window.location.reload();
      } else {
        const err = await res.json();
        alert("Error: " + err.message);
      }
    } catch {
      alert("Failed to add reminder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-50 rounded-lg">
          <Bell className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800">Add Medicine Reminder</h2>
          <p className="text-xs text-slate-400 font-medium">Set up medication schedule</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            <Pill className="inline h-4 w-4 mr-1" />
            Medicine Name *
          </label>
          <input
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            required
            placeholder="e.g., Paracetamol"
            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 font-medium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Dosage *
            </label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              required
              placeholder="e.g., 500mg"
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Frequency *
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              required
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 font-medium"
            >
              <option value="">Select frequency</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
              <option value="Morning & Evening">Morning & Evening</option>
              <option value="3 times a day">3 times a day</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            <Clock className="inline h-4 w-4 mr-1" />
            Time *
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 font-medium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Start Date *
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              End Date *
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              min={startDate || new Date().toISOString().split("T")[0]}
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 font-medium"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all disabled:bg-slate-400"
        >
          {loading ? "Adding..." : "Add Reminder"}
        </button>
      </form>
    </div>
  );
}
