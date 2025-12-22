import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievementsData } from "../Contents/Achievements";
import { FaTrophy, FaMedal } from "react-icons/fa";
import { useResponsive } from "../hooks/useResponsive";
import ImageLightbox from "./ImageLightbox";

gsap.registerPlugin(ScrollTrigger);

const AchievementsSection = () => {
  const { isMobile, prefersReducedMotion, isDesktop } = useResponsive();
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Only run complex GSAP scroll logic on desktop + regular motion
    if (isMobile || prefersReducedMotion || !isDesktop || !sectionRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    const totalCards = cards.length;

    // We want to scroll the CONTAINER, not individual cards separately
    // But we need to calculate how far to move. 
    // If container is fit-content, we move it left.
    // Movement amount: (total width of cards) - (viewport width) + padding
    // Simplest approach: Move by percentage of cards or explicit calc.
    // For a simple carousel: xPercent: -100 * (totalCards - 1) might be too much if cards are small.
    // Better: Scroll width - window width.

    // We can use a functional value or compute it.

    let ctx = gsap.context(() => {
      const scrollContainer = containerRef.current;

      // Calculate total scrollable width
      // Note: container width is dynamic (fit-content).
      // We want to translate it leftward.
      // E.g. x: () => -(scrollContainer.scrollWidth - window.innerWidth)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Pin automatically when top hits top
          end: "+=" + (scrollContainer.scrollWidth), // Scroll duration based on content width
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Recalculate values on resize
        }
      });

      tl.to(scrollContainer, {
        x: () => -(scrollContainer.scrollWidth - window.innerWidth + 100), // +100 for some padding end
        ease: "none",
      });

      // Animate cards staggering in if desired, but "slide in X-axis" is handled by the scroll itself now.
      // We can add subtle parallax or opacity triggers if needed.
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion, isDesktop, achievementsData]);

  if (!achievementsData || achievementsData.length === 0) return null;

  return (
    <>
      <section id="achievements" className="achievements-section" ref={sectionRef}>
        {/* Header moved outside the scrolling container */}
        <motion.div
          className="section-header-area"
          style={{
            position: isDesktop && !prefersReducedMotion ? "absolute" : "relative",
            top: isDesktop && !prefersReducedMotion ? "5%" : "auto",
            left: 0,
            width: "100%",
            zIndex: 10,
            textAlign: "center",
            marginBottom: isMobile ? "2rem" : 0
          }}
        >
          <h2 className="section-title">Achievements</h2>
        </motion.div>

        <div className="achievements-carousel-container" ref={containerRef}>
          {achievementsData.map((achievement, index) => {
            const hasImage = achievement.image && achievement.image !== "ACHIEVEMENT_IMAGE_URL";

            return (
              <div
                key={achievement.id}
                ref={(el) => cardsRef.current[index] = el}
                className={`achievement-card-wrapper ${isMobile ? "mobile-card" : ""}`}
              >
                <motion.div
                  className="achievement-card"
                  initial={isMobile ? { y: 50, opacity: 0 } : {}}
                  whileInView={isMobile ? { y: 0, opacity: 1 } : {}}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {hasImage && (
                    <div
                      className="achievement-image-wrapper"
                      onClick={() => {
                        if (hasImage) {
                          setLightboxImage(achievement.image);
                          setIsLightboxOpen(true);
                        }
                      }}
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
              </div>
            );
          })}
        </div>
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
