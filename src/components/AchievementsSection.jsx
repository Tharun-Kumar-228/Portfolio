import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { achievementsData } from "../Contents/Achievements";
import { FaTrophy, FaChevronRight, FaChevronLeft, FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaMedal, FaRandom } from "react-icons/fa";
import AchievementsSectionMobile from "./AchievementsSectionMobile";

const AchievementsSection = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [currDeg, setCurrDeg] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Refs for Drag Logic
    const startX = useRef(0);
    const startDeg = useRef(0);
    const carouselRef = useRef(null);

    const count = achievementsData.length;
    const theta = 360 / count;
    const radius = Math.round((300 / 2) / Math.tan(Math.PI / count)) + 100;

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (mounted && isMobile) {
        return <AchievementsSectionMobile />;
    }

    const rotate = (direction) => {
        if (direction === "next") {
            setCurrDeg(prev => prev + theta);
        } else {
            setCurrDeg(prev => prev - theta);
        }
    };

    // SPIN TO RANDOM
    const spinRandom = () => {
        const randomIndex = Math.floor(Math.random() * count);
        const spinAmount = 720 + (randomIndex * theta);
        setCurrDeg(prev => prev - spinAmount);
    };

    // DRAG HANDLERS
    const handleMouseDown = (e) => {
        if (isMobile) return;
        setIsDragging(true);
        startX.current = e.pageX || e.touches[0].pageX;
        startDeg.current = currDeg;
    };

    const handleMouseMove = (e) => {
        if (!isDragging || isMobile) return;
        const x = e.pageX || e.touches[0].pageX;
        const delta = (x - startX.current) * 0.5; // Sensitivity
        setCurrDeg(startDeg.current + delta);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // WHEEL / TRACKPAD SCROLL
    const handleWheel = (e) => {
        if (isMobile) return;
        if (Math.abs(e.deltaX) > 5) {
            e.preventDefault();
            setCurrDeg(prev => prev + e.deltaX * 0.5);
        }
    };

    const handleCardClick = (id, index) => {
        if (isDragging) return;

        if (isMobile) {
            setSelectedId(id);
            return;
        }

        let normalized = Math.round(-currDeg / theta) % count;
        if (normalized < 0) normalized += count;

        if (normalized === index) {
            setSelectedId(id);
        } else {
            setCurrDeg(-index * theta);
        }
    };

    const selectedAchievement = achievementsData.find((item) => item.id === selectedId);

    return (
        <section
            id="achievements"
            className="section achievements-section"
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchEnd={handleMouseUp}
        >
            <div className="container" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="highlight">Hall of</span> Glory
                </motion.h2>

                {/* 3D SCENE CONTAINER */}
                <div
                    className={`scene ${isMobile ? "mobile-view" : ""}`}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleMouseMove}
                >
                    <div
                        className="carousel"
                        style={!isMobile ? {
                            transform: `translateZ(-${radius}px) rotateY(${currDeg}deg)`,
                            transition: isDragging ? 'none' : 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1)'
                        } : {}}
                    >
                        {achievementsData.map((item, index) => {
                            const angle = theta * index;
                            return (
                                <div
                                    key={item.id}
                                    className="carousel-cell"
                                    style={!isMobile ? {
                                        transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                                    } : {}}
                                    onClick={() => handleCardClick(item.id, index)}
                                >
                                    <div className="achievement-glass-card">
                                        <div className="trophy-glow">
                                            <FaMedal />
                                        </div>
                                        <h3>{item.title}</h3>
                                        <span className="year-badge">{item.year}</span>
                                        <div className="click-hint">Tap to View</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CONTROLS (Hide on mobile) */}
                {!isMobile && (
                    <>
                        <div className="wheel-controls">
                            <button className="wheel-btn" onClick={() => rotate("next")}><FaChevronLeft /></button>
                            <button className="wheel-btn random-btn" onClick={spinRandom}><FaRandom /></button>
                            <button className="wheel-btn" onClick={() => rotate("prev")}><FaChevronRight /></button>
                        </div>
                        <p className="drag-hint">Drag/Swipe to Spin • Click to View</p>
                    </>
                )}

                {isMobile && (
                    <p className="drag-hint">Swipe left/right to browse • Tap to View</p>
                )}

            </div>

            {/* DETAIL MODAL - HOLOGRAPHIC REDESIGN */}
            <AnimatePresence>
                {selectedId && selectedAchievement && (
                    <div className="modal-overlay" onClick={() => setSelectedId(null)}>
                        <motion.div
                            className="modal-content-holo"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-btn" onClick={() => setSelectedId(null)}>
                                <FaTimes />
                            </button>

                            <div className="holo-header">
                                <div className="holo-icon-wrapper">
                                    <FaTrophy className="holo-trophy" />
                                </div>
                                <h2>{selectedAchievement.title}</h2>
                                <div className="holo-meta-row">
                                    <span className="holo-pill"><FaCalendarAlt /> {selectedAchievement.year}</span>
                                    <span className="holo-pill"><FaMapMarkerAlt /> {selectedAchievement.position}</span>
                                </div>
                            </div>

                            <div className="holo-body">
                                {selectedAchievement.image && (
                                    <div className="holo-image-frame">
                                        <img src={selectedAchievement.image} alt={selectedAchievement.title} />
                                        <div className="holo-corner c1"></div>
                                        <div className="holo-corner c2"></div>
                                        <div className="holo-corner c3"></div>
                                        <div className="holo-corner c4"></div>
                                    </div>
                                )}

                                <div className="holo-desc-box">
                                    <h4>// ACHIEVEMENT_LOG</h4>
                                    <p>{selectedAchievement.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                .achievements-section {
                    perspective: 1000px;
                    padding: 5rem 0 8rem;
                    overflow: visible;
                    background: radial-gradient(circle at center, rgba(0,255,102,0.05) 0%, transparent 70%);
                    user-select: none; /* Important for drag */
                    touch-action: none; /* Prevent scroll while dragging */
                }

                .scene {
                    width: 300px;
                    height: 400px;
                    margin: 4rem auto;
                    position: relative;
                    perspective: 1000px;
                    cursor: grab;
                }
                .scene:active {
                    cursor: grabbing;
                }

                .carousel {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    transform-style: preserve-3d;
                }

                .carousel-cell {
                    position: absolute;
                    width: 280px;
                    height: 380px;
                    left: 10px;
                    top: 10px;
                    backface-visibility: visible; 
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                /* MOBILE OVERRIDES */
                .scene.mobile-view {
                    width: 100%;
                    height: auto;
                    min-height: 400px;
                    perspective: none;
                    margin: 0;
                    overflow-x: auto;
                    padding-bottom: 2rem;
                    /* Hide scrollbar but keep functionality */
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .scene.mobile-view::-webkit-scrollbar {
                    display: none;
                }

                .scene.mobile-view .carousel {
                    position: relative;
                    width: max-content;
                    height: auto;
                    transform-style: flat;
                    display: flex;
                    gap: 1.5rem;
                    padding: 1rem 2rem;
                }

                .scene.mobile-view .carousel-cell {
                    position: relative;
                    left: auto; top: auto;
                    transform: none !important; /* Force no 3D transform */
                    flex-shrink: 0;
                    margin: 0;
                    /* Scroll Snap */
                    scroll-snap-align: center;
                }
                
                /* Make section touchable on mobile */
                @media(max-width: 768px) {
                    .achievements-section {
                        touch-action: pan-x pan-y; /* Restore safe scroll */
                    }
                }

                .achievement-glass-card {
                    width: 100%;
                    height: 100%;
                    background: rgba(10, 15, 10, 0.85);
                    border: 1px solid var(--primary-color);
                    border-radius: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 2rem;
                    box-shadow: 0 0 20px rgba(0, 255, 102, 0.1), inset 0 0 20px rgba(0, 255, 102, 0.05);
                    backdrop-filter: blur(5px);
                    transition: 0.3s;
                    pointer-events: none; 
                }
                /* Re-enable pointer events for mobile click to work simpler */
                .scene.mobile-view .achievement-glass-card {
                    pointer-events: auto;
                }

                
                .carousel-cell:hover .achievement-glass-card {
                    box-shadow: 0 0 40px rgba(0, 255, 102, 0.3);
                    background: rgba(0, 255, 102, 0.1);
                }

                .trophy-glow {
                    font-size: 4rem;
                    color: gold;
                    margin-bottom: 1.5rem;
                    filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
                }

                .achievement-glass-card h3 {
                    color: white;
                    font-size: 1.2rem;
                    margin-bottom: 0.5rem;
                    font-weight: 700;
                    line-height: 1.3;
                }

                .year-badge {
                    background: var(--primary-color);
                    color: black;
                    padding: 0.2rem 0.6rem;
                    border-radius: 4px;
                    font-weight: bold;
                    font-size: 0.9rem;
                    margin-top: 0.5rem;
                }

                .click-hint {
                    margin-top: 2rem;
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    opacity: 0;
                    transition: 0.3s;
                }
                .carousel-cell:hover .click-hint {
                    opacity: 1;
                    color: var(--primary-color);
                }

                /* CONTROLS */
                .wheel-controls {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 2rem;
                    position: relative;
                    z-index: 100;
                }
                
                .wheel-btn {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: rgba(0,0,0,0.5);
                    border: 2px solid var(--primary-color);
                    color: var(--primary-color);
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: 0.3s;
                    backdrop-filter: blur(5px);
                }
                .wheel-btn:hover {
                    box-shadow: 0 0 25px var(--primary-color);
                    transform: scale(1.1);
                    background: var(--primary-color);
                    color: black;
                }
                
                .random-btn {
                    width: 80px;
                    height: 80px;
                    font-size: 2rem;
                    border-width: 3px;
                }

                .drag-hint {
                    text-align: center;
                    color: var(--text-secondary);
                    margin-top: 1rem;
                    font-family: monospace;
                    font-size: 0.9rem;
                    opacity: 0.7;
                }

                /* MODAL UPDATES */
                .modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.85);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    backdrop-filter: blur(10px);
                }
                
                .modal-content-holo {
                    background: var(--bg-secondary);
                    border: 1px solid var(--primary-color);
                    padding: 0;
                    border-radius: 12px;
                    max-width: 500px;
                    width: 100%;
                    position: relative;
                    box-shadow: 0 0 50px rgba(0, 255, 102, 0.2);
                    display: flex; flex-direction: column;
                    overflow: hidden;
                }
                
                .close-btn {
                    position: absolute;
                    top: 1rem; right: 1rem;
                    background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2);
                    color: white; font-size: 1.2rem;
                    width: 36px; height: 36px; border-radius: 50%;
                    cursor: pointer; z-index: 10;
                    display: flex; align-items: center; justify-content: center;
                    transition: 0.3s;
                }
                .close-btn:hover { background: var(--primary-color); color: black; }

                /* HEADER */
                .holo-header {
                    background: linear-gradient(to bottom, rgba(0,255,102,0.1), transparent);
                    padding: 2.5rem 2rem 1rem;
                    text-align: center;
                }
                .holo-icon-wrapper {
                    display: inline-block;
                    padding: 1rem;
                    background: rgba(0,0,0,0.3);
                    border-radius: 50%;
                    border: 1px solid var(--primary-color);
                    margin-bottom: 1rem;
                    box-shadow: 0 0 20px rgba(0,255,102,0.2);
                }
                .holo-trophy { font-size: 2.5rem; color: var(--primary-color); }
                
                .holo-header h2 {
                    color: var(--text); font-size: 1.8rem; margin: 0 0 1rem;
                }
                
                .holo-meta-row {
                    display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;
                }
                .holo-pill {
                    background: rgba(255,255,255,0.05); color: var(--text-secondary);
                    padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.8rem;
                    display: flex; align-items: center; gap: 0.5rem;
                    border: 1px solid var(--border-color);
                }

                /* BODY */
                .holo-body {
                    padding: 2rem;
                }
                
                .holo-image-frame {
                    position: relative;
                    margin-bottom: 2rem;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .holo-image-frame img {
                    width: 100%; display: block;
                }
                .holo-corner {
                    position: absolute; width: 10px; height: 10px;
                    border: 2px solid var(--primary-color);
                }
                .c1 { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
                .c2 { top: -1px; right: -1px; border-left: 0; border-bottom: 0; }
                .c3 { bottom: -1px; left: -1px; border-right: 0; border-top: 0; }
                .c4 { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }

                .holo-desc-box h4 {
                    font-family: monospace; color: var(--primary-color); font-size: 0.8rem; margin-bottom: 0.5rem;
                }
                .holo-desc-box p {
                    color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem; text-align: justify;
                }

                @media(max-width: 768px) {
                    .scene {
                        width: 100%;
                        height: auto;
                    }
                    /* Ensure modal is responsive too */
                    .modal-content-holo {
                        max-width: 90%;
                        max-height: 80vh;
                        overflow-y: auto;
                    }
                }
            `}</style>
        </section>
    );
};

export default AchievementsSection;
