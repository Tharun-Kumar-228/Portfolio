import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { educationData } from "../Contents/Education";
import { FaGraduationCap, FaSchool, FaAward } from "react-icons/fa";
import EducationSectionMobile from "./EducationSectionMobile";

const EducationSection = () => {
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
        return <EducationSectionMobile />;
    }

    return (
        <section id="education" className="section education-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="section-title"
                >
                    Education <span className="highlight">Journey</span>
                </motion.h2>

                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    {educationData.map((item, index) => (
                        <TimelineItem key={item.id} data={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const TimelineItem = ({ data, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Icon handling based on content (simple logic)
    const getIcon = (title) => {
        if (title.toLowerCase().includes("college") || title.toLowerCase().includes("engineering")) return <FaGraduationCap />;
        if (title.toLowerCase().includes("school")) return <FaSchool />;
        return <FaAward />;
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
        >
            <div className="timeline-dot"></div>
            <div className="timeline-content">
                <div className="timeline-header">
                    <div className="timeline-icon">{getIcon(data.institution)}</div>
                    <span className="timeline-year">{data.duration}</span>
                </div>
                <h3 className="timeline-title">{data.title}</h3>
                <h4 className="timeline-institution">{data.institution}</h4>
                <div className="timeline-score-box">
                    <span className="score-type">{data.scoreType}</span>
                    <span className="score-value">{data.score}</span>
                </div>
                <p className="timeline-description">{data.description}</p>
            </div>
        </motion.div>
    );
};

// Internal CSS for this component to ensure self-containment/modularity
const styles = `
.education-section {
    position: relative;
    overflow: hidden;
}

.timeline-container {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 0;
}

/* Vertical Line */
.timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--separator-gradient);
    transform: translateX(-50%);
    box-shadow: 0 0 15px var(--primary-color);
    z-index: 0;
}

.timeline-item {
    position: relative;
    width: 50%;
    margin-bottom: 3rem;
    z-index: 1;
}

.timeline-item.left {
    left: 0;
    padding-right: 3rem;
    text-align: right;
}

.timeline-item.right {
    left: 50%;
    padding-left: 3rem;
    text-align: left;
}

/* Dot on the line */
.timeline-dot {
    position: absolute;
    top: 20px;
    width: 20px;
    height: 20px;
    background: var(--bg);
    border: 3px solid var(--primary-color);
    border-radius: 50%;
    box-shadow: 0 0 15px var(--primary-color), inset 0 0 10px var(--primary-color);
    z-index: 2;
    transition: all 0.3s ease;
}

.timeline-item.left .timeline-dot {
    right: -10px;
}

.timeline-item.right .timeline-dot {
    left: -10px;
}

.timeline-item:hover .timeline-dot {
    transform: scale(1.3);
    background: var(--primary-color);
    box-shadow: 0 0 25px var(--primary-color);
}

/* Content Box */
.timeline-content {
    background: var(--card);
    backdrop-filter: blur(var(--backdrop-blur));
    border: 1px solid var(--border-color);
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.timeline-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
    pointer-events: none;
}

.timeline-content:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg), 0 0 20px var(--primary-color); /* Neon Glow on Hover */
    border-color: var(--primary-color);
}

.timeline-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
    justify-content: flex-end; /* Default right align for 'left' items */
}

.timeline-item.right .timeline-header {
    justify-content: flex-start;
}

.timeline-icon {
    font-size: 1.5rem;
    color: var(--primary-color);
}

.timeline-year {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--secondary-color);
    background: rgba(57, 255, 20, 0.1);
    padding: 0.2rem 0.8rem;
    border-radius: 20px;
    border: 1px solid var(--border-color);
}

.timeline-title {
    font-size: 1.25rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
    color: var(--text-primary);
}

.timeline-institution {
    font-size: 1rem;
    color: var(--text-secondary);
    font-weight: 500;
    margin-bottom: 1rem;
}

.timeline-score-box {
    display: inline-block;
    background: linear-gradient(90deg, rgba(57, 255, 20, 0.1), transparent);
    padding: 0.5rem 1rem;
    border-left: 3px solid var(--primary-color);
    margin-bottom: 0.5rem;
    border-radius: 0 5px 5px 0;
}

.timeline-item.left .timeline-score-box {
   background: linear-gradient(-90deg, rgba(57, 255, 20, 0.1), transparent);
   border-left: none;
   border-right: 3px solid var(--primary-color);
   border-radius: 5px 0 0 5px;
}

.score-type {
    font-weight: 600;
    color: var(--text-secondary);
    margin-right: 0.5rem;
}

.score-value {
    font-weight: 800;
    color: var(--primary-color);
    font-size: 1.1rem;
}

.timeline-description {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.6;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
    .timeline-line {
        left: 20px;
        transform: translateX(0);
    }
    
    .timeline-item {
        width: 100%;
        padding-left: 50px;
        padding-right: 0;
        text-align: left;
    }
    
    .timeline-item.left, .timeline-item.right {
        left: 0;
        text-align: left;
    }
    
    .timeline-header {
        justify-content: flex-start;
    }
    
    .timeline-item.left .timeline-dot, .timeline-item.right .timeline-dot {
        left: 10px;
        right: auto;
    }

    .timeline-item.left .timeline-score-box {
        background: linear-gradient(90deg, rgba(57, 255, 20, 0.1), transparent);
        border-right: none;
        border-left: 3px solid var(--primary-color);
        border-radius: 0 5px 5px 0;
    }
}
`;

export default EducationSection;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
