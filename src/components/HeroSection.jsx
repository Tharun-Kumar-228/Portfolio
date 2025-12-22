import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { FaArrowDown, FaGithub, FaLinkedin, FaEnvelope, FaReact, FaNodeJs, FaHtml5, FaCss3, FaJs, FaGitAlt } from "react-icons/fa";
import { aboutData } from "../Contents/About";
import { useResponsive } from "../hooks/useResponsive";
import SplatterTransition from "./SplatterTransition";

// Tech stack icons for floating effect
const techIcons = [
  { Icon: FaReact, color: "#61DAFB", delay: 0 },
  { Icon: FaNodeJs, color: "#339933", delay: 1 },
  { Icon: FaHtml5, color: "#E34F26", delay: 2 },
  { Icon: FaCss3, color: "#1572B6", delay: 3 },
  { Icon: FaJs, color: "#F7DF1E", delay: 4 },
  { Icon: FaGitAlt, color: "#F05032", delay: 5 },
];

const HeroSection = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);
  const imageRef = useRef(null);
  const { prefersReducedMotion, isMobile, isDesktop } = useResponsive();
  const [showSplatter, setShowSplatter] = useState(false);
  const { scrollY } = useScroll();

  // Parallax for floating icons
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // useLayoutEffect for GSAP to avoid FOUC and ensure DOM is ready
  useEffect(() => {
    if (!heroRef.current || prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Full GSAP timeline
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            // Ensure opacity stays 1 after animation
            if (contentRef.current) {
              gsap.set(contentRef.current.children, { opacity: 1 });
            }
          }
        });

        if (contentRef.current) {
          // Set initial state to avoid flash
          gsap.set(contentRef.current.children, { y: 80, opacity: 0 });

          tl.to(contentRef.current.children, {
            y: 0, // Animate to default position
            opacity: 1,
            stagger: 0.15,
            duration: 1,
            clearProps: "all" // Clear props after animation to let CSS/Framer take over if needed, 
            // BUT for opacity we might want to keep it if CSS default is 0. 
            // Actually, let's NOT clearProps "opacity" if the CSS is relying on this.
            // Safest is to animate to natural state.
          });
        }

        // Animate image float
        if (imageRef.current) {
          gsap.set(imageRef.current, { opacity: 0, scale: 0.8 });

          tl.to(imageRef.current, {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.2
          }, "-=0.8");

          // Bobbing animation
          gsap.to(imageRef.current, {
            y: -20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.2
          });
        }
      });

      return () => mm.revert(); // Cleanup media query
    }, heroRef); // Scope to heroRef

    return () => ctx.revert(); // Cleanup context
  }, [prefersReducedMotion, isMobile, isDesktop]);

  const handleScrollToAbout = (e) => {
    e.preventDefault();
    setShowSplatter(true);
  };

  const onSplatterComplete = () => {
    setShowSplatter(false);
    const aboutSection = document.getElementById("about"); // Assuming About section has this ID
    // If we have a specific transition logic, we can do it here. 
    // Ideally, we scroll TO the section or reveal it.
    // For this effect, we might want to simulate a scroll or simply let the splatter finish 
    // and ensuring the about section is visible underneath.

    // In this specific request: "Hero loads normally... Trigger cinematic reveal... About slides in under Hero"
    // We'll scroll smoothly to the next section
    const nextSection = document.querySelector("#about") || document.querySelector(".section:nth-of-type(2)");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!aboutData || aboutData.length === 0) return null;
  const about = aboutData[0];
  const hasImage = about.image;

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/Tharun-Kumar-228", label: "GitHub" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaEnvelope, href: `mailto:${about.email}`, label: "Email" }
  ];

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      {showSplatter && <SplatterTransition onComplete={onSplatterComplete} />}

      <div className="hero-bg" ref={bgRef} />

      {/* Dynamic Circular Gradient Backdrop */}
      <div className="hero-glow-backdrop" />

      <div className="hero-container">
        <div className="hero-wrapper">
          <div className="hero-content" ref={contentRef}>
            {/* GSAP controls entrance, so we disable Framer's initial/animate for entrance 
                but keep it for hover/tap interactions if needed via variants or separate props */}
            <motion.h1
              className="hero-title"
            // Removed conflicting framer entrance props
            >
              Hi, I'm <span className="highlight">{about.name}</span>
            </motion.h1>
            <motion.p className="hero-subtitle">
              {about.role}
            </motion.p>
            <motion.p className="hero-description">
              {about.summary}
            </motion.p>

            <div className="hero-social">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="social-link">
                  <social.icon />
                </a>
              ))}
            </div>

            <div className="hero-cta">
              <a href="#contact" className="cta-button primary" onClick={handleScrollToAbout}>
                Get In Touch
              </a>
              <a href="#projects" className="cta-button secondary">
                View My Work
              </a>
            </div>
          </div>

          <div className="hero-visuals">
            {/* Floating Tech Icons */}
            {!isMobile && techIcons.map((tech, i) => (
              <motion.div
                key={i}
                className="floating-icon"
                style={{
                  color: tech.color,
                  y: i % 2 === 0 ? y1 : y2,
                  left: `${(i / techIcons.length) * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: tech.delay,
                }}
              >
                <tech.Icon />
              </motion.div>
            ))}

            {/* Main Image */}
            {hasImage && (
              <div className="hero-image-container" ref={imageRef}>
                <div className="image-glow" />
                <img
                  src={about.image}
                  alt={about.name}
                  className="hero-image"
                  loading="eager"
                />
              </div>
            )}
          </div>
        </div>

        {!isMobile && (
          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={handleScrollToAbout}
          >
            <FaArrowDown />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
