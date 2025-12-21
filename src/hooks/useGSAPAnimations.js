import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useResponsive } from "./useResponsive";

/**
 * Custom hook for GSAP animations with responsive support
 */
export const useGSAPAnimations = (animations) => {
  const containerRef = useRef(null);
  const { prefersReducedMotion, isMobile, isTablet, isDesktop } = useResponsive();
  const mm = gsap.matchMedia();

  useEffect(() => {
    if (prefersReducedMotion) {
      // Minimal animations for reduced motion
      if (containerRef.current) {
        gsap.set(containerRef.current, { opacity: 1 });
      }
      return;
    }

    // Desktop animations
    mm.add("(min-width: 1024px)", () => {
      if (animations.desktop && containerRef.current) {
        animations.desktop(containerRef.current, gsap);
      }
    });

    // Tablet animations
    mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
      if (animations.tablet && containerRef.current) {
        animations.tablet(containerRef.current, gsap);
      }
    });

    // Mobile animations
    mm.add("(max-width: 639px)", () => {
      if (animations.mobile && containerRef.current) {
        animations.mobile(containerRef.current, gsap);
      }
    });

    return () => {
      mm.revert();
    };
  }, [prefersReducedMotion, isMobile, isTablet, isDesktop]);

  return containerRef;
};

