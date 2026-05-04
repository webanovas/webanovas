import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Geometric intro inspired by mishelcodearch architecture aesthetic.
 * A square block reveals with two corner triangles (terracotta + olive)
 * and a central wordmark "SITERIX / STUDIO" splits into two halves.
 */
export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 2300);
    return () => clearTimeout(t);
  }, [onComplete]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          dir="ltr"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <motion.div
            className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] overflow-hidden"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {/* Navy base block */}
            <motion.div
              className="absolute inset-0 bg-foreground"
              initial={{ clipPath: "inset(50% 0 50% 0)" }}
              animate={{ clipPath: "inset(0% 0 0% 0)" }}
              transition={{ duration: 0.7, ease }}
            />

            {/* Top-right terracotta triangle */}
            <motion.div
              className="absolute top-0 right-0 w-[42%] h-[42%] bg-terracotta"
              style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
              initial={{ x: "50%", y: "-50%", opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease }}
            />

            {/* Bottom-left olive triangle */}
            <motion.div
              className="absolute bottom-0 left-0 w-[35%] h-[35%] bg-olive"
              style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }}
              initial={{ x: "-50%", y: "50%", opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease }}
            />

            {/* Center divider line */}
            <motion.div
              className="absolute left-0 right-0 top-1/2 h-px bg-background/50 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.5, ease }}
            />

            {/* Top word */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex flex-col items-center gap-1">
                <motion.span
                  className="text-primary text-xs md:text-sm font-body font-semibold tracking-[0.4em]"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: -14 }}
                  transition={{ delay: 1.0, duration: 0.5, ease }}
                >
                  SITERIX
                </motion.span>
                <motion.span
                  className="text-primary text-xs md:text-sm font-body font-semibold tracking-[0.4em]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 14 }}
                  transition={{ delay: 1.1, duration: 0.5, ease }}
                >
                  STUDIO
                </motion.span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
