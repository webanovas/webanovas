import { useLanguage } from "@/i18n/LanguageContext";
import { Lang } from "@/i18n/translations";
import { Globe } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const languages: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "he", label: "עב", flag: "🇮🇱" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-5 right-5 z-[60]">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-xl border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-lg"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-12 right-0 bg-card/95 backdrop-blur-xl border border-border/40 rounded-xl overflow-hidden shadow-2xl shadow-black/40"
          >
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 w-full text-left text-sm font-body transition-colors ${
                  lang === l.code
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <span className="text-base">{l.flag}</span>
                <span className="tracking-wide">{l.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
