import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const hints: Record<string, string> = {
  en: "Don't understand? Switch language 🌍",
  he: "לא מבינים? החליפו שפה 🌍",
  es: "¿No entiendes? Cambia el idioma 🌍",
};

export function LanguageHint() {
  const { lang } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("lang-hint-seen");
    if (seen) return;

    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem("lang-hint-seen", "1");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show) return;
    const hide = setTimeout(() => setShow(false), 6000);
    return () => clearTimeout(hide);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-[4.5rem] right-5 z-[59] flex items-center gap-2 cursor-pointer"
          onClick={() => setShow(false)}
        >
          {/* Arrow pointing up to the globe button */}
          <div className="relative">
            <div className="bg-card/95 backdrop-blur-xl border border-border/40 rounded-xl px-4 py-2.5 shadow-2xl shadow-black/40">
              <p className="text-sm font-body text-foreground whitespace-nowrap">
                {hints[lang] || hints.en}
              </p>
            </div>
            {/* Arrow triangle pointing up */}
            <div className="absolute -top-2 right-4 w-4 h-4 rotate-45 bg-card/95 border-l border-t border-border/40" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
