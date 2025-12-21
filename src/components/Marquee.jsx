import { motion } from "framer-motion";
import { useResponsive } from "../hooks/useResponsive";

const Marquee = ({ items, speed = 50 }) => {
  const { prefersReducedMotion } = useResponsive();

  if (prefersReducedMotion) {
    return (
      <div className="marquee-static">
        {items.map((item, index) => (
          <span key={index} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="marquee-container">
      <motion.div
        className="marquee-track"
        animate={{
          x: [0, -100 * items.length + "%"]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear"
          }
        }}
      >
        {[...items, ...items].map((item, index) => (
          <span key={index} className="marquee-item">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;

