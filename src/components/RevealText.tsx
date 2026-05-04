import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "p" | "h2" | "h3";
}

/**
 * Mask-style reveal — content slides up from behind a hidden line.
 */
export function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <Tag
        className="inline-block"
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </Tag>
    </span>
  );
}
