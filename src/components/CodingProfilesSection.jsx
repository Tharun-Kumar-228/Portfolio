import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { codingProfiles } from "../Contents/CodingProfiles";
import { useProfileStats } from "../hooks/useProfileStats";
import { FaExternalLinkAlt, FaTimes, FaTrophy, FaChartLine } from "react-icons/fa";

const CodingProfilesSection = () => {
    const { stats, loading } = useProfileStats(codingProfiles);
    const [selectedProfile, setSelectedProfile] = useState(null);

    // Lock scroll when modal is open
    useEffect(() => {
        if (selectedProfile) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [selectedProfile]);

    return (
        <section id="profiles" className="section profiles-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    ELITE <span className="highlight">RANKS</span>
                </motion.h2>

                {/* GRID - MINIMALIST CARDS */}
                <div className="profiles-grid">
                    {codingProfiles.map((profile, index) => (
                        <motion.div
                            key={profile.id}
                            className="profile-card-minimal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedProfile(profile)}
                            whileHover={{ y: -10 }}
                            style={{ "--brand-color": profile.color }}
                        >
                            <div className="card-bg-glow"></div>

                            <div className="icon-wrapper-large">
                                <profile.icon />
                            </div>

                            <h3 className="minimal-card-title">{profile.name}</h3>

                            <div className="status-indicator">
                                <span className="pab-dot"></span> CONNECTED
                            </div>

                            <div className="click-instruction">TAP FOR INTEL</div>
                        </motion.div>
                    ))}
                </div>

                {/* MODAL OVERLAY */}
                <AnimatePresence>
                    {selectedProfile && (
                        <motion.div
                            className="profile-modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProfile(null)}
                        >
                            <motion.div
                                className="profile-modal-content"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{ "--modal-brand": selectedProfile.color }}
                            >
                                <button className="close-modal-btn" onClick={() => setSelectedProfile(null)}>
                                    <FaTimes />
                                </button>

                                {/* HEADER BANNER */}
                                <div className="modal-banner">
                                    <div className="banner-icon">
                                        <selectedProfile.icon />
                                    </div>
                                    <div className="banner-info">
                                        <h3>{selectedProfile.name}</h3>
                                        <p className="handle">@{selectedProfile.handle}</p>
                                    </div>
                                </div>

                                {/* STATS DASHBOARD */}
                                <div className="modal-dashboard">
                                    <div className="dashboard-title">
                                        <FaChartLine /> PERFORMANCE METRICS
                                    </div>

                                    {loading ? (
                                        <div className="scanning-bar">
                                            <div className="bar-fill"></div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* PRIMARY STATS GRID (Rank, Total, etc) */}
                                            <div className="modal-stats-grid">
                                                {stats[selectedProfile.id]?.filter(s => !['Easy', 'Medium', 'Hard'].includes(s.label)).map((stat, i) => (
                                                    <div key={i} className="modal-stat-card">
                                                        <div className="stat-value-large">{stat.value}</div>
                                                        <div className="stat-label-small">{stat.label}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* DIFFICULTY BREAKDOWN (If present) */}
                                            {stats[selectedProfile.id]?.some(s => ['Easy', 'Medium', 'Hard'].includes(s.label)) && (
                                                <div className="difficulty-section">
                                                    <div className="difficulty-bars">
                                                        {stats[selectedProfile.id]?.filter(s => ['Easy', 'Medium', 'Hard'].includes(s.label)).map((stat) => (
                                                            <div key={stat.label} className="diff-row">
                                                                <div className="diff-label" style={{ color: stat.label === 'Easy' ? '#00b8a3' : stat.label === 'Medium' ? '#ffc01e' : '#ff375f' }}>
                                                                    {stat.label}
                                                                </div>
                                                                <div className="diff-track">
                                                                    <motion.div
                                                                        className="diff-fill"
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: "100%" }}
                                                                        style={{
                                                                            background: stat.label === 'Easy' ? '#00b8a3' : stat.label === 'Medium' ? '#ffc01e' : '#ff375f',
                                                                            width: "80%"
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="diff-val">{stat.value}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <div className="action-area">
                                        <a href={selectedProfile.url} target="_blank" rel="noreferrer" className="establish-uplink-btn">
                                            ESTABLISH UPLINK <FaExternalLinkAlt />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
                .profiles-section {
                    padding: 5rem 0;
                    background: var(--bg-section-radial, var(--bg));
                }

                .profiles-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 2rem;
                    justify-content: center;
                }

                /* MINIMALIST CARD */
                .profile-card-minimal {
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: 20px;
                    padding: 2rem;
                    display: flex; flex-direction: column; 
                    align-items: center; justify-content: center; gap: 1rem;
                    cursor: pointer; position: relative; overflow: hidden;
                    transition: all 0.3s ease;
                    height: 250px;
                }
                .profile-card-minimal:hover {
                    border-color: var(--brand-color);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1), 0 0 20px var(--brand-color);
                }

                .card-bg-glow {
                    position: absolute; inset: 0;
                    background: radial-gradient(circle at center, var(--brand-color), transparent 70%);
                    opacity: 0; transition: 0.5s; z-index: 0;
                }
                .profile-card-minimal:hover .card-bg-glow { opacity: 0.05; }

                .icon-wrapper-large {
                    font-size: 4rem; color: var(--brand-color);
                    z-index: 1; transition: 0.3s;
                    filter: drop-shadow(0 0 10px var(--brand-color));
                }
                .profile-card-minimal:hover .icon-wrapper-large {
                    transform: scale(1.1);
                }

                .minimal-card-title {
                    font-size: 1.5rem; font-weight: bold; color: var(--text); z-index: 1;
                }

                .status-indicator {
                    display: flex; align-items: center; gap: 0.5rem;
                    font-size: 0.7rem; color: var(--text-secondary);
                    background: rgba(128,128,128,0.1); padding: 0.3rem 0.8rem;
                    border-radius: 20px; z-index: 1;
                }
                .pab-dot {
                    width: 6px; height: 6px; border-radius: 50%;
                    background: #00ff66; box-shadow: 0 0 5px #00ff66;
                }

                .click-instruction {
                    position: absolute; bottom: 1rem;
                    font-size: 0.7rem; letter-spacing: 2px;
                    color: var(--brand-color); opacity: 0;
                    transform: translateY(10px); transition: 0.3s;
                }
                .profile-card-minimal:hover .click-instruction {
                    opacity: 1; transform: translateY(0);
                }


                /* --- MODAL --- */
                .profile-modal-overlay {
                    position: fixed; inset: 0;
                    background: rgba(0,0,0,0.8); z-index: 10000;
                    display: flex; align-items: center; justify-content: center;
                    padding: 1rem; backdrop-filter: blur(10px);
                }

                .profile-modal-content {
                    width: 100%; max-width: 500px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--modal-brand);
                    border-radius: 12px; overflow: hidden;
                    position: relative;
                    box-shadow: 0 0 50px var(--modal-brand);
                }

                .close-modal-btn {
                    position: absolute; top: 1rem; right: 1rem;
                    background: transparent; border: none;
                    color: white; font-size: 1.2rem; cursor: pointer; z-index: 10;
                    width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
                    background: rgba(0,0,0,0.3); border-radius: 50%;
                }

                .modal-banner {
                    background: linear-gradient(135deg, var(--modal-brand), #111);
                    padding: 2rem; color: white;
                    display: flex; align-items: center; gap: 1.5rem;
                }
                .banner-icon { font-size: 3rem; background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 10px; }
                .banner-info h3 { font-size: 2rem; margin: 0; }
                .handle { font-family: monospace; opacity: 0.8; }

                .modal-dashboard {
                    padding: 2rem;
                }
                .dashboard-title {
                    font-size: 0.9rem; color: var(--text-secondary);
                    margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;
                    font-weight: bold;
                }

                .modal-stats-grid {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 1rem;
                    margin-bottom: 2rem;
                }
                .modal-stat-card {
                    background: var(--bg-card); padding: 0.8rem; border-radius: 8px;
                    text-align: center; border: 1px solid var(--border-color);
                    display: flex; flex-direction: column; justify-content: center;
                }
                .stat-value-large {
                    font-size: 1.4rem; font-weight: 800; color: var(--text);
                }
                .stat-label-small {
                    font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase; margin-top: 0.2rem;
                }

                /* DIFFICULTY BARS */
                .difficulty-section {
                    margin-bottom: 2rem;
                    background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px;
                }
                .diff-row {
                    display: flex; align-items: center; gap: 1rem; margin-bottom: 0.8rem;
                }
                .diff-row:last-child { margin-bottom: 0; }
                .diff-label {
                    width: 60px; font-size: 0.8rem; font-weight: bold; text-align: right;
                }
                .diff-track {
                    flex: 1; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;
                }
                .diff-fill {
                    height: 100%; border-radius: 4px;
                }
                .diff-val {
                    width: 40px; font-size: 0.8rem; font-family: monospace; color: var(--text); text-align: left;
                }

                .establish-uplink-btn {
                    display: flex; align-items: center; justify-content: center; gap: 0.8rem;
                    width: 100%; padding: 1rem; background: var(--modal-brand);
                    color: white; font-weight: bold; text-decoration: none;
                    border-radius: 8px; transition: 0.3s; text-transform: uppercase; letter-spacing: 1px;
                }
                .establish-uplink-btn:hover {
                    box-shadow: 0 0 20px var(--modal-brand); transform: scale(1.02);
                }

                .scanning-bar {
                    width: 100%; height: 4px; background: #333; overflow: hidden; border-radius: 2px;
                }
                .bar-fill {
                    width: 30%; height: 100%; background: var(--modal-brand);
                    animation: scanSlide 1s infinite linear;
                }
                @keyframes scanSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }
            `}</style>
        </section>
    );
};

export default CodingProfilesSection;
