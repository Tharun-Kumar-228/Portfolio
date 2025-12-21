import { motion } from "framer-motion";
import { aboutData } from "../Contents/About";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { useResponsive } from "../hooks/useResponsive";

const AboutSection = () => {
  const { isMobile, prefersReducedMotion } = useResponsive();

  if (!aboutData || aboutData.length === 0) {
    return <div>No about data available</div>;
  }

  const about = aboutData[0];
  const animationDuration = prefersReducedMotion ? 0.3 : isMobile ? 0.4 : 0.6;

  return (
    <section id="about" className="section about-section">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: animationDuration }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: animationDuration, delay: 0.2 }}
        >
          About Me
        </motion.h2>
        <div className="about-content">
          <motion.div
            className="about-card"
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: animationDuration, delay: 0.3 }}
          >
            <h3 className="about-name">{about.name}</h3>
            <p className="about-role">{about.role}</p>
            <p className="about-summary">{about.summary}</p>
            <div className="about-details">
              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <span>{about.location}</span>
              </div>
              <div className="detail-item">
                <FaEnvelope className="detail-icon" />
                <a href={`mailto:${about.email}`}>{about.email}</a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
