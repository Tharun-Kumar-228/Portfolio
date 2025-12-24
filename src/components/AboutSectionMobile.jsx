import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGlobeAmericas, FaEnvelopeOpenText, FaFingerprint, FaFolderOpen } from "react-icons/fa";

const AboutSectionMobile = ({ data }) => {
    const [decrypted, setDecrypted] = useState(false);

    useEffect(() => {
        // Simulate decryption delay
        setTimeout(() => setDecrypted(true), 1000);
    }, []);

    const containerVars = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const textVars = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="about" className="mobile-about-section">
            <motion.div
                className="dossier-container"
                variants={containerVars}
                initial="hidden"
                animate="visible"
            >

                {/* HEADER: FOLDER TAB */}
                <div className="dossier-tab">
                    <FaFolderOpen className="tab-icon" />
                    <span className="tab-text">USER_BIO.LOG</span>
                </div>

                {/* MAIN FILE CONTENT */}
                <div className="dossier-content">
                    <div className="file-header">
                        <div className="file-id">ID: 8492-AX</div>
                        <div className="file-status">STATUS: <span className="status-ok">DECRYPTED</span></div>
                    </div>

                    <div className="divider-line"></div>

                    {/* TEXT CONTENT */}
                    <div className="bio-text-block">
                        {decrypted ? (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                {data.summary}
                            </motion.p>
                        ) : (
                            <div className="encrypt-scramble">
                                {/* Fake scrambled text effect */}
                                x8F9s#kL2@9d$j!001... DECRYPTING ...
                            </div>
                        )}
                    </div>

                    {/* META DATA (Location/Email only) */}
                    <div className="meta-grid">
                        <motion.div
                            className="meta-row"
                            variants={textVars}
                            initial="hidden"
                            animate={decrypted ? "visible" : "hidden"}
                            transition={{ delay: 0.2 }}
                        >
                            <FaGlobeAmericas className="meta-ico" />
                            <span>{data.location}</span>
                        </motion.div>

                        <motion.div
                            className="meta-row"
                            variants={textVars}
                            initial="hidden"
                            animate={decrypted ? "visible" : "hidden"}
                            transition={{ delay: 0.4 }}
                        >
                            <FaEnvelopeOpenText className="meta-ico" />
                            <span>{data.email}</span>
                        </motion.div>
                    </div>

                    <div className="watermark">CONFIDENTIAL</div>
                </div>

            </motion.div>

            <style>{`
        .mobile-about-section {
           padding: 4rem 1.5rem;
           background: #050505;
           font-family: 'Courier New', monospace;
           color: #ccc;
           overflow: hidden;
        }

        .dossier-container {
           max-width: 100%;
        }

        /* --- FOLDER TAB --- */
        .dossier-tab {
           display: inline-flex; align-items: center; gap: 10px;
           background: rgba(0, 189, 94, 0.1);
           padding: 8px 20px;
           border-top-left-radius: 10px;
           border-top-right-radius: 10px;
           border: 1px solid rgba(0, 189, 94, 0.3);
           border-bottom: none;
           color: #00bd5e;
           font-size: 0.9rem; letter-spacing: 1px;
        }

        /* --- CONTENT BOX --- */
        .dossier-content {
           background: rgba(0, 20, 10, 0.6);
           border: 1px solid rgba(0, 189, 94, 0.3);
           border-top-right-radius: 10px;
           border-bottom-left-radius: 10px;
           border-bottom-right-radius: 10px;
           padding: 20px;
           position: relative;
           backdrop-filter: blur(5px);
           box-shadow: 0 0 20px rgba(0,0,0,0.5);
        }

        /* Header info */
        .file-header {
           display: flex; justify-content: space-between;
           font-size: 0.7rem; color: #666; margin-bottom: 10px;
        }
        .status-ok { color: #00bd5e; font-weight: bold; animation: blink 2s infinite; }

        .divider-line {
           height: 1px; background: linear-gradient(to right, #00bd5e, transparent);
           margin-bottom: 20px; opacity: 0.5;
        }

        /* Bio */
        .bio-text-block {
           font-size: 0.95rem; line-height: 1.6;
           color: #ddd; margin-bottom: 2rem;
           min-height: 100px;
        }
        .encrypt-scramble {
           color: #00bd5e; font-family: monospace; opacity: 0.7;
        }

        /* Meta Grid */
        .meta-grid {
           display: flex; flex-direction: column; gap: 10px;
           border-top: 1px dashed rgba(255,255,255,0.1);
           padding-top: 15px;
        }
        .meta-row {
           display: flex; align-items: center; gap: 10px;
           font-size: 0.85rem; color: #aaa;
        }
        .meta-ico { color: #00bd5e; font-size: 1rem; }

        /* Watermark */
        .watermark {
           position: absolute; bottom: 20px; right: 20px;
           font-size: 3rem; font-weight: 900;
           color: rgba(255,255,255,0.03);
           transform: rotate(-10deg);
           pointer-events: none;
           user-select: none;
        }

        @keyframes blink { 50% { opacity: 0.5; } }
      `}</style>
        </section>
    );
};

export default AboutSectionMobile;
