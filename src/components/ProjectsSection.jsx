import { motion } from "framer-motion";
import { projectsData } from "../Contents/Projects";
import { FaGithub, FaExternalLinkAlt, FaCode, FaImage } from "react-icons/fa";
import { useState } from "react";
import { useResponsive } from "../hooks/useResponsive";

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { isMobile, prefersReducedMotion } = useResponsive();

  if (!projectsData || projectsData.length === 0) {
    return <div>No projects data available</div>;
  }

  // Animation variants based on device
  const getCardVariants = () => {
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
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4 }
      };
    }

    return {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.6 }
    };
  };

  const cardVariants = getCardVariants();

  return (
    <section id="projects" className="section projects-section">
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
          Projects
        </motion.h2>
        <div className="projects-grid">
          {projectsData.map((project, index) => {
            const hasValidIframe = project.iframeUrl && project.iframeUrl !== "PROJECT_DEMO_URL";
            const showIframe = hasValidIframe && !isMobile;

            return (
              <motion.div
                key={project.id}
                className="project-card"
                {...cardVariants}
                transition={{
                  ...cardVariants.transition,
                  delay: isMobile ? index * 0.1 : index * 0.15
                }}
                whileHover={!isMobile && !prefersReducedMotion ? { scale: 1.03, y: -10 } : {}}
                onClick={() => !isMobile && setSelectedProject(project)}
              >
                <div className="project-preview">
                  {showIframe ? (
                    <iframe
                      src={project.iframeUrl}
                      title={project.name}
                      className="project-iframe"
                      loading="lazy"
                    />
                  ) : (
                    <div className="project-placeholder">
                      {isMobile ? (
                        <>
                          <FaImage className="placeholder-icon" />
                          <p>Tap to view project</p>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mobile-demo-link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Open Demo
                            </a>
                          )}
                        </>
                      ) : (
                        <>
                          <FaCode className="placeholder-icon" />
                          <p>Project Preview</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="project-info">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub /> GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
