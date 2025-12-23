import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WelcomeScreen = ({ onComplete }) => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const sequence = [
            { text: "BIOS CHECK...", delay: 200 },
            { text: "LOADING MODULES...", delay: 800 },
            { text: "VERIFYING INTEGRITY...", delay: 1500 },
            { text: "OPTIMIZING QUANTUM CORE...", delay: 2200 },
            { text: "ACCESS GRANTED", delay: 2800 },
        ];

        let timeouts = [];
        sequence.forEach(({ text, delay }) => {
            const t = setTimeout(() => {
                setLogs(prev => [...prev, text]);
            }, delay);
            timeouts.push(t);
        });

        const completeTimeout = setTimeout(onComplete, 3500);
        timeouts.push(completeTimeout);

        return () => timeouts.forEach(clearTimeout);
    }, [onComplete]);

    // Complex Circuit Paths
    const circuits = [
        "M 150 150 L 150 50 L 50 50",       // Path 1
        "M 150 150 L 250 150 L 250 50",     // Path 2
        "M 150 150 L 150 250 L 250 250",    // Path 3
        "M 150 150 L 50 150 L 50 250",      // Path 4
        "M 150 150 L 100 100 L 0 0",        // Path 5 (Corner)
        "M 150 150 L 200 200 L 300 300",    // Path 6
        "M 150 150 L 200 100 L 300 100",    // Path 7
        "M 150 150 L 100 200 L 0 200",      // Path 8
    ];

    return (
        <motion.div
            className="welcome-screen-quantum"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                filter: "blur(20px)",
                scale: 1.5,
                transition: { duration: 0.8 }
            }}
        >
            <div className="quantum-stage">
                {/* 1. BACKGROUND GRID */}
                <div className="tech-grid"></div>

                {/* 2. CENTRAL QUANTUM CHIP */}
                <div className="chip-wrapper">
                    <div className="chip-base"></div>
                    <div className="chip-layer l1"></div>
                    <div className="chip-layer l2"></div>
                    <div className="chip-core">
                        <div className="core-inner"></div>
                    </div>
                </div>

                {/* 3. DATA CIRCUITS */}
                <svg className="circuit-network" viewBox="0 0 300 300">
                    <defs>
                        <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00ff66" stopOpacity="0" />
                            <stop offset="50%" stopColor="#00ff66" stopOpacity="1" />
                            <stop offset="100%" stopColor="#00ff66" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {circuits.map((d, i) => (
                        <g key={i}>
                            {/* Static Trace */}
                            <path d={d} stroke="rgba(0, 255, 102, 0.2)" strokeWidth="2" fill="none" />
                            {/* Moving Packet */}
                            <motion.path
                                d={d}
                                stroke="url(#traceGrad)"
                                strokeWidth="3"
                                fill="none"
                                initial={{ pathLength: 0, pathOffset: 1 }}
                                animate={{ pathLength: 0.4, pathOffset: 0 }}
                                transition={{
                                    duration: 1.5 + Math.random(),
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 0.5
                                }}
                            />
                            {/* Node Endpoints */}
                            <circle cx="0" cy="0" r="2" fill="#fff">
                                <animateMotion dur={`${1.5 + Math.random()}s`} repeatCount="indefinite" path={d} />
                            </circle>
                        </g>
                    ))}
                </svg>

                {/* 4. BIOS TERMINAL */}
                <div className="bios-terminal">
                    {logs.map((log, i) => (
                        <div key={i} className="log-line">
                            <span className="prefix">{`>>`}</span> {log}
                        </div>
                    ))}
                    <div className="log-cursor">_</div>
                </div>
            </div>

            <style>{`
                .welcome-screen-quantum {
                    position: fixed; inset: 0;
                    background: #020502; /* Very Dark Green-Black */
                    z-index: 999999;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Share Tech Mono', monospace;
                    overflow: hidden;
                }

                .quantum-stage {
                    position: relative;
                    width: 400px; height: 400px;
                    display: flex; align-items: center; justify-content: center;
                }

                /* CHIP DESIGN */
                .chip-wrapper {
                    position: relative; z-index: 20;
                    width: 100px; height: 100px;
                    display: flex; align-items: center; justify-content: center;
                    perspective: 500px;
                    transform-style: preserve-3d;
                    animation: floatChip 4s ease-in-out infinite;
                }
                @keyframes floatChip {
                    0%, 100% { transform: translateY(0) rotateX(10deg); }
                    50% { transform: translateY(-10px) rotateX(-10deg); }
                }

                .chip-base {
                    position: absolute; width: 100%; height: 100%;
                    background: #0a150a;
                    border: 2px solid #1a351a;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.8);
                    transform: translateZ(-10px);
                }
                .chip-layer {
                    position: absolute; width: 80%; height: 80%;
                    border: 1px solid rgba(0, 255, 102, 0.3);
                    background: rgba(0, 255, 102, 0.05);
                }
                .l1 { transform: translateZ(5px); }
                .l2 { transform: translateZ(15px); width: 60%; height: 60%; }

                .chip-core {
                    position: absolute; width: 40px; height: 40px;
                    background: #00ff66;
                    transform: translateZ(20px);
                    box-shadow: 0 0 20px #00ff66;
                    display: flex; align-items: center; justify-content: center;
                }
                .core-inner {
                    width: 20px; height: 20px;
                    background: white;
                    animation: pulseCore 1s infinite alternate;
                }
                @keyframes pulseCore { from { opacity: 0.5; } to { opacity: 1; transform: scale(1.1); } }

                /* CIRCUITS */
                .circuit-network {
                    position: absolute; inset: -50px; width: 500px; height: 500px;
                    pointer-events: none; z-index: 10;
                }

                /* BIOS TERMINAL */
                .bios-terminal {
                    position: absolute; bottom: -80px; width: 300px;
                    color: rgba(0, 255, 102, 0.9);
                    font-size: 0.9rem;
                    text-align: left;
                    height: 80px;
                    overflow: hidden;
                    display: flex; flex-direction: column; justify-content: flex-end;
                }
                .log-line { margin-bottom: 4px; animation: slideUp 0.3s ease-out; }
                @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                
                .prefix { color: #fff; margin-right: 8px; }
                .log-cursor { animation: blink 1s infinite; display: inline-block; color: #00ff66; }

                /* GRID BG */
                .tech-grid {
                    position: fixed; inset: 0;
                    background-image: 
                        linear-gradient(rgba(0, 255, 102, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 102, 0.05) 1px, transparent 1px);
                    background-size: 40px 40px;
                    transform: perspective(500px) rotateX(60deg);
                    transform-origin: top center;
                    animation: scrollGrid 10s linear infinite;
                    pointer-events: none;
                    opacity: 0.4;
                }
                @keyframes scrollGrid { from { background-position: 0 0; } to { background-position: 0 1000px; } }
            `}</style>
        </motion.div>
    );
};

export default WelcomeScreen;
