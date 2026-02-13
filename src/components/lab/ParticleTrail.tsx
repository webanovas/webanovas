import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function ParticleTrail() {
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
    <div className="glass-card p-6 md:p-8 h-full flex flex-col">
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
