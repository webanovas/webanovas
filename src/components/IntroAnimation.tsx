import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import siterixIcon from "@/assets/siterix-s-icon.png";

/**
 * Bold & Kinetic intro:
 * 0.0–0.5s : black wipes split open
 * 0.5–1.4s : massive marquee word slams across screen, logo punches in
 * 1.4–2.2s : "S I T E R I X" letters drop in one by one (kinetic)
 * 2.2–2.6s : everything scales up & fades out into the site
 */
export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      // give exit animation time
      setTimeout(onComplete, 500);
    }, 2400);
    return () => clearTimeout(t);
  }, [onComplete]);

  const letters = ["S", "I", "T", "E", "R", "I", "X"];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          dir="ltr"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Top wipe */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-foreground origin-top z-30"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
          />
          {/* Bottom wipe */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-foreground origin-bottom z-30"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
          />

          {/* Massive sliding background word */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ x: "-110%" }}
            animate={{ x: "110%" }}
            transition={{ delay: 0.5, duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
          >
            <span className="text-[18vw] font-display font-black tracking-tighter text-primary/10 whitespace-nowrap leading-none italic">
              STUDIO · STUDIO · STUDIO
            </span>
          </motion.div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo punch in */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                delay: 0.55,
                duration: 0.7,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <img
                src={siterixIcon}
                alt="Siterix Studios"
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_50px_hsl(var(--primary)/0.6)]"
              />
            </motion.div>

            {/* Kinetic letters */}
            <div className="flex items-baseline gap-1 md:gap-2 overflow-hidden py-2">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-3xl md:text-5xl font-display font-black tracking-tight"
                  initial={{ y: 80, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    delay: 1.2 + i * 0.06,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Bottom bar slash */}
            <motion.div
              className="h-[3px] bg-primary"
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ delay: 1.7, duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>

          {/* Corner ticks */}
          {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
            <motion.div
              key={pos}
              className={`absolute ${pos} text-[10px] uppercase tracking-[0.4em] text-primary font-body z-10`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.05, duration: 0.4 }}
            >
              {["//01", "//02", "//03", "//04"][i]}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
