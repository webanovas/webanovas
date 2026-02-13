import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import { useState, useRef, useEffect } from "react";
import { Palette, MousePointerClick, Sparkles, RotateCcw, Zap, Eye } from "lucide-react";

const themes = [
  { name: "Midnight", bg: "222 47% 6%", primary: "217 91% 60%", accent: "217 33% 14%" },
  { name: "Ember", bg: "0 20% 6%", primary: "15 90% 55%", accent: "15 30% 14%" },
  { name: "Forest", bg: "150 30% 5%", primary: "155 70% 45%", accent: "150 25% 12%" },
  { name: "Ultraviolet", bg: "270 40% 6%", primary: "270 80% 65%", accent: "270 30% 14%" },
  { name: "Sunset", bg: "30 30% 6%", primary: "35 95% 55%", accent: "30 25% 14%" },
];

function ThemeSwitcher() {
  const [active, setActive] = useState(0);

  const applyTheme = (index: number) => {
    setActive(index);
    const t = themes[index];
    const root = document.documentElement;
    root.style.setProperty("--background", t.bg);
    root.style.setProperty("--primary", t.primary);
    root.style.setProperty("--accent", t.primary);
    root.style.setProperty("--secondary", t.accent);
    root.style.setProperty("--muted", t.accent);
    root.style.setProperty("--ring", t.primary);
  };

  const reset = () => {
    const root = document.documentElement;
    root.style.removeProperty("--background");
    root.style.removeProperty("--primary");
    root.style.removeProperty("--accent");
    root.style.removeProperty("--secondary");
    root.style.removeProperty("--muted");
    root.style.removeProperty("--ring");
    setActive(0);
  };

  return (
    <div className="glass-card p-8 h-full">
      <div className="flex items-center gap-3 mb-4">
        <Palette className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Theme Switcher</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-6">Change the entire site's color scheme live.</p>
      <div className="flex flex-wrap gap-3 mb-4">
        {themes.map((t, i) => (
          <button
            key={t.name}
            onClick={() => applyTheme(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              active === i
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/40"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
      <button onClick={reset} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <RotateCcw className="w-3 h-3" /> Reset to default
      </button>
    </div>
  );
}

function MagneticButton() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handlePointer = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    x.set(cx * 0.3);
    y.set(cy * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="glass-card p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <MousePointerClick className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Magnetic Button</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-6">Hover or drag your finger over the button — it follows you.</p>
      <div
        className="flex-1 flex items-center justify-center min-h-[120px]"
        ref={ref}
        onPointerMove={handlePointer}
        onPointerLeave={handleLeave}
      >
        <motion.button
          style={{ x: springX, y: springY }}
          className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25"
          whileTap={{ scale: 0.95 }}
        >
          Try me
        </motion.button>
      </div>
    </div>
  );
}

function TextScramble() {
  const words = ["WebAnovas", "Creative", "Digital", "Precision", "Innovation"];
  const [current, setCurrent] = useState(0);
  const [display, setDisplay] = useState(words[0]);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    const next = (current + 1) % words.length;
    const target = words[next];
    let iteration = 0;
    const maxLen = Math.max(display.length, target.length);

    const interval = setInterval(() => {
      setDisplay(
        target
          .padEnd(maxLen)
          .split("")
          .map((char, i) => {
            if (i < iteration) return target[i] || "";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
          .trim()
      );
      iteration += 1 / 2;
      if (iteration >= maxLen) {
        clearInterval(interval);
        setDisplay(target);
        setCurrent(next);
        setIsScrambling(false);
      }
    }, 40);
  };

  return (
    <div className="glass-card p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Text Scramble</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-6">Click to cycle through words with a hacker-style transition.</p>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <span className="text-4xl font-bold font-mono tracking-tight text-primary">{display}</span>
        <button
          onClick={scramble}
          className="px-5 py-2 rounded-full bg-secondary text-sm text-foreground hover:bg-secondary/80 transition-colors"
        >
          Scramble
        </button>
      </div>
    </div>
  );
}

function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handlePointer = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -20);
    rotateY.set(x * 20);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="glass-card p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Eye className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">3D Tilt Card</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-6">Move your finger or mouse over the card for a 3D effect.</p>
      <div className="flex-1 flex items-center justify-center min-h-[120px]" style={{ perspective: 600 }}>
        <motion.div
          ref={ref}
          onPointerMove={handlePointer}
          onPointerLeave={handleLeave}
          style={{ rotateX: springRX, rotateY: springRY }}
          className="w-48 h-32 rounded-xl bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/20 flex items-center justify-center shadow-xl shadow-primary/10 cursor-pointer touch-none"
        >
          <span className="text-sm font-semibold text-primary">Tilt me</span>
        </motion.div>
      </div>
    </div>
  );
}

function ParticleTrail() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const handlePointer = (e: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    idRef.current += 1;
    setParticles((prev) => [...prev.slice(-30), { id: idRef.current, x, y }]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-card p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Particle Trail</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-6">Drag your finger or mouse to leave a glowing trail.</p>
      <div
        ref={containerRef}
        onPointerMove={handlePointer}
        className="flex-1 min-h-[160px] rounded-xl bg-secondary/30 border border-border/50 relative overflow-hidden cursor-crosshair touch-none"
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.8 }}
            className="absolute w-3 h-3 rounded-full bg-primary/60 blur-sm pointer-events-none"
            style={{ left: p.x - 6, top: p.y - 6 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Lab() {
  return (
    <main className="min-h-screen px-6 pb-28">
      <div className="max-w-5xl mx-auto pt-32">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-6 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
            Playground
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">The Lab.</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive experiments showcasing what we can build. Go ahead — play around.
          </p>
        </motion.div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <StaggerItem className="md:col-span-2">
            <ThemeSwitcher />
          </StaggerItem>
          <StaggerItem>
            <MagneticButton />
          </StaggerItem>
          <StaggerItem>
            <TextScramble />
          </StaggerItem>
          <StaggerItem>
            <TiltCard />
          </StaggerItem>
          <StaggerItem>
            <ParticleTrail />
          </StaggerItem>
        </StaggerChildren>
      </div>
      <div className="max-w-5xl mx-auto mt-24">
        <Footer />
      </div>
    </main>
  );
}
