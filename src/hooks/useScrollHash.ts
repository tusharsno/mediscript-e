"use client";

import { useEffect } from "react";

export default function useScrollHash() {
  useEffect(() => {
    let ticking = false;

    const updateHash = () => {
      const featuresSection = document.getElementById("features");
      if (!featuresSection) return;

      const scrollY = window.scrollY;
      const featuresTop = featuresSection.offsetTop - 100;
      const currentHash = window.location.hash;

      // Remove hash when scrolling back to hero
      if (scrollY < featuresTop && currentHash === "#features") {
        window.history.replaceState(null, "", window.location.pathname);
      }
      // Add hash when scrolling to features (only if no hash exists)
      else if (scrollY >= featuresTop && !currentHash) {
        window.history.replaceState(null, "", window.location.pathname + "#features");
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHash);
        ticking = true;
      }
    };

    // Clean up duplicate hashes on mount
    if (window.location.hash.includes("#features#features")) {
      window.history.replaceState(null, "", window.location.pathname + "#features");
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
