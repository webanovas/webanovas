import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Vibrate } from "lucide-react";

const emojis = ["🎉", "🚀", "⚡", "🔥", "✨", "💎", "🎯", "🌟"];

export function ShakeDetector() {
  const [shakeCount, setShakeCount] = useState(0);
  const [bursts, setBursts] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  const lastAccel = useRef({ x: 0, y: 0, z: 0 });
  const lastShake = useRef(0);
  const idRef = useRef(0);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!("DeviceMotionEvent" in window)) {
      setSupported(false);
      return;
    }

    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

      const deltaX = Math.abs(acc.x - lastAccel.current.x);
      const deltaY = Math.abs(acc.y - lastAccel.current.y);
      const deltaZ = Math.abs(acc.z - lastAccel.current.z);

      lastAccel.current = { x: acc.x, y: acc.y, z: acc.z };

      if (deltaX + deltaY + deltaZ > 25) {
        const now = Date.now();
        if (now - lastShake.current > 400) {
          lastShake.current = now;
          setShakeCount((c) => c + 1);
          // Burst emojis
          const newBursts = Array.from({ length: 4 }, () => {
            idRef.current += 1;
            return {
              id: idRef.current,
              emoji: emojis[Math.floor(Math.random() * emojis.length)],
              x: Math.random() * 80 + 10,
              y: Math.random() * 60 + 20,
            };
          });
          setBursts((prev) => [...prev, ...newBursts]);
          setTimeout(() => {
            setBursts((prev) => prev.filter((b) => !newBursts.some((nb) => nb.id === b.id)));
          }, 1000);

          // Haptic feedback
          if (navigator.vibrate) navigator.vibrate(50);
        }
      }
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, []);

  const simulateShake = () => {
    setShakeCount((c) => c + 1);
    const newBursts = Array.from({ length: 4 }, () => {
      idRef.current += 1;
      return {
        id: idRef.current,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
      };
    });
    setBursts((prev) => [...prev, ...newBursts]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !newBursts.some((nb) => nb.id === b.id)));
    }, 1000);
    if (navigator.vibrate) navigator.vibrate(50);
  };

  return (
    <div className="glass-card p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Vibrate className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Shake Detector</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        {supported
          ? "Shake your phone to release emoji bursts!"
          : "Tap the button to simulate a shake."}
      </p>
      <div className="flex-1 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden">
        <AnimatePresence>
          {bursts.map((b) => (
            <motion.span
              key={b.id}
              initial={{ opacity: 1, scale: 0.5, y: 0 }}
              animate={{ opacity: 0, scale: 1.5, y: -60 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute text-2xl pointer-events-none"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
            >
              {b.emoji}
            </motion.span>
          ))}
        </AnimatePresence>

        <motion.div
          animate={shakeCount > 0 ? { rotate: [0, -5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
          key={shakeCount}
        >
          <Smartphone className="w-12 h-12 text-primary mb-3" />
        </motion.div>
        <span className="text-3xl font-bold text-primary mb-1">{shakeCount}</span>
        <span className="text-xs text-muted-foreground">shakes detected</span>

        <button
          onClick={simulateShake}
          className="mt-4 px-5 py-2 rounded-full bg-secondary text-sm text-foreground hover:bg-secondary/80 transition-colors"
        >
          Simulate Shake
        </button>
      </div>
    </div>
  );
}
