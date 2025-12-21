import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { achievementsData } from "../Contents/Achievements";
import { FaTrophy, FaMedal } from "react-icons/fa";
import { useResponsive } from "../hooks/useResponsive";
import { useState } from "react";
import ImageLightbox from "./ImageLightbox";

const AchievementsSection = () => {
  const { isMobile, prefersReducedMotion } = useResponsive();
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion || isMobile) return;

    // GSAP sliding animation for desktop
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards sliding in from left/right
            cardsRef.current.forEach((card, index) => {
              if (card) {
                const isLeft = index % 2 === 0;
                const delay = index * 0.15;

                gsap.fromTo(
                  card,
                  {
                    x: isLeft ? -100 : 100,
                    opacity: 0,
                    scale: 0.9
                  },
                  {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: delay,
                    ease: "power3.out",
                    clearProps: "all"
                  }
                );
              }
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion, isMobile]);

  if (!achievementsData || achievementsData.length === 0) {
    return <div>No achievements data available</div>;
  }

  const handleImageClick = (image) => {
    if (image && image !== "ACHIEVEMENT_IMAGE_URL") {
      setLightboxImage(image);
      setIsLightboxOpen(true);
    }
  };

  // Animation variants based on device
  const getVariants = () => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.3 }
      };
    }

    if (isMobile) {
      return {
        initial: { opacity: 0, y: 30, scale: 0.95 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.5, ease: "easeOut" }
      };
    }

    // Desktop: Will be handled by GSAP, but keep Framer Motion as fallback
    return {
      initial: { opacity: 0, x: 0 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
      transition: { duration: 0.6 }
    };
  };

  const cardVariants = getVariants();

  return (
    <>
      <section id="achievements" className="section achievements-section" ref={sectionRef}>
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: 0.2 }}
          >
            Achievements
          </motion.h2>
          <div className="achievements-grid">
            {achievementsData.map((achievement, index) => {
              const hasImage = achievement.image && achievement.image !== "ACHIEVEMENT_IMAGE_URL";
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={achievement.id}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className="achievement-card"
                  {...cardVariants}
                  initial={
                    !isMobile && !prefersReducedMotion
                      ? { opacity: 0, x: isLeft ? -100 : 100, scale: 0.9 }
                      : cardVariants.initial
                  }
                  transition={{
                    ...cardVariants.transition,
                    delay: isMobile ? index * 0.1 : index * 0.15
                  }}
                  whileHover={
                    !isMobile && !prefersReducedMotion
                      ? {
                          scale: 1.08,
                          y: -8,
                          rotateY: isLeft ? 2 : -2,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }
                      : {}
                  }
                  whileTap={isMobile ? { scale: 0.98 } : {}}
                >
                  {hasImage && (
                    <div
                      className="achievement-image-wrapper"
                      onClick={() => handleImageClick(achievement.image)}
                    >
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        loading="lazy"
                        className="achievement-image"
                      />
                      <div className="achievement-image-overlay">
                        <span className="view-full-text">View Full</span>
                      </div>
                    </div>
                  )}
                  <div className="achievement-icon">
                    {index < 3 ? <FaTrophy /> : <FaMedal />}
                  </div>
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <p className="achievement-position">{achievement.position}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
      <ImageLightbox
        image={lightboxImage}
        isOpen={isLightboxOpen}
        onClose={() => {
          setIsLightboxOpen(false);
          setLightboxImage(null);
        }}
      />
    </>
  );
};

export default AchievementsSection;
