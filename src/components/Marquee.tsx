import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Infinite kinetic marquee. Duplicates content for seamless loop.
 */
export function Marquee({ children, duration = 30, reverse = false, className = "" }: MarqueeProps) {
  return (
    <div dir="ltr" className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <div className="inline-flex shrink-0">{children}</div>
        <div className="inline-flex shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
