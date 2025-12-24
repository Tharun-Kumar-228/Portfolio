import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { achievementsData } from "../Contents/Achievements";
import { FaTrophy, FaMedal, FaCalendarAlt, FaTimes, FaMapMarkerAlt } from "react-icons/fa";

const AchievementsSectionMobile = () => {
    // 3D Carousel State
    const [currDeg, setCurrDeg] = useState(0);
    const [selectedId, setSelectedId] = useState(null);
    const carouselRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startDeg = useRef(0);

    const count = achievementsData.length;
    const theta = 360 / count;
    // Tighter radius for mobile portrait mode (approx 140px-180px)
    const radius = 160;

    // Touch Handlers
    const handleTouchStart = (e) => {
        isDragging.current = true;
        startX.current = e.touches[0].clientX;
        startDeg.current = currDeg;
    };

    const handleTouchMove = (e) => {
        if (!isDragging.current) return;
        const currentX = e.touches[0].clientX;
        const deltaX = currentX - startX.current;

        // Sensitivity factor: 0.5 deg per pixel
        setCurrDeg(startDeg.current + (deltaX * 0.8));
    };

    const handleTouchEnd = () => {
        isDragging.current = false;
        // Optional: Snap to nearest face logic could go here
    };

    const selectedAchievement = achievementsData.find((item) => item.id === selectedId);

    return (
        <section id="achievements" className="mobile-achieve-section">

            {/* HEADER */}
            <div className="achieve-header">
                <div className="header-badge">
                    <FaTrophy /> HALL_OF_GLORY
                </div>
                <h2 className="header-title">VICTORY_LOG</h2>
                <div className="swipe-hint">
                    &lt;&lt;&lt; SWIPE TO ROTATE &gt;&gt;&gt;
                </div>
            </div>

            {/* 3D SCENE */}
            <div className="scene-container">
                <div
                    className="carousel-root"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ transform: `translateZ(-${radius}px) rotateY(${currDeg}deg)` }}
                >
                    {achievementsData.map((item, index) => {
                        const angle = theta * index;
                        return (
                            <div
                                key={item.id}
                                className="carousel-face"
                                style={{ transform: `rotateY(${angle}deg) translateZ(${radius}px)` }}
                                onClick={() => setSelectedId(item.id)}
                            >
                                <div className="holo-card">
                                    <div className="card-shine"></div>
                                    <div className="card-icon"><FaMedal /></div>
                                    <h3 className="card-title">{item.title}</h3>
                                    <span className="card-year">{item.year}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {selectedId && selectedAchievement && (
                    <div className="modal-backdrop" onClick={() => setSelectedId(null)}>
                        <motion.div
                            className="modal-popup"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-btn" onClick={() => setSelectedId(null)}><FaTimes /></button>

                            <div className="popup-header">
                                <FaTrophy className="popup-icon" />
                                <h3>{selectedAchievement.title}</h3>
                            </div>

                            <div className="popup-body">
                                {selectedAchievement.image && (
                                    <div className="popup-img-box">
                                        <img src={selectedAchievement.image} alt="Achievement" />
                                    </div>
                                )}
                                <div className="popup-meta">
                                    <span><FaCalendarAlt /> {selectedAchievement.year}</span>
                                    <span><FaMapMarkerAlt /> {selectedAchievement.position}</span>
                                </div>
                                <p className="popup-desc">{selectedAchievement.description}</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                .mobile-achieve-section {
                    padding: 4rem 0 6rem;
                    background: #050505;
                    min-height: 90vh;
                    font-family: 'Rajdhani', sans-serif;
                    overflow: hidden;
                    display: flex; flex-direction: column; align-items: center;
                }

                /* HEADER */
                .achieve-header { text-align: center; margin-bottom: 2rem; position: relative; z-index: 10; }
                .header-badge {
                    display: inline-flex; align-items: center; gap: 8px;
                    color: gold; border: 1px solid gold; padding: 3px 10px;
                    font-size: 0.7rem; letter-spacing: 2px; margin-bottom: 5px;
                    background: rgba(255, 215, 0, 0.1);
                }
                .header-title {
                    font-size: 2.2rem; margin: 0; 
                    background: linear-gradient(to bottom, #fff, #999);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                }
                .swipe-hint {
                    color: #555; font-size: 0.7rem; margin-top: 10px; font-family: monospace;
                    animation: pulse 2s infinite;
                }

                /* 3D SCENE */
                .scene-container {
                     width: 100%; height: 350px;
                     perspective: 800px; /* Stronger perspective for mobile */
                     position: relative;
                     display: flex; justify-content: center; align-items: center;
                     touch-action: pan-y; /* CRITICAL: Allows vertical scroll while swiping */
                     overflow: visible;
                }
                
                .carousel-root {
                    width: 200px; height: 280px;
                    position: absolute;
                    transform-style: preserve-3d;
                    transition: transform 0.1s linear; /* Smooth drag */
                }
                /* If not dragging, maybe add inertia? For now raw control is best for touch */

                .carousel-face {
                    position: absolute;
                    width: 200px; height: 280px;
                    left: 0; top: 0;
                    backface-visibility: hidden; /* Only see front facing cards? Or visible for depth? 
                       Visible looks better for glass. */
                    backface-visibility: visible;
                }

                .holo-card {
                    width: 100%; height: 100%;
                    background: rgba(20, 20, 20, 0.85);
                    border: 1px solid rgba(255, 215, 0, 0.3);
                    border-radius: 15px;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    padding: 20px;
                    box-shadow: 0 0 15px rgba(255, 215, 0, 0.1);
                    backdrop-filter: blur(5px);
                    text-align: center;
                    position: relative; overflow: hidden;
                }
                
                .card-shine {
                    position: absolute; top: 0; left: 0; right: 0; height: 1px;
                    background: linear-gradient(90deg, transparent, gold, transparent);
                    opacity: 0.5;
                }

                .card-icon {
                    font-size: 3rem; color: gold; margin-bottom: 15px;
                    filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
                }
                
                .card-title {
                    color: #fff; font-size: 1.1rem; margin: 0 0 10px 0; line-height: 1.2;
                }
                
                .card-year {
                    background: rgba(255, 215, 0, 0.2); color: gold;
                    padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;
                }

                /* MODAL */
                .modal-backdrop {
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.9); z-index: 5000;
                    display: flex; align-items: center; justify-content: center;
                    padding: 20px;
                }
                .modal-popup {
                    background: #111; border: 1px solid gold;
                    width: 100%; max-width: 350px;
                    border-radius: 10px; position: relative;
                    box-shadow: 0 0 30px rgba(255, 215, 0, 0.2);
                    padding: 20px;
                }
                .close-btn { 
                    position: absolute; top: 10px; right: 10px;
                    background: transparent; border: none; color: #fff; font-size: 1.2rem;
                }
                
                .popup-header { text-align: center; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px; }
                .popup-icon { font-size: 2rem; color: gold; margin-bottom: 5px; }
                .popup-header h3 { margin: 0; color: #fff; }
                
                .popup-img-box {
                    width: 100%; border-radius: 5px; overflow: hidden; margin-bottom: 15px;
                    border: 1px solid #333;
                }
                .popup-img-box img { width: 100%; display: block; }
                
                .popup-meta { display: flex; justify-content: center; gap: 15px; margin-bottom: 15px; font-size: 0.8rem; color: gold; }
                .popup-desc { color: #ccc; font-size: 0.9rem; line-height: 1.5; text-align: center; }

                @keyframes pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }

            `}</style>
        </section>
    );
};

export default AchievementsSectionMobile;
