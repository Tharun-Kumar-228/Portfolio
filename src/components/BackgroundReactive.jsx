
import { useEffect, useRef } from "react";
import { useResponsive } from "../hooks/useResponsive";
import { useTheme } from "../hooks/useTheme";

/**
 * Theme-reactive "Light Field" background
 * - Large, soft radial gradient follows cursor
 * - Subtle noise/grain for texture
 * - GPU accelerated canvas
 */
const BackgroundReactive = () => {
  const canvasRef = useRef(null);
  const { isMobile, prefersReducedMotion, isDesktop } = useResponsive();
  const { isDark } = useTheme();
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentPosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Move refs to top level
  const particles = useRef([]);
  // We can initialize particles here or lazily in useEffect.
  // Since we need window dimensions, let's do it in useEffect but keep ref here.

  useEffect(() => {
    if (isMobile || prefersReducedMotion || !isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Lerp helper
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    // Particle Config
    const particleCount = isMobile ? 20 : 50;
    const connectionDist = 150;
    const mouseDist = 300;

    // Initialize particles if empty
    if (particles.current.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
        });
      }
    }

    const animate = () => {
      // Smooth movement for Light Field
      currentPosRef.current.x = lerp(currentPosRef.current.x, mouseRef.current.x, 0.08);
      currentPosRef.current.y = lerp(currentPosRef.current.y, mouseRef.current.y, 0.08);

      const { x, y } = currentPosRef.current; // Cursor Follower Pos

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const r = isDark ? 129 : 99;
      const g = isDark ? 140 : 102;
      const b = isDark ? 248 : 241;

      // -----------------------------
      // LAYER 1: Light Field (Gradient)
      // -----------------------------
      const radius = 600;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

      // Light mode needs slightly more opacity to see the glow
      const coreOpacity = isDark ? 0.12 : 0.08;
      const midOpacity = isDark ? 0.04 : 0.03;

      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${coreOpacity})`);
      gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${midOpacity})`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      // Multiply looks better on light backgrounds to 'burn' the color in
      ctx.globalCompositeOperation = isDark ? "screen" : "multiply";
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // -----------------------------
      // LAYER 2: Electric Ripple (Pulse)
      // -----------------------------
      const time = Date.now() / 1000;
      const rippleRadius = 50 + Math.sin(time * 2) * 10;
      ctx.beginPath();
      ctx.arc(x, y, rippleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${isDark ? 0.1 : 0.15})`; // Slightly stronger on light
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // -----------------------------
      // LAYER 3: Particles & Mesh
      // -----------------------------
      ctx.globalCompositeOperation = "source-over"; // Reset blend mode for sharp dots
      const lineRGB = isDark ? "255, 255, 255" : "0, 0, 0";

      particles.current.forEach((p, i) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse interaction (Push away gently)
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseDist) {
          const force = (mouseDist - dist) / mouseDist;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 0.5;
          p.y -= Math.sin(angle) * force * 0.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.4)`; // Theme color dots
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = 1 - (dist2 / connectionDist);
            ctx.strokeStyle = `rgba(${lineRGB}, ${opacity * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [isMobile, prefersReducedMotion, isDesktop, isDark]);

  if (isMobile || prefersReducedMotion || !isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      className="background-reactive"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0, // Behind content but in front of base background
        pointerEvents: "none"
      }}
    />
  );
};

export default BackgroundReactive;


