import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useResponsive } from "../hooks/useResponsive";

/**
 * Splatter/ink blob reveal transition
 * Organic, cinematic transition effect
 * Uses expanding circles/blobs for organic reveal
 */
const SplatterTransition = ({ onComplete, delay = 0 }) => {
  const containerRef = useRef(null);
  const { prefersReducedMotion, isMobile } = useResponsive();

  useEffect(() => {
    if (prefersReducedMotion || isMobile || !containerRef.current) {
      // Skip animation, call completion immediately
      if (onComplete) {
        setTimeout(onComplete, 100);
      }
      return;
    }

    const container = containerRef.current;
    
    // Create multiple blob elements for organic effect
    const blobCount = 8;
    const blobs = [];

    for (let i = 0; i < blobCount; i++) {
      const blob = document.createElement("div");
      blob.className = "splatter-blob";
      const size = 200 + Math.random() * 300;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      blob.style.width = `${size}px`;
      blob.style.height = `${size}px`;
      blob.style.left = `${x}%`;
      blob.style.top = `${y}%`;
      blob.style.borderRadius = `${30 + Math.random() * 40}%`;
      
      container.appendChild(blob);
      blobs.push(blob);
    }

    // Animate blobs expanding
    const tl = gsap.timeline({ delay: delay / 1000 });

    blobs.forEach((blob, index) => {
      tl.fromTo(
        blob,
        {
          scale: 0,
          opacity: 0.8
        },
        {
          scale: 3,
          opacity: 1,
          duration: 1.2,
          delay: index * 0.1,
          ease: "power2.out"
        },
        index * 0.05
      );
    });

    tl.to(container, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    }, "-=0.3");

    tl.call(() => {
      // Cleanup
      blobs.forEach(blob => blob.remove());
      if (onComplete) {
        onComplete();
      }
    });

    return () => {
      tl.kill();
      blobs.forEach(blob => blob.remove());
    };
  }, [delay, onComplete, prefersReducedMotion, isMobile]);

  if (prefersReducedMotion || isMobile) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      className="splatter-transition"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );
};

export default SplatterTransition;
