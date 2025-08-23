import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type RevealProps = {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "zoom";
  delay?: number;
};

const Reveal: React.FC<RevealProps> = ({ children, direction = "up", delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // animate again when scrolled back
    threshold: 0.2, // 20% of element visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  // Different animations depending on direction
  const variants = {
    hidden:
      direction === "up"
        ? { opacity: 0, y: 40 }
        : direction === "down"
        ? { opacity: 0, y: -40 }
        : direction === "left"
        ? { opacity: 0, x: 40 }
        : direction === "right"
        ? { opacity: 0, x: -40 }
        : direction === "zoom"
        ? { opacity: 0, scale: 0.8 }
        : { opacity: 0 },

    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay },
    },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
};

export default Reveal;
