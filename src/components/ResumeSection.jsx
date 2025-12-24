import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilePdf, FaFingerprint, FaLock, FaDownload, FaEye, FaShieldAlt, FaTimes } from "react-icons/fa";
import resumePdf from "../assets/Tharunkumar_Resume.pdf";
import ResumeSectionMobile from "./ResumeSectionMobile";

const ResumeSection = () => {

  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (mounted && isMobile) {
    return <ResumeSectionMobile />;
  }

  return (
    <section id="resume" className="section resume-section">
      <div className="container">

        <motion.div
          className="secure-uplink-container"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* DECORATIVE CORNERS */}
          <div className="corner-bracket tl"></div>
          <div className="corner-bracket tr"></div>
          <div className="corner-bracket bl"></div>
          <div className="corner-bracket br"></div>

          {/* HEADER */}
          <div className="uplink-header">
            <div className="status-light blink"></div>
            <span className="secure-text">SECURE DATA UPLINK // V.10</span>
            <FaLock className="lock-icon" />
          </div>

          <div className="uplink-content-row">
            {/* LEFT: ICON */}
            <div className="file-hologram">
              <div className={`holo-ring ${isHovered ? 'spin-fast' : 'spin-slow'}`}></div>
              <FaFilePdf className="file-icon" />
              <div className="scan-laser"></div>
            </div>

            {/* CENTER: TEXT */}
            <div className="uplink-info">
              <h3>PROFESSIONAL RESUME</h3>
              <p className="file-meta">
                IDENTITY: THARUNKUMAR<br />
                ROLE: FULL STACK DEVELOPER<br />
                DATA: SKILLS, PROJECTS, EXPERIENCE<br />
                STATUS: <span style={{ color: 'var(--primary-color)' }}>READY FOR DOWNLOAD</span>
              </p>
            </div>

            {/* RIGHT: FINGERPRINT AUTH */}
            <div className="auth-module">
              <FaFingerprint className={`fingerprint ${isHovered ? 'active' : ''}`} />
              <span className="auth-status">{isHovered ? 'ACCESS GRANTED' : 'TOUCH TO AUTHENTICATE'}</span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="uplink-actions">
            <button
              onClick={() => setShowModal(true)}
              className="uplink-btn primary"
            >
              <FaEye /> INITIALIZE PREVIEW
              <div className="btn-glitch"></div>
            </button>

            <a
              href={resumePdf}
              download="Tharunkumar_Resume.pdf"
              className="uplink-btn secondary"
            >
              <FaDownload /> DOWNLOAD PACKET
              <div className="progress-bar"></div>
            </a>
          </div>

          <div className="security-footer">
            <FaShieldAlt /> ENCRYPTED CONNECTION ESTABLISHED
          </div>

        </motion.div>

        {/* PREVIEW MODAL */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="resume-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            >
              <motion.div
                className="resume-modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                  <FaTimes />
                </button>
                <div className="pdf-frame-wrapper">
                  <iframe
                    src={resumePdf}
                    title="Resume Preview"
                    className="pdf-viewer"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style>{`
        .resume-section {
            padding: 6rem 0;
            position: relative;
            background: radial-gradient(circle at center, rgba(0, 255, 102, 0.03) 0%, transparent 70%);
        }

        .secure-uplink-container {
            max-width: 900px;
            margin: 0 auto;
            background: rgba(5, 10, 5, 0.85);
            border: 1px solid rgba(0, 255, 102, 0.2);
            padding: 3rem;
            position: relative;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
        }

        /* CORNERS */
        .corner-bracket {
            position: absolute;
            width: 20px; height: 20px;
            border: 2px solid var(--primary-color);
            transition: 0.3s;
        }
        .tl { top: -2px; left: -2px; border-right: none; border-bottom: none; }
        .tr { top: -2px; right: -2px; border-left: none; border-bottom: none; }
        .bl { bottom: -2px; left: -2px; border-right: none; border-top: none; }
        .br { bottom: -2px; right: -2px; border-left: none; border-top: none; }
        
        .secure-uplink-container:hover .corner-bracket {
            width: 30px; height: 30px;
            box-shadow: 0 0 10px var(--primary-color);
        }

        /* HEADER */
        .uplink-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 1rem;
            margin-bottom: 2rem;
            font-family: monospace;
        }
        .status-light {
            width: 10px; height: 10px;
            background: var(--primary-color);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--primary-color);
        }
        .blink { animation: blink 2s infinite; }
        .secure-text {
            color: var(--primary-color);
            letter-spacing: 2px;
            font-size: 0.9rem;
        }
        .lock-icon { color: #555; }

        /* CONTENT ROW */
        .uplink-content-row {
            display: flex;
            align-items: center;
            gap: 3rem;
            margin-bottom: 2.5rem;
        }

        /* HOLOGRAM FILE */
        .file-hologram {
            position: relative;
            width: 80px; height: 80px;
            display: flex; align-items: center; justify-content: center;
        }
        .file-icon {
            font-size: 3rem; color: white; z-index: 2;
        }
        .holo-ring {
            position: absolute;
            width: 100%; height: 100%;
            border: 2px dashed var(--primary-color);
            border-radius: 50%;
            opacity: 0.3;
        }
        .scan-laser {
            position: absolute;
            width: 120%; height: 2px;
            background: var(--primary-color);
            animation: scanVertical 2s linear infinite;
            opacity: 0.8;
            box-shadow: 0 0 5px var(--primary-color);
        }
        .spin-slow { animation: spinRight 10s linear infinite; }
        .spin-fast { animation: spinRight 2s linear infinite; border-color: #fff; }

        /* INFO */
        .uplink-info h3 {
            font-size: 1.8rem; color: white; margin-bottom: 0.5rem;
            font-family: monospace;
        }
        .file-meta {
            font-family: monospace; color: #888; line-height: 1.5; font-size: 0.9rem;
        }

        /* AUTH MODULE */
        .auth-module {
            margin-left: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }
        .fingerprint {
            font-size: 3.5rem; color: #333; transition: 0.5s;
        }
        .fingerprint.active {
            color: var(--primary-color);
            filter: drop-shadow(0 0 10px var(--primary-color));
        }
        .auth-status {
            font-family: monospace; font-size: 0.7rem; color: #555;
            letter-spacing: 1px;
        }

        /* ACTIONS */
        .uplink-actions {
            display: flex; gap: 1.5rem;
        }
        .uplink-btn {
            flex: 1;
            display: flex; align-items: center; justify-content: center; gap: 0.8rem;
            padding: 1.2rem;
            text-decoration: none;
            font-family: monospace;
            font-weight: bold;
            font-size: 1rem;
            letter-spacing: 1px;
            position: relative;
            overflow: hidden;
            transition: 0.3s;
            cursor: pointer;
            border-radius: 4px;
        }
        
        .uplink-btn.primary {
            background: transparent;
            border: 1px solid var(--primary-color);
            color: var(--primary-color);
        }
        .uplink-btn.primary:hover {
            background: rgba(0, 255, 102, 0.1);
            box-shadow: 0 0 20px rgba(0, 255, 102, 0.2);
            text-shadow: 0 0 5px var(--primary-color);
        }

        .uplink-btn.secondary {
            background: var(--primary-color);
            color: black;
            border: 1px solid var(--primary-color);
        }
        .uplink-btn.secondary:hover {
            background: #00cc52;
            box-shadow: 0 0 30px rgba(0, 255, 102, 0.4);
        }

        .security-footer {
            margin-top: 2rem;
            text-align: center;
            font-family: monospace;
            font-size: 0.8rem;
            color: #444;
            display: flex; align-items: center; justify-content: center; gap: 0.5rem;
        }

        /* MODAL STYLES */
        .resume-modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            padding: 2rem;
        }
        .resume-modal-content {
            background: #050505;
            border: 1px solid var(--primary-color);
            width: 100%;
            height: 90vh;
            max-width: 1000px;
            position: relative;
            box-shadow: 0 0 50px rgba(0, 255, 102, 0.2);
            border-radius: 10px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .close-modal-btn {
            position: absolute;
            top: 10px; right: 10px;
            background: black;
            border: 1px solid var(--primary-color);
            color: var(--primary-color);
            font-size: 1.5rem;
            width: 40px; height: 40px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 20;
            display: flex; align-items: center; justify-content: center;
            transition: 0.3s;
        }
        .close-modal-btn:hover {
            background: var(--primary-color);
            color: black;
        }
        .pdf-frame-wrapper {
            flex: 1;
            width: 100%;
            height: 100%;
        }
        .pdf-viewer {
            width: 100%;
            height: 100%;
            border: none;
        }

        @keyframes blink { 50% { opacity: 0; } }
        @keyframes scanVertical { 
            0% { top: 0%; opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
        @keyframes spinRight { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media(max-width: 768px) {
            .secure-uplink-container { padding: 1.5rem; }
            .uplink-content-row { flex-direction: column; text-align: center; gap: 1.5rem; }
            .auth-module { margin-left: 0; }
            .uplink-actions { flex-direction: column; }
            .resume-modal-content { height: 80vh; }
        }
      `}</style>
    </section>
  );
};

export default ResumeSection;
