import { useState, useEffect } from "react";

/**
 * Custom hook for responsive design
 * Returns breakpoint information and prefers-reduced-motion
 */
export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState("mobile");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleReducedMotion = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleReducedMotion);

    // Check breakpoints
    const updateBreakpoint = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setBreakpoint("mobile");
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width >= 640 && width < 1024) {
        setBreakpoint("tablet");
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else if (width >= 1024 && width < 1440) {
        setBreakpoint("laptop");
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true); // Laptop counts as desktop for cursor effects
      } else {
        setBreakpoint("desktop");
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      }
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);

    return () => {
      mediaQuery.removeEventListener("change", handleReducedMotion);
      window.removeEventListener("resize", updateBreakpoint);
    };
  }, []);

  return {
    breakpoint,
    prefersReducedMotion,
    isMobile,
    isTablet,
    isDesktop,
    width: typeof window !== "undefined" ? window.innerWidth : 0
  };
};

