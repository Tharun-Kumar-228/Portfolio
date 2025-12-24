import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { skillsData } from "../Contents/Skills";
import {
    FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaDatabase, FaPython, FaJava, FaFigma, FaCode, FaHive, FaAngleDoubleRight
} from "react-icons/fa";
import {
    SiMongodb, SiTailwindcss, SiFramer, SiFirebase, SiMysql, SiCplusplus, SiBlender, SiCanva, SiExpress
} from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";

// Helper to map string names to Icons
const getSkillIcon = (skillName) => {
    const name = skillName.toLowerCase();
    if (name.includes("react")) return <FaReact color="#61DAFB" />;
    if (name.includes("html")) return <FaHtml5 color="#E34F26" />;
    if (name.includes("css")) return <FaCss3Alt color="#1572B6" />;
    if (name.includes("node")) return <FaNodeJs color="#339933" />;
    if (name.includes("express")) return <SiExpress color="#ffffff" />;
    if (name.includes("mongo")) return <SiMongodb color="#47A248" />;
    if (name.includes("mysql") || name.includes("sql")) return <SiMysql color="#4479A1" />;
    if (name.includes("java") && !name.includes("script")) return <FaJava color="#007396" />;
    if (name.includes("javascript") || name.includes("js")) return <FaJs color="#F7DF1E" />;
    if (name.includes("python")) return <FaPython color="#3776AB" />;
    if (name.includes("c++")) return <SiCplusplus color="#00599C" />;
    if (name.includes("c")) return <TbBrandCpp color="#555555" />;
    if (name.includes("git")) return <FaGitAlt color="#F05032" />;
    if (name.includes("figma")) return <FaFigma color="#F24E1E" />;
    if (name.includes("blender")) return <SiBlender color="#E87D0D" />;
    if (name.includes("canva")) return <SiCanva color="#00C4CC" />;
    if (name.includes("tailwind")) return <SiTailwindcss color="#06B6D4" />;
    if (name.includes("firebase")) return <SiFirebase color="#FFCA28" />;
    return <FaCode color="#ccc" />;
};

const SkillsSectionMobile = () => {
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    // Flatten skills for the stream, keeping category info
    const allSkills = skillsData.flatMap(cat =>
        cat.skills.map(skill => ({
            name: skill,
            category: cat.category,
            icon: getSkillIcon(skill)
        }))
    );

    // Duplicate for infinite loop illusion (optional, but helps if list is short)
    // For scrolling ref logic, duplicating creates a buffer.
    const streamData = [...allSkills, ...allSkills];

    useEffect(() => {
        const container = scrollRef.current;
        let animationFrameId;

        const scroll = () => {
            if (!isPaused && container) {
                container.scrollLeft += 1; // Speed: 1px per frame

                // Infinite Loop Reset Logic
                // If we scrolled past the first half (original width), reset to 0
                // This requires content to be duplicated exactly.
                if (container.scrollLeft >= (container.scrollWidth / 2)) {
                    container.scrollLeft = 0;
                    // Note: This might jump if dimensions aren't perfect, but is standard marquee logic.
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    return (
        <section id="skills" className="mobile-skills-section">

            {/* HEADER */}
            <div className="stream-header">
                <div className="header-badge">
                    <FaHive /> HEX_STREAM_V9
                </div>
                <h2 className="header-title">SKILL_FUSION</h2>
                <p className="header-hint"><FaAngleDoubleRight /> AUTO-SCROLL ACTIVE // TOUCH TO PAUSE</p>
            </div>

            {/* STREAM CONTAINER */}
            <div className="stream-viewport">
                <div
                    className="hex-scroller"
                    ref={scrollRef}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)} // Resume after 2s delay
                    onMouseDown={() => setIsPaused(true)}
                    onMouseUp={() => setIsPaused(false)}
                >
                    <div className="hex-track">
                        {streamData.map((skill, i) => (
                            <div key={`${skill.name}-${i}`} className="hex-wrapper">
                                <div className="hex-cell-h">
                                    <div className="hex-content-h">
                                        <div className="hex-icon-h">{skill.icon}</div>
                                        <span className="hex-name-h">{skill.name}</span>
                                        <span className="hex-cat-h">{skill.category}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fade Overlays */}
                <div className="fade-overlay left"></div>
                <div className="fade-overlay right"></div>
            </div>

            <style>{`
        .mobile-skills-section {
           padding: 4rem 0;
           background: #050505;
           min-height: 80vh;
           font-family: 'Rajdhani', sans-serif;
           color: #fff;
           display: flex; flex-direction: column; justify-content: center;
           position: relative;
        }

        .stream-header { text-align: center; margin-bottom: 3rem; }
        .header-badge {
           display: inline-flex; align-items: center; gap: 6px;
           color: #00bd5e; font-size: 0.8rem; letter-spacing: 2px;
           border: 1px solid rgba(0, 189, 94, 0.3);
           background: rgba(0, 189, 94, 0.05);
           padding: 4px 12px; border-radius: 4px; margin-bottom: 5px;
        }
        .header-title {
           font-size: 2.5rem; font-weight: 800; letter-spacing: 3px;
           margin: 0;
           background: linear-gradient(to right, #fff, #00bd5e);
           -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .header-hint { font-size: 0.7rem; color: #555; margin-top: 10px; animation: pulseText 2s infinite; }

        /* VIEWPORT */
        .stream-viewport {
           position: relative;
           width: 100%;
           height: 300px; /* Adjust based on hex size * rows */
        }
        
        .fade-overlay {
           position: absolute; top: 0; bottom: 0; width: 50px; z-index: 10; pointer-events: none;
        }
        .left { left: 0; background: linear-gradient(to right, #050505, transparent); }
        .right { right: 0; background: linear-gradient(to left, #050505, transparent); }

        .hex-scroller {
           width: 100%; height: 100%;
           overflow-x: auto; /* Allow manual scroll */
           overflow-y: hidden;
           -webkit-overflow-scrolling: touch; /* Smooth momentum scroll */
           scrollbar-width: none;
           display: flex; align-items: center;
        }
        .hex-scroller::-webkit-scrollbar { display: none; }

        .hex-track {
           display: flex;
           /* To create a "2 Row" illusion in a single flex line, 
              we can stagger items using transform: translateY?
              Or better: Use Grid? 
              
              Let's use a Flex layout but alternate margins.
           */
           padding: 20px 50px; /* Side padding */
           gap: 15px;
        }

        .hex-wrapper {
           flex-shrink: 0;
           width: 120px; height: 130px;
           position: relative;
        }
        
        /* THE ZIG-ZAG / HONEYCOMB EFFECT */
        /* Move every EVEN item down by 50% of height + gap */
        .hex-wrapper:nth-child(even) {
           transform: translateY(65px); /* Half height offset */
        }
        /* This creates a 2-row Wave / Honeycomb strip */
        
        /* The Hexagon */
        .hex-cell-h {
           width: 100%; height: 100%;
           position: relative;
           display: flex; align-items: center; justify-content: center;
           filter: drop-shadow(0 0 8px rgba(0, 189, 94, 0.2));
           transition: 0.3s;
        }
        .hex-cell-h::before {
           content: ''; position: absolute; inset: 0;
           background: linear-gradient(135deg, #00bd5e, #004d26);
           clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
           z-index: 0;
        }
        
        .hex-content-h {
           width: 114px; height: 124px;
           background: #0a0a0a;
           clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
           z-index: 1;
           display: flex; flex-direction: column; align-items: center; justify-content: center;
           gap: 5px;
        }
        
        .hex-wrapper:active .hex-cell-h { transform: scale(0.95); }
        .hex-wrapper:active .hex-cell-h::before { background: #fff; }

        .hex-icon-h { font-size: 2rem; color: #fff; }
        .hex-name-h { font-size: 0.85rem; color: #00bd5e; font-weight: bold; width: 80%; text-align: center; line-height: 1; }
        .hex-cat-h { font-size: 0.6rem; color: #555; text-transform: uppercase; margin-top: 2px; }
        
        @keyframes pulseText { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }

      `}</style>
        </section>
    );
};

export default SkillsSectionMobile;
