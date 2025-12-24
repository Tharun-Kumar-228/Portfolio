import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane, FaSatelliteDish, FaCheckCircle, FaExclamationTriangle, FaWifi } from "react-icons/fa";
import { contactData } from "../Contents/Contact";

const ContactSectionMobile = () => {
    const contact = contactData[0];
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: "", message: "" });

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

        try {
            await emailjs.send(serviceId, templateId, {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: contact.email
            }, publicKey);

            setStatus({ type: "success", message: "TRANSMISSION_COMPLETE" });
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setStatus({ type: "error", message: "SIGNAL_LOST_RETRY" });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus({ type: "", message: "" }), 5000);
        }
    };

    return (
        <section id="contact" className="mobile-contact-section">

            {/* HEADER */}
            <div className="comms-header">
                <div className="header-icon-box">
                    <FaSatelliteDish className="dish-icon" />
                </div>
                <h2 className="header-title">SECURE_UPLINK</h2>
                <div className="signal-status">
                    <FaWifi /> SIGNAL_STRENGTH: 100%
                </div>
            </div>

            {/* TRANSMITTER FORM */}
            <div className="transmitter-console">
                <form onSubmit={handleSubmit} className="t-form">

                    {/* NAME INPUT */}
                    <div className="input-module">
                        <label className="mod-label">TRANSMITTER_ID</label>
                        <div className="input-wrapper">
                            <FaUser className="i-icon" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="ENTER CODENAME"
                                required
                            />
                            <div className="scan-bar"></div>
                        </div>
                    </div>

                    {/* EMAIL INPUT */}
                    <div className="input-module">
                        <label className="mod-label">RETURN_FREQUENCY</label>
                        <div className="input-wrapper">
                            <FaEnvelope className="i-icon" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ENTER EMAIL FREQ"
                                required
                            />
                            <div className="scan-bar"></div>
                        </div>
                    </div>

                    {/* MESSAGE INPUT */}
                    <div className="input-module">
                        <label className="mod-label">PAYLOAD_DATA</label>
                        <div className="input-wrapper large">
                            <FaCommentDots className="i-icon top" />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="ENCRYPTED MESSAGE..."
                                rows="4"
                                required
                            />
                            <div className="scan-bar"></div>
                        </div>
                    </div>

                    {/* STATUS MESSAGE */}
                    <AnimatePresence>
                        {status.message && (
                            <motion.div
                                className={`status-readout ${status.type}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                {status.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
                                {status.message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* SEND BUTTON */}
                    <button type="submit" className="initiate-btn" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <span className="blinking">UPLOADING...</span>
                        ) : (
                            <>INITIATE_TRANSMISSION <FaPaperPlane /></>
                        )}
                        <div className="btn-glitch"></div>
                    </button>

                </form>

                <div className="console-deco d-tl"></div>
                <div className="console-deco d-br"></div>
            </div>

            <style>{`
                .mobile-contact-section {
                    padding: 4rem 1rem 6rem;
                    background: #050505;
                    font-family: 'Rajdhani', sans-serif;
                }

                .comms-header { text-align: center; margin-bottom: 2rem; }
                .header-icon-box { 
                    font-size: 2.5rem; color: var(--primary-color); margin-bottom: 10px;
                    filter: drop-shadow(0 0 10px var(--primary-color));
                }
                .dish-icon { animation: rock 3s ease-in-out infinite; }
                .header-title { font-size: 1.8rem; color: white; margin: 0; letter-spacing: 2px; }
                .signal-status { 
                    margin-top: 5px; color: #00ff66; font-size: 0.75rem; 
                    font-family: monospace; display: flex; align-items: center; justify-content: center; gap: 5px;
                }

                /* CONSOLE */
                .transmitter-console {
                    background: rgba(10, 20, 15, 0.5);
                    border: 1px solid rgba(0, 189, 94, 0.3);
                    border-radius: 10px;
                    padding: 2rem 1.5rem;
                    position: relative;
                }

                .t-form { display: flex; flex-direction: column; gap: 1.5rem; }

                .input-module { display: flex; flex-direction: column; gap: 5px; }
                .mod-label { font-family: monospace; color: #555; font-size: 0.7rem; letter-spacing: 1px; margin-left: 5px; }
                
                .input-wrapper {
                    position: relative; display: flex; align-items: center;
                    background: rgba(0,0,0,0.4); border-bottom: 1px solid #333;
                    border-radius: 4px; overflow: hidden; transition: 0.3s;
                }
                .input-wrapper:focus-within { border-bottom-color: var(--primary-color); background: rgba(0, 189, 94, 0.05); }
                
                .i-icon { color: #555; margin-left: 10px; font-size: 1rem; }
                .i-icon.top { align-self: flex-start; margin-top: 15px; }
                
                .input-wrapper input, .input-wrapper textarea {
                    width: 100%; border: none; background: transparent;
                    color: white; font-family: monospace; padding: 12px;
                    outline: none; font-size: 0.9rem;
                }
                
                .scan-bar {
                    position: absolute; bottom: 0; left: 0; height: 1px; width: 0%;
                    background: var(--primary-color); box-shadow: 0 0 5px var(--primary-color);
                    transition: 0.4s;
                }
                .input-wrapper:focus-within .scan-bar { width: 100%; }

                /* BUTTON */
                .initiate-btn {
                    position: relative; width: 100%; padding: 15px;
                    background: var(--primary-color); color: #000;
                    border: none; font-weight: bold; font-family: monospace;
                    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
                    font-size: 0.9rem; letter-spacing: 1px;
                    margin-top: 10px; overflow: hidden;
                    clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
                }
                .initiate-btn:disabled { background: #333; color: #666; }
                .blinking { animation: blink 0.5s infinite; }

                /* STATUS */
                .status-readout {
                    font-family: monospace; font-size: 0.8rem; padding: 10px;
                    display: flex; align-items: center; gap: 8px; justify-content: center;
                    border-radius: 4px;
                }
                .status-readout.success { color: #00ff66; background: rgba(0,255,102,0.1); border: 1px solid #00ff66; }
                .status-readout.error { color: #ff3355; background: rgba(255,51,85,0.1); border: 1px solid #ff3355; }

                /* DECO */
                .console-deco { position: absolute; width: 20px; height: 20px; border: 2px solid var(--primary-color); opacity: 0.5; }
                .d-tl { top: -2px; left: -2px; border-right: 0; border-bottom: 0; }
                .d-br { bottom: -2px; right: -2px; border-left: 0; border-top: 0; }

                @keyframes rock { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
                @keyframes blink { 50% { opacity: 0; } }
            `}</style>
        </section>
    );
};

export default ContactSectionMobile;
