"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Route changed — complete the bar
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(100);
    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);
  }, [pathname, searchParams]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // Expose start function via custom event
  useEffect(() => {
    const handleStart = () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      setProgress(0);
      setVisible(true);
      let p = 0;
      timerRef.current = setInterval(() => {
        p += Math.random() * 15;
        if (p >= 85) {
          p = 85;
          if (timerRef.current) clearInterval(timerRef.current);
        }
        setProgress(p);
      }, 150);
    };
    window.addEventListener("navigation-start", handleStart);
    return () => window.removeEventListener("navigation-start", handleStart);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-[#1A6080] transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
