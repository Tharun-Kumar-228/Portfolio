import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import { FaArrowDown, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { aboutData } from "../Contents/About";
import { useResponsive } from "../hooks/useResponsive";

const HeroSection = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);
  const { prefersReducedMotion, isMobile, isDesktop } = useResponsive();

  useEffect(() => {
    if (!heroRef.current || prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // Desktop: Full GSAP timeline with parallax
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Try to use ScrollTrigger for parallax (premium plugin)
      // If not available, skip parallax effect
      if (bgRef.current) {
        // Simple parallax without ScrollTrigger
        const handleScroll = () => {
          if (bgRef.current && window.scrollY < window.innerHeight) {
            gsap.set(bgRef.current, {
              y: window.scrollY * 0.5
            });
          }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Content animation
        if (contentRef.current) {
          tl.from(contentRef.current.children, {
            y: 80,
            opacity: 0,
            stagger: 0.15,
            duration: 1
          });
        }

        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      } else if (contentRef.current) {
        tl.from(contentRef.current.children, {
          y: 80,
          opacity: 0,
          stagger: 0.15,
          duration: 1
        });
      }
    });

    // Tablet: Medium animations
    mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      if (contentRef.current) {
        tl.from(contentRef.current.children, {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8
        });
      }
    });

    // Mobile: Simple fade + slide
    mm.add("(max-width: 639px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
      if (contentRef.current) {
        tl.from(contentRef.current.children, {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6
        });
      }
    });

    return () => {
      mm.revert();
    };
  }, [prefersReducedMotion, isMobile, isDesktop]);

  if (!aboutData || aboutData.length === 0) {
    return null;
  }

  const about = aboutData[0];

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/Tharun-Kumar-228", label: "GitHub" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaEnvelope, href: `mailto:${about.email}`, label: "Email" }
  ];

  // Animation variants based on device
  const getAnimationVariants = () => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 }
      };
    }

    if (isMobile) {
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
      };
    }

    return {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8 }
    };
  };

  const baseVariants = getAnimationVariants();

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      <div className="hero-bg" ref={bgRef}></div>
      <div className="hero-container">
        <div className="hero-content" ref={contentRef}>
          <motion.h1
            className="hero-title"
            {...baseVariants}
            transition={{ ...baseVariants.transition, delay: 0.2 }}
          >
            Hi, I'm <span className="highlight">{about.name}</span>
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            {...baseVariants}
            transition={{ ...baseVariants.transition, delay: 0.3 }}
          >
            {about.role}
          </motion.p>
          <motion.p
            className="hero-description"
            {...baseVariants}
            transition={{ ...baseVariants.transition, delay: 0.4 }}
          >
            {about.summary}
          </motion.p>
          <motion.div
            className="hero-social"
            {...baseVariants}
            transition={{ ...baseVariants.transition, delay: 0.5 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={!isMobile ? { scale: 1.2, y: -5 } : {}}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
          <motion.div
            className="hero-cta"
            {...baseVariants}
            transition={{ ...baseVariants.transition, delay: 0.6 }}
          >
            <motion.a
              href="#contact"
              className="cta-button primary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="#projects"
              className="cta-button secondary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </motion.div>
        </div>
        {!isMobile && (
          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaArrowDown />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
