import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MousePointerClick } from "lucide-react";

export function MagneticButton() {
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
    <div className="glass-card p-6 md:p-8 h-full flex flex-col">
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
