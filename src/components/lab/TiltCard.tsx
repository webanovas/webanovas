import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Eye } from "lucide-react";

export function TiltCard() {
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
    <div className="glass-card p-6 md:p-8 h-full flex flex-col">
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
