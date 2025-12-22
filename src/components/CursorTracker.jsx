import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useResponsive } from "../hooks/useResponsive";

/**
 * Premium cursor tracking effect
 * Theme-aware, SMOOTH physics, desktop only
 */
const CursorTracker = () => {
  const { isMobile, prefersReducedMotion, isDesktop } = useResponsive();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Motion values for smooth physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring config for silky smooth follow
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on mobile/tablet or strictly standard inputs
    if (isMobile || prefersReducedMotion || !isDesktop) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      if (e.target.closest("a, button, input, textarea, .interactive, .project-card, .achievement-card")) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest("a, button, input, textarea, .interactive, .project-card, .achievement-card")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Attach event listeners to document for delegation
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isMobile, prefersReducedMotion, isDesktop, cursorX, cursorY]);

  if (isMobile || prefersReducedMotion || !isDesktop) {
    return null;
  }

  return (
    <div className="cursor-wrapper">
      <motion.div
        className={`custom-cursor ${isHovering ? "hovering" : ""} ${isClicking ? "clicking" : ""}`}
        style={{
          x: springX,
          y: springY,
        }}
      />
    </div>
  );
};

export default CursorTracker;
