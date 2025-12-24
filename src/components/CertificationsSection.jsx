import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificationsData } from "../Contents/Certifications";
import { FaLock, FaShieldAlt, FaExpand, FaTimes, FaAward } from "react-icons/fa";
import CertificationsSectionMobile from "./CertificationsSectionMobile";

const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedCert]);

  if (mounted && isMobile) {
    return <CertificationsSectionMobile />;
  }

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="highlight">Certified</span> Authority
        </motion.h2>

        <div className="certs-grid">
          {certificationsData.map((cert) => (
            <motion.div
              key={cert.id}
              className="cert-card-tech"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 0 25px rgba(0, 255, 102, 0.2)" }}
              onClick={() => setSelectedCert(cert)}
            >
              {/* Holographic Badge */}
              <div className="holo-badge">
                <FaShieldAlt /> VERIFIED
              </div>

              <div className="cert-content-tech">
                <div className="icon-box">
                  <FaAward />
                </div>
                <h3 className="cert-title-tech">{cert.title}</h3>
                <p className="cert-org-tech">{cert.organization}</p>
                <p className="cert-date-tech">{cert.date}</p>
              </div>

              <div className="cert-footer-tech">
                <span className="view-text">Tap to Access</span>
                <FaExpand className="view-icon" />
              </div>

              {/* Tech Borders */}
              <div className="tech-corner tl"></div>
              <div className="tech-corner tr"></div>
              <div className="tech-corner bl"></div>
              <div className="tech-corner br"></div>
            </motion.div>
          ))}
        </div>

        {/* MODAL OVERLAY */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              className="cert-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                className="cert-modal-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-modal-btn" onClick={() => setSelectedCert(null)}>
                  <FaTimes />
                </button>

                <div className="modal-header">
                  <h3>{selectedCert.title}</h3>
                  <span className="modal-badge">OFFICIAL RECORD</span>
                </div>

                <div className="modal-image-container">
                  {selectedCert.imageUrl ? (
                    <img src={selectedCert.imageUrl} alt={selectedCert.title} className="modal-cert-img" />
                  ) : (
                    <div className="placeholder-cert">
                      <FaLock size={50} />
                      <p>Certificate Image Unavailable</p>
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <p>Issued by: <strong>{selectedCert.organization}</strong></p>
                  <p>Date: {selectedCert.date}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
                .certifications-section {
                    position: relative;
                    background: var(--bg-section-radial, var(--bg)); /* Dynamic Theme Background */
                    padding: 4rem 0;
                }

                .certs-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
                    gap: 1.5rem;
                }

                /* --- TECH CARD DESIGN --- */
                .cert-card-tech {
                    background: rgba(10, 15, 10, 0.6);
                    border: 1px solid var(--border-color);
                    padding: 2rem;
                    position: relative;
                    border-radius: 10px; /* Slight round */
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    min-height: 250px;
                }
                
                .cert-card-tech:hover {
                    border-color: var(--primary-color);
                }

                .holo-badge {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    font-size: 0.7rem;
                    color: var(--primary-color);
                    border: 1px solid var(--primary-color);
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    background: rgba(0, 255, 102, 0.1);
                    box-shadow: 0 0 10px rgba(0, 255, 102, 0.2);
                }

                .cert-content-tech {
                    text-align: center;
                    margin-top: 1.5rem;
                }

                .icon-box {
                    font-size: 2.5rem;
                    color: var(--primary-dark);
                    margin-bottom: 1rem;
                    filter: drop-shadow(0 0 5px var(--primary-color));
                    transition: 0.3s;
                }
                .cert-card-tech:hover .icon-box {
                    color: var(--primary-color);
                    transform: scale(1.1);
                }

                .cert-title-tech {
                    color: white;
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .cert-org-tech {
                    color: var(--primary-color);
                    font-family: monospace;
                    text-transform: uppercase;
                    font-size: 0.9rem;
                    letter-spacing: 1px;
                }

                .cert-date-tech {
                    color: var(--text-secondary);
                    font-size: 0.85rem;
                    margin-top: 0.5rem;
                }

                .cert-footer-tech {
                    margin-top: 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding-top: 1rem;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    transition: 0.3s;
                }
                
                .cert-card-tech:hover .cert-footer-tech {
                    color: var(--primary-color);
                }

                /* Tech Corners */
                .tech-corner {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border: 2px solid var(--primary-color);
                    opacity: 0.5;
                    transition: 0.3s;
                }
                .cert-card-tech:hover .tech-corner { opacity: 1; box-shadow: 0 0 5px var(--primary-color); }
                .tl { top: 0; left: 0; border-right: none; border-bottom: none; }
                .tr { top: 0; right: 0; border-left: none; border-bottom: none; }
                .bl { bottom: 0; left: 0; border-right: none; border-top: none; }
                .br { bottom: 0; right: 0; border-left: none; border-top: none; }

                /* --- MODAL STYLES --- */
                .cert-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(8px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                }

                .cert-modal-content {
                    background: #050505;
                    border: 1px solid var(--primary-color);
                    padding: 2rem;
                    border-radius: 10px;
                    max-width: 900px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    box-shadow: 0 0 50px rgba(0, 255, 102, 0.2);
                }

                .close-modal-btn {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: transparent;
                    border: none;
                    color: var(--text-secondary);
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .close-modal-btn:hover { color: var(--primary-color); transform: rotate(90deg); }

                .modal-header {
                    margin-bottom: 1.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding-bottom: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .modal-header h3 { color: white; margin: 0; font-size: 1.5rem; }
                .modal-badge {
                    background: var(--primary-color);
                    color: black;
                    padding: 0.2rem 0.5rem;
                    font-size: 0.75rem;
                    font-weight: 700;
                    border-radius: 3px;
                }

                .modal-image-container {
                    width: 100%;
                    border: 1px dashed rgba(255, 255, 255, 0.2);
                    padding: 0.5rem;
                    background: rgba(0,0,0,0.3);
                    border-radius: 5px;
                    margin-bottom: 1rem;
                }
                .modal-cert-img {
                    width: 100%;
                    height: auto;
                    display: block;
                    border-radius: 3px;
                }

                .modal-footer {
                    display: flex;
                    justify-content: space-between;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }
                .modal-footer strong { color: var(--primary-color); }
            `}</style>
    </section>
  );
};

export default CertificationsSection;
