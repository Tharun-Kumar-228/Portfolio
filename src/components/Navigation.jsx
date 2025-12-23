import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaTerminal, FaCode } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide/show navbar on scroll (smart hide)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Update scrolled state for styling
      setIsScrolled(currentScrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "certifications", "achievements", "profiles", "resume", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "ABOUT", href: "#about", id: "about" },
    { name: "SKILLS", href: "#skills", id: "skills" },
    { name: "PROJECTS", href: "#projects", id: "projects" },
    { name: "CERTIFICATES", href: "#certifications", id: "certifications" },
    { name: "ACHIEVEMENTS", href: "#achievements", id: "achievements" },
    { name: "PROFILES", href: "#profiles", id: "profiles" },
    { name: "RESUME", href: "#resume", id: "resume" },
    { name: "CONTACT", href: "#contact", id: "contact" }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      // Offset for fixed navbar
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? "scrolled" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="nav-container">

          {/* LOGO */}
          <motion.a
            href="#home"
            className="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
          >
            <FaTerminal className="logo-icon" />
            <span className="logo-text">THARUNKUMAR<span className="cursor">_</span></span>
          </motion.a>

          {/* DESKTOP MENU */}
          <div className="nav-menu desktop">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`nav-link ${activeSection === link.id ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <span className="link-brackets">[</span>
                {link.name}
                <span className="link-brackets">]</span>
              </motion.a>
            ))}
          </div>

          {/* ACTIONS & MOBILE TOGGLE */}
          <div className="nav-actions">
            <div className="theme-toggle-wrapper">
              <ThemeToggle />
            </div>

            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu-dropdown"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`mobile-link ${activeSection === link.id ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                >
                  <FaCode className="mobile-icon" /> {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* STYLES */}
      <style>{`
        .navbar {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 1000;
            padding: 1.5rem 0;
            transition: 0.3s ease;
            background: transparent;
        }

        .navbar.scrolled {
            background: rgba(5, 10, 5, 0.9);
            backdrop-filter: blur(15px);
            padding: 1rem 0;
            border-bottom: 1px solid rgba(0, 255, 102, 0.2);
            box-shadow: 0 5px 20px rgba(0,0,0,0.5);
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        /* LOGO */
        .nav-logo {
            display: flex; align-items: center; gap: 0.8rem;
            text-decoration: none; color: var(--text-primary);
            font-family: 'Courier New', monospace;
            font-weight: bold; font-size: 1.2rem;
            letter-spacing: 1px;
        }
        .logo-icon { color: var(--primary-color); font-size: 1.4rem; }
        .logo-text { position: relative; }
        .cursor { animation: blink 1s infinite; color: var(--primary-color); }

        /* DESKTOP MENU */
        .nav-menu.desktop {
            display: flex; gap: 2rem;
            align-items: center;
        }
        
        .nav-link {
            text-decoration: none;
            color: var(--text-secondary); /* Dynamic Grey */
            font-family: monospace;
            font-size: 0.9rem;
            letter-spacing: 1px;
            transition: 0.3s;
            position: relative;
        }
        .link-brackets { 
            opacity: 0; transform: translateX(0); 
            transition: 0.3s; color: var(--primary-color);
            display: inline-block;
        }
        
        .nav-link:hover, .nav-link.active {
            color: var(--primary-color); /* Highlight color */
            text-shadow: 0 0 5px rgba(14, 165, 233, 0.2);
        }
        .nav-link:hover .link-brackets, .nav-link.active .link-brackets {
            opacity: 1;
        }
        .nav-link:hover .link-brackets:first-child { transform: translateX(-5px); }
        .nav-link:hover .link-brackets:last-child { transform: translateX(5px); }

        /* ACTIONS */
        .nav-actions {
            display: flex; align-items: center; gap: 1.5rem;
        }
        .mobile-menu-toggle {
            display: none;
            background: transparent; border: 1px solid var(--primary-color);
            color: var(--primary-color);
            padding: 0.5rem; border-radius: 4px; border: none;
            font-size: 1.5rem; cursor: pointer;
        }

        /* MOBILE MENU */
        .mobile-menu-dropdown {
            background: var(--bg-card);
            backdrop-filter: blur(20px);
            border-bottom: 2px solid var(--primary-color);
            overflow: hidden;
            display: flex; flex-direction: column;
        }
        .mobile-link {
            padding: 1rem 2rem;
            color: var(--text-primary);
            text-decoration: none;
            font-family: monospace; border-bottom: 1px solid var(--border-color);
            display: flex; align-items: center; gap: 1rem;
            transition: 0.2s;
        }
        .mobile-link:hover, .mobile-link.active {
            background: rgba(14, 165, 233, 0.1);
            color: var(--primary-color);
            padding-left: 2.5rem;
        }
        .mobile-icon { font-size: 0.8rem; color: var(--text-secondary); }
        .mobile-link:hover .mobile-icon { color: var(--primary-color); }

        @keyframes blink { 50% { opacity: 0; } }

        @media(max-width: 900px) {
            .nav-menu.desktop { display: none; }
            .mobile-menu-toggle { display: block; }
        }
      `}</style>
    </>
  );
};

export default Navigation;
