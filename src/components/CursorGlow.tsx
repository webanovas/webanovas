import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export function CursorGlow() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);

    const target = e.target as HTMLElement;
    const card = target.closest(".glass-card");
    setIsHoveringCard(!!card);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div
      dir="ltr"
      className="pointer-events-none fixed z-40 rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: isHoveringCard ? 300 : 200,
        height: isHoveringCard ? 300 : 200,
        background: `radial-gradient(circle, hsl(217 91% 60% / ${isHoveringCard ? 0.12 : 0.06}) 0%, transparent 70%)`,
        transition: "width 0.4s, height 0.4s, background 0.4s",
      }}
    />
  );
}
