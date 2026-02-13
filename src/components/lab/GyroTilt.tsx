import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Compass } from "lucide-react";

export function GyroTilt() {
  const [supported, setSupported] = useState(true);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 25 });
  const [beta, setBeta] = useState(0);
  const [gamma, setGamma] = useState(0);

  useEffect(() => {
    if (!("DeviceOrientationEvent" in window)) {
      setSupported(false);
      return;
    }

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) {
        setSupported(false);
        return;
      }
      const b = Math.max(-45, Math.min(45, e.beta));
      const g = Math.max(-45, Math.min(45, e.gamma));
      setBeta(Math.round(b));
      setGamma(Math.round(g));
      rotateX.set(b * -0.4);
      rotateY.set(g * 0.4);
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [rotateX, rotateY]);

  return (
    <div className="glass-card p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Compass className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Gyro Tilt</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        {supported ? "Tilt your phone to move the orb in 3D." : "Gyroscope not available on this device."}
      </p>
      <div className="flex-1 flex flex-col items-center justify-center min-h-[140px]" style={{ perspective: 500 }}>
        <motion.div
          style={{ rotateX: springRX, rotateY: springRY }}
          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/40 to-primary/10 border border-primary/25 flex items-center justify-center shadow-2xl shadow-primary/20"
        >
          <div className="w-10 h-10 rounded-full bg-primary/60 blur-[2px]" />
        </motion.div>
        {supported && (
          <div className="mt-4 flex gap-4 text-xs text-muted-foreground font-mono">
            <span>β: {beta}°</span>
            <span>γ: {gamma}°</span>
          </div>
        )}
      </div>
    </div>
  );
}
