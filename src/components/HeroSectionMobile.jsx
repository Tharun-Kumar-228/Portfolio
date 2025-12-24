import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload, FaCode, FaTerminal, FaShieldAlt } from "react-icons/fa";

const HeroSectionMobile = ({ about }) => {
   const [bootSequence, setBootSequence] = useState(0); // 0:Off, 1:Boot, 2:Ready
   const [scanned, setScanned] = useState(false);

   useEffect(() => {
      // 1. Boot Sequence (Text + Loader)
      setTimeout(() => setBootSequence(1), 500);
      // 2. Ready (Fade out boot, reveal UI)
      setTimeout(() => setBootSequence(2), 2500);

      // 3. Start Scan (After UI is revealed)
      setTimeout(() => setScanned(true), 3500);
   }, []);

   // --- NEW VARIANTS --- //

   // The Laser Scan Line
   const scanLineVars = {
      initial: { top: "-10%", opacity: 0 },
      scan: {
         top: "120%",
         opacity: 1,
         transition: { duration: 3, ease: "linear", repeat: Infinity, repeatDelay: 1 }
      }
   };

   // The Image Reveal
   const revealVars = {
      hidden: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0.2, filter: "grayscale(100%) brightness(0.8)" },
      visible: {
         clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
         opacity: 1,
         filter: "grayscale(0%) brightness(0.9)", // Slightly dimmed for comfort
         transition: { duration: 2.5, ease: "linear" }
      }
   };

   // Boot Overlay
   const bootVars = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8 } }
   };

   return (
      <div className="scanner-container">

         {/* 1. DIGITAL RAIN BG (Dimmed) */}
         <div className="matrix-rain"></div>
         <div className="scan-grid"></div>

         {/* --- NEW: SYSTEM BOOT LANDING --- */}
         <AnimatePresence>
            {bootSequence < 2 && (
               <motion.div
                  className="boot-overlay"
                  variants={bootVars}
                  initial="visible"
                  exit="exit"
               >
                  <div className="boot-content">
                     <FaShieldAlt className="boot-icon" />
                     <div className="boot-text">
                        <span>ESTABLISHING SECURE UPLINK...</span>
                        <span className="boot-sub">ENCRYPTING CONNECTION</span>
                     </div>
                     <div className="boot-loader">
                        <motion.div
                           className="loader-bar"
                           initial={{ width: 0 }}
                           animate={{ width: "100%" }}
                           transition={{ duration: 1.5 }}
                        />
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* 2. THE MAIN HUD (Reveals after Boot) */}
         <motion.div
            className="main-interface"
            initial={{ opacity: 0 }}
            animate={bootSequence === 2 ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
         >
            <div className="hud-overlay">
               <div className="hud-corner tl"></div>
               <div className="hud-corner tr"></div>
               <div className="hud-corner bl"></div>
               <div className="hud-corner br"></div>

               <div className="sys-status">
                  <span className="blink-dot"></span> SYS: ONLINE
               </div>
               <div className="sys-id">
                  ID: {scanned ? "CONFIRMED" : "SCANNING..."}
               </div>
            </div>

            {/* 3. THE PROFILE */}
            <div className="subject-wrapper">

               <motion.div
                  className="laser-line-wrapper"
                  variants={scanLineVars}
                  initial="initial"
                  animate={bootSequence === 2 ? "scan" : "initial"}
               >
                  <div className="laser-beam"></div>
               </motion.div>

               <motion.div
                  className="subject-image-container"
                  initial="hidden"
                  animate={scanned ? "visible" : "hidden"}
                  variants={revealVars}
               >
                  <img src={about.heroImage || about.image} alt="Subject" className="subject-png" />
               </motion.div>
            </div>

            {/* 4. DATA READOUT */}
            <div className="data-readout">
               <motion.div
                  className="data-row accent"
                  initial={{ opacity: 0, x: -10 }}
                  animate={scanned ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 }}
               >
                  &gt; {about.name}
               </motion.div>

               <motion.div
                  className="data-row"
                  initial={{ opacity: 0, x: -10 }}
                  animate={scanned ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
               >
                  &gt; {about.role}
               </motion.div>
            </div>

            {/* 5. COMMAND BUTTONS */}
            <div className="command-deck">
               <motion.a
                  href="#projects"
                  className="cmd-btn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={scanned ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
               >
                  [ VIEW_PROJECTS ]
               </motion.a>

               <motion.a
                  href={about.resumeUrl || "#"}
                  className="cmd-btn outline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={scanned ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
               >
                  [ ACCESS_RESUME ]
               </motion.a>
            </div>

            {/* 6. SOCIALS */}
            <div className="social-terminal">
               {[
                  { Icon: FaGithub, href: "https://github.com/Tharun-Kumar-228" },
                  { Icon: FaLinkedin, href: "#" },
                  { Icon: FaEnvelope, href: `mailto:${about.email}` }
               ].map((item, i) => (
                  <motion.a
                     key={i}
                     href={item.href}
                     className="term-link"
                     initial={{ opacity: 0 }}
                     animate={scanned ? { opacity: 1 } : {}}
                     transition={{ delay: 1 + (i * 0.2) }}
                  >
                     <item.Icon />
                  </motion.a>
               ))}
            </div>
         </motion.div>

         <style>{`
        .scanner-container {
           min-height: 100vh;
           background: #050505; /* Slightly lighter black for less contrast strain */
           position: relative;
           overflow: hidden;
           font-family: 'Courier New', Courier, monospace;
           color: #00bd5e; /* EMERALD GREEN - Less bright than #0f0 */
           display: flex; flex-direction: column; align-items: center;
           padding-top: 60px;
        }

        /* --- BOOT LANDING --- */
        .boot-overlay {
           position: absolute; inset: 0;
           background: #000;
           z-index: 50;
           display: flex; justify-content: center; align-items: center;
        }
        .boot-content { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 15px; }
        .boot-icon { font-size: 3rem; color: #00bd5e; animation: pulse 2s infinite; }
        .boot-text { display: flex; flex-direction: column; gap: 5px; font-size: 0.9rem; letter-spacing: 2px; }
        .boot-sub { font-size: 0.7rem; opacity: 0.6; }
        .boot-loader {
            width: 200px; height: 2px;
            background: rgba(0, 189, 94, 0.2);
            position: relative;
        }
        .loader-bar { height: 100%; background: #00bd5e; box-shadow: 0 0 10px #00bd5e; }

        /* --- BACKGROUND --- */
        .matrix-rain {
           position: absolute; inset: 0;
           background-image: linear-gradient(0deg, transparent 24%, rgba(0, 189, 94, .05) 25%, rgba(0, 189, 94, .05) 26%, transparent 27%, transparent 74%, rgba(0, 189, 94, .05) 75%, rgba(0, 189, 94, .05) 76%, transparent 77%);
           background-size: 30px 30px;
           animation: rain 2s linear infinite;
           opacity: 0.3;
           pointer-events: none;
        }
        .scan-grid {
           position: absolute; inset: 0;
           background-image: 
              linear-gradient(rgba(0, 189, 94, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 189, 94, 0.05) 1px, transparent 1px);
           background-size: 50px 50px;
           opacity: 0.2;
           z-index: 0;
        }

        /* --- HUD --- */
        .main-interface { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; }
        .hud-overlay {
           position: absolute; inset: 15px;
           pointer-events: none;
           z-index: 20;
        }
        .hud-corner {
           position: absolute; width: 15px; height: 15px;
           border: 1px solid #00bd5e; /* Thinner border */
        }
        .tl { top: 0; left: 0; border-right: none; border-bottom: none; }
        .tr { top: 0; right: 0; border-left: none; border-bottom: none; }
        .bl { bottom: 0; left: 0; border-right: none; border-top: none; }
        .br { bottom: 0; right: 0; border-left: none; border-top: none; }

        .sys-status {
           position: absolute; top: 10px; left: 10px;
           font-size: 0.7rem; display: flex; align-items: center; gap: 5px; opacity: 0.8;
        }
        .blink-dot { width: 4px; height: 4px; background: #00bd5e; border-radius: 50%; animation: blink 1s infinite; }
        .sys-id {
           position: absolute; top: 10px; right: 10px; font-size: 0.7rem; opacity: 0.8;
        }

        /* --- IMAGE & LASER --- */
        .subject-wrapper {
           position: relative;
           width: 100%; max-width: 400px;
           height: 380px; 
           display: flex; justify-content: center; align-items: flex-end; /* Align bottom */
           margin-top: 1rem;
           z-index: 5;
        }

        .subject-image-container {
           position: relative;
           width: 100%; height: 100%;
           display: flex; justify-content: center; align-items: flex-end;
        }
        .subject-png {
           width: auto; height: 95%; max-width: 100%;
           object-fit: contain;
           filter: drop-shadow(0 0 5px rgba(0, 189, 94, 0.2)); /* Reduced flow */
        }

        /* The Laser */
        .laser-line-wrapper {
           position: absolute; left: 0; right: 0;
           z-index: 10;
           pointer-events: none;
        }
        .laser-beam {
           height: 1px; background: #00bd5e;
           box-shadow: 0 0 5px #00bd5e; /* Reduced Glow */
           opacity: 0.7;
        }

        /* --- DATA --- */
        .data-readout {
           width: 100%; padding: 0 25px; text-align: left;
           margin-top: -10px; z-index: 10;
        }
        .data-row {
           font-size: 1.1rem; font-weight: bold; margin-bottom: 5px;
           color: #00bd5e;
        }
        .data-row.accent { font-size: 1.6rem; color: #e0fff0; text-shadow: 0 0 5px rgba(0, 189, 94, 0.5); }

        /* --- COMMANDS --- */
        .command-deck {
           width: 100%; padding: 20px 30px;
           display: flex; flex-direction: column; gap: 15px;
           margin-top: 0.5rem; z-index: 10;
        }
        .cmd-btn {
           background: rgba(0, 189, 94, 0.05); /* Very subtle bg */
           border: 1px solid rgba(0, 189, 94, 0.5);
           color: #00bd5e;
           padding: 12px; text-align: center;
           text-decoration: none; font-weight: bold; letter-spacing: 1px;
           transition: 0.3s; font-size: 0.9rem;
        }
        .cmd-btn:active { background: rgba(0, 189, 94, 0.2); }
        .cmd-btn.outline { background: transparent; border-style: dotted; }

        /* --- SOCIAL --- */
        .social-terminal {
           margin-top: auto; padding-bottom: 40px;
           display: flex; gap: 30px; z-index: 10;
        }
        .term-link {
           font-size: 1.4rem; color: #008f47; transition: 0.3s;
        }
        .term-link:active { color: #00bd5e; }

        /* --- ANIMATIONS --- */
        @keyframes rain { 0% { background-position: 0 0; } 100% { background-position: 0 60px; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }

      `}</style>
      </div>
   );
};

export default HeroSectionMobile;
