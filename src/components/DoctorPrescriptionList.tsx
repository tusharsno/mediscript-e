"use client";

import { useState, useEffect } from "react";
import { FileText, Trash2, Pencil, Check, X, Calendar } from "lucide-react";

interface Prescription {
  id: string;
  diagnosis: string;
  medications: string;
  createdAt: string;
  patient: {
    bloodGroup: string;
    user: { name: string; email: string };
  };
}

export default function DoctorPrescriptionList() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [editDiagnosis, setEditDiagnosis] = useState("");
  const [editMedications, setEditMedications] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await fetch("/api/prescription");
      const data = await res.json();
      setPrescriptions(data.prescriptions || []);
    } catch {
      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (px: Prescription) => {
    setEditing(px.id);
    setEditDiagnosis(px.diagnosis);
    setEditMedications(px.medications);
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setEditDiagnosis("");
    setEditMedications("");
  };

  const handleSave = async (id: string) => {
    if (!editDiagnosis || !editMedications) {
      alert("All fields are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/prescription/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ diagnosis: editDiagnosis, medications: editMedications }),
      });
      if (res.ok) {
        setEditing(null);
        fetchPrescriptions();
      } else {
        alert("Failed to update prescription");
      }
    } catch {
      alert("Error updating prescription");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this prescription? Patient will no longer see it.")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/prescription/${id}`, { method: "DELETE" });
      if (res.ok) fetchPrescriptions();
      else alert("Failed to delete prescription");
    } catch {
      alert("Error deleting prescription");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
        <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <FileText className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-800">Issued Prescriptions</h2>
            <p className="text-xs text-slate-400 font-medium">All prescriptions you have issued</p>
          </div>
        </div>
        <span className="text-xs font-black bg-green-50 text-green-600 px-3 py-1 rounded-full">
          {prescriptions.length} Total
        </span>
      </div>

      <div className="p-6">
        {prescriptions.length === 0 ? (
          <div className="text-center py-10">
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 font-semibold">No prescriptions issued yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {prescriptions.map((px) => (
              <div key={px.id} className="rounded-xl border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-sm">
                      {px.patient.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{px.patient.user.name}</p>
                      <p className="text-xs text-slate-500">{px.patient.user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                      {px.patient.bloodGroup}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(px.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    {editing !== px.id && (
                      <>
                        <button
                          onClick={() => handleEdit(px)}
                          className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(px.id)}
                          disabled={deleting === px.id}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {editing === px.id ? (
                    <>
                      <div>
                        <label className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1 block">Diagnosis</label>
                        <textarea
                          value={editDiagnosis}
                          onChange={(e) => setEditDiagnosis(e.target.value)}
                          rows={2}
                          className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 font-medium text-sm resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1 block">Medications</label>
                        <textarea
                          value={editMedications}
                          onChange={(e) => setEditMedications(e.target.value)}
                          rows={3}
                          className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 font-medium text-sm resize-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(px.id)}
                          disabled={saving}
                          className="flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold text-xs rounded-lg transition-colors disabled:opacity-50"
                        >
                          <Check className="h-3.5 w-3.5" />
                          {saving ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-1.5 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-lg transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Diagnosis</p>
                        <p className="text-sm font-semibold text-slate-800">{px.diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Medications</p>
                        <p className="text-sm font-semibold text-slate-800 whitespace-pre-line">{px.medications}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
