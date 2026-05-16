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
  UserCog,
  MessageSquare,
  BarChart3,
  Home,
  Bell,
} from "lucide-react";
import UserAvatar from "@/components/UserAvatar";

const SIDEBAR_LINKS = {
  PATIENT: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
    { href: "/appointments", label: "Appointments", icon: Calendar },
    { href: "/reminders", label: "Medicine Reminders", icon: Bell },
    { href: "/vault", label: "Medical Vault", icon: FolderOpen },
    { href: "/prescriptions", label: "Prescriptions", icon: FileText },
    { href: "/feedback", label: "Share Feedback", icon: MessageSquare },
  ],
  DOCTOR: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
    { href: "/appointments", label: "Appointments", icon: Calendar },
    { href: "/prescriptions", label: "Prescriptions", icon: FileText },
    { href: "/feedback", label: "Share Feedback", icon: MessageSquare },
  ],
  ADMIN: [
    { href: "/dashboard", label: "Overview", icon: BarChart3, exact: true },
    { href: "/users", label: "User Management", icon: UserCog },
    { href: "/appointments", label: "Appointments", icon: Calendar },
    { href: "/contacts", label: "Contact Messages", icon: MessageSquare },
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

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(href + "/");
  };

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
          <div className="px-4 py-5 border-b border-slate-200">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="relative">
                <UserAvatar
                  name={session?.user?.name}
                  image={session?.user?.image}
                  size={56}
                  className="rounded-full ring-2 ring-slate-100"
                  gradient={roleStyle?.bg ?? "from-blue-500 to-blue-700"}
                />
                {roleStyle && (
                  <span className={`absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full border-2 border-white bg-gradient-to-br ${roleStyle.bg}`} />
                )}
              </div>
              <div className="min-w-0 w-full">
                <p className="text-sm font-black text-slate-900 truncate">{session?.user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate mt-0.5" title={session?.user?.email ?? ""}>{session?.user?.email}</p>
              </div>
              {roleStyle && (
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${roleStyle.badge}`}>
                  {role}
                </span>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {/* Home */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all border-b border-slate-100 mb-2 pb-3"
            >
              <Home className="h-5 w-5" />
              Home
            </Link>

            {/* Dashboard section label */}
            <p className="text-xs font-bold text-slate-500 px-4 pt-1 pb-2">Dashboard</p>

            {links.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href, link.exact);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all relative ${
                    active
                      ? `${roleStyle?.text ?? "text-blue-600"} bg-slate-50 font-bold`
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {active && (
                    <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full ${roleStyle?.bg ? `bg-gradient-to-b ${roleStyle.bg}` : "bg-blue-500"}`} />
                  )}
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                pathname === "/settings"
                  ? `${roleStyle?.text ?? "text-blue-600"} bg-slate-50 font-bold`
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
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
