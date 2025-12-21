import { motion } from "framer-motion";
import { resumeData } from "../Contents/Resume";
import { FaDownload, FaFilePdf } from "react-icons/fa";
import { useResponsive } from "../hooks/useResponsive";

const ResumeSection = () => {
  const { isMobile, prefersReducedMotion } = useResponsive();

  if (!resumeData || resumeData.length === 0) {
    return <div>No resume data available</div>;
  }

  const resume = resumeData[0];
  const animationDuration = prefersReducedMotion ? 0.3 : isMobile ? 0.4 : 0.6;

  return (
    <section id="resume" className="section resume-section">
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
          Resume
        </motion.h2>
        <motion.div
          className="resume-card"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationDuration, delay: 0.3 }}
          whileHover={!isMobile && !prefersReducedMotion ? { scale: 1.05 } : {}}
        >
          <div className="resume-icon">
            <FaFilePdf />
          </div>
          <h3>Download My Resume</h3>
          <p>Get a detailed overview of my experience and skills</p>
          <motion.a
            href={resume.resumeUrl}
            download
            className="resume-download-btn"
            whileHover={!isMobile && !prefersReducedMotion ? { scale: 1.1 } : {}}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload /> Download PDF
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ResumeSection;
