import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import siterixIcon from "@/assets/siterix-s-icon.png";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");
  const { t } = useLanguage();

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 1800);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);


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

          {/* Orbiting particle + burst (in front of logo) */}
          <div className="absolute z-20 pointer-events-none">
            <motion.div
              className="relative"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              style={{ width: 0, height: 0 }}
            >
              <motion.div
                className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_20px_6px_hsl(var(--primary)/0.7)]"
                style={{ top: -140, left: -5 }}
                animate={{ scale: [1, 1, 1.6, 0] }}
                transition={{ duration: 2.0, times: [0, 0.8, 0.9, 1], ease: "easeOut" }}
              />
            </motion.div>

            {/* Burst rings + sparkles after orbit completes (~2.2s) */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 left-0 top-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              {/* Expanding ring */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary"
                style={{ top: -140, left: 0, width: 20, height: 20 }}
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: [0, 6], opacity: [0.9, 0] }}
                transition={{ delay: 1.6, duration: 0.7, ease: "easeOut" }}
              />
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70"
                style={{ top: -140, left: 0, width: 20, height: 20 }}
                initial={{ scale: 0, opacity: 0.7 }}
                animate={{ scale: [0, 9], opacity: [0.7, 0] }}
                transition={{ delay: 1.7, duration: 0.8, ease: "easeOut" }}
              />

              {/* Sparkles flying outward */}
              {Array.from({ length: 10 }).map((_, i) => {
                const angle = (i / 10) * Math.PI * 2;
                const dist = 60;
                const x = Math.cos(angle) * dist;
                const y = Math.sin(angle) * dist;
                return (
                  <motion.div
                    key={`spark-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_2px_hsl(var(--primary)/0.8)]"
                    style={{ top: -140, left: 0 }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{ x, y, opacity: [0, 1, 0], scale: [0, 1, 0.2] }}
                    transition={{ delay: 1.6, duration: 0.9, ease: "easeOut" }}
                  />
                );
              })}
            </motion.div>
          </div>

          <div className="relative flex flex-col items-center gap-5">
            {/* Logo (contains the brand name) */}
            <motion.img
              src={siterixIcon}
              alt="Siterix Studios"
              className="w-44 h-44 md:w-60 md:h-60 object-contain drop-shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.15, 1], opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />

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
