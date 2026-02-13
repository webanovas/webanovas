import { useState } from "react";
import { Sparkles } from "lucide-react";

const words = ["WebAnovas", "Creative", "Digital", "Precision", "Innovation"];
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

export function TextScramble() {
  const [current, setCurrent] = useState(0);
  const [display, setDisplay] = useState(words[0]);
  const [isScrambling, setIsScrambling] = useState(false);

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
    <div className="glass-card p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Text Scramble</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-6">Click to cycle through words with a hacker-style transition.</p>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <span className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-primary">{display}</span>
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
