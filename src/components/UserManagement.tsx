"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, Calendar, Users, CheckCircle, XCircle } from "lucide-react";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  doctorVerified: boolean;
  createdAt: string;
  doctorProfile?: {
    specialization: string;
    licenseNo: string;
  } | null;
  patientProfile?: {
    bloodGroup: string;
  } | null;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorVerification = async (userId: string, approve: boolean) => {
    if (!confirm(`Are you sure you want to ${approve ? "approve" : "reject"} this doctor?`)) return;

    setVerifying(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}/verify-doctor`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approve }),
      });

      if (res.ok) {
        if (approve) {
          setUsers(users.map((u) => u.id === userId ? { ...u, doctorVerified: true } : u));
        } else {
          setUsers(users.filter((u) => u.id !== userId));
        }
      } else {
        const data = await res.json();
        alert(data.error || "Action failed");
      }
    } catch {
      alert("Action failed");
    } finally {
      setVerifying(null);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    setDeleting(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });

      if (res.ok) {
        setUsers(users.filter((u) => u.id !== userId));
        alert("User deleted successfully");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete user");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete user");
    } finally {
      setDeleting(null);
    }
  };

  const getFilteredUsers = () => {
    if (filter === "PENDING") return users.filter((u) => u.role === "DOCTOR" && !u.doctorVerified);
    if (filter === "ALL") return users;
    return users.filter((u) => u.role === filter);
  };

  const getCount = (f: string) => {
    if (f === "ALL") return users.length;
    if (f === "PENDING") return users.filter((u) => u.role === "DOCTOR" && !u.doctorVerified).length;
    return users.filter((u) => u.role === f).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-600">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A6080] to-[#156070] rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-black">User Management</h1>
        </div>
        <p className="text-cyan-100 font-medium">Manage all platform users</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Filter Tabs */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-2 flex-wrap">
          {["ALL", "PATIENT", "DOCTOR", "PENDING", "ADMIN"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === f
                  ? "bg-slate-900 text-white"
                  : f === "PENDING" && getCount("PENDING") > 0
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f} ({getCount(f)})
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {getFilteredUsers().map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-900">{user.name || "No Name"}</p>
                      <p className="text-sm text-slate-600 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "DOCTOR"
                          ? "bg-purple-100 text-purple-700"
                          : user.role === "PATIENT"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.doctorProfile && (
                      <div className="text-sm">
                        <p className="text-slate-900 font-semibold">{user.doctorProfile.specialization}</p>
                        <p className="text-slate-600">License: {user.doctorProfile.licenseNo}</p>
                        {!user.doctorVerified && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                            Pending Approval
                          </span>
                        )}
                      </div>
                    )}
                    {user.patientProfile && (
                      <div className="text-sm">
                        <p className="text-slate-600">Blood: {user.patientProfile.bloodGroup}</p>
                      </div>
                    )}
                    {!user.doctorProfile && !user.patientProfile && (
                      <span className="text-sm text-slate-400">No profile</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.role === "DOCTOR" && !user.doctorVerified && (
                        <>
                          <button
                            onClick={() => handleDoctorVerification(user.id, true)}
                            disabled={verifying === user.id}
                            className="text-green-600 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Approve doctor"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDoctorVerification(user.id, false)}
                            disabled={verifying === user.id}
                            className="text-orange-500 hover:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Reject doctor"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(user.id)}
                        disabled={deleting === user.id}
                        className="text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {users.length === 0 && (
        <div className="text-center py-12 text-slate-500">No users found</div>
      )}
    </div>
  );
}
