import { useEffect, useRef } from "react";
import { useResponsive } from "../hooks/useResponsive";
import { gsap } from "gsap";

/**
 * Splatter/Ink Reveal Transition
 * Uses a mask overlay that "splatters" open to reveal content
 */
const SplatterTransition = ({ onComplete }) => {
  const containerRef = useRef(null);
  const { prefersReducedMotion, isMobile } = useResponsive();

  useEffect(() => {
    // If reduced motion, just trigger complete immediately
    if (prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.max(canvas.width, canvas.height) * 1.5;

    // Create blobs that will grow TO cover the screen
    const blobs = Array.from({ length: 20 }, (_, i) => ({
      x: centerX + (Math.random() - 0.5) * 200,
      y: centerY + (Math.random() - 0.5) * 200,
      radius: 0, // Start invisible
      targetRadius: maxRadius * (0.2 + Math.random() * 0.8),
      speed: 0.02 + Math.random() * 0.03, // Growth speed
      angle: Math.random() * Math.PI * 2,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 50%)` // Optional: fluid colors
    }));

    let animationFrame;
    let isCovered = false;

    const render = () => {
      // We do NOT clearRect completely to leave trails, or we can redraw everything specific way
      // But for a solid cover, we want to accumulate or just draw bigger circles.
      // Standard approach: Clear and Redraw all at current size.

      // ctx.clearRect(0, 0, canvas.width, canvas.height); 
      // Actually, if we want them to merge, we just draw them. 
      // To ensure full coverage, we check if radii are large enough.

      // We'll fill with a solid dark color to act as a transition mask
      ctx.fillStyle = "#111"; // Theme dark background
      ctx.globalCompositeOperation = "source-over";

      let allMaxed = true;

      blobs.forEach(blob => {
        if (blob.radius < blob.targetRadius) {
          allMaxed = false;
          blob.radius += (blob.targetRadius - blob.radius) * blob.speed;
        }

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!allMaxed) {
        animationFrame = requestAnimationFrame(render);
      } else {
        // Animation "In" complete - Screen is fully covered
        if (!isCovered) {
          isCovered = true;
          // Trigger the page transition/scroll behavior
          if (onComplete) onComplete();

          // Now Fade Out the Canvas to reveal the new section
          gsap.to(canvas, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              if (container.contains(canvas)) {
                container.removeChild(canvas);
              }
            }
          });
        }
      }
    };

    animationFrame = requestAnimationFrame(render);

    // Initial clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (container && container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };

  }, [prefersReducedMotion, onComplete]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed", // Changed to fixed to cover viewport during scroll
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999, // Very high z-index to cover everything
        pointerEvents: "none"
      }}
    />
  );
};

export default SplatterTransition;
