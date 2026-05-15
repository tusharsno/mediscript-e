"use client";

import { useState, useEffect } from "react";
import { Bell, Clock, Calendar, Pill, Check, X, RotateCcw } from "lucide-react";

interface Reminder {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  time: string;
  startDate: string;
  endDate: string;
  taken: boolean;
  takenAt: string | null;
}

export default function MedicineReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = () => {
    fetch("/api/medicine-reminder")
      .then((res) => res.json())
      .then((data) => {
        setReminders(Array.isArray(data) ? data : data.reminders || []);
        setLoading(false);
      })
      .catch(() => {
        setReminders([]);
        setLoading(false);
      });
  };

  const handleMarkTaken = async (id: string, taken: boolean) => {
    try {
      const res = await fetch(`/api/medicine-reminder/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taken }),
      });
      if (res.ok) fetchReminders();
      else alert("Failed to update reminder");
    } catch {
      alert("Error updating reminder");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reminder?")) return;
    try {
      const res = await fetch(`/api/medicine-reminder/${id}`, { method: "DELETE" });
      if (res.ok) fetchReminders();
      else alert("Failed to delete reminder");
    } catch {
      alert("Error deleting reminder");
    }
  };

  const isActive = (reminder: Reminder) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(reminder.startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(reminder.endDate);
    end.setHours(23, 59, 59, 999);
    return today >= start && today <= end;
  };

  const activeReminders = reminders.filter(isActive);
  const inactiveReminders = reminders.filter((r) => !isActive(r));

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
        <div className="animate-spin h-6 w-6 border-2 border-purple-500 border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  if (reminders.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Bell className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-800">Medicine Reminders</h2>
            <p className="text-xs text-slate-400 font-medium">Your medication schedule</p>
          </div>
        </div>
        <div className="p-8 text-center">
          <Bell className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400 font-semibold">No reminders yet</p>
          <p className="text-slate-300 text-xs mt-1">Add your first medicine reminder above</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Bell className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-800">Medicine Reminders</h2>
            <p className="text-xs text-slate-400 font-medium">Your medication schedule</p>
          </div>
        </div>
        <span className="text-xs font-black bg-purple-50 text-purple-600 px-3 py-1 rounded-full">
          {activeReminders.length} Active
        </span>
      </div>

      <div className="p-6 space-y-3">
        {/* Active Reminders */}
        {activeReminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`rounded-xl border p-4 transition-all ${
              reminder.taken
                ? "bg-green-50/50 border-green-200"
                : "bg-purple-50/30 border-purple-200"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  reminder.taken ? "bg-green-500" : "bg-purple-500"
                }`}>
                  <Pill className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-black text-slate-900 text-sm">{reminder.medicineName}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      reminder.taken
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }`}>
                      {reminder.taken ? "Taken" : "Pending"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{reminder.dosage} • {reminder.frequency}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {reminder.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(reminder.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {new Date(reminder.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  {reminder.taken && reminder.takenAt && (
                    <p className="text-xs text-green-600 font-semibold mt-1">
                      ✓ Taken at {new Date(reminder.takenAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {!reminder.taken ? (
                  <button
                    onClick={() => handleMarkTaken(reminder.id, true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Mark Taken
                  </button>
                ) : (
                  <button
                    onClick={() => handleMarkTaken(reminder.id, false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-500 hover:bg-slate-600 text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Undo
                  </button>
                )}
                <button
                  onClick={() => handleDelete(reminder.id)}
                  className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Inactive Reminders */}
        {inactiveReminders.length > 0 && (
          <>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-2">Inactive</p>
            {inactiveReminders.map((reminder) => (
              <div key={reminder.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-300 flex items-center justify-center flex-shrink-0">
                      <Pill className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-slate-500 text-sm">{reminder.medicineName}</p>
                      <p className="text-xs text-slate-400">{reminder.dosage} • {reminder.frequency}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(reminder.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-lg transition-colors flex-shrink-0"
                  >
                    <X className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
