import { useEffect, useRef, useState } from "react";
import { useResponsive } from "../hooks/useResponsive";
import { useTheme } from "../hooks/useTheme";

const CursorTracker = () => {
  const { isMobile, prefersReducedMotion, isDesktop } = useResponsive();
  const { isDark } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Refs for direct DOM manipulation (Performance)
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);

  const mouseRef = useRef({ x: -100, y: -100 });
  const cursorVal = useRef({ x: -100, y: -100 });
  const ringVal = useRef({ x: -100, y: -100 });

  const trailRef = useRef([]);

  useEffect(() => {
    // Disable on mobile/tablet to allow native touch
    if (isMobile || prefersReducedMotion || !isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse Listeners
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Hover Detection
    const handleMouseEnter = (e) => {
      if (e.target.closest("a, button, input, textarea, .interactive, .profile-card-minimal, .achievement-glass-card, .wheel-btn")) {
        setIsHovering(true);
      }
    };
    const handleMouseOut = (e) => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseOut);

    // Animation Loop
    let animationFrame;
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const animate = () => {
      const { x: targetX, y: targetY } = mouseRef.current;

      // 1. Core Dot Physics (Fast)
      cursorVal.current.x = lerp(cursorVal.current.x, targetX, 0.2); // Very snappy
      cursorVal.current.y = lerp(cursorVal.current.y, targetY, 0.2);

      // 2. Ring Physics (Slow/Magnetic)
      ringVal.current.x = lerp(ringVal.current.x, targetX, 0.1);
      ringVal.current.y = lerp(ringVal.current.y, targetY, 0.1);

      // Update DOM elements
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorVal.current.x}px, ${cursorVal.current.y}px, 0) translate(-50%, -50%)`;
        ringRef.current.style.transform = `translate3d(${ringVal.current.x}px, ${ringVal.current.y}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`;
      }

      // 3. Canvas Trail Logic
      trailRef.current.push({ x: cursorVal.current.x, y: cursorVal.current.y, age: 0 });
      if (trailRef.current.length > 20) trailRef.current.shift();

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const trailColor = isDark ? "0, 255, 102" : "14, 165, 233"; // Green vs Blue

      if (trailRef.current.length > 1) {
        ctx.beginPath();
        for (let i = 0; i < trailRef.current.length - 1; i++) {
          const p1 = trailRef.current[i];
          const p2 = trailRef.current[i + 1];

          // Electric Jitter
          const jitter = isHovering ? (Math.random() * 2 - 1) : 0;

          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x + jitter, p2.y + jitter);
        }
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(${trailColor}, 0.2)`;
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrame);
    };
  }, [isMobile, prefersReducedMotion, isDesktop, isDark, isHovering, isClicking]);

  if (isMobile || prefersReducedMotion || !isDesktop) return null;

  const themeColor = isDark ? "#00ff66" : "#0ea5e9";

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 99998
        }}
      />

      {/* OUTER RING (RETICLE) */}
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 99999,
          width: "40px", height: "40px",
          border: `1.5px solid ${themeColor}`,
          borderRadius: isHovering ? "4px" : "50%", // Square when hovering
          transition: "width 0.2s, height 0.2s, border-radius 0.2s, transform 0.1s linear",
          opacity: 0.6,
          boxShadow: isHovering ? `0 0 15px ${themeColor}` : "none"
        }}
      />

      {/* CENTER DOT */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 100000,
          width: "8px", height: "8px",
          background: themeColor,
          borderRadius: "50%",
          boxShadow: `0 0 10px ${themeColor}`,
        }}
      />
    </>
  );
};

export default CursorTracker;
