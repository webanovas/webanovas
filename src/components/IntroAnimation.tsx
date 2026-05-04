import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import siterixIcon from "@/assets/siterix-s-icon.png";

/**
 * Playful intro:
 *  - Soft cream backdrop
 *  - Three colored blobs zoom in from off-screen and collide in the center
 *  - They merge into a single blob that pops the logo out
 *  - Whole thing fades up into the page
 */
export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"play" | "done">("play");

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2600);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream overflow-hidden"
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: [0.6, 0.05, 0.2, 1] }}
        >
          {/* Soft confetti dots */}
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i / 14) * Math.PI * 2;
            const r = 220 + (i % 3) * 40;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            const colors = ["bg-peach", "bg-mint", "bg-lavender", "bg-butter"];
            return (
              <motion.div
                key={i}
                className={`absolute w-3 h-3 rounded-full ${colors[i % colors.length]}`}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: [0, x * 0.6, x],
                  y: [0, y * 0.6, y],
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0.4],
                }}
                transition={{
                  delay: 1.4 + i * 0.02,
                  duration: 1.2,
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Three blobs colliding */}
          <motion.div
            className="absolute w-56 h-56 md:w-72 md:h-72 bg-peach blob"
            initial={{ x: "-60vw", y: "-30vh", scale: 0.6, rotate: -20 }}
            animate={{
              x: [-window.innerWidth * 0.4, -40, 0],
              y: [-window.innerHeight * 0.2, 20, 0],
              scale: [0.6, 1, 0.001],
              rotate: [-20, 10, 0],
            }}
            transition={{ duration: 1.4, times: [0, 0.7, 1], ease: [0.6, 0.05, 0.2, 1] }}
          />
          <motion.div
            className="absolute w-56 h-56 md:w-72 md:h-72 bg-mint blob-2"
            initial={{ x: "60vw", y: "30vh", scale: 0.6, rotate: 20 }}
            animate={{
              x: [window.innerWidth * 0.4, 40, 0],
              y: [window.innerHeight * 0.2, -20, 0],
              scale: [0.6, 1, 0.001],
              rotate: [20, -10, 0],
            }}
            transition={{ duration: 1.4, times: [0, 0.7, 1], ease: [0.6, 0.05, 0.2, 1] }}
          />
          <motion.div
            className="absolute w-56 h-56 md:w-72 md:h-72 bg-lavender blob"
            initial={{ x: 0, y: "70vh", scale: 0.6, rotate: 0 }}
            animate={{
              x: [0, 0, 0],
              y: [window.innerHeight * 0.5, -30, 0],
              scale: [0.6, 1, 0.001],
              rotate: [0, 20, 0],
            }}
            transition={{ duration: 1.4, times: [0, 0.7, 1], ease: [0.6, 0.05, 0.2, 1] }}
          />

          {/* The merged blob that births the logo */}
          <motion.div
            className="absolute w-72 h-72 md:w-96 md:h-96 bg-peach blob"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.1, 1, 1.05, 0],
              opacity: [0, 1, 1, 1, 0],
              rotate: [0, 0, 8, -4, 0],
            }}
            transition={{
              delay: 1.2,
              duration: 1.4,
              times: [0, 0.15, 0.5, 0.8, 1],
              ease: "easeInOut",
            }}
          />

          {/* Logo pop */}
          <motion.img
            src={siterixIcon}
            alt="Siterix Studios"
            className="relative z-10 w-32 h-32 md:w-44 md:h-44 object-contain drop-shadow-[0_10px_30px_hsl(14_85%_55%/0.35)]"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{
              scale: [0, 1.25, 1, 1.08, 1],
              rotate: [-180, 0, 0, 0, 0],
              opacity: [0, 1, 1, 1, 1],
            }}
            transition={{
              delay: 1.35,
              duration: 1.1,
              times: [0, 0.4, 0.7, 0.85, 1],
              ease: [0.34, 1.56, 0.64, 1],
            }}
          />

          {/* Tagline */}
          <motion.p
            className="absolute bottom-[18%] text-xs md:text-sm uppercase tracking-[0.5em] text-foreground/60 font-body"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.4 }}
          >
            crafted with care
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
