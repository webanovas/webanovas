import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 1800);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Subtle radial glow */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <div className="relative flex flex-col items-center gap-6">
            {/* Logo text */}
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-display font-bold tracking-tight"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Web
                <span className="text-gradient italic">Anovas</span>
              </motion.h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-xs uppercase tracking-[0.4em] text-muted-foreground font-body"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            >
              Digital Excellence
            </motion.p>

            {/* Loading line */}
            <motion.div
              className="w-24 h-px bg-primary/30 mt-2 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.9, duration: 0.8, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
