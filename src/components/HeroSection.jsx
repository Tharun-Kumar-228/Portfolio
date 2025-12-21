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
  const imageRef = useRef(null);
  const { prefersReducedMotion, isMobile, isDesktop } = useResponsive();

  useEffect(() => {
    if (!heroRef.current || prefersReducedMotion) {
      // Ensure visibility even without animations
      if (contentRef.current) {
        gsap.set(contentRef.current.children, { opacity: 1, y: 0 });
      }
      if (imageRef.current) {
        gsap.set(imageRef.current, { opacity: 1, scale: 1 });
      }
      return;
    }

    const mm = gsap.matchMedia();

    // Desktop: Full GSAP timeline with parallax
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (bgRef.current) {
        const handleScroll = () => {
          if (bgRef.current && window.scrollY < window.innerHeight) {
            gsap.set(bgRef.current, {
              y: window.scrollY * 0.5
            });
          }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        if (contentRef.current) {
          // CRITICAL FIX: Ensure final opacity is 1 and position is 0
          tl.from(contentRef.current.children, {
            y: 80,
            opacity: 0,
            stagger: 0.15,
            duration: 1
          });
          
          // Explicitly set final state to prevent any overwrites
          tl.call(() => {
            gsap.set(contentRef.current.children, { opacity: 1, y: 0, clearProps: "all" });
          });
        }

        // Animate image if present
        if (imageRef.current) {
          tl.from(imageRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            delay: 0.2
          }, "-=0.8").call(() => {
            gsap.set(imageRef.current, { opacity: 1, scale: 1 });
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
        }).call(() => {
          gsap.set(contentRef.current.children, { opacity: 1, y: 0, clearProps: "all" });
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
        }).call(() => {
          gsap.set(contentRef.current.children, { opacity: 1, y: 0, clearProps: "all" });
        });
      }
      if (imageRef.current) {
        tl.from(imageRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8
        }, "-=0.6").call(() => {
          gsap.set(imageRef.current, { opacity: 1, scale: 1 });
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
        }).call(() => {
          gsap.set(contentRef.current.children, { opacity: 1, y: 0, clearProps: "all" });
        });
      }
      if (imageRef.current) {
        tl.from(imageRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.6
        }, "-=0.4").call(() => {
          gsap.set(imageRef.current, { opacity: 1, scale: 1 });
        });
      }
    });

    return () => {
      mm.revert();
      // Ensure visibility on cleanup
      if (contentRef.current) {
        gsap.set(contentRef.current.children, { opacity: 1, y: 0 });
      }
      if (imageRef.current) {
        gsap.set(imageRef.current, { opacity: 1, scale: 1 });
      }
    };
  }, [prefersReducedMotion, isMobile, isDesktop]);

  if (!aboutData || aboutData.length === 0) {
    return null;
  }

  const about = aboutData[0];
  const hasImage = about.image && about.image !== "/assets/profile.jpg";

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/Tharun-Kumar-228", label: "GitHub" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaEnvelope, href: `mailto:${about.email}`, label: "Email" }
  ];

  // Animation variants based on device - ensure final state is visible
  const getAnimationVariants = () => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0 }
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
        <div className="hero-wrapper">
          <div className="hero-content" ref={contentRef} style={{ opacity: 1 }}>
            <motion.h1
              className="hero-title"
              {...baseVariants}
              transition={{ ...baseVariants.transition, delay: 0.2 }}
              style={{ opacity: 1 }}
            >
              Hi, I'm <span className="highlight">{about.name}</span>
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              {...baseVariants}
              transition={{ ...baseVariants.transition, delay: 0.3 }}
              style={{ opacity: 1 }}
            >
              {about.role}
            </motion.p>
            <motion.p
              className="hero-description"
              {...baseVariants}
              transition={{ ...baseVariants.transition, delay: 0.4 }}
              style={{ opacity: 1 }}
            >
              {about.summary}
            </motion.p>
            <motion.div
              className="hero-social"
              {...baseVariants}
              transition={{ ...baseVariants.transition, delay: 0.5 }}
              style={{ opacity: 1 }}
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
              style={{ opacity: 1 }}
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
          {hasImage && (
            <motion.div
              className="hero-image-wrapper"
              ref={imageRef}
              style={{ opacity: 1 }}
              whileHover={!isMobile && !prefersReducedMotion ? { scale: 1.05, y: -10 } : {}}
            >
              <img
                src={about.image}
                alt={about.name}
                className="hero-image"
                loading="eager"
              />
            </motion.div>
          )}
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
