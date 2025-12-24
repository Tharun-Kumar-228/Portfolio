import React from "react";
import { motion } from "framer-motion";
import { educationData } from "../Contents/Education";
import { FaGraduationCap, FaUniversity, FaSchool, FaDatabase, FaCheckCircle, FaDownload } from "react-icons/fa";

const EducationSectionMobile = () => {

    // Helper to visualize score as percentage for bar
    const getScorePercent = (score, type) => {
        // Very basic heuristic for demo
        if (type.includes("CGPA")) return parseFloat(score) * 10;
        if (type.includes("%")) return parseFloat(score);
        return 85;
    };

    return (
        <section id="education" className="mobile-edu-section">

            {/* HEADER */}
            <div className="edu-header">
                <div className="header-badge">
                    <FaDatabase /> MEMORY_ARCHIVE
                </div>
                <h2 className="header-title">ACADEMIC_LOGS</h2>
                <div className="header-deco-line"></div>
            </div>

            <div className="archive-container">
                {educationData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="archive-file"
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, type: "spring", delay: index * 0.1 }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {/* FILE TAB */}
                        <div className="file-tab">
                            <span className="file-id">LOG_0{index + 1}</span>
                            <span className="file-status">
                                {index === 0 ? <><span className="blink">●</span> ACTIVE</> : <><FaCheckCircle size={10} /> STORED</>}
                            </span>
                        </div>

                        {/* FILE CONTENT */}
                        <div className="file-body">
                            <div className="file-grid">
                                <div className="icon-box">
                                    {item.institution.toLowerCase().includes("school") ? <FaSchool /> : <FaUniversity />}
                                </div>
                                <div className="meta-box">
                                    <h3 className="file-title">{item.title}</h3>
                                    <h4 className="file-sub">{item.institution}</h4>
                                    <span className="file-date">{item.duration}</span>
                                </div>
                            </div>

                            <div className="score-panel">
                                <div className="score-header">
                                    <span className="score-label">{item.scoreType}</span>
                                    <span className="score-number">{item.score}</span>
                                </div>
                                <div className="progress-track">
                                    <motion.div
                                        className="progress-fill"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${getScorePercent(item.score, item.scoreType)}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    ></motion.div>
                                </div>
                            </div>

                            <p className="file-desc">
                                {item.description}
                            </p>

                            <div className="file-footer">
                                <span className="deco-code">ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                                {/* Fake button for flair */}
                                <div className="download-btn"><FaDownload /> ACCESS</div>
                            </div>
                        </div>

                        {/* Decoration */}
                        <div className="corner-bracket tl"></div>
                        <div className="corner-bracket br"></div>
                    </motion.div>
                ))}
            </div>

            <div className="end-marker">
          // END_OF_ARCHIVE
            </div>

            <style>{`
        .mobile-edu-section {
           padding: 4rem 1rem 6rem;
           background: #050505;
           min-height: 100vh;
           font-family: 'Courier New', monospace; /* Monospace for file system look */
           color: #ccc;
           overflow-x: hidden;
        }

        /* HEADER */
        .edu-header {
           margin-bottom: 3rem;
           border-left: 2px solid #00bd5e;
           padding-left: 15px;
        }
        .header-badge {
           display: inline-flex; align-items: center; gap: 8px;
           color: #00bd5e; font-size: 0.75rem; letter-spacing: 2px;
           margin-bottom: 5px; opacity: 0.8;
           background: rgba(0, 189, 94, 0.1); padding: 2px 10px;
        }
        .header-title {
           font-size: 2rem; color: #fff; margin: 0; letter-spacing: 2px;
        }
        .header-deco-line {
           width: 50px; height: 2px; background: #00bd5e; margin-top: 10px;
        }

        /* ARCHIVE CONTAINER */
        .archive-container {
           display: flex; flex-direction: column; gap: 2rem;
           position: relative;
        }
        /* Connecting Line */
        .archive-container::before {
             content: ''; position: absolute; left: 19px; top: 0; bottom: 0;
             width: 1px; background: rgba(0, 189, 94, 0.3);
             z-index: 0;
        }

        /* FILE CARD */
        .archive-file {
           position: relative;
           z-index: 1;
           margin-left: 0;
        }

        .file-tab {
           display: flex; align-items: center; justify-content: space-between;
           background: #00bd5e;
           color: #000;
           padding: 5px 15px;
           width: fit-content;
           border-radius: 5px 5px 0 0;
           font-weight: bold; font-size: 0.75rem;
           clip-path: polygon(0 0, 90% 0, 100% 100%, 0 100%);
           margin-left: 20px; /* Offset for line */
        }
        .file-status { 
            margin-left: 20px; font-size: 0.65rem; display: flex; align-items: center; gap: 5px;
        }
        .blink { animation: blink 1s infinite; }

        .file-body {
           background: rgba(10, 20, 15, 0.9);
           border: 1px solid #00bd5e;
           padding: 20px;
           position: relative;
           box-shadow: 0 0 20px rgba(0, 189, 94, 0.1);
        }

        .file-grid {
           display: flex; gap: 15px; margin-bottom: 20px;
        }
        .icon-box {
           width: 50px; height: 50px; flex-shrink: 0;
           background: rgba(0, 189, 94, 0.1);
           border: 1px solid #00bd5e;
           display: flex; align-items: center; justify-content: center;
           font-size: 1.5rem; color: #00bd5e;
        }
        .meta-box {
           display: flex; flex-direction: column;
        }
        .file-title { margin: 0; font-size: 1.1rem; color: #fff; line-height: 1.2; }
        .file-sub { margin: 5px 0 0; font-size: 0.85rem; color: #aaa; font-weight: normal; }
        .file-date { margin-top: 5px; font-size: 0.75rem; color: #00bd5e; }

        /* SCORE */
        .score-panel {
           background: rgba(0,0,0,0.5); padding: 10px; border-radius: 4px;
           margin-bottom: 15px; border: 1px dashed rgba(255,255,255,0.1);
        }
        .score-header { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.75rem; color: #aaa; }
        .score-number { color: #fff; font-weight: bold; }
        
        .progress-track { width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
        .progress-fill { height: 100%; background: #00bd5e; box-shadow: 0 0 10px #00bd5e; }

        .file-desc { font-size: 0.8rem; line-height: 1.6; color: #bbb; margin-bottom: 15px; }

        .file-footer {
           display: flex; justify-content: space-between; align-items: center;
           border-top: 1px solid rgba(0, 189, 94, 0.2);
           padding-top: 10px; font-size: 0.7rem; color: #555;
        }
        .download-btn { display: flex; align-items: center; gap: 5px; color: #00bd5e; opacity: 0.7; }

        /* BRACKETS */
        .corner-bracket { position: absolute; width: 10px; height: 10px; border: 2px solid #00bd5e; }
        .tl { top: -2px; left: -2px; border-right: 0; border-bottom: 0; }
        .br { bottom: -2px; right: -2px; border-left: 0; border-top: 0; }

        .end-marker { text-align: center; font-size: 0.8rem; color: #333; margin-top: 2rem; letter-spacing: 2px; }

        @keyframes blink { 50% { opacity: 0; } }

      `}</style>
        </section>
    );
};

export default EducationSectionMobile;
