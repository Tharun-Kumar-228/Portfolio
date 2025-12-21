import { motion } from "framer-motion";
import { achievementsData } from "../Contents/Achievements";
import { FaTrophy, FaMedal } from "react-icons/fa";
import { useResponsive } from "../hooks/useResponsive";
import { useState } from "react";
import ImageLightbox from "./ImageLightbox";

const AchievementsSection = () => {
  const { isMobile, prefersReducedMotion } = useResponsive();
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4 }
      };
    }

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
      <section id="achievements" className="section achievements-section">
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
              
              return (
                <motion.div
                  key={achievement.id}
                  className="achievement-card"
                  {...cardVariants}
                  initial={
                    !isMobile && !prefersReducedMotion
                      ? { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
                      : cardVariants.initial
                  }
                  transition={{
                    ...cardVariants.transition,
                    delay: isMobile ? index * 0.08 : index * 0.1
                  }}
                  whileHover={
                    !isMobile && !prefersReducedMotion ? { scale: 1.05, rotateY: 5 } : {}
                  }
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
