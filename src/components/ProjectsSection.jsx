import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../Contents/Projects";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaDatabase, FaServer, FaMicrochip, FaGlobe, FaSearch } from "react-icons/fa";
import ProjectsSectionMobile from "./ProjectsSectionMobile";

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories = ["All", "Full Stack", "Web App", "IoT System"];

  useEffect(() => {
    let result = projectsData;

    // Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Search
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.techStack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(result);
  }, [selectedCategory, searchTerm]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [selectedProject]);

  if (mounted && isMobile) {
    return <ProjectsSectionMobile />;
  }

  return (
    <section id="projects" className="section projects-section">
      <div className="container">

        {/* HEADER */}
        <motion.div
          className="header-wrapper"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            MY <span className="highlight">PROJECTS</span>
          </h2>
          <div className="decor-line"></div>
        </motion.div>

        {/* CONTROLS */}
        <div className="controls-bar">
          {/* TABS */}
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <div className="search-module">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="SEARCH PROJECTS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* PROJECTS GRID */}
        <motion.div className="projects-grid" layout>
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                className="project-slate"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -5 }}
              >
                {/* STATUS BAR */}
                <div className="slate-status-bar">
                  <span className="status-text">{project.status} // {project.deployment_level}</span>
                  <div className={`status-light ${project.status === 'DEPLOYED' ? 'green' : 'amber'}`}></div>
                </div>

                {/* CONTENT */}
                <div className="slate-content">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-category">{project.category}</p>

                  <div className="tech-mini-grid">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i} className="tech-bit">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* ANIMATED CORNERS */}
                <div className="corner-frame tl"></div>
                <div className="corner-frame tr"></div>
                <div className="corner-frame bl"></div>
                <div className="corner-frame br"></div>

                {/* HOVER OVERLAY */}
                <div className="slate-overlay">
                  <span>VIEW DETAILS</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* MODAL */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="mission-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="mission-modal-content"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-modal-btn" onClick={() => setSelectedProject(null)}>
                  <FaTimes />
                </button>

                <div className="modal-header">
                  <div className="modal-id">PROJECT ID: {String(selectedProject.id).padStart(3, '0')}</div>
                  <h2>{selectedProject.name}</h2>
                </div>

                <div className="modal-body">
                  {/* VISUAL FEED */}
                  <div className="visual-feed">
                    <div className="feed-overlay">LIVE PREVIEW</div>
                    {selectedProject.iframeUrl ? (
                      <iframe
                        src={selectedProject.iframeUrl}
                        title={selectedProject.name}
                        className="modal-iframe"
                      />
                    ) : (
                      <div className="placeholder-feed"><FaGlobe size={50} /></div>
                    )}
                    <div className="scan-line"></div>
                  </div>

                  {/* DATA PANEL */}
                  <div className="data-panel">
                    <div className="description-box">
                      <h4>// PROJECT OVERVIEW</h4>
                      <p>{selectedProject.description}</p>
                    </div>

                    <div className="tech-stack-box">
                      <h4>// TECH STACK</h4>
                      <div className="stack-grid">
                        {selectedProject.techStack.map((tech, i) => (
                          <div key={i} className="stack-item">
                            <FaMicrochip size={12} /> {tech}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="action-row">
                      {selectedProject.githubUrl && (
                        <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="modal-btn secondary">
                          <FaGithub /> SOURCE CODE
                        </a>
                      )}
                      {selectedProject.liveUrl && (
                        <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="modal-btn primary">
                          <FaExternalLinkAlt /> LIVE DEMO
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style>{`
        .projects-section {
            padding: 5rem 0;
            background: var(--bg-section-radial, var(--bg));
        }

        .header-wrapper {
            text-align: center; margin-bottom: 3rem; position: relative;
        }
        .decor-line {
            width: 100px; height: 2px; background: var(--primary-color);
            margin: 1rem auto; box-shadow: 0 0 10px var(--primary-color);
        }

        /* CONTROLS */
        .controls-bar {
            display: flex; justify-content: space-between; align-items: center;
            flex-wrap: wrap; gap: 2rem; margin-bottom: 3rem;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 1rem;
        }
        
        .filter-tabs {
            display: flex; gap: 1rem;
        }
        .filter-tab {
            background: transparent; border: none; color: var(--text-secondary);
            font-family: monospace; font-size: 1rem; cursor: pointer;
            padding: 0.5rem 1rem; transition: 0.3s;
            border-bottom: 2px solid transparent;
        }
        .filter-tab:hover, .filter-tab.active {
            color: var(--primary-color);
            border-bottom-color: var(--primary-color);
            text-shadow: 0 0 8px rgba(14, 165, 233, 0.2);
        }

        .search-module {
            display: flex; align-items: center;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            padding: 0.5rem 1rem; border-radius: 20px;
        }
        .search-icon { color: var(--text-secondary); margin-right: 0.5rem; }
        .search-module input {
            background: transparent; border: none; color: var(--text);
            font-family: monospace; outline: none; width: 150px;
        }

        /* GRID */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
            gap: 1.5rem;
        }

        /* PROJECT SLATE CARD */
        .project-slate {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            padding: 1.5rem;
            position: relative;
            cursor: pointer;
            height: 250px;
            display: flex; flex-direction: column; justify-content: space-between;
            overflow: hidden;
            backdrop-filter: blur(5px);
        }
        .project-slate:hover {
            border-color: var(--primary-color);
            box-shadow: 0 0 20px rgba(14, 165, 233, 0.1);
        }

        .slate-status-bar {
            display: flex; justify-content: space-between; align-items: center;
            font-family: monospace; font-size: 0.7rem; color: var(--text-secondary);
            margin-bottom: 1rem;
        }
        .status-light { width: 6px; height: 6px; border-radius: 50%; }
        .status-light.green { background: var(--primary-color); box-shadow: 0 0 5px var(--primary-color); }
        .status-light.amber { background: var(--secondary-color); box-shadow: 0 0 5px var(--secondary-color); }

        .project-name { font-size: 1.5rem; color: var(--text); margin-bottom: 0.2rem; }
        .project-category { font-size: 0.8rem; color: var(--primary-color); font-family: monospace; margin-bottom: 1.5rem; }

        .tech-mini-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .tech-bit {
            font-size: 0.7rem; background: rgba(14, 165, 233, 0.05);
            padding: 2px 8px; border-radius: 4px; color: var(--text-secondary); border: 1px solid transparent;
        }
        .project-slate:hover .tech-bit { border-color: rgba(14, 165, 233, 0.2); color: var(--text-primary); }

        /* CORNERS */
        .corner-frame {
            position: absolute; width: 10px; height: 10px;
            border: 2px solid var(--primary-color);
            opacity: 0.3; transition: 0.3s;
        }
        .project-slate:hover .corner-frame { opacity: 1; width: 20px; height: 20px; }
        .tl { top: 0; left: 0; border-right: none; border-bottom: none; }
        .tr { top: 0; right: 0; border-left: none; border-bottom: none; }
        .bl { bottom: 0; left: 0; border-right: none; border-top: none; }
        .br { bottom: 0; right: 0; border-left: none; border-top: none; }

        .slate-overlay {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(14, 165, 233, 0.05);
            display: flex; align-items: center; justify-content: center;
            opacity: 0; transition: 0.3s;
        }
        .slate-overlay span {
            background: var(--bg); color: var(--primary-color);
            padding: 0.5rem 1rem; border: 1px solid var(--primary-color);
            font-family: monospace; font-weight: bold;
            transform: translateY(20px); transition: 0.3s;
        }
        .project-slate:hover .slate-overlay { opacity: 1; }
        .project-slate:hover .slate-overlay span { transform: translateY(0); }


        /* MODAL */
        .mission-modal-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.8); z-index: 10000;
            display: flex; align-items: center; justify-content: center;
            padding: 2rem; backdrop-filter: blur(10px);
        }
        .mission-modal-content {
            width: 100%; max-width: 1000px;
            background: var(--bg-secondary); border: 1px solid var(--primary-color);
            border-radius: 5px; position: relative;
            box-shadow: 0 0 50px rgba(14, 165, 233, 0.1);
            display: flex; flex-direction: column; overflow: hidden;
            max-height: 90vh;
        }
        .close-modal-btn {
            position: absolute; top: 1rem; right: 1rem;
            background: transparent; border: none; color: var(--text-secondary);
            font-size: 1.5rem; cursor: pointer; z-index: 10;
        }
        .close-modal-btn:hover { color: var(--primary-color); }

        .modal-header {
            padding: 2rem 2rem 1rem; border-bottom: 1px solid var(--border-color);
        }
        .modal-id { font-family: monospace; color: var(--primary-color); margin-bottom: 0.5rem; }
        .modal-header h2 { font-size: 2.5rem; color: var(--text); margin: 0; }

        .modal-body {
            display: flex; flex: 1; overflow: hidden;
        }
        
        .visual-feed {
            flex: 1; min-width: 400px; background: var(--bg);
            position: relative; display: flex; align-items: center; justify-content: center;
            border-right: 1px solid var(--border-color);
        }
        .modal-iframe { width: 100%; height: 100%; border: none; }
        
        .feed-overlay {
            position: absolute; top: 1rem; left: 1rem;
            background: rgba(14, 165, 233, 0.1); color: var(--primary-color);
            padding: 0.2rem 0.5rem; font-family: monospace; font-size: 0.7rem;
            border: 1px solid var(--primary-color);
        }
        .placeholder-feed { color: var(--text-secondary); }
        .scan-line {
            position: absolute; width: 100%; height: 2px; background: rgba(14, 165, 233, 0.5);
            top: 0; ; animation: scan 3s linear infinite; opacity: 0.5;
        }

        .data-panel {
            flex: 1; padding: 2rem; display: flex; flex-direction: column; gap: 2rem;
            overflow-y: auto;
        }
        .description-box h4, .tech-stack-box h4 {
            font-family: monospace; color: var(--text-secondary); margin-bottom: 0.8rem; font-size: 0.8rem;
        }
        .description-box p { color: var(--text-primary); line-height: 1.6; }
        
        .stack-grid { display: flex; flex-wrap: wrap; gap: 0.8rem; }
        .stack-item {
            display: flex; align-items: center; gap: 0.5rem;
            font-family: monospace; font-size: 0.9rem; color: var(--primary-color);
            background: rgba(14, 165, 233, 0.05); padding: 0.3rem 0.8rem; border-radius: 4px;
        }

        .action-row {
            margin-top: auto; display: flex; gap: 1rem;
        }
        .modal-btn {
            flex: 1; padding: 1rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
            font-family: monospace; font-weight: bold; text-decoration: none; cursor: pointer; transition: 0.3s;
        }
        .modal-btn.primary {
            background: var(--primary-color); color: var(--bg);
        }
        .modal-btn.primary:hover {
            box-shadow: 0 0 20px rgba(14, 165, 233, 0.4);
        }
        .modal-btn.secondary {
            background: transparent; border: 1px solid var(--text-secondary); color: var(--text);
        }
        .modal-btn.secondary:hover { border-color: var(--primary-color); color: var(--primary-color); }

        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }

        @media(max-width: 900px) {
            .controls-bar { flex-direction: column-reverse; align-items: stretch; }
            .modal-body { flex-direction: column; }
            .visual-feed { height: 250px; min-height: 250px; border-right: none; border-bottom: 1px solid var(--border-color); }
            .modal-header h2 { font-size: 1.8rem; }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
