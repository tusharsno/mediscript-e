"use client";

import { useEffect, useState } from "react";
import { Users, Calendar, FileText, MessageSquare, UserCheck, UserX } from "lucide-react";

interface Statistics {
  totalUsers: number;
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  totalPrescriptions: number;
  totalContactMessages: number;
}

interface RecentUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data.statistics);
      setRecentUsers(data.recentUsers);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-600">Loading statistics...</div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      border: "border-blue-100",
    },
    {
      title: "Patients",
      value: stats?.totalPatients || 0,
      icon: UserCheck,
      color: "bg-emerald-50",
      iconColor: "text-emerald-600",
      border: "border-emerald-100",
    },
    {
      title: "Doctors",
      value: stats?.totalDoctors || 0,
      icon: UserX,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
      border: "border-purple-100",
    },
    {
      title: "Appointments",
      value: stats?.totalAppointments || 0,
      icon: Calendar,
      color: "bg-orange-50",
      iconColor: "text-orange-600",
      border: "border-orange-100",
    },
    {
      title: "Prescriptions",
      value: stats?.totalPrescriptions || 0,
      icon: FileText,
      color: "bg-cyan-50",
      iconColor: "text-cyan-600",
      border: "border-cyan-100",
    },
    {
      title: "Contact Messages",
      value: stats?.totalContactMessages || 0,
      icon: MessageSquare,
      color: "bg-pink-50",
      iconColor: "text-pink-600",
      border: "border-pink-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A6080] to-[#156070] rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-black">Admin Dashboard</h1>
        </div>
        <p className="text-cyan-100 font-medium">Platform overview and statistics</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl ${card.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-7 w-7 ${card.iconColor}`} />
                  </div>
                  <div className={`px-3 py-1 rounded-full ${card.color} border ${card.border}`}>
                    <span className={`text-xs font-bold ${card.iconColor}`}>LIVE</span>
                  </div>
                </div>
                <h3 className="text-slate-600 text-sm font-bold mb-2 uppercase tracking-wide">{card.title}</h3>
                <p className="text-4xl font-black text-slate-900 group-hover:text-slate-800 transition-colors">{card.value}</p>
              </div>
              
              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          );
        })}
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Recent Users</h2>
              <p className="text-xs text-slate-500 font-medium">Latest registered users</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-3">
          {recentUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div>
                <p className="font-bold text-slate-900">{user.name || "No Name"}</p>
                <p className="text-sm text-slate-600">{user.email}</p>
              </div>
              <div className="text-right">
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
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
