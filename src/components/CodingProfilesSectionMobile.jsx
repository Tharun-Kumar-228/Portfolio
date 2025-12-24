import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { codingProfiles } from "../Contents/CodingProfiles";
import { useProfileStats } from "../hooks/useProfileStats";
import { FaExternalLinkAlt, FaExchangeAlt, FaWifi, FaCode, FaChartPie } from "react-icons/fa";

const CodingProfilesSectionMobile = () => {
    const { stats, loading } = useProfileStats(codingProfiles);
    const [flippedId, setFlippedId] = useState(null);

    const handleCardTap = (id) => {
        setFlippedId(flippedId === id ? null : id);
    };

    return (
        <section id="profiles" className="mobile-cp-section">

            {/* HEADER */}
            <div className="cp-header">
                <div className="header-badge">
                    <FaCode /> PLAYER_DATA
                </div>
                <h2 className="header-title">NET_IDENTITY</h2>
                <p className="header-sub">TAP CARD TO DECRYPT STATS</p>
            </div>

            {/* FLIP CARD DECK */}
            <div className="deck-container">
                <div className="card-track">
                    {codingProfiles.map((profile) => {
                        const profileStats = stats[profile.id] || [];
                        const difficultyStats = profileStats.filter(s => ['Easy', 'Medium', 'Hard'].includes(s.label));
                        const otherStats = profileStats.filter(s => !['Easy', 'Medium', 'Hard'].includes(s.label));
                        const isFlipped = flippedId === profile.id;

                        return (
                            <div key={profile.id} className="flip-card-wrapper" onClick={() => handleCardTap(profile.id)}>
                                <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>

                                    {/* --- FRONT: IDENTITY --- */}
                                    <div className="card-face card-front" style={{ '--brand': profile.color }}>
                                        <div className="front-bg-glow"></div>
                                        <div className="live-tag"><FaWifi /> ONLINE</div>

                                        <div className="front-content">
                                            <div className="brand-icon">
                                                <profile.icon />
                                            </div>
                                            <h3 className="brand-name">{profile.name}</h3>
                                            <span className="player-handle">@{profile.handle}</span>
                                        </div>

                                        <div className="tap-hint">
                                            <FaExchangeAlt /> TAP TO VIEW STATS
                                        </div>

                                        {/* Deco Corners */}
                                        <div className="c-deco tl"></div>
                                        <div className="c-deco br"></div>
                                    </div>

                                    {/* --- BACK: STATS --- */}
                                    <div className="card-face card-back" style={{ '--brand': profile.color }}>
                                        <div className="back-header">
                                            <span className="back-title">PERFORMANCE_METRICS</span>
                                            <div className="live-dot"></div>
                                        </div>

                                        <div className="stats-container">
                                            {loading ? (
                                                <div className="loading-text">SYNCING DATA...</div>
                                            ) : (
                                                <>
                                                    {/* KEY METRICS */}
                                                    <div className="metrics-grid">
                                                        {otherStats.slice(0, 4).map((stat, i) => (
                                                            <div key={i} className="metric-box">
                                                                <span className="m-val">{stat.value}</span>
                                                                <span className="m-lbl">{stat.label}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* XP BARS */}
                                                    <div className="xp-section">
                                                        {difficultyStats.map((stat) => (
                                                            <div key={stat.label} className="xp-unit">
                                                                <div className="xp-info">
                                                                    <span className="xp-type" style={{ color: getDiffColor(stat.label) }}>{stat.label}</span>
                                                                    <span className="xp-num">{stat.value}</span>
                                                                </div>
                                                                <div className="xp-rail">
                                                                    <div className="xp-fill" style={{
                                                                        backgroundColor: getDiffColor(stat.label),
                                                                        width: '60%' // Mock width
                                                                    }}></div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <a
                                            href={profile.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="link-btn"
                                            onClick={(e) => e.stopPropagation()} // Prevent flip
                                        >
                                            OPEN PROFILE <FaExternalLinkAlt />
                                        </a>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                .mobile-cp-section {
                    padding: 4rem 0 6rem;
                    background: #050505;
                    font-family: 'Rajdhani', sans-serif;
                    overflow: hidden;
                    min-height: 80vh;
                }

                /* HEADER */
                .cp-header { text-align: center; margin-bottom: 2.5rem; padding: 0 1rem; }
                .header-badge {
                    display: inline-flex; align-items: center; gap: 8px;
                    color: #fff; border: 1px solid #333; padding: 4px 12px; border-radius: 4px;
                    font-size: 0.7rem; margin-bottom: 8px; background: rgba(255,255,255,0.05);
                }
                .header-title { font-size: 2rem; color: #fff; margin: 0; letter-spacing: 2px; }
                .header-sub { color: var(--primary-color); font-size: 0.75rem; margin-top: 5px; opacity: 0.8; }

                /* DECK */
                .deck-container {
                    width: 100%; overflow-x: auto; padding-bottom: 2rem;
                    scrollbar-width: none;
                }
                .card-track {
                    display: flex; gap: 20px; padding: 0 30px;
                    width: max-content;
                }

                /* FLIP CARD WRAPPER */
                .flip-card-wrapper {
                    background: transparent;
                    width: 280px; height: 380px;
                    perspective: 1000px;
                    flex-shrink: 0;
                    scroll-snap-align: center;
                }

                .flip-card-inner {
                    position: relative; width: 100%; height: 100%;
                    text-align: center; transition: transform 0.6s;
                    transform-style: preserve-3d;
                }
                .flip-card-inner.flipped { transform: rotateY(180deg); }

                .card-face {
                    position: absolute; inset: 0;
                    backface-visibility: hidden; /* Hide back when front visible */
                    border-radius: 15px;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: #0a0a0a;
                    display: flex; flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }

                /* --- FRONT STYLE --- */
                .card-front {
                    align-items: center; justify-content: center;
                    background: linear-gradient(145deg, #111, #080808);
                    border-top: 4px solid var(--brand);
                }
                .front-bg-glow {
                    position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
                    background: radial-gradient(circle, var(--brand), transparent 60%);
                    opacity: 0.1; pointer-events: none;
                }
                
                .live-tag {
                    position: absolute; top: 15px; right: 15px;
                    font-size: 0.6rem; color: #00ff66; border: 1px solid #00ff66;
                    padding: 2px 6px; border-radius: 4px; display: flex; align-items: center; gap: 4px;
                }

                .front-content { z-index: 2; margin-bottom: 20px; }
                .brand-icon { font-size: 4rem; color: var(--brand); margin-bottom: 15px; filter: drop-shadow(0 0 15px var(--brand)); }
                .brand-name { font-size: 1.5rem; color: #fff; margin: 0; }
                .player-handle { font-family: monospace; color: #777; font-size: 0.9rem; }

                .tap-hint {
                    position: absolute; bottom: 20px;
                    font-size: 0.7rem; color: #555; display: flex; align-items: center; gap: 6px;
                    animation: bounce 2s infinite;
                }

                /* --- BACK STYLE --- */
                .card-back {
                    transform: rotateY(180deg);
                    background: #111;
                    padding: 20px;
                    justify-content: space-between;
                }
                
                .back-header {
                    display: flex; justify-content: space-between; align-items: center;
                    border-bottom: 1px solid #222; padding-bottom: 10px; margin-bottom: 10px;
                }
                .back-title { font-size: 0.7rem; color: #777; letter-spacing: 1px; }
                .live-dot { width: 8px; height: 8px; background: var(--brand); border-radius: 50%; box-shadow: 0 0 5px var(--brand); }

                .stats-container { flex: 1; display: flex; flex-direction: column; gap: 15px; }
                
                .metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                .metric-box { 
                    background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px;
                    display: flex; flex-direction: column; 
                }
                .m-val { font-size: 1.1rem; color: #fff; font-weight: bold; }
                .m-lbl { font-size: 0.6rem; color: #777; text-transform: uppercase; }

                .xp-section { display: flex; flex-direction: column; gap: 8px; }
                .xp-unit { display: flex; flex-direction: column; gap: 3px; }
                .xp-info { display: flex; justify-content: space-between; font-size: 0.7rem; }
                .xp-num { color: #aaa; }
                
                .xp-rail { height: 4px; background: #222; border-radius: 2px; }
                .xp-fill { height: 100%; border-radius: 2px; }

                .link-btn {
                    margin-top: auto;
                    width: 100%; padding: 12px;
                    background: var(--brand); color: #000;
                    text-align: center; text-decoration: none; font-weight: bold;
                    border-radius: 8px; font-size: 0.8rem;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                }

                /* DECO */
                .c-deco { position: absolute; width: 15px; height: 15px; border: 2px solid var(--brand); opacity: 0.5; }
                .tl { top: 10px; left: 10px; border-right: 0; border-bottom: 0; }
                .br { bottom: 10px; right: 10px; border-left: 0; border-top: 0; }

                @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }

            `}</style>
        </section>
    );
};

const getDiffColor = (label) => {
    if (label === 'Easy') return '#00b8a3';
    if (label === 'Medium') return '#ffc01e';
    if (label === 'Hard') return '#ff375f';
    return '#fff';
};

export default CodingProfilesSectionMobile;
