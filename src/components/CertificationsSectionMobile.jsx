import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificationsData } from "../Contents/Certifications";
import { FaShieldAlt, FaAward, FaBarcode, FaCheckCircle, FaTimes, FaExpand } from "react-icons/fa";

const CertificationsSectionMobile = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <section id="certifications" className="mobile-cert-section">

            {/* HEADER */}
            <div className="cert-header">
                <div className="header-badge">
                    <FaShieldAlt /> AUTH_LEVEL_5
                </div>
                <h2 className="header-title">CREDENTIALS_DB</h2>
                <p className="header-sub">VERIFIED LICENSES & CERTIFICATIONS</p>
            </div>

            {/* CREDENTIAL LIST */}
            <div className="credential-stack">
                {certificationsData.map((cert, index) => (
                    <motion.div
                        key={cert.id}
                        className="cred-card"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        onClick={() => setSelectedCert(cert)}
                    >
                        {/* SCANNER LINE ANIMATION */}
                        <div className="scan-laser"></div>

                        <div className="cred-body">
                            {/* LEFT: ICON SEAL */}
                            <div className="cred-seal">
                                <FaAward />
                            </div>

                            {/* CENTER: INFO */}
                            <div className="cred-info">
                                <h3 className="cred-title">{cert.title}</h3>
                                <div className="cred-meta">
                                    <span className="issuer">{cert.organization}</span>
                                    <span className="date">{cert.date}</span>
                                </div>
                            </div>

                            {/* RIGHT: STATUS */}
                            <div className="cred-status">
                                <FaBarcode className="barcode" />
                                <span className="verified-text"><FaCheckCircle size={10} /> VALID</span>
                            </div>
                        </div>

                        {/* DECORATIVE CORNERS */}
                        <div className="notch tl"></div>
                        <div className="notch tr"></div>
                        <div className="notch bl"></div>
                        <div className="notch br"></div>
                    </motion.div>
                ))}
            </div>

            {/* CERTIFICATE MODAL */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        className="cert-viewer-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            className="cert-viewer"
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="viewer-header">
                                <span className="viewer-title">EVIDENCE_FILE_0{selectedCert.id}</span>
                                <button className="close-btn" onClick={() => setSelectedCert(null)}><FaTimes /></button>
                            </div>

                            <div className="image-frame">
                                {selectedCert.imageUrl ? (
                                    <img src={selectedCert.imageUrl} alt={selectedCert.title} className="cert-img" />
                                ) : (
                                    <div className="no-image">
                                        <FaShieldAlt size={40} />
                                        <p>DIGITAL_COPY_MISSING</p>
                                    </div>
                                )}
                                <div className="holo-overlay"></div>
                            </div>

                            <div className="viewer-details">
                                <h4>{selectedCert.title}</h4>
                                <p>ISSUED BY: <span>{selectedCert.organization}</span></p>
                                <p>DATE: <span>{selectedCert.date}</span></p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        .mobile-cert-section {
           padding: 4rem 1rem 6rem;
           background: #050505;
           min-height: 100vh;
           font-family: 'Courier New', monospace; /* ID Card font */
           color: #fff;
           overflow-x: hidden;
        }

        /* HEADER */
        .cert-header { text-align: center; margin-bottom: 3rem; }
        .header-badge {
           display: inline-flex; align-items: center; gap: 8px;
           color: #ffd700; /* Gold for authority */
           font-size: 0.75rem; letter-spacing: 2px;
           margin-bottom: 5px; border: 1px solid #ffd700; padding: 2px 8px;
        }
        .header-title { font-size: 1.8rem; margin: 0; letter-spacing: 1px; color: #fff; }
        .header-sub { font-size: 0.7rem; color: #777; margin-top: 5px; }

        /* LIST */
        .credential-stack { display: flex; flex-direction: column; gap: 1.5rem; }

        .cred-card {
           position: relative;
           background: linear-gradient(90deg, #0a0a0a, #111);
           border: 1px solid #333;
           padding: 15px;
           overflow: hidden;
           cursor: pointer;
        }
        
        .scan-laser {
            position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 189, 94, 0.4), transparent);
            transform: skewX(-20deg);
            animation: laserPass 3s ease-in-out infinite;
            pointer-events: none; z-index: 10;
        }

        .cred-body {
           display: flex; align-items: center; gap: 15px; position: relative; z-index: 5;
        }

        .cred-seal {
           width: 50px; height: 50px; flex-shrink: 0;
           background: rgba(0, 189, 94, 0.1); border: 1px solid #00bd5e;
           border-radius: 50%; display: flex; align-items: center; justify-content: center;
           color: #00bd5e; font-size: 1.5rem;
           box-shadow: 0 0 10px rgba(0, 189, 94, 0.2);
        }

        .cred-info { flex: 1; min-width: 0; }
        .cred-title { 
            font-size: 0.9rem; margin: 0 0 5px 0; color: #fff; 
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cred-meta { display: flex; flex-direction: column; font-size: 0.7rem; color: #aaa; }
        .issuer { color: #00bd5e; font-weight: bold; text-transform: uppercase; }

        .cred-status {
            display: flex; flex-direction: column; align-items: flex-end; gap: 5px;
        }
        .barcode { font-size: 1.5rem; color: #555; }
        .verified-text { 
            font-size: 0.6rem; color: #00bd5e; display: flex; align-items: center; gap: 4px;
            font-weight: bold; letter-spacing: 1px;
        }

        /* Notches */
        .notch { position: absolute; width: 8px; height: 8px; border: 2px solid #555; transition: 0.3s; }
        .tl { top: 0; left: 0; border-right: 0; border-bottom: 0; }
        .tr { top: 0; right: 0; border-left: 0; border-bottom: 0; }
        .bl { bottom: 0; left: 0; border-right: 0; border-top: 0; }
        .br { bottom: 0; right: 0; border-left: 0; border-top: 0; }
        
        .cred-card:active .notch { border-color: #00bd5e; width: 12px; height: 12px; }

        /* MODAL */
        .cert-viewer-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.9); z-index: 2000;
            display: flex; align-items: center; justify-content: center;
            padding: 20px;
        }
        .cert-viewer {
            width: 100%; max-width: 400px;
            background: #111; border: 1px solid #333;
            padding: 15px; position: relative;
        }
        
        .viewer-header { 
            display: flex; justify-content: space-between; align-items: center; marginBottom: 15px;
            border-bottom: 1px solid #333; padding-bottom: 10px;
        }
        .viewer-title { font-size: 0.7rem; color: #00bd5e; letter-spacing: 1px; }
        .close-btn { background: transparent; border: none; color: #fff; font-size: 1.2rem; }

        .image-frame {
            width: 100%; height: 250px; background: #000;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 15px; position: relative; overflow: hidden;
            border: 1px dashed #333;
        }
        .cert-img { width: 100%; height: 100%; object-fit: contain; }
        .no-image { color: #555; text-align: center; font-size: 0.7rem; }
        .holo-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%);
            pointer-events: none;
        }

        .viewer-details h4 { margin: 0 0 10px 0; color: #fff; font-size: 1rem; }
        .viewer-details p { margin: 5px 0; font-size: 0.7rem; color: #777; }
        .viewer-details span { color: #ccc; }

        @keyframes laserPass { 0% { left: -100%; } 50%, 100% { left: 200%; } }

      `}</style>
        </section>
    );
};

export default CertificationsSectionMobile;
