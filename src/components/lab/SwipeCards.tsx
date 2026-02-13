import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Hand } from "lucide-react";

const cards = [
  { text: "Creative Direction", color: "from-blue-500/20 to-blue-600/5" },
  { text: "Web Development", color: "from-emerald-500/20 to-emerald-600/5" },
  { text: "Brand Strategy", color: "from-purple-500/20 to-purple-600/5" },
  { text: "UI/UX Design", color: "from-amber-500/20 to-amber-600/5" },
  { text: "Motion Design", color: "from-rose-500/20 to-rose-600/5" },
];

export function SwipeCards() {
  const [stack, setStack] = useState(cards);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 80) {
      setStack((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Hand className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Swipe Cards</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-4">Swipe cards left or right to dismiss.</p>
      <div className="flex-1 flex items-center justify-center min-h-[180px] relative">
        {stack.slice(0, 3).map((card, i) => {
          const isTop = i === 0;
          return (
            <SwipeCard
              key={card.text + i}
              card={card}
              isTop={isTop}
              index={i}
              onDragEnd={isTop ? handleDragEnd : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}

function SwipeCard({
  card,
  isTop,
  index,
  onDragEnd,
}: {
  card: { text: string; color: string };
  isTop: boolean;
  index: number;
  onDragEnd?: (_: any, info: PanInfo) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        zIndex: 3 - index,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      animate={{
        scale: 1 - index * 0.05,
        y: index * 8,
      }}
      className={`absolute w-52 h-32 rounded-2xl bg-gradient-to-br ${card.color} border border-border/40 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none`}
    >
      <span className="text-sm font-semibold text-foreground">{card.text}</span>
    </motion.div>
  );
}
