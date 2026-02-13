import { useLanguage } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-10 text-center border-t border-border/30">
      <div className="text-2xl font-display font-bold text-gradient mb-3">WebAnovas</div>
      <p className="text-xs text-muted-foreground font-body tracking-[0.15em] uppercase">
        {t("footer.rights")}
      </p>
    </footer>
  );
}
