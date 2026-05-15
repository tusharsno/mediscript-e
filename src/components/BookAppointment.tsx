"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, User, Stethoscope, ChevronDown } from "lucide-react";

interface Doctor {
  id: string;
  specialization: string;
  licenseNo: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

export default function BookAppointment() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);

  useEffect(() => {
    fetch("/api/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error(err));
  }, []);

  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !date || !time) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId: selectedDoctor, date, time, reason }),
      });

      if (res.ok) {
        setSuccess(true);
        setSelectedDoctor("");
        setDate("");
        setTime("");
        setReason("");
        setTimeout(() => {
          setSuccess(false);
          window.location.reload();
        }, 1500);
      } else {
        const err = await res.json();
        alert("Error: " + err.message);
      }
    } catch {
      alert("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="appointments" className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden scroll-mt-20">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Calendar className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-base font-black text-slate-800">Book Appointment</h2>
          <p className="text-xs text-slate-400 font-medium">Schedule a visit with your doctor</p>
        </div>
      </div>

      <div className="p-6">
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-semibold text-sm text-center">
            ✅ Appointment booked successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Select Doctor *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 text-left transition-all ${
                  selectedDoctor ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"
                }`}
              >
                {selectedDoctorData ? (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-black text-sm">
                      {selectedDoctorData.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Dr. {selectedDoctorData.user.name}</p>
                      <p className="text-xs text-slate-500">{selectedDoctorData.specialization}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-400">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Choose a doctor</span>
                  </div>
                )}
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-10 overflow-hidden">
                  {doctors.length === 0 ? (
                    <p className="p-4 text-slate-400 text-sm text-center">No doctors available</p>
                  ) : (
                    doctors.map((doctor) => (
                      <button
                        key={doctor.id}
                        type="button"
                        onClick={() => { setSelectedDoctor(doctor.id); setDropdownOpen(false); }}
                        className={`w-full flex items-center gap-3 p-3 text-left hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-0 ${
                          selectedDoctor === doctor.id ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                          {doctor.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-slate-900 text-sm">Dr. {doctor.user.name}</p>
                          <p className="text-xs text-slate-500">{doctor.specialization}</p>
                        </div>
                        {selectedDoctor === doctor.id && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Time *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border-2 text-left transition-all ${
                    time ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {time ? (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="font-bold text-slate-900 text-sm">{time}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">Select time</span>
                    </div>
                  )}
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${timeDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {timeDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-10 overflow-hidden">
                    <div className="grid grid-cols-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => { setTime(slot); setTimeDropdownOpen(false); }}
                          className={`p-3 text-sm font-bold text-left border-b border-r border-slate-100 hover:bg-blue-50 transition-colors ${
                            time === slot ? "bg-blue-50 text-blue-600" : "text-slate-700"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Reason <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={2}
              placeholder="Brief description of your health concern..."
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 font-medium resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !selectedDoctor || !date || !time}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}
