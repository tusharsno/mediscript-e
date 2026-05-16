"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on dashboard and protected app routes
  const hiddenRoutes = [
    "/dashboard",
    "/admin",
    "/appointments",
    "/prescriptions",
    "/reminders",
    "/vault",
    "/users",
    "/contacts",
    "/settings",
    "/notifications",
    "/feedback",
  ];
  const shouldHideNavbar = hiddenRoutes.some(route => pathname.startsWith(route));
  
  if (shouldHideNavbar) return null;
  
  return <Navbar />;
}
