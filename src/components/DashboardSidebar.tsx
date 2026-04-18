"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Calendar,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Stethoscope,
} from "lucide-react";

const SIDEBAR_LINKS = {
  PATIENT: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard#appointments", label: "Appointments", icon: Calendar },
    { href: "/dashboard#reminders", label: "Medicine Reminders", icon: FileText },
    { href: "/dashboard#vault", label: "Medical Vault", icon: FolderOpen },
    { href: "/dashboard#prescriptions", label: "Prescriptions", icon: FileText },
  ],
  DOCTOR: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard#appointments", label: "Appointments", icon: Calendar },
    { href: "/dashboard#prescriptions", label: "Prescriptions", icon: FileText },
  ],
  ADMIN: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
  ],
};

const ROLE_STYLES: Record<string, { bg: string; text: string; badge: string }> = {
  DOCTOR: { bg: "from-blue-500 to-blue-700", text: "text-blue-600", badge: "bg-blue-50 text-blue-700 border-blue-200" },
  PATIENT: { bg: "from-emerald-500 to-teal-600", text: "text-emerald-600", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  ADMIN: { bg: "from-purple-500 to-purple-700", text: "text-purple-600", badge: "bg-purple-50 text-purple-700 border-purple-200" },
};

export default function DashboardSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = session?.user?.role as keyof typeof SIDEBAR_LINKS | undefined;
  const links = role ? SIDEBAR_LINKS[role] : [];
  const roleStyle = role ? ROLE_STYLES[role] : null;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-slate-200"
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 z-40 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-200">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black text-slate-900">MediScript</span>
            </Link>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${roleStyle?.bg ?? "from-blue-500 to-blue-700"} flex items-center justify-center text-white font-black text-lg shadow-sm`}>
                {session?.user?.name?.charAt(0).toUpperCase() ?? "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{session?.user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{session?.user?.email}</p>
              </div>
            </div>
            {roleStyle && (
              <span className={`mt-3 inline-block text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full border ${roleStyle.badge}`}>
                {role}
              </span>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    isActive
                      ? `${roleStyle?.text ?? "text-blue-600"} bg-slate-50`
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-slate-200 space-y-1">
            <Link
              href="/settings"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold text-sm text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
}
