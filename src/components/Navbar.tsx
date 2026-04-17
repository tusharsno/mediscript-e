"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  FolderOpen,
  Users,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  Settings,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Shield,
  Layers,
} from "lucide-react";

// ─── Role-based Nav Links ───────────────────────────────────────────────────
const NAV_LINKS = {
  PUBLIC: [
    { href: "/#features", label: "Features", icon: Layers },
    { href: "/#security", label: "Security", icon: Shield },
    { href: "/#contact", label: "Contact", icon: Phone },
  ],
  PATIENT: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard#vault", label: "Health Records", icon: FolderOpen },
    {
      href: "/dashboard#prescriptions",
      label: "Prescriptions",
      icon: FileText,
    },
  ],
  DOCTOR: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    {
      href: "/dashboard#prescriptions",
      label: "Prescriptions",
      icon: FileText,
    },
    { href: "/dashboard#appointments", label: "Appointments", icon: Calendar },
  ],
  ADMIN: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
  ],
};

const ROLE_STYLES: Record<
  string,
  { badge: string; dot: string; avatar: string }
> = {
  DOCTOR: {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    avatar: "from-blue-500 to-blue-700",
  },
  PATIENT: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    avatar: "from-emerald-500 to-teal-600",
  },
  ADMIN: {
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
    avatar: "from-purple-500 to-purple-700",
  },
};

// ─── Animation Variants ─────────────────────────────────────────────────────
const navbarVariants: Variants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.15, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.1 } },
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

const linkVariants: Variants = {
  rest: { y: 0 },
  hover: { y: -2, transition: { duration: 0.15 } },
};

// ─── Notification Bell ──────────────────────────────────────────────────────
function NotificationBell() {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
    >
      <Bell className="h-4 w-4" />
      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full">
        <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
      </span>
    </motion.button>
  );
}

// ─── Search Button ──────────────────────────────────────────────────────────
function SearchButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
    >
      <Search className="h-4 w-4" />
    </motion.button>
  );
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const role = session?.user?.role as keyof typeof NAV_LINKS | undefined;
  const navLinks = role
    ? (NAV_LINKS[role] ?? NAV_LINKS.PUBLIC)
    : NAV_LINKS.PUBLIC;
  const roleStyle = role ? ROLE_STYLES[role] : null;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <motion.div
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 px-6 pt-3.5"
    >
      <nav className="max-w-7xl mx-auto bg-white/100 backdrop-blur-lg border border-slate-200/70 rounded-full shadow-lg shadow-slate-200/50 px-8 h-[4.5rem] flex items-center justify-between">
        {/* ── Logo + Nav Links (Left Side) ── */}
        <div className="flex items-center gap-0 flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <Image
              src="/logo.png"
              alt="MediScript Logo"
              width={56}
              height={36}
              className="rounded-full object-cover"
            />
            <span className="text-[1.65rem] font-black tracking-tight text-slate-900">
              MediScript
            </span>
          </Link>

          {/* Vertical Divider */}
          {!session && (
            <div className="hidden md:block w-px h-6 bg-slate-300 mx-5" />
          )}

          {/* ── Desktop Nav Links ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={session ? "auth" : "public"}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="hidden md:flex items-center gap-0.5"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.href}
                    variants={linkVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-1.5 px-4 py-2 text-slate-900 hover:text-teal-600 hover:bg-teal-50/80 rounded-full text-sm font-semibold transition-colors"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Right Side ── */}
        <div className="hidden md:flex items-center gap-1">
          <AnimatePresence mode="wait">
            {session ? (
              <motion.div
                key="authenticated"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1"
              >
                <SearchButton />
                <NotificationBell />

                {/* Avatar Dropdown */}
                <div className="relative ml-1" ref={dropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all"
                  >
                    <div className="relative">
                      <div
                        className={`w-7 h-7 rounded-full bg-gradient-to-br ${roleStyle?.avatar ?? "from-blue-500 to-blue-700"} flex items-center justify-center text-white font-black text-xs shadow-sm`}
                      >
                        {session.user?.name?.charAt(0).toUpperCase() ?? "U"}
                      </div>
                      {roleStyle && (
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${roleStyle.dot}`}
                        />
                      )}
                    </div>
                    <span className="text-sm font-bold text-slate-700 max-w-[80px] truncate">
                      {session.user?.name?.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden"
                      >
                        {/* Header */}
                        <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-100">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-xl bg-gradient-to-br ${roleStyle?.avatar ?? "from-blue-500 to-blue-700"} flex items-center justify-center text-white font-black text-sm`}
                            >
                              {session.user?.name?.charAt(0).toUpperCase() ??
                                "U"}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-black text-slate-800 truncate">
                                {session.user?.name}
                              </p>
                              <p className="text-[10px] text-slate-400 truncate">
                                {session.user?.email}
                              </p>
                            </div>
                          </div>
                          {roleStyle && (
                            <span
                              className={`mt-2 inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${roleStyle.badge}`}
                            >
                              {role}
                            </span>
                          )}
                        </div>

                        {/* Links */}
                        <div className="p-1.5">
                          <Link
                            href="/dashboard"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl text-xs font-semibold transition-all"
                          >
                            <LayoutDashboard className="h-3.5 w-3.5" />{" "}
                            Dashboard
                          </Link>
                          <Link
                            href="/settings"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl text-xs font-semibold transition-all"
                          >
                            <Settings className="h-3.5 w-3.5" /> Settings
                          </Link>
                        </div>

                        {/* Sign Out */}
                        <div className="p-1.5 border-t border-slate-100">
                          <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex items-center gap-2.5 w-full px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl text-xs font-semibold transition-all"
                          >
                            <LogOut className="h-3.5 w-3.5" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="unauthenticated"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-3 mr-2 text-slate-500">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    title="Contact"
                  >
                    <Phone className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    title="Mail"
                  >
                    <Mail className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    title="Location"
                  >
                    <MapPin className="h-4 w-4" />
                  </motion.button>
                </div>
                <Link
                  href="/login"
                  className="px-4 py-2 text-slate-900 font-semibold text-sm hover:text-teal-600 transition-colors rounded-full hover:bg-teal-50"
                >
                  Log In
                </Link>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/register"
                    style={{ backgroundColor: "#1A6080" }}
                    className="h-[3.5rem] px-5 flex items-center justify-center text-white rounded-full font-bold text-sm shadow-md hover:opacity-80 transition-opacity"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Mobile Hamburger ── */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-all"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden max-w-6xl mx-auto mt-2 bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {session ? (
                <>
                  {/* User Card */}
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleStyle?.avatar ?? "from-blue-500 to-blue-700"} flex items-center justify-center text-white font-black shadow-sm`}
                    >
                      {session.user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-slate-700 truncate">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                    {roleStyle && (
                      <span
                        className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full border ${roleStyle.badge}`}
                      >
                        {role}
                      </span>
                    )}
                  </div>

                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 w-full px-4 py-3 text-slate-600 font-semibold text-sm hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all"
                      >
                        <Icon className="h-4 w-4" /> {link.label}
                      </Link>
                    );
                  })}

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center gap-2.5 w-full px-4 py-3 text-red-500 font-semibold text-sm hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 w-full px-4 py-3 text-slate-600 font-semibold text-sm hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all"
                      >
                        <Icon className="h-4 w-4" /> {link.label}
                      </Link>
                    );
                  })}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center text-slate-600 font-semibold text-sm hover:bg-slate-50 rounded-2xl transition-all"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center bg-blue-600 text-white font-bold text-sm rounded-2xl shadow-md shadow-blue-100 hover:bg-blue-700 transition-all"
                    >
                      Get Started
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
