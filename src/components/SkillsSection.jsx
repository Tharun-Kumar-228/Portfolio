import { motion } from "framer-motion";
import { skillsData } from "../Contents/Skills";
import { useResponsive } from "../hooks/useResponsive";

const SkillsSection = () => {
  const { isMobile, prefersReducedMotion } = useResponsive();

  if (!skillsData || skillsData.length === 0) {
    return <div>No skills data available</div>;
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
    <section id="skills" className="section skills-section">
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
          Skills
        </motion.h2>
        <div className="skills-grid">
          {skillsData.map((skillCategory, index) => (
            <motion.div
              key={skillCategory.id}
              className="skill-category-card"
              {...cardVariants}
              transition={{
                ...cardVariants.transition,
                delay: isMobile ? index * 0.05 : index * 0.1
              }}
              whileHover={!isMobile && !prefersReducedMotion ? { scale: 1.05, y: -5 } : {}}
            >
              <h3 className="skill-category-title">{skillCategory.category}</h3>
              <div className="skills-list">
                {skillCategory.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: prefersReducedMotion ? 0.2 : 0.3,
                      delay: isMobile ? skillIndex * 0.03 : skillIndex * 0.05
                    }}
                    whileHover={!isMobile && !prefersReducedMotion ? { scale: 1.1 } : {}}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
