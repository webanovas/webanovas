import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });

  return (
    <motion.div
      dir="ltr"
      className="fixed top-0 left-0 right-0 h-[3px] bg-primary origin-left z-[60] shadow-[0_0_12px_hsl(var(--primary)/0.6)]"
      style={{ scaleX }}
    />
  );
}
