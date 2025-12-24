import { motion } from "framer-motion";
import { contactData } from "../Contents/Contact";
import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { FaEnvelope, FaUser, FaComment, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaSatelliteDish, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import { useResponsive } from "../hooks/useResponsive";
import ContactSectionMobile from "./ContactSectionMobile";

const ContactSection = () => {
  const { prefersReducedMotion } = useResponsive();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Form State Hooks (Must be called unconditionally)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: contactData?.[0]?.email
        },
        publicKey
      );

      setStatus({
        type: "success",
        message: "Message Sent Successfully. I'll get back to you soon!"
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Message Failed. Please check your connection or email me directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  if (mounted && isMobile) {
    return <ContactSectionMobile />;
  }

  if (!contactData || contactData.length === 0) {
    return null;
  }

  const contact = contactData[0];

  return (
    <section id="contact" className="section contact-section">
      <div className="container">

        {/* HEADER */}
        <div className="comms-header">
          <motion.div
            className="signal-array"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="signal-bar bar-1"></div>
            <div className="signal-bar bar-2"></div>
            <div className="signal-bar bar-3"></div>
            <div className="signal-bar bar-4"></div>
          </motion.div>
          <h2 className="section-title">
            GET IN <span className="highlight">TOUCH</span>
          </h2>
          <div className="status-indicator">
            <span className="dot pulse"></span> ONLINE
          </div>
        </div>

        <div className="contact-grid">

          {/* LEFT: COORDINATES */}
          <motion.div
            className="coordinates-panel"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="panel-header">
              <h3>// CONTACT DETAILS</h3>
            </div>

            <div className="coord-card">
              <div className="icon-box"><FaGlobe /></div>
              <div className="coord-info">
                <span className="label">LOCATION</span>
                <span className="value">{contact.address || "Available Worldwide"}</span>
              </div>
            </div>

            <div className="coord-card">
              <div className="icon-box"><FaEnvelope /></div>
              <div className="coord-info">
                <span className="label">EMAIL</span>
                <a href={`mailto:${contact.email}`} className="value link">{contact.email}</a>
              </div>
            </div>

            <div className="radar-visual">
              <div className="radar-circle"></div>
              <div className="radar-sweep"></div>
            </div>
          </motion.div>

          {/* RIGHT: TRANSMISSION FORM */}
          <motion.div
            className="transmission-console"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="console-header">
              <span>SECURE MESSENGER: <span style={{ color: 'var(--primary-color)' }}>ACTIVE</span></span>
            </div>

            <form className="console-form" onSubmit={handleSubmit}>

              <div className={`input-group ${activeField === 'name' ? 'active' : ''}`}>
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="YOUR NAME"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setActiveField('name')}
                  onBlur={() => setActiveField(null)}
                  required
                />
                <div className="input-border"></div>
              </div>

              <div className={`input-group ${activeField === 'email' ? 'active' : ''}`}>
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="YOUR EMAIL"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  required
                />
                <div className="input-border"></div>
              </div>

              <div className={`input-group ${activeField === 'message' ? 'active' : ''}`}>
                <FaComment className="input-icon" />
                <textarea
                  name="message"
                  placeholder="YOUR MESSAGE..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  required
                />
                <div className="input-border"></div>
              </div>

              {status.message && (
                <div className={`console-status ${status.type}`}>
                  {status.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="transmit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "SENDING..." : <>SEND MESSAGE <FaPaperPlane /></>}
              </button>

            </form>
          </motion.div>

        </div>
      </div>

      <style>{`
        .contact-section {
            padding: 6rem 0;
            position: relative;
            overflow: hidden;
        }

        /* HEADER */
        .comms-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 4rem;
        }
        .signal-array {
            display: flex; gap: 4px; align-items: flex-end; height: 30px; margin-bottom: 1rem;
        }
        .signal-bar {
            width: 6px; background: #333;
        }
        .bar-1 { height: 30%; background: var(--primary-color); }
        .bar-2 { height: 50%; background: var(--primary-color); }
        .bar-3 { height: 75%; background: var(--primary-color); }
        .bar-4 { height: 100%; animation: pulseOpacity 1s infinite alternate; background: var(--primary-color); }

        .status-indicator {
            font-family: monospace;
            color: var(--primary-color);
            display: flex; align-items: center; gap: 0.5rem;
            margin-top: 0.5rem;
            font-size: 0.9rem;
        }
        .dot { width: 8px; height: 8px; background: var(--primary-color); border-radius: 50%; }
        .pulse { animation: blink 1s infinite; }

        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 3rem;
        }

        /* LEFT PANEL */
        .coordinates-panel {
            background: rgba(10,15,10,0.6);
            border: 1px solid rgba(0, 255, 102, 0.2);
            border-radius: 10px;
            padding: 2rem;
            position: relative;
            overflow: hidden;
        }
        .panel-header h3 {
            font-family: monospace; color: #888; font-size: 1rem; margin-bottom: 2rem;
            border-bottom: 1px dashed #333; padding-bottom: 0.5rem;
        }

        .coord-card {
            display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;
        }
        .icon-box {
            width: 40px; height: 40px;
            background: rgba(0, 255, 102, 0.1);
            color: var(--primary-color);
            display: flex; align-items: center; justify-content: center;
            border-radius: 5px;
            border: 1px solid var(--primary-color);
        }
        .coord-info {
            display: flex; flex-direction: column;
        }
        .coord-info .label {
            font-size: 0.7rem; color: #666; font-family: monospace; letter-spacing: 1px;
        }
        .coord-info .value {
            color: white; font-weight: bold; font-family: monospace; font-size: 1rem;
        }
        .coord-info .link { text-decoration: none; transition: 0.3s; }
        .coord-info .link:hover { color: var(--primary-color); text-shadow: 0 0 10px var(--primary-color); }

        .radar-visual {
            width: 150px; height: 150px;
            border: 1px dashed rgba(0, 255, 102, 0.3);
            border-radius: 50%;
            margin: 2rem auto 0;
            position: relative;
            background: radial-gradient(circle, rgba(0, 255, 102, 0.1) 0%, transparent 70%);
        }
        .radar-sweep {
            position: absolute; width: 50%; height: 50%;
            top: 0; left: 50%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 102, 0.5));
            transform-origin: bottom left;
            animation: spinRight 3s linear infinite;
        }

        /* RIGHT PANEL */
        .transmission-console {
            background: rgba(5, 10, 5, 0.85);
            border: 1px solid var(--primary-color);
            border-radius: 5px;
            padding: 2rem;
            position: relative;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
        }
        .console-header {
            font-family: monospace; color: #888; font-size: 0.9rem; margin-bottom: 2rem;
            border-left: 3px solid var(--primary-color); padding-left: 1rem;
        }

        .console-form {
            display: flex; flex-direction: column; gap: 1.5rem;
        }
        .input-group {
            position: relative;
            display: flex; align-items: center;
            background: rgba(0,0,0,0.5);
            padding: 0 1rem;
            border-radius: 4px;
        }
        .input-icon { color: #555; margin-right: 1rem; transition: 0.3s; }
        .input-group.active .input-icon { color: var(--primary-color); }
        
        .input-group input, .input-group textarea {
            width: 100%;
            background: transparent;
            border: none;
            color: white;
            padding: 1rem 0;
            font-family: monospace;
            outline: none;
            font-size: 1rem;
        }
        .input-border {
            position: absolute; bottom: 0; left: 0; width: 0%; height: 2px;
            background: var(--primary-color);
            transition: 0.4s;
        }
        .input-group.active .input-border { width: 100%; }

        .transmit-btn {
            background: var(--primary-color);
            color: black;
            border: none;
            padding: 1rem;
            font-weight: bold;
            font-family: monospace;
            cursor: pointer;
            display: flex; align-items: center; justify-content: center; gap: 1rem;
            transition: 0.3s;
            text-transform: uppercase;
            letter-spacing: 2px;
            clip-path: polygon(0 0, 100% 0, 100% 70%, 95% 100%, 0% 100%);
        }
        .transmit-btn:hover {
            background: #00cc52;
            box-shadow: 0 0 20px rgba(0, 255, 102, 0.4);
            letter-spacing: 4px;
        }
        .transmit-btn:disabled {
            background: #333; color: #666; cursor: not-allowed;
        }

        .console-status {
            padding: 1rem; margin-bottom: 1rem; border-radius: 4px; font-family: monospace;
            display: flex; align-items: center; gap: 1rem; font-size: 0.9rem;
        }
        .console-status.success {
            background: rgba(0, 255, 102, 0.1); border: 1px solid var(--primary-color); color: var(--primary-color);
        }
        .console-status.error {
            background: rgba(255, 0, 85, 0.1); border: 1px solid #ff0055; color: #ff0055;
        }

        @keyframes blink { 50% { opacity: 0; } }
        @keyframes spinRight { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulseOpacity { 0% { opacity: 0.4; } 100% { opacity: 1; } }

        @media(max-width: 900px) {
            .contact-grid { grid-template-columns: 1fr; }
            .coordinates-panel { order: 2; }
            .transmission-console { order: 1; }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
