import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { translations, Lang } from "./translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getInitialLang(): Lang {
  // Check if user previously selected a language
  const saved = localStorage.getItem("lang");
  if (saved && (saved === "en" || saved === "he" || saved === "es")) return saved;

  // Auto-detect Hebrew for .co.il domain
  const hostname = window.location.hostname;
  if (hostname.endsWith(".co.il")) return "he";

  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  }, []);

  const t = useCallback(
    (key: string) => translations[lang][key] || translations.en[key] || key,
    [lang]
  );

  const dir = lang === "he" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [dir, lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
