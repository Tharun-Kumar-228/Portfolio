import { motion } from "framer-motion";
import { certificationsData } from "../Contents/Certifications";
import { FaCertificate, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import { useResponsive } from "../hooks/useResponsive";

const CertificationsSection = () => {
  const { isMobile, prefersReducedMotion } = useResponsive();

  if (!certificationsData || certificationsData.length === 0) {
    return <div>No certifications data available</div>;
  }

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
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5 }
    };
  };

  const cardVariants = getVariants();

  return (
    <section id="certifications" className="section certifications-section">
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
          Certifications
        </motion.h2>
        <div className="certifications-grid">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="certification-card"
              {...cardVariants}
              transition={{
                ...cardVariants.transition,
                delay: isMobile ? index * 0.1 : index * 0.15
              }}
              whileHover={!isMobile && !prefersReducedMotion ? { scale: 1.05, y: -5 } : {}}
            >
              <div className="cert-icon">
                <FaCertificate />
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <div className="cert-details">
                <div className="cert-detail-item">
                  <FaBuilding className="cert-detail-icon" />
                  <span>{cert.organization}</span>
                </div>
                <div className="cert-detail-item">
                  <FaCalendarAlt className="cert-detail-icon" />
                  <span>{cert.date}</span>
                </div>
              </div>
              {cert.imageUrl && cert.imageUrl !== "CERTIFICATE_IMAGE_URL" && (
                <div className="cert-image">
                  <img src={cert.imageUrl} alt={cert.title} loading="lazy" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CertificationsSection;
