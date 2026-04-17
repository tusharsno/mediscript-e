"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Record = {
  id: string;
  fileName: string;
  fileUrl: string;
  createdAt: Date;
};

export default function RecordItem({ record, index }: { record: Record; index: number }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(record.fileName);
  const [loading, setLoading] = useState(false);

  const ext = record.fileName.split(".").pop()?.toLowerCase() ?? "";
  const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
  const isPdf = ext === "pdf";

  const handleDelete = async () => {
    if (!confirm(`Delete "${record.fileName}"?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/vault/${record.id}`, { method: "DELETE" });
      if (res.ok) router.refresh();
      else alert("Failed to delete");
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!newName.trim() || newName === record.fileName) {
      setIsEditing(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/vault/${record.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: newName }),
      });
      if (res.ok) {
        setIsEditing(false);
        router.refresh();
      } else {
        alert("Failed to rename");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group flex items-center gap-4 p-4 bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-100 hover:border-blue-200 transition-all duration-200">
      {/* File Icon */}
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 shadow-sm">
        {isImage ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ) : isPdf ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
      </div>

      {/* File Name */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleRename(); if (e.key === "Escape") setIsEditing(false); }}
              className="w-full text-sm font-bold text-slate-700 border border-blue-300 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handleRename} disabled={loading} className="text-[10px] font-black text-white bg-blue-600 px-2 py-1 rounded-lg">
              Save
            </button>
            <button onClick={() => { setIsEditing(false); setNewName(record.fileName); }} className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
              Cancel
            </button>
          </div>
        ) : (
          <>
            <p className="font-bold text-slate-700 text-sm truncate">{record.fileName}</p>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">
              {ext} file • #{index + 1}
            </p>
          </>
        )}
      </div>

      {/* Actions */}
      {!isEditing && (
        <div className="flex-shrink-0 flex items-center gap-2">
          <a
            href={record.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-white group-hover:bg-blue-600 text-blue-600 group-hover:text-white px-3 py-2 rounded-lg border border-blue-200 group-hover:border-blue-600 font-bold text-xs transition-all duration-200 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View
          </a>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
            title="Rename"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition-all shadow-sm disabled:opacity-50"
            title="Delete"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
