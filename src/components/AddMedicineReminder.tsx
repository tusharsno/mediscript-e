"use client";

import { useState } from "react";
import { Bell, Calendar, Clock, Pill } from "lucide-react";

const FREQUENCY_OPTIONS = [
  { label: "Once a day", value: "Once a day", times: 1 },
  { label: "Twice a day", value: "Twice a day", times: 2 },
  { label: "3 times a day", value: "3 times a day", times: 3 },
  { label: "4 times a day", value: "4 times a day", times: 4 },
  { label: "Every morning", value: "Every morning", times: 1 },
  { label: "Every night", value: "Every night", times: 1 },
  { label: "Morning & Night", value: "Morning & Night", times: 2 },
  { label: "Morning, Afternoon & Night", value: "Morning, Afternoon & Night", times: 3 },
  { label: "As needed", value: "As needed", times: 1 },
];

const TIME_LABELS: Record<string, string[]> = {
  "Twice a day": ["First dose time", "Second dose time"],
  "Morning & Night": ["Morning time", "Night time"],
  "3 times a day": ["First dose time", "Second dose time", "Third dose time"],
  "Morning, Afternoon & Night": ["Morning time", "Afternoon time", "Night time"],
  "4 times a day": ["First dose time", "Second dose time", "Third dose time", "Fourth dose time"],
};

export default function AddMedicineReminder() {
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [times, setTimes] = useState<string[]>([""]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFrequencyChange = (value: string) => {
    setFrequency(value);
    const option = FREQUENCY_OPTIONS.find((o) => o.value === value);
    const count = option?.times || 1;
    setTimes(Array(count).fill(""));
  };

  const handleTimeChange = (index: number, value: string) => {
    const updated = [...times];
    updated[index] = value;
    setTimes(updated);
  };

  const getTimeLabel = (index: number): string => {
    const labels = TIME_LABELS[frequency];
    if (labels && labels[index]) return labels[index];
    return times.length === 1 ? "Time" : `Dose ${index + 1} time`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (times.some((t) => !t)) {
      alert("Please fill in all time fields");
      return;
    }
    setLoading(true);

    try {
      // Create one reminder per time
      const results = await Promise.all(
        times.map((time) =>
          fetch("/api/medicine-reminder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ medicineName, dosage, frequency, time, startDate, endDate }),
          })
        )
      );

      const allOk = results.every((r) => r.ok);
      if (allOk) {
        alert(`Medicine reminder${times.length > 1 ? "s" : ""} added successfully!`);
        setMedicineName("");
        setDosage("");
        setFrequency("");
        setTimes([""]);
        setStartDate("");
        setEndDate("");
        window.location.reload();
      } else {
        alert("Failed to add some reminders. Please try again.");
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
            <label className="block text-sm font-bold text-slate-700 mb-2">Dosage *</label>
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
            <label className="block text-sm font-bold text-slate-700 mb-2">Frequency *</label>
            <select
              value={frequency}
              onChange={(e) => handleFrequencyChange(e.target.value)}
              required
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 font-medium"
            >
              <option value="">Select frequency</option>
              {FREQUENCY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {frequency && (
          <div className={`grid gap-4 ${times.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
            {times.map((t, i) => (
              <div key={i}>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  {getTimeLabel(i)} *
                </label>
                <input
                  type="time"
                  value={t}
                  onChange={(e) => handleTimeChange(i, e.target.value)}
                  required
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 font-medium"
                />
              </div>
            ))}
          </div>
        )}

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
          disabled={loading || !frequency}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all disabled:bg-slate-400"
        >
          {loading ? "Adding..." : `Add Reminder${times.length > 1 ? `s (${times.length})` : ""}`}
        </button>
      </form>
    </div>
  );
}
