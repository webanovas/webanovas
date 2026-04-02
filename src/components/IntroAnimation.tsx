import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");
  const { t } = useLanguage();

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

  const letterVariants = {
    hidden: { y: 80, opacity: 0, rotateX: 90 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: 0.15 + i * 0.04,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  const siterixLetters = "Siterix".split("");
  const studiosLetters = "Studio".split("");

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Animated grid lines background */}
          <div className="absolute inset-0 opacity-[0.03]">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px bg-primary"
                style={{ top: `${(i + 1) * 12.5}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 1.2, ease: "easeOut" }}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-px bg-primary"
                style={{ left: `${(i + 1) * 12.5}%` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 1.2, ease: "easeOut" }}
              />
            ))}
          </div>

          {/* Primary glow */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 60%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 1.8], opacity: [0, 0.8, 1] }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Secondary accent glow */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
            }}
            initial={{ scale: 0, x: 100, y: -80 }}
            animate={{ scale: 1.5, x: 120, y: -100 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          />

          {/* Orbiting particle */}
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "0 120px" }}
          />

          <div className="relative flex flex-col items-center gap-5">
            {/* Letter-by-letter title */}
            <div className="overflow-hidden perspective-[800px]">
              <div className="flex items-baseline justify-center">
                {siterixLetters.map((letter, i) => (
                  <motion.span
                    key={`s-${i}`}
                    className="text-4xl md:text-7xl font-display font-bold tracking-tight inline-block"
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {letter}
                  </motion.span>
                ))}
                <motion.span
                  className="w-3 md:w-5 inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {" "}
                </motion.span>
                {studiosLetters.map((letter, i) => (
                  <motion.span
                    key={`t-${i}`}
                    className="text-4xl md:text-7xl font-display font-bold tracking-tight text-gradient italic inline-block"
                    custom={i + siterixLetters.length + 1}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Decorative line with dot */}
            <motion.div
              className="flex items-center gap-3 mt-2"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
              />
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-primary"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ delay: 0.9, duration: 0.4 }}
              />
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
              />
            </motion.div>

            {/* Tagline with typewriter feel */}
            <motion.p
              className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-muted-foreground font-body"
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
            >
              {t("intro.tagline")}
            </motion.p>

            {/* Animated progress bar */}
            <motion.div
              className="w-32 h-[2px] bg-border/30 mt-3 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.5))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </motion.div>
          </div>

          {/* Corner accents */}
          {[
            "top-6 left-6",
            "top-6 right-6 rotate-90",
            "bottom-6 left-6 -rotate-90",
            "bottom-6 right-6 rotate-180",
          ].map((pos, i) => (
            <motion.div
              key={pos}
              className={`absolute ${pos}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
            >
              <div className="w-6 h-px bg-primary" />
              <div className="w-px h-6 bg-primary" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
