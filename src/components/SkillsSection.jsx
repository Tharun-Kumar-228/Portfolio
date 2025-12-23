import React from "react";
import { motion } from "framer-motion";
import { skillsData } from "../Contents/Skills";
import {
    FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaDatabase, FaPython, FaJava, FaFigma
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
    if (name.includes("c")) return <TbBrandCpp color="#555555" />; // Generic for C
    if (name.includes("git")) return <FaGitAlt color="#F05032" />;
    if (name.includes("figma")) return <FaFigma color="#F24E1E" />;
    if (name.includes("blender")) return <SiBlender color="#E87D0D" />;
    if (name.includes("canva")) return <SiCanva color="#00C4CC" />;
    if (name.includes("tailwind")) return <SiTailwindcss color="#06B6D4" />;
    if (name.includes("firebase")) return <SiFirebase color="#FFCA28" />;
    return <FaCode color="#ccc" />;
};

const SkillsSection = () => {
    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="highlight">Galactic</span> Skills
                </motion.h2>

                <div className="galaxy-container">
                    {skillsData.map((categoryGroup, index) => (
                        <div key={categoryGroup.id} className="solar-system-mini">
                            {/* CENTER SUN: CATEGORY NAME */}
                            <motion.div
                                className="category-sun"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: index * 0.1, type: "spring" }}
                                viewport={{ once: true }}
                            >
                                <span className="category-label">{categoryGroup.category}</span>
                                <div className="sun-pulse"></div>
                            </motion.div>

                            {/* ORBIT */}
                            <div className="orbit-ring">
                                {categoryGroup.skills.map((skill, i) => {
                                    const count = categoryGroup.skills.length;
                                    const rotation = (360 / count) * i;
                                    // Use CSS variable for continuous rotation offset if needed, 
                                    // but we can just use fixed positions on a spinning ring.
                                    return (
                                        <div
                                            key={skill}
                                            className="planet-wrapper"
                                            style={{
                                                transform: `rotate(${rotation}deg) translateX(85px) rotate(-${rotation}deg)`
                                            }}
                                        >
                                            <div className="planet-icon-mini">
                                                {getSkillIcon(skill)}
                                                <span className="planet-tooltip">{skill}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .skills-section {
                    padding: 4rem 0;
                    min-height: 80vh;
                    overflow: hidden;
                }

                .galaxy-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 4rem;
                    padding: 2rem 0;
                }

                .solar-system-mini {
                    position: relative;
                    width: 280px;
                    height: 280px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* CATEGORY SUN */
                .category-sun {
                    width: 100px;
                    height: 100px;
                    background: radial-gradient(circle, #1a1a1a, #000);
                    border: 2px solid var(--primary-color);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    z-index: 10;
                    position: relative;
                    box-shadow: 0 0 20px rgba(0, 255, 102, 0.2);
                }
                .category-label {
                    color: var(--primary-color);
                    font-weight: 800;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    z-index: 2;
                }
                .sun-pulse {
                    position: absolute;
                    width: 100%; height: 100%;
                    border-radius: 50%;
                    border: 1px solid var(--primary-color);
                    animation: pulseRing 3s infinite;
                    opacity: 0.5;
                }

                @keyframes pulseRing {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(1.5); opacity: 0; }
                }

                /* ORBIT RING */
                .orbit-ring {
                    position: absolute;
                    width: 240px;
                    height: 240px;
                    border: 1px dashed rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%); /* Start centered */
                    animation: spinSystem 20s linear infinite;
                }
                
                /* Each system spins at slightly different speeds or directions for visual variety? 
                   Keeping uniform for now. */

                .planet-wrapper {
                    position: absolute;
                    top: 50%; left: 50%;
                    width: 0; height: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .planet-icon-mini {
                    font-size: 1.5rem;
                    background: rgba(10, 15, 10, 0.9);
                    width: 35px; height: 35px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(255,255,255,0.1);
                    /* Counter-rotate to keep icon upright */
                    animation: counterSpinSystem 20s linear infinite;
                    cursor: pointer;
                    transition: 0.3s;
                    position: relative;
                }
                .planet-icon-mini:hover {
                    width: 45px; height: 45px;
                    font-size: 1.8rem;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 10px var(--primary-color);
                    z-index: 20;
                }

                .planet-tooltip {
                    position: absolute;
                    top: -25px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--primary-color);
                    color: black;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: bold;
                    opacity: 0;
                    transition: 0.2s;
                    white-space: nowrap;
                    pointer-events: none;
                }
                .planet-icon-mini:hover .planet-tooltip {
                    opacity: 1;
                }

                @keyframes spinSystem {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }

                @keyframes counterSpinSystem {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }

                @media(max-width: 768px) {
                    .galaxy-container { gap: 2rem; }
                    .solar-system-mini { width: 220px; height: 220px; }
                    .orbit-ring { width: 180px; height: 180px; }
                    .planet-wrapper { 
                         /* Override transform for smaller radius on mobile via calculation or separate class?
                            Can't easily override inline transform. 
                            Better to scale the whole system. */
                    }
                    .solar-system-mini { transform: scale(0.85); margin: -1rem; }
                }
            `}</style>
        </section>
    );
};

export default SkillsSection;
