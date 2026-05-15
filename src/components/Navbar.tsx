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
  Layers,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const NAV_LINKS = {
  PUBLIC: [
    { href: "/#features", label: "Features", icon: Layers },
    { href: "/#contact", label: "Contact", icon: Phone },
  ],
  PATIENT: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard#vault", label: "Health Records", icon: FolderOpen },
    { href: "/dashboard#prescriptions", label: "Prescriptions", icon: FileText },
  ],
  DOCTOR: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard#prescriptions", label: "Prescriptions", icon: FileText },
    { href: "/dashboard#appointments", label: "Appointments", icon: Calendar },
  ],
  ADMIN: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard#users", label: "Users", icon: Users },
  ],
};

const ROLE_STYLES: Record<string, { badge: string; dot: string; avatar: string }> = {
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

function NotificationBell() {
  const { data: session } = useSession();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set());
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedDismissed = localStorage.getItem("dismissedNotifications");
    if (storedDismissed) {
      setDismissed(new Set(JSON.parse(storedDismissed)));
    }
    const storedRead = localStorage.getItem("readNotifications");
    if (storedRead) {
      setReadNotifications(new Set(JSON.parse(storedRead)));
    }
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      const notificationsWithReadStatus = (data.notifications || []).map((n: any) => ({
        ...n,
        read: readNotifications.has(n.id) || n.read,
      }));
      setNotifications(notificationsWithReadStatus);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (notificationsOpen && session) {
      fetchNotifications();
    }
  }, [notificationsOpen, session]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const visibleNotifications = notifications.filter((n) => !dismissed.has(n.id));
  const unreadCount = visibleNotifications.filter((n) => !n.read && !readNotifications.has(n.id)).length;

  const markAsRead = (id: string) => {
    const newReadNotifications = new Set(readNotifications);
    newReadNotifications.add(id);
    setReadNotifications(newReadNotifications);
    localStorage.setItem("readNotifications", JSON.stringify(Array.from(newReadNotifications)));
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id: string) => {
    const newDismissed = new Set(dismissed);
    newDismissed.add(id);
    setDismissed(newDismissed);
    localStorage.setItem("dismissedNotifications", JSON.stringify(Array.from(newDismissed)));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "prescription":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "reminder":
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-slate-500" />;
    }
  };

  const formatTime = (isoTime: string) => {
    const date = new Date(isoTime);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative" ref={notificationRef}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setNotificationsOpen(!notificationsOpen)}
        className="relative p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full">
            <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {notificationsOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden z-50"
          >
            <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded-full">
                  {unreadCount} New
                </span>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <Bell className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400 font-medium">No notifications yet</p>
                </div>
              ) : (
                visibleNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className={`px-4 py-3 border-b border-slate-100 transition-colors group ${
                      notification.read || readNotifications.has(notification.id)
                        ? "bg-white hover:bg-slate-50"
                        : "bg-blue-50/50 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div onClick={() => markAsRead(notification.id)} className="cursor-pointer flex-1">
                            <p className="text-xs font-bold text-slate-900">{notification.title}</p>
                            <p className="text-xs text-slate-600 mt-1">{notification.message}</p>
                            <p className="text-[10px] text-slate-400 mt-2">{formatTime(notification.time)}</p>
                          </div>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 flex-shrink-0"
                            title="Dismiss"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {!notification.read && !readNotifications.has(notification.id) && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full inline-block mt-2" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {visibleNotifications.length > 0 && (
              <div className="px-4 py-2 bg-slate-50/80 border-t border-slate-100">
                <Link
                  href="/notifications"
                  onClick={() => setNotificationsOpen(false)}
                  className="block w-full text-xs font-semibold text-blue-600 hover:text-blue-700 py-2 transition-colors text-center"
                >
                  View All Notifications →
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SearchModal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handler);
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults({});
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || {});
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
    setResults({});
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const hasResults = Object.keys(results).some((key) => results[key]?.length > 0);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        title="Search (Ctrl+K)"
      >
        <Search className="h-4 w-4" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[10vh] px-4">
              <motion.div
                ref={searchRef}
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-200">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search doctors, appointments, prescriptions..."
                    className="flex-1 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
                  />
                  {loading && (
                    <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    ESC
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {!query.trim() ? (
                    <div className="p-8 text-center">
                      <Search className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-slate-400">Start typing to search...</p>
                      <p className="text-xs text-slate-300 mt-1">Try searching for doctors, appointments, or prescriptions</p>
                    </div>
                  ) : loading ? (
                    <div className="p-8 text-center">
                      <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto" />
                    </div>
                  ) : !hasResults ? (
                    <div className="p-8 text-center">
                      <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-slate-600">No results found</p>
                      <p className="text-xs text-slate-400 mt-1">Try a different search term</p>
                    </div>
                  ) : (
                    <div className="p-2">
                      {/* Doctors */}
                      {results.doctors?.length > 0 && (
                        <div className="mb-4">
                          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-3 py-2 flex items-center gap-2">
                            <Users className="h-3.5 w-3.5" />
                            Doctors ({results.doctors.length})
                          </h3>
                          <div className="space-y-1">
                            {results.doctors.map((doctor: any) => (
                              <a
                                key={doctor.id}
                                href="/dashboard#book-appointment"
                                onClick={handleResultClick}
                                className="block px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors group cursor-pointer"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                                      {doctor.name}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">{doctor.specialization}</p>
                                  </div>
                                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                                    {doctor.licenseNo}
                                  </span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Patients (Doctor only) */}
                      {results.patients?.length > 0 && (
                        <div className="mb-4">
                          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-3 py-2 flex items-center gap-2">
                            <Users className="h-3.5 w-3.5" />
                            Patients ({results.patients.length})
                          </h3>
                          <div className="space-y-1">
                            {results.patients.map((patient: any) => (
                              <div
                                key={patient.id}
                                className="px-3 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors cursor-pointer"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="text-sm font-bold text-slate-900">{patient.name}</p>
                                    <p className="text-xs text-slate-500 mt-0.5">{patient.email}</p>
                                  </div>
                                  <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                    {patient.bloodGroup}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Appointments */}
                      {results.appointments?.length > 0 && (
                        <div className="mb-4">
                          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-3 py-2 flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5" />
                            Appointments ({results.appointments.length})
                          </h3>
                          <div className="space-y-1">
                            {results.appointments.map((apt: any) => (
                              <a
                                key={apt.id}
                                href="/dashboard#appointments"
                                onClick={handleResultClick}
                                className="block px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors group cursor-pointer"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                                      {apt.doctorName || apt.patientName}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                      {formatDate(apt.date)} at {apt.time}
                                    </p>
                                  </div>
                                  <span
                                    className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                                      apt.status === "CONFIRMED"
                                        ? "bg-green-100 text-green-700"
                                        : apt.status === "PENDING"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : apt.status === "COMPLETED"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                                  >
                                    {apt.status}
                                  </span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Prescriptions */}
                      {results.prescriptions?.length > 0 && (
                        <div className="mb-4">
                          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-3 py-2 flex items-center gap-2">
                            <FileText className="h-3.5 w-3.5" />
                            Prescriptions ({results.prescriptions.length})
                          </h3>
                          <div className="space-y-1">
                            {results.prescriptions.map((presc: any) => (
                              <a
                                key={presc.id}
                                href="/dashboard#prescriptions"
                                onClick={handleResultClick}
                                className="block px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors group cursor-pointer"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="text-sm font-bold text-slate-900 group-hover:text-green-600">
                                      {presc.diagnosis}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                      {presc.doctorName || presc.patientName} • {formatDate(presc.date)}
                                    </p>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Users (Admin only) */}
                      {results.users?.length > 0 && (
                        <div className="mb-4">
                          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-3 py-2 flex items-center gap-2">
                            <Users className="h-3.5 w-3.5" />
                            Users ({results.users.length})
                          </h3>
                          <div className="space-y-1">
                            {results.users.map((user: any) => (
                              <a
                                key={user.id}
                                href="/dashboard#users"
                                onClick={handleResultClick}
                                className="block px-3 py-2.5 rounded-xl hover:bg-purple-50 transition-colors group cursor-pointer"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="text-sm font-bold text-slate-900 group-hover:text-purple-600">
                                      {user.name}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                                  </div>
                                  <span
                                    className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                                      user.role === "ADMIN"
                                        ? "bg-purple-100 text-purple-700"
                                        : user.role === "DOCTOR"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-emerald-100 text-emerald-700"
                                    }`}
                                  >
                                    {user.role}
                                  </span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Contact Messages (Admin only) */}
                      {results.contacts?.length > 0 && (
                        <div className="mb-4">
                          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-3 py-2 flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5" />
                            Contact Messages ({results.contacts.length})
                          </h3>
                          <div className="space-y-1">
                            {results.contacts.map((contact: any) => (
                              <a
                                key={contact.id}
                                href="/dashboard#contacts"
                                onClick={handleResultClick}
                                className="block px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                              >
                                <div>
                                  <p className="text-sm font-bold text-slate-900">{contact.name}</p>
                                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{contact.message}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <p className="text-xs text-slate-400 font-medium">Press ESC to close</p>
                  <p className="text-xs text-slate-400 font-medium">Ctrl+K to open</p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  const role = session?.user?.role as keyof typeof NAV_LINKS | undefined;
  const navLinks = role ? (NAV_LINKS[role] ?? NAV_LINKS.PUBLIC) : NAV_LINKS.PUBLIC;
  const roleStyle = role ? ROLE_STYLES[role] : null;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
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
        <div className="flex items-center gap-0 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <Image src="/logo.png" alt="MediScript Logo" width={56} height={36} className="rounded-full object-cover" />
            <span className="text-[1.65rem] font-black tracking-tight text-slate-900">MediScript</span>
          </Link>

          <div className="hidden md:block w-px h-6 bg-slate-300 mx-5" />

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
                  <motion.div key={link.href} variants={linkVariants} initial="rest" whileHover="hover">
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
              
              {/* More Dropdown for Public Users */}
              {!session && (
                <div className="relative" ref={moreDropdownRef}>
                  <motion.button
                    variants={linkVariants}
                    initial="rest"
                    whileHover="hover"
                    onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                    className="flex items-center gap-1.5 px-4 py-2 text-slate-900 hover:text-teal-600 hover:bg-teal-50/80 rounded-full text-sm font-semibold transition-colors cursor-pointer"
                  >
                    More
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-200 ${
                        moreDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {moreDropdownOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden"
                      >
                        <div className="p-1.5">
                          <a
                            href="/#how-it-works"
                            onClick={() => setMoreDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl text-xs font-semibold transition-all"
                          >
                            <CheckCircle className="h-3.5 w-3.5" /> How It Works
                          </a>
                          <a
                            href="/#pricing"
                            onClick={() => setMoreDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl text-xs font-semibold transition-all"
                          >
                            <Layers className="h-3.5 w-3.5" /> Pricing
                          </a>
                          <a
                            href="/#faq"
                            onClick={() => setMoreDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl text-xs font-semibold transition-all"
                          >
                            <AlertCircle className="h-3.5 w-3.5" /> FAQ
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

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
                <SearchModal />
                <NotificationBell />

                <div className="relative ml-1" ref={dropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all"
                  >
                    <div className="relative">
                      <div
                        className={`w-7 h-7 rounded-full bg-gradient-to-br ${
                          roleStyle?.avatar ?? "from-blue-500 to-blue-700"
                        } flex items-center justify-center text-white font-black text-xs shadow-sm`}
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
                      className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden"
                      >
                        <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-100">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-xl bg-gradient-to-br ${
                                roleStyle?.avatar ?? "from-blue-500 to-blue-700"
                              } flex items-center justify-center text-white font-black text-sm`}
                            >
                              {session.user?.name?.charAt(0).toUpperCase() ?? "U"}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-black text-slate-800 truncate">{session.user?.name}</p>
                              <p className="text-[10px] text-slate-400 truncate">{session.user?.email}</p>
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

                        <div className="p-1.5">
                          <Link
                            href="/dashboard"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl text-xs font-semibold transition-all"
                          >
                            <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
                          </Link>
                          <Link
                            href="/settings"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl text-xs font-semibold transition-all"
                          >
                            <Settings className="h-3.5 w-3.5" /> Settings
                          </Link>
                        </div>

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
                  <motion.a
                    href="tel:+8801987414889"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    title="Call Us: +880 1987-414889"
                  >
                    <Phone className="h-4 w-4" />
                  </motion.a>
                  <motion.a
                    href="mailto:tusharcoder269@gmail.com"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    title="Email: tusharcoder269@gmail.com"
                  >
                    <Mail className="h-4 w-4" />
                  </motion.a>
                  <motion.a
                    href="https://maps.google.com/?q=USTC+University+Chittagong+Bangladesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    title="Location: USTC University, Chittagong"
                  >
                    <MapPin className="h-4 w-4" />
                  </motion.a>
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

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-all"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>
      </nav>

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
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                        roleStyle?.avatar ?? "from-blue-500 to-blue-700"
                      } flex items-center justify-center text-white font-black shadow-sm`}
                    >
                      {session.user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-slate-700 truncate">{session.user?.name}</p>
                      <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
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
