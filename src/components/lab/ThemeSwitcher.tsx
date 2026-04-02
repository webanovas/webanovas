import { useState, useEffect } from "react";
import { Palette, RotateCcw } from "lucide-react";

const themes = [
  { name: "Electric Blue", bg: "220 20% 4%", primary: "217 91% 60%", accent: "220 15% 11%", gradient: "210 80% 75%" },
  { name: "Cyan", bg: "200 20% 4%", primary: "187 85% 53%", accent: "200 20% 11%", gradient: "180 70% 70%" },
  { name: "Indigo", bg: "235 25% 5%", primary: "239 84% 67%", accent: "235 20% 12%", gradient: "250 75% 78%" },
  { name: "Emerald", bg: "160 20% 4%", primary: "160 84% 39%", accent: "160 20% 11%", gradient: "155 60% 55%" },
  { name: "Violet", bg: "270 25% 5%", primary: "270 76% 65%", accent: "270 20% 12%", gradient: "280 65% 78%" },
  { name: "Rose", bg: "340 20% 5%", primary: "346 77% 60%", accent: "340 15% 12%", gradient: "350 70% 75%" },
];

const STORAGE_KEY = "siterix-theme";

function applyThemeValues(t: typeof themes[0]) {
  const root = document.documentElement;
  root.style.setProperty("--background", t.bg);
  root.style.setProperty("--card", t.bg.replace(/\d+%$/, (m) => parseInt(m) + 3 + "%"));
  root.style.setProperty("--primary", t.primary);
  root.style.setProperty("--accent", t.primary);
  root.style.setProperty("--secondary", t.accent);
  root.style.setProperty("--muted", t.accent);
  root.style.setProperty("--ring", t.primary);
  root.style.setProperty("--border", t.accent);
  root.style.setProperty("--input", t.accent);
  root.style.setProperty("--sidebar-primary", t.primary);
  root.style.setProperty("--sidebar-ring", t.primary);
}

export function ThemeSwitcher() {
  const [active, setActive] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const idx = parseInt(saved, 10);
      if (idx >= 0 && idx < themes.length) {
        applyThemeValues(themes[idx]);
      }
    }
  }, []);

  const applyTheme = (index: number) => {
    setActive(index);
    localStorage.setItem(STORAGE_KEY, String(index));
    applyThemeValues(themes[index]);
  };

  const reset = () => {
    const props = ["--background", "--card", "--primary", "--accent", "--secondary", "--muted", "--ring", "--border", "--input", "--sidebar-primary", "--sidebar-ring"];
    const root = document.documentElement;
    props.forEach((p) => root.style.removeProperty(p));
    localStorage.removeItem(STORAGE_KEY);
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
