import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaUserSecret, FaFileDownload, FaEye, FaMicrochip, FaGlobeAmericas, FaEnvelopeOpenText } from "react-icons/fa";
import { aboutData } from "../Contents/About";
import resumePdf from "../assets/Tharunkumar_Resume.pdf";

const AboutSection = () => {
  if (!aboutData || aboutData.length === 0) return null;
  const data = aboutData[0];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });



  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">

        {/* TECH HEADER */}
        <div className="tech-header-line">
          <span className="line-segment"></span>
          <span className="line-text">SYSTEM_IDENTITY :: <span style={{ color: 'var(--primary-color)' }}>ONLINE</span></span>
          <span className="line-segment"></span>
        </div>

        <div className="about-grid">

          {/* PROFILE HOLO-FRAME */}
          <motion.div
            className="profile-scanner"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="hex-frame">
              <div className="hex-content">
                <img src={data.image} alt={data.name} className="profile-img" />
                <div className="scan-line"></div>
              </div>
              <div className="hex-border spin-slow"></div>
              <div className="hex-border spin-fast inverse"></div>
            </div>
            <div className="profile-status">
              <FaUserSecret /> IDENTITY VERIFIED
            </div>
          </motion.div>

          {/* BIO DATA LOG */}
          <motion.div
            className="bio-terminal"
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="terminal-title">
              <span className="blink">{">"}</span> {data.name}
            </h2>
            <h3 className="terminal-subtitle">
              CLASS: <span className="highlight-text">{data.role}</span>
            </h3>

            <div className="terminal-body">
              <p>{data.summary}</p>
            </div>



            {/* CONTACT DATA */}
            <div className="meta-data-row">
              <div className="meta-item">
                <FaGlobeAmericas className="meta-icon" />
                <span>{data.location}</span>
              </div>
              <div className="meta-item">
                <FaEnvelopeOpenText className="meta-icon" />
                <span>{data.email}</span>
              </div>
            </div>

            {/* ACTION MODULES */}
            <div className="action-modules">
              <a href={resumePdf} target="_blank" rel="noreferrer" className="module-btn outline">
                <FaEye /> ACCESS RESUME
              </a>
              <a href={resumePdf} download="Tharunkumar_Resume.pdf" className="module-btn filled">
                <FaFileDownload /> DOWNLOAD DATA
              </a>
            </div>

          </motion.div>

        </div>
      </div>

      <style>{`
        .about-section {
            padding: 6rem 0;
            position: relative;
            overflow: hidden;
        }

        /* DECORATIVE LINE */
        .tech-header-line {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 4rem;
            opacity: 0.7;
        }
        .line-segment {
            height: 1px;
            background: var(--primary-color);
            flex: 1;
            max-width: 100px;
        }
        .line-text {
            font-family: monospace;
            font-size: 0.9rem;
            letter-spacing: 2px;
            color: var(--text-secondary);
        }

        .about-grid {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 4rem;
            align-items: center;
        }

        /* HEXAGONAL PROFILE */
        .profile-scanner {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }
        
        .hex-frame {
            width: 300px;
            height: 300px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* CLIP PATH HEXAGON */
        .hex-content {
            width: 260px;
            height: 260px;
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            background: #111;
            position: relative;
            z-index: 2;
        }
        .profile-img {
            width: 100%; height: 100%; object-fit: cover;
            filter: grayscale(100%) contrast(1.2);
            transition: 0.5s;
        }
        .profile-scanner:hover .profile-img {
            filter: grayscale(0%);
        }

        .scan-line {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 5px;
            background: var(--primary-color);
            box-shadow: 0 0 10px var(--primary-color);
            animation: scanDown 3s linear infinite;
            opacity: 0.7;
            z-index: 3;
        }

        @keyframes scanDown {
            0% { top: -10%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }

        /* SPINNING BORDERS */
        .hex-border {
            position: absolute;
            width: 100%; height: 100%;
            border-radius: 50%; /* Using circle borders around hex for contrast */
            border: 2px dashed rgba(0, 255, 102, 0.3);
            z-index: 1;
        }
        .spin-slow { animation: spinRight 20s linear infinite; width: 290px; height: 290px; }
        .spin-fast { 
            animation: spinLeft 10s linear infinite; 
            width: 310px; height: 310px; 
            border-color: rgba(0, 255, 102, 0.1); 
            border-style: dotted;
        }
        
        .profile-status {
            margin-top: 2rem;
            font-family: monospace;
            background: rgba(0, 255, 102, 0.1);
            color: var(--primary-color);
            padding: 0.5rem 1rem;
            border: 1px solid var(--primary-color);
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            letter-spacing: 1px;
        }

        /* BIO TERMINAL */
        .bio-terminal {
            background: rgba(5, 10, 5, 0.8);
            border-left: 3px solid var(--primary-color);
            padding: 2rem;
            backdrop-filter: blur(5px);
            position: relative;
        }
        .bio-terminal::before {
            content: ''; position: absolute; top: 0; right: 0;
            width: 20px; height: 20px;
            border-top: 2px solid var(--primary-color);
            border-right: 2px solid var(--primary-color);
        }

        .terminal-title {
            font-family: monospace;
            font-size: 2.5rem;
            color: white;
            margin-bottom: 0.5rem;
        }
        .blink { animation: blink 1s infinite; color: var(--primary-color); }
        .terminal-subtitle {
            font-family: monospace;
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
        }
        .highlight-text { color: var(--primary-color); }

        .terminal-body {
            color: #ccc;
            line-height: 1.8;
            margin-bottom: 2rem;
            font-size: 1.05rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 1.5rem;
        }

        /* SPECS */
        .system-specs {
            display: flex;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        .spec-card {
            background: rgba(0,0,0,0.5);
            padding: 0.8rem 1.2rem;
            border-radius: 5px;
            border: 1px solid rgba(255,255,255,0.1);
            text-align: center;
        }
        .spec-val {
            display: block;
            font-size: 1.5rem;
            font-weight: 800;
            font-family: monospace;
        }
        .spec-label {
            font-size: 0.7rem;
            color: #888;
            letter-spacing: 1px;
        }

        .meta-data-row {
            display: flex;
            gap: 1.5rem;
            margin-bottom: 2.5rem;
            font-family: monospace;
            color: var(--text-secondary);
        }
        .meta-item { display: flex; align-items: center; gap: 0.5rem; }
        .meta-icon { color: var(--primary-color); }

        /* ACTIONS */
        .action-modules {
            display: flex; gap: 1rem;
        }
        .module-btn {
            flex: 1;
            padding: 1rem;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            display: flex; align-items: center; justify-content: center; gap: 0.8rem;
            font-family: monospace;
            transition: 0.3s;
            text-transform: uppercase;
        }
        .module-btn.outline {
            border: 1px solid var(--primary-color);
            color: var(--primary-color);
            background: transparent;
        }
        .module-btn.outline:hover {
            background: rgba(0, 255, 102, 0.1);
            box-shadow: 0 0 15px rgba(0, 255, 102, 0.2);
        }
        .module-btn.filled {
            background: var(--primary-color);
            color: black;
            border: 1px solid var(--primary-color);
        }
        .module-btn.filled:hover {
            background: #00cc52;
            box-shadow: 0 0 20px rgba(0, 255, 102, 0.4);
        }

        @keyframes blink { 50% { opacity: 0; } }
        @keyframes scanDown {
            0% { top: -10%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }

        @media(max-width: 900px) {
            .about-grid { grid-template-columns: 1fr; text-align: center; }
            .profile-scanner { margin-bottom: 2rem; }
            .system-specs { justify-content: center; }
            .meta-data-row { justify-content: center; }
            .bio-terminal { border-left: none; border-top: 3px solid var(--primary-color); }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
