"use client";

import { useState, useEffect } from "react";
import { Bell, Clock, Calendar, Pill, Check, X } from "lucide-react";

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
        setReminders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
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

      if (res.ok) {
        fetchReminders();
      } else {
        alert("Failed to update reminder");
      }
    } catch {
      alert("Error updating reminder");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reminder?")) return;

    try {
      const res = await fetch(`/api/medicine-reminder/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Reminder deleted");
        fetchReminders();
      } else {
        alert("Failed to delete reminder");
      }
    } catch {
      alert("Error deleting reminder");
    }
  };

  const isActive = (reminder: Reminder) => {
    const today = new Date();
    const start = new Date(reminder.startDate);
    const end = new Date(reminder.endDate);
    return today >= start && today <= end;
  };

  if (loading) {
    return <div className="text-center py-8 text-slate-400">Loading reminders...</div>;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Bell className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-800">Medicine Reminders</h2>
            <p className="text-xs text-slate-400 font-medium">Your medication schedule</p>
          </div>
        </div>
        <span className="text-xs font-black bg-purple-50 text-purple-600 px-3 py-1 rounded-full uppercase">
          {reminders.filter(isActive).length} Active
        </span>
      </div>

      <div className="p-6">
        {reminders.length === 0 ? (
          <div className="text-center py-10">
            <Bell className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 font-semibold">No reminders yet</p>
            <p className="text-slate-300 text-xs mt-1">Add your first medicine reminder above</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reminders.map((reminder) => {
              const active = isActive(reminder);
              return (
                <div
                  key={reminder.id}
                  className={`p-5 rounded-xl border transition-all ${
                    active
                      ? "bg-purple-50/50 border-purple-200"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Pill className="h-4 w-4 text-purple-600" />
                        <h3 className="font-black text-slate-900">
                          {reminder.medicineName}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        {reminder.dosage} • {reminder.frequency}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        active
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{reminder.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">
                        {new Date(reminder.startDate).toLocaleDateString()} -{" "}
                        {new Date(reminder.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {reminder.taken && reminder.takenAt && (
                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg mb-3">
                      <p className="text-xs text-green-700 font-bold">
                        ✓ Taken at {new Date(reminder.takenAt).toLocaleString()}
                      </p>
                    </div>
                  )}

                  {active && (
                    <div className="flex gap-2">
                      {!reminder.taken ? (
                        <button
                          onClick={() => handleMarkTaken(reminder.id, true)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-lg transition-colors"
                        >
                          <Check className="h-4 w-4" />
                          Mark as Taken
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkTaken(reminder.id, false)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-bold text-xs rounded-lg transition-colors"
                        >
                          Undo
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(reminder.id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {!active && (
                    <button
                      onClick={() => handleDelete(reminder.id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                      Delete Reminder
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
