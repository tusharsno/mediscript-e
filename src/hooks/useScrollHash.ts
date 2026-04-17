"use client";

import { useEffect } from "react";

export default function useScrollHash() {
  useEffect(() => {
    let ticking = false;

    const updateHash = () => {
      const featuresSection = document.getElementById("features");
      const securitySection = document.getElementById("security");
      const contactSection = document.getElementById("contact");
      if (!featuresSection || !securitySection || !contactSection) return;

      const scrollY = window.scrollY;
      const featuresTop = featuresSection.offsetTop - 100;
      const securityTop = securitySection.offsetTop - 100;
      const contactTop = contactSection.offsetTop - 100;
      const currentHash = window.location.hash;

      if (scrollY < featuresTop) {
        if (currentHash) {
          window.history.replaceState(null, "", window.location.pathname);
        }
      } else if (scrollY >= featuresTop && scrollY < securityTop) {
        if (currentHash !== "#features") {
          window.history.replaceState(null, "", window.location.pathname + "#features");
        }
      } else if (scrollY >= securityTop && scrollY < contactTop) {
        if (currentHash !== "#security") {
          window.history.replaceState(null, "", window.location.pathname + "#security");
        }
      } else if (scrollY >= contactTop) {
        if (currentHash !== "#contact") {
          window.history.replaceState(null, "", window.location.pathname + "#contact");
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHash);
        ticking = true;
      }
    };

    const hash = window.location.hash;
    if (hash.includes("#features#features") || hash.includes("#security#security") || hash.includes("#contact#contact")) {
      const cleanHash = hash.includes("features") ? "#features" : hash.includes("security") ? "#security" : "#contact";
      window.history.replaceState(null, "", window.location.pathname + cleanHash);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
