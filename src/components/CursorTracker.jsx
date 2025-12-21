import { useEffect, useRef } from "react";
import { useResponsive } from "../hooks/useResponsive";
import { useTheme } from "../hooks/useTheme";

/**
 * Premium cursor tracking effect
 * Theme-aware, GPU-accelerated, desktop only
 */
const CursorTracker = () => {
  const cursorRef = useRef(null);
  const { isMobile, prefersReducedMotion, isDesktop } = useResponsive();
  const { isDark } = useTheme();

  useEffect(() => {
    // Disable on mobile, tablet, or reduced motion
    if (isMobile || prefersReducedMotion || !isDesktop) {
      if (cursorRef.current) {
        cursorRef.current.style.display = "none";
      }
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    // Smooth follow animation using requestAnimationFrame
    const updateCursor = () => {
      // Easing for smooth lag effect
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;

      // Use transform for GPU acceleration
      cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      cursor.style.opacity = "1";

      rafId = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(updateCursor);
      }
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    // Magnetic effect on interactive elements
    const handleMouseEnter = (e) => {
      if (e.target.closest("a, button, .project-card, .achievement-card")) {
        cursor.classList.add("cursor-active");
      }
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest("a, button, .project-card, .achievement-card")) {
        cursor.classList.remove("cursor-active");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseout", handleMouseOut, true);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseout", handleMouseOut, true);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isMobile, prefersReducedMotion, isDesktop]);

  // Don't render on mobile, tablet, or reduced motion
  if (isMobile || prefersReducedMotion || !isDesktop) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`cursor-tracker ${isDark ? "cursor-dark" : "cursor-light"}`}
      aria-hidden="true"
    />
  );
};

export default CursorTracker;

