import { useState } from "react";
import { Palette, RotateCcw } from "lucide-react";

const themes = [
  { name: "Midnight", bg: "222 47% 6%", primary: "217 91% 60%", accent: "217 33% 14%" },
  { name: "Ember", bg: "0 20% 6%", primary: "15 90% 55%", accent: "15 30% 14%" },
  { name: "Forest", bg: "150 30% 5%", primary: "155 70% 45%", accent: "150 25% 12%" },
  { name: "Ultraviolet", bg: "270 40% 6%", primary: "270 80% 65%", accent: "270 30% 14%" },
  { name: "Sunset", bg: "30 30% 6%", primary: "35 95% 55%", accent: "30 25% 14%" },
];

export function ThemeSwitcher() {
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
    <div className="glass-card p-6 md:p-8 h-full">
      <div className="flex items-center gap-3 mb-4">
        <Palette className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Theme Switcher</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-6">Change the entire site's color scheme live.</p>
      <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
        {themes.map((t, i) => (
          <button
            key={t.name}
            onClick={() => applyTheme(i)}
            className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 border ${
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
