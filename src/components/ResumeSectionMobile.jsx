import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilePdf, FaDownload, FaEye, FaLock, FaGlobeAmericas, FaTimes, FaFingerprint, FaDatabase, FaLayerGroup, FaMedal } from "react-icons/fa";
import resumePdf from "../assets/Tharunkumar_Resume.pdf";
import { projectsData } from "../Contents/Projects";
import { certificationsData } from "../Contents/Certifications";
import { achievementsData } from "../Contents/Achievements";

const ResumeSectionMobile = () => {
    const [showModal, setShowModal] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = () => {
        setDownloading(true);
        setTimeout(() => setDownloading(false), 3000); // Reset for effect
    };

    return (
        <section id="resume" className="mobile-resume-section">

            {/* HEADER */}
            <div className="transmission-header">
                <div className="signal-bar">
                    <span className="blink">●</span> SECURE_RESUME_UPLINK
                </div>
                <div className="encryption-code">V.2025-RC1</div>
            </div>

            {/* DATA PACKET CARD */}
            <div className="data-packet">
                <div className="packet-border"></div>

                <div className="holo-emitter">
                    <div className="emitter-base">
                        <FaLayerGroup className="globe-spin" />
                    </div>
                    <div className="beam"></div>
                    <div className="file-projection">
                        <FaFilePdf size={40} />
                        <div className="scan-line"></div>
                    </div>
                </div>

                <div className="packet-info">
                    <h2 className="glitch-text" data-text="PROFESSIONAL_RESUME">PROFESSIONAL_RESUME</h2>

                    <div className="data-manifest">
                        <div className="manifest-row"><FaLayerGroup /> TECH_PROJECTS: <span>{projectsData.length}</span></div>
                        <div className="manifest-row"><FaDatabase /> CERTIFICATIONS: <span>{certificationsData.length}</span></div>
                        <div className="manifest-row"><FaMedal /> AWARDS_WON: <span>{achievementsData.length}</span></div>
                    </div>

                    <p className="packet-sub">
                        CANDIDATE: THARUNKUMAR<br />
                        ROLE: FULL STACK DEVELOPER<br />
                        FORMAT: PDF // ENCRYPTED<br />
                        STATUS: <span className="ready">READY_TO_DOWNLOAD</span>
                    </p>
                </div>

                {/* ACTION DECK */}
                <div className="action-deck">

                    {/* PREVIEW BUTTON */}
                    <button className="action-btn view-btn" onClick={() => setShowModal(true)}>
                        <div className="btn-content">
                            <FaEye /> PREVIEW_DOCUMENT
                        </div>
                        <div className="bg-sweep"></div>
                    </button>

                    {/* DOWNLOAD BUTTON */}
                    <a
                        href={resumePdf}
                        download="Tharunkumar_Resume.pdf"
                        className={`action-btn download-btn ${downloading ? 'active' : ''}`}
                        onClick={handleDownload}
                    >
                        <div className="btn-content">
                            <FaDownload /> {downloading ? 'DOWNLOADING...' : 'DOWNLOAD_CV'}
                        </div>
                        {downloading && <div className="progress-fill"></div>}
                    </a>

                </div>

                <div className="security-seal">
                    <FaFingerprint /> BIOMETRIC_BYPASS_ENABLED
                </div>

                {/* CORNERS */}
                <div className="c-corner c-tl"></div>
                <div className="c-corner c-tr"></div>
                <div className="c-corner c-bl"></div>
                <div className="c-corner c-br"></div>
            </div>

            {/* PDF MODAL */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="resume-viewer-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            className="viewer-content"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="viewer-bar">
                                <span>SECURE_VIEWER_V1.0</span>
                                <button onClick={() => setShowModal(false)}><FaTimes /></button>
                            </div>
                            <iframe
                                src={resumePdf}
                                title="Resume"
                                className="pdf-frame"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .mobile-resume-section {
                    padding: 5rem 1rem 8rem;
                    background: #050505;
                    font-family: 'Rajdhani', sans-serif;
                    min-height: 80vh;
                    display: flex; flex-direction: column; align-items: center;
                }

                /* HEADER */
                .transmission-header {
                    width: 100%; max-width: 350px;
                    display: flex; justify-content: space-between;
                    color: #00bd5e; font-family: monospace; font-size: 0.7rem;
                    margin-bottom: 2rem; border-bottom: 1px dashed rgba(0, 189, 94, 0.3);
                    padding-bottom: 5px;
                }
                .blink { animation: blink 1s infinite; margin-right: 5px; color: red; }
                .encryption-code { color: #555; }

                /* PACKET CARD */
                .data-packet {
                    position: relative;
                    width: 100%; max-width: 350px;
                    background: rgba(10, 20, 15, 0.6);
                    border: 1px solid rgba(0, 189, 94, 0.2);
                    padding: 2rem;
                    display: flex; flex-direction: column; align-items: center;
                    backdrop-filter: blur(10px);
                }
                
                /* HOLO ANIMATION */
                .holo-emitter {
                    position: relative; height: 120px; width: 100%;
                    display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
                    margin-bottom: 20px;
                }
                .emitter-base {
                    font-size: 2rem; color: #00bd5e; margin-top: auto; 
                    filter: drop-shadow(0 0 10px #00bd5e);
                    animation: float 4s ease-in-out infinite;
                }
                .globe-spin { animation: spin 10s linear infinite; }
                
                .file-projection {
                    position: absolute; bottom: 40px; 
                    color: white; opacity: 0.9;
                    animation: hover 3s ease-in-out infinite;
                }
                .scan-line {
                    position: absolute; top:0; width: 100%; height: 2px; background: #00bd5e;
                    animation: scan 2s linear infinite; box-shadow: 0 0 5px #00bd5e;
                }
                .beam {
                    position: absolute; bottom: 20px; width: 60px; height: 80px;
                    background: linear-gradient(to top, rgba(0,189,94,0.2), transparent);
                    clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
                }

                /* TEXT INFO */
                .packet-info { text-align: center; margin-bottom: 2rem; width: 100%; }
                .glitch-text {
                    font-size: 1.5rem; color: #fff; letter-spacing: 2px; margin: 0 0 15px 0;
                    position: relative;
                }
                /* Glitch Keyframes kept same */
                .glitch-text::before, .glitch-text::after {
                    content: attr(data-text); position: absolute; left: 0; top: 0; width: 100%;
                    background: #050505; clip: rect(0,0,0,0);
                }
                .glitch-text::before {
                    left: 2px; text-shadow: -1px 0 red; animation: glitch-anim-1 2s infinite linear alternate-reverse;
                }
                .glitch-text::after {
                    left: -2px; text-shadow: -1px 0 blue; animation: glitch-anim-2 3s infinite linear alternate-reverse;
                }
                
                .data-manifest {
                    background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
                    padding: 10px; margin-bottom: 15px; border-radius: 5px;
                    display: inline-block; width: 100%; text-align: left;
                }
                .manifest-row {
                    display: flex; align-items: center; gap: 8px;
                    font-size: 0.8rem; color: #aaa; margin-bottom: 5px;
                    font-family: monospace; border-bottom: 1px dashed rgba(255,255,255,0.05);
                    padding-bottom: 3px;
                }
                .manifest-row:last-child { margin-bottom: 0; border-bottom: none; }
                .manifest-row span { margin-left: auto; color: #00bd5e; font-weight: bold; }

                .packet-sub {
                    font-family: monospace; color: #555; font-size: 0.75rem; line-height: 1.6;
                }
                .ready { color: #00bd5e; font-weight: bold; animation: blink 1s infinite; }

                /* ACTIONS */
                .action-deck { width: 100%; display: flex; flex-direction: column; gap: 15px; }

                .action-btn {
                    position: relative; width: 100%; padding: 15px; border: none;
                    background: rgba(255,255,255,0.05); color: #fff;
                    font-family: monospace; font-size: 0.9rem; letter-spacing: 1px;
                    cursor: pointer; overflow: hidden; text-decoration: none; display: block;
                    text-align: center; clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
                }
                .btn-content { position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; gap: 10px; }
                
                .view-btn { border: 1px solid rgba(255, 255, 255, 0.2); }
                .view-btn:active { background: rgba(255,255,255,0.1); }
                
                .download-btn { background: #00bd5e; color: #000; font-weight: bold; border: 1px solid #00bd5e; }
                .progress-fill {
                    position: absolute; top: 0; left: 0; height: 100%; width: 0%;
                    background: rgba(0,0,0,0.2); z-index: 1;
                    animation: fillBar 3s linear forwards;
                }
                .download-btn.active .progress-fill { display: block; }
                
                .security-seal {
                    margin-top: 2rem; color: #333; font-size: 0.6rem; display: flex; align-items: center; gap: 5px;
                }

                /* CORNERS */
                .c-corner { position: absolute; width: 10px; height: 10px; border: 2px solid #00bd5e; }
                .c-tl { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
                .c-tr { top: -1px; right: -1px; border-left: 0; border-bottom: 0; }
                .c-bl { bottom: -1px; left: -1px; border-right: 0; border-top: 0; }
                .c-br { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }

                /* MODAL */
                .resume-viewer-overlay {
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.9); z-index: 10000;
                    display: flex; flex-direction: column; justify-content: flex-end;
                }
                .viewer-content {
                    background: #111; height: 90vh; width: 100%;
                    border-top-left-radius: 20px; border-top-right-radius: 20px;
                    display: flex; flex-direction: column; overflow: hidden;
                    box-shadow: 0 -5px 30px rgba(0, 189, 94, 0.2);
                    border-top: 1px solid #00bd5e;
                }
                .viewer-bar {
                    padding: 15px; display: flex; justify-content: space-between; align-items: center;
                    border-bottom: 1px solid #333; background: #080808;
                }
                .viewer-bar span { color: #00bd5e; font-family: monospace; font-size: 0.8rem; }
                .viewer-bar button { background: none; border: none; color: #fff; font-size: 1.2rem; }
                
                .pdf-frame { width: 100%; flex: 1; border: none; background: #fff; }

                @keyframes blink { 50% { opacity: 0; } }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
                @keyframes hover { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
                @keyframes fillBar { 0% { width: 0%; } 100% { width: 100%; } }
                
                @keyframes glitch-anim-1 {
                    0% { clip: rect(30px, 9999px, 10px, 0); }
                    20% { clip: rect(20px, 9999px, 80px, 0); }
                    40% { clip: rect(50px, 9999px, 30px, 0); }
                    60% { clip: rect(10px, 9999px, 60px, 0); }
                    80% { clip: rect(40px, 9999px, 20px, 0); }
                    100% { clip: rect(70px, 9999px, 50px, 0); }
                }
                @keyframes glitch-anim-2 {
                    0% { clip: rect(10px, 9999px, 50px, 0); }
                    20% { clip: rect(60px, 9999px, 20px, 0); }
                    40% { clip: rect(20px, 9999px, 70px, 0); }
                    60% { clip: rect(80px, 9999px, 10px, 0); }
                    80% { clip: rect(30px, 9999px, 40px, 0); }
                    100% { clip: rect(50px, 9999px, 80px, 0); }
                }

            `}</style>
        </section>
    );
};

export default ResumeSectionMobile;
