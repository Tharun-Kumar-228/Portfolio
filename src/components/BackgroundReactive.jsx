import { useEffect, useRef } from "react";
import { useResponsive } from "../hooks/useResponsive";
import { useTheme } from "../hooks/useTheme";

/**
 * Theme-reactive animated background
 * Subtle particles/motion that responds to cursor proximity
 * GPU-accelerated, lightweight
 */
const BackgroundReactive = () => {
  const canvasRef = useRef(null);
  const { isMobile, prefersReducedMotion, isDesktop } = useResponsive();
  const { isDark } = useTheme();
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    // Disable on mobile or reduced motion
    if (isMobile || prefersReducedMotion || !isDesktop) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const particleCount = 30;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    particlesRef.current = particles;

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const mouse = mouseRef.current;
      const accentColor = isDark ? "rgba(129, 140, 248, 0.3)" : "rgba(99, 102, 241, 0.2)";
      const textColor = isDark ? "rgba(241, 245, 249, 0.1)" : "rgba(31, 41, 55, 0.1)";

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

        // Cursor proximity effect
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.x += (dx / distance) * force * 0.5;
          particle.y += (dy / distance) * force * 0.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = distance < maxDistance ? accentColor : textColor;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = isDark ? "rgba(129, 140, 248, 0.1)" : "rgba(99, 102, 241, 0.1)";
            ctx.globalAlpha = (100 - distance) / 100 * 0.3;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile, prefersReducedMotion, isDesktop, isDark]);

  if (isMobile || prefersReducedMotion || !isDesktop) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="background-reactive"
      aria-hidden="true"
    />
  );
};

export default BackgroundReactive;

