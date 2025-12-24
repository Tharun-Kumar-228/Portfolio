import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../Contents/Projects";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaSearch, FaMicrochip, FaGlobe, FaProjectDiagram, FaFilter } from "react-icons/fa";

const ProjectsSectionMobile = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null);
    const [filteredProjects, setFilteredProjects] = useState(projectsData);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const categories = ["All", "Full Stack", "Web App", "IoT System"];

    useEffect(() => {
        let result = projectsData;
        if (selectedCategory !== "All") {
            result = result.filter(p => p.category === selectedCategory);
        }
        if (searchTerm) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.techStack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        setFilteredProjects(result);
    }, [selectedCategory, searchTerm]);

    // Lock body scroll
    useEffect(() => {
        if (selectedProject) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [selectedProject]);

    return (
        <section id="projects" className="mobile-pro-section">

            {/* HEADER */}
            <div className="pro-header">
                <div className="header-badge">
                    <FaProjectDiagram /> BLUEPRINT_DB
                </div>
                <h2 className="header-title">PROJECT_SCHEMATICS</h2>
                <div className="header-grid-deco"></div>
            </div>

            {/* CONTROLS */}
            <div className="control-deck">
                {/* SEARCH TOGGLE */}
                <div className="dock-row">
                    <button className={`icon-btn ${showSearch ? 'active' : ''}`} onClick={() => setShowSearch(!showSearch)}>
                        <FaSearch />
                    </button>

                    {/* CATEGORY SCROLL */}
                    <div className="cat-scroll">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`cat-chip ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* EXPANDABLE SEARCH BAR */}
                <AnimatePresence>
                    {showSearch && (
                        <motion.div
                            className="search-bar-wrapper"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                        >
                            <input
                                type="text"
                                placeholder="SEARCH_QUERY..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* PROJECT LIST */}
            <div className="blueprint-grid">
                <AnimatePresence>
                    {filteredProjects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            className="blueprint-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="card-wireframe">
                                <div className="card-header">
                                    <span className="card-code">BP-{String(project.id).padStart(3, '0')}</span>
                                    <div className={`status-dot ${project.status === 'DEPLOYED' ? 'green' : 'amber'}`}></div>
                                </div>

                                <h3 className="card-title">{project.name}</h3>
                                <p className="card-cat">// {project.category}</p>

                                <div className="tech-readout">
                                    {project.techStack.slice(0, 3).map((tech, idx) => (
                                        <span key={idx} className="tech-tag">{tech}</span>
                                    ))}
                                    {project.techStack.length > 3 && <span className="tech-tag">+{project.techStack.length - 3}</span>}
                                </div>

                                {/* Corner Decos */}
                                <div className="corner-b c-tl"></div>
                                <div className="corner-b c-tr"></div>
                                <div className="corner-b c-bl"></div>
                                <div className="corner-b c-br"></div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* DIAGNOSTIC MODAL (FULL SCREEN) */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="diagnostic-overlay"
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        {/* MODAL HEADER */}
                        <div className="diag-header">
                            <div className="diag-title-group">
                                <span className="diag-id">SYS_ID: {selectedProject.id}</span>
                                <h2>SYSTEM_DIAGNOSTIC</h2>
                            </div>
                            <button className="close-btn" onClick={() => setSelectedProject(null)}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="diag-content">
                            {/* PREVIEW */}
                            <div className="preview-screen">
                                {selectedProject.iframeUrl ? (
                                    <iframe
                                        src={selectedProject.iframeUrl}
                                        title={selectedProject.name}
                                        className="preview-frame"
                                    />
                                ) : (
                                    <div className="no-signal">
                                        <FaGlobe size={40} /> NO_SIGNAL
                                    </div>
                                )}
                                <div className="scan-line"></div>
                            </div>

                            {/* INFO */}
                            <div className="info-block">
                                <h3 className="project-display-name">{selectedProject.name}</h3>
                                <p className="project-desc">{selectedProject.description}</p>

                                <div className="tech-matrix">
                                    <h4>MODULES_DETECTED:</h4>
                                    <div className="matrix-grid">
                                        {selectedProject.techStack.map((tech, i) => (
                                            <div key={i} className="matrix-cell">
                                                <FaMicrochip size={10} /> {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ACTION FOOTER */}
                        <div className="diag-footer">
                            {selectedProject.liveUrl && (
                                <a href={selectedProject.liveUrl} target="_blank" className="action-btn primary">
                                    <FaExternalLinkAlt /> LAUNCH
                                </a>
                            )}
                            {selectedProject.githubUrl && (
                                <a href={selectedProject.githubUrl} target="_blank" className="action-btn secondary">
                                    <FaGithub /> CODE
                                </a>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        .mobile-pro-section {
           padding: 4rem 1rem 6rem;
           background: #050505;
           min-height: 100vh;
           font-family: 'Rajdhani', sans-serif;
           color: #fff;
           position: relative;
        }

        /* HEADER */
        .pro-header { margin-bottom: 2rem; border-bottom: 1px solid rgba(0, 189, 94, 0.3); padding-bottom: 15px; }
        .header-badge {
           display: inline-flex; align-items: center; gap: 8px;
           color: #00bd5e; font-size: 0.75rem; letter-spacing: 2px;
           margin-bottom: 5px; opacity: 0.8;
           border: 1px solid #00bd5e; padding: 2px 8px;
        }
        .header-title { font-size: 1.8rem; margin: 0; letter-spacing: 1px; color: #fff; }
        
        /* CONTROLS */
        .control-deck { margin-bottom: 2rem; }
        .dock-row { display: flex; gap: 10px; align-items: center; }
        
        .icon-btn {
            width: 45px; height: 45px; background: rgba(0, 20, 10, 0.8);
            border: 1px solid rgba(0, 189, 94, 0.3); color: #00bd5e;
            border-radius: 5px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
            font-size: 1.2rem;
        }
        .icon-btn.active { background: #00bd5e; color: #000; }
        
        .cat-scroll {
            display: flex; gap: 10px; overflow-x: auto; padding-bottom: 5px; scrollbar-width: none;
        }
        .cat-chip {
            background: transparent; border: 1px solid #333; color: #888;
            padding: 10px 15px; border-radius: 5px; white-space: nowrap; font-size: 0.8rem; font-weight: bold;
        }
        .cat-chip.active {
            border-color: #00bd5e; bg: rgba(0, 189, 94, 0.1); color: #00bd5e; text-shadow: 0 0 5px #00bd5e;
        }

        .search-bar-wrapper { overflow: hidden; margin-top: 10px; }
        .search-input {
            width: 100%; background: #0a0a0a; border: 1px dashed #00bd5e;
            padding: 12px; color: #fff; font-family: monospace; outline: none;
        }

        /* BLUEPRINT LIST */
        .blueprint-grid { display: flex; flex-direction: column; gap: 20px; }
        
        .blueprint-card {
            background: transparent; padding: 5px; /* Wrapper for spacing if needed */
        }
        .card-wireframe {
            background: rgba(10, 20, 15, 0.9);
            border: 1px solid rgba(0, 189, 94, 0.3);
            padding: 20px; position: relative;
        }
        
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .card-code { font-family: monospace; color: #555; font-size: 0.7rem; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; }
        .green { background: #00bd5e; box-shadow: 0 0 5px #00bd5e; }
        .amber { background: orange; box-shadow: 0 0 5px orange; }

        .card-title { font-size: 1.4rem; color: #fff; margin: 0 0 5px 0; }
        .card-cat { color: #00bd5e; font-size: 0.8rem; font-family: monospace; margin-bottom: 15px; }

        .tech-readout { display: flex; flex-wrap: wrap; gap: 5px; }
        .tech-tag {
            font-size: 0.7rem; background: rgba(255,255,255,0.05); padding: 3px 8px; color: #aaa;
        }

        .corner-b { position: absolute; width: 8px; height: 8px; border: 2px solid #00bd5e; transition: 0.3s; }
        .c-tl { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
        .c-tr { top: -1px; right: -1px; border-left: 0; border-bottom: 0; }
        .c-bl { bottom: -1px; left: -1px; border-right: 0; border-top: 0; }
        .c-br { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }
        
        .card-wireframe:active .corner-b { width: 15px; height: 15px; }

        /* DIAGNOSTIC OVERLAY */
        .diagnostic-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: #080808; z-index: 1000;
            display: flex; flex-direction: column;
            overflow-y: auto;
        }
        
        .diag-header {
            padding: 20px; border-bottom: 1px solid #333;
            display: flex; justify-content: space-between; align-items: center;
            background: rgba(0, 189, 94, 0.05);
        }
        .diag-id { font-family: monospace; color: #00bd5e; font-size: 0.7rem; display: block; }
        .diag-title-group h2 { margin: 0; font-size: 1rem; color: #fff; letter-spacing: 2px; }
        .close-btn { background: transparent; border: none; color: #fff; font-size: 1.5rem; }

        .diag-content { padding: 20px; flex: 1; }
        
        .preview-screen {
            width: 100%; height: 200px;
            background: #000; border: 1px solid #333;
            margin-bottom: 25px; position: relative; overflow: hidden;
            display: flex; align-items: center; justify-content: center;
        }
        .preview-frame { width: 100%; height: 100%; border: none; }
        .no-signal { color: #555; display: flex; flex-direction: column; align-items: center; gap: 10px; font-size: 0.8rem; letter-spacing: 2px; }
        .scan-line { position: absolute; top:0; width: 100%; height: 2px; background: rgba(0, 189, 94, 0.5); animation: scanV 3s linear infinite; }

        .project-display-name { font-size: 1.8rem; margin: 0 0 15px 0; color: #fff; }
        .project-desc { font-size: 0.9rem; color: #aaa; line-height: 1.6; margin-bottom: 25px; }

        .tech-matrix h4 { font-family: monospace; color: #555; font-size: 0.8rem; margin-bottom: 10px; }
        .matrix-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .matrix-cell {
            display: flex; align-items: center; gap: 6px;
            background: rgba(0, 189, 94, 0.1); border: 1px solid rgba(0, 189, 94, 0.3);
            padding: 8px 12px; font-size: 0.8rem; color: #00bd5e;
        }

        .diag-footer {
            padding: 20px; border-top: 1px solid #333;
            display: flex; gap: 15px;
            background: #050505;
        }
        .action-btn {
            flex: 1; padding: 15px; display: flex; align-items: center; justify-content: center; gap: 10px;
            font-weight: bold; text-decoration: none; border-radius: 4px;
        }
        .primary { background: #00bd5e; color: #000; }
        .secondary { border: 1px solid #555; color: #fff; }

        @keyframes scanV { 0% { top: 0; } 100% { top: 100%; } }

      `}</style>
        </section>
    );
};

export default ProjectsSectionMobile;
