"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on dashboard and admin routes
  const hiddenRoutes = ["/dashboard", "/admin"];
  const shouldHideNavbar = hiddenRoutes.some(route => pathname.startsWith(route));
  
  if (shouldHideNavbar) return null;
  
  return <Navbar />;
}
