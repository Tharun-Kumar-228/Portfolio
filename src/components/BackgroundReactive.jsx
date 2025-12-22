import { useEffect, useRef } from "react";
import { useResponsive } from "../hooks/useResponsive";
import { useTheme } from "../hooks/useTheme";

/**
 * Theme-reactive animated background
 * Mesh network of particles that responds to cursor proximity
 * GPU-accelerated canvas for performance
 */
const BackgroundReactive = () => {
  const canvasRef = useRef(null);
  const { isMobile, prefersReducedMotion, isDesktop } = useResponsive();
  const { isDark } = useTheme();
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (isMobile || prefersReducedMotion || !isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let dpr = window.devicePixelRatio || 1;
    let width, height;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle Config
    const particleCount = 40; // Balanced for performance/visuals
    const connectionDist = 180;
    const mouseDist = 250;

    // Create particles
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
      });
    }

    const handlMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handlMouseMove);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const accentRGB = isDark ? "129, 140, 248" : "99, 102, 241"; // Indigo-like
      const lineRGB = isDark ? "255, 255, 255" : "0, 0, 0";

      particles.forEach((p, i) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseDist) {
          const force = (mouseDist - dist) / mouseDist;
          const angle = Math.atan2(dy, dx);
          // Gentle push away
          p.x -= Math.cos(angle) * force * 0.5;
          p.y -= Math.sin(angle) * force * 0.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRGB}, ${0.3})`;
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Opacity based on distance
            const opacity = 1 - (dist2 / connectionDist);
            ctx.strokeStyle = `rgba(${lineRGB}, ${opacity * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handlMouseMove);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isMobile, prefersReducedMotion, isDesktop, isDark]);

  if (isMobile || prefersReducedMotion || !isDesktop) return null;

  return <canvas ref={canvasRef} className="background-reactive" />;
};

export default BackgroundReactive;
