import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { gsap } from "gsap";
import { FaGithub, FaLinkedin, FaEnvelope, FaReact, FaNodeJs, FaHtml5, FaCss3, FaJs, FaGitAlt, FaJava, FaPython, FaAws, FaMousePointer } from "react-icons/fa";
import { aboutData } from "../Contents/About";
import { useResponsive } from "../hooks/useResponsive";
import TileTransition from "./TileTransition";

// ICONS DATA - 4 PER RING (12 TOTAL)
const r1 = [
  { Icon: FaReact, color: "#61DAFB", offset: 0 },
  { Icon: FaJs, color: "#F7DF1E", offset: 90 },
  { Icon: FaHtml5, color: "#E34F26", offset: 180 },
  { Icon: FaCss3, color: "#1572B6", offset: 270 },
];
const r2 = [
  { Icon: FaNodeJs, color: "#339933", offset: 0 },
  { Icon: FaGitAlt, color: "#F05032", offset: 90 },
  { Icon: FaReact, color: "#61DAFB", offset: 180 },
  { Icon: FaJs, color: "#F7DF1E", offset: 270 },
];
const r3 = [
  { Icon: FaGithub, color: "#fff", offset: 0 },
  { Icon: FaHtml5, color: "#E34F26", offset: 90 },
  { Icon: FaCss3, color: "#1572B6", offset: 180 },
  { Icon: FaNodeJs, color: "#339933", offset: 270 },
];

const OrbitalIcon = ({ Icon, color, offset, radius, duration, rotationY }) => {
  const ref = useRef(null);
  const [zIndex, setZIndex] = useState(0);

  useAnimationFrame((t) => {
    if (!ref.current) return;

    const timeInSec = t / 1000;
    const angle = (timeInSec / duration) * Math.PI * 2 + (offset * Math.PI / 180);

    // STANDING ATOM MATH
    // Base Circle on XY plane (Vertical, facing camera)
    let x = radius * Math.cos(angle);
    let y = radius * Math.sin(angle);
    let z = 0;

    // Rotate around Y axis (Swivel left/right)
    const cosY = Math.cos(rotationY * Math.PI / 180);
    const sinY = Math.sin(rotationY * Math.PI / 180);

    const xFinal = x * cosY - z * sinY;
    const zFinal = x * sinY + z * cosY;
    const yFinal = y; // Y stays same

    const scale = 1 + (zFinal / 500);
    const opacity = 0.5 + (0.5 * (1 + zFinal / 400));

    const newZ = zFinal > 0 ? 20 : 5;
    if (zIndex !== newZ) setZIndex(newZ);

    ref.current.style.transform = `translate3d(${xFinal}px, ${yFinal}px, ${zFinal}px) scale(${scale})`;
    ref.current.style.opacity = opacity;
    ref.current.style.zIndex = newZ;
  });

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "42px",
        height: "42px",
        marginTop: "-21px",
        marginLeft: "-21px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: color,
        fontSize: "1.5rem",
        background: "var(--bg-card)",
        borderRadius: "50%",
        boxShadow: `0 0 15px ${color}80`,
        willChange: "transform, opacity, z-index",
      }}
    >
      <Icon />
    </div>
  );
};

// VISIBLE ENERGY RING - YELLOW / STANDING
const EnergyRing = ({ radius, rotationY }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        marginLeft: `-${radius}px`,
        marginTop: `-${radius}px`,
        borderRadius: "50%",
        // YELLOW LIGHT ROUNDING AROUND IT
        border: "2px solid rgba(255, 215, 0, 0.3)", // Gold
        boxShadow: "0 0 20px rgba(255, 215, 0, 0.2), inset 0 0 20px rgba(255, 215, 0, 0.1)",
        // Rotate Y to setup the standing X shape
        transform: `rotateY(${rotationY}deg)`,
        pointerEvents: "none",
        zIndex: 10,
        transformStyle: "preserve-3d",
      }}
    />
  );
}

// TYPING COMPONENT
const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
}

const HeroSection = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);
  const imageRef = useRef(null);
  const [showTransition, setShowTransition] = useState(false);
  const { prefersReducedMotion, isMobile, isDesktop } = useResponsive();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || isMobile) return;
    x.set((e.clientX / window.innerWidth) - 0.5);
    y.set((e.clientY / window.innerHeight) - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const handleScrollToAbout = (e) => {
    e.preventDefault();
    setShowTransition(true);
  };
  const onTransitionComplete = () => {
    setShowTransition(false);
    const nextSection = document.querySelector("#about") || document.querySelector(".section:nth-of-type(2)");
    if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
  };

  if (!aboutData || aboutData.length === 0) return null;
  const about = aboutData[0];

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/Tharun-Kumar-228" },
    { icon: FaLinkedin, href: "#" },
    { icon: FaEnvelope, href: `mailto:${about.email}` }
  ];

  return (
    <section
      id="home"
      className="hero-section"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {showTransition && <TileTransition onComplete={onTransitionComplete} />}

      {/* 1. Deep Dark Background + Cyber Scan */}
      <div className="hero-bg-deep"></div>
      <div className="hero-cyber-scan"></div>
      <div className="hero-particles"></div>

      {/* 2. Neon Border Frame Wrapper */}
      <div className="hero-frame">
        <div className="hero-corner top-left"></div>
        <div className="hero-corner top-right"></div>
        <div className="hero-corner bottom-left"></div>
        <div className="hero-corner bottom-right"></div>

        <div className="hero-container">
          <div className="hero-wrapper">

            {/* CONTENT SIDE */}
            <div className="hero-content" ref={contentRef} style={{ zIndex: 20, position: "relative", textAlign: "left", alignItems: "flex-start" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="hero-greeting">Omnitrix Calibrated...</h2>
                <h1 className="hero-title glitch-text">
                  <Typewriter text={about.name} delay={100} />
                  <span className="cursor-blink">|</span>
                </h1>
              </motion.div>

              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                {about.role}
              </motion.p>

              <motion.p
                className="hero-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                style={{ textAlign: "justify", maxWidth: "90%" }}
              >
                {about.summary}
              </motion.p>

              <div className="hero-social">
                {socialLinks.map((social, index) => (
                  <a key={index} href={social.href} target="_blank" className="social-link"><social.icon /></a>
                ))}
              </div>
              <div className="hero-cta">
                <a href="#contact" className="cta-button primary" onClick={handleScrollToAbout}>Get In Touch</a>
                <a href="#projects" className="cta-button secondary">View My Work</a>
              </div>
            </div>

            {/* VISUALS SIDE (Orbital Animation) */}
            <motion.div
              className="hero-visuals"
              style={{
                perspective: "1200px",
                rotateX: isDesktop && !prefersReducedMotion ? rotateX : 0,
                rotateY: isDesktop && !prefersReducedMotion ? rotateY : 0,
              }}
            >
              {(about.heroImage || about.image) && (
                <div
                  className="hero-image-container 3d-wrapper"
                  ref={imageRef}
                  style={{
                    transformStyle: "preserve-3d",
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {(
                    <>
                      {/* Ring 1 - Vertical (0 Deg) */}
                      <EnergyRing radius={280} rotationY={0} />
                      {r1.map((tech, i) => (
                        <OrbitalIcon key={`r1-${i}`} Icon={tech.Icon} color={tech.color} offset={tech.offset} radius={280} duration={14} rotationY={0} />
                      ))}

                      {/* Ring 2 - Diagonal Right (60 Deg) */}
                      <EnergyRing radius={280} rotationY={60} />
                      {r2.map((tech, i) => (
                        <OrbitalIcon key={`r2-${i}`} Icon={tech.Icon} color={tech.color} offset={tech.offset} radius={280} duration={16} rotationY={60} />
                      ))}

                      {/* Ring 3 - Diagonal Left (-60 aka 120 Deg) */}
                      <EnergyRing radius={280} rotationY={-60} />
                      {r3.map((tech, i) => (
                        <OrbitalIcon key={`r3-${i}`} Icon={tech.Icon} color={tech.color} offset={tech.offset} radius={280} duration={18} rotationY={-60} />
                      ))}
                    </>
                  )}

                  {/* IMAGE CENTER - SQUARE BORDER & FULL PNG */}
                  <motion.div
                    className="image-wrapper"
                    style={{
                      position: "relative",
                      zIndex: 10,
                      width: "360px", // Increased width
                      height: "450px", // Increased height for full PNG
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "transparent",
                      borderRadius: "0",
                      border: "none", // No border as requested
                      boxShadow: "none" // No box background shadow
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.img
                      src={about.heroImage || about.image}
                      alt={about.name}
                      className="hero-image"
                      loading="eager"
                      initial={{ filter: "grayscale(100%)" }}
                      whileHover={{ filter: "grayscale(0%)" }}
                      transition={{ filter: { duration: 0.4 } }}
                      style={{
                        borderRadius: "15px", // Match wrapper
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // Cover the square
                        transform: "translateZ(0)",
                      }}
                    />
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
            padding: 80px 0 0 0; /* Prevents overlap with fixed Navbar */
            min-height: 100vh;
        }
        
        .hero-bg-deep {
            position: absolute;
            inset: 0;
            background: var(--bg); /* User requested Light Theme Support */
            z-index: 0;
            transition: background 0.5s ease;
        }
        
        /* Cyber Scan Animation */
        .hero-cyber-scan {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, transparent, rgba(0, 255, 100, 0.1), transparent);
            z-index: 1;
            height: 100%;
            animation: scanline 4s linear infinite;
            pointer-events: none;
        }
        @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        
        /* Frame & Border */
        .hero-frame {
            position: relative;
            z-index: 2;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            /* The Neon Green Border Frame */
            border: 2px solid var(--primary-color);
            box-shadow: inset 0 0 50px rgba(0, 255, 102, 0.1);
            margin: 20px; /* Offset from screen edge if desired, or 0 */
            border-radius: 20px;
            overflow: hidden;
            background: rgba(0,0,0,0.3); /* Slight overlay */
        }

        /* Decorative Corners */
        .hero-corner {
            position: absolute;
            width: 40px;
            height: 40px;
            border: 4px solid var(--primary-color);
            z-index: 5;
        }
        .top-left { top: 0; left: 0; border-right: none; border-bottom: none; border-top-left-radius: 18px; }
        .top-right { top: 0; right: 0; border-left: none; border-bottom: none; border-top-right-radius: 18px; }
        .bottom-left { bottom: 0; left: 0; border-right: none; border-top: none; border-bottom-left-radius: 18px; }
        .bottom-right { bottom: 0; right: 0; border-left: none; border-top: none; border-bottom-right-radius: 18px; }
        
        .hero-greeting {
            color: var(--primary-color);
            font-family: monospace;
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        
        .cursor-blink {
            animation: blink 1s step-end infinite;
            color: var(--primary-color);
        }
        @keyframes blink { 50% { opacity: 0; } }
        
        /* Glitch effect for Title */
        .glitch-text {
            position: relative;
            display: inline-block;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
