import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import { useLanguage } from "@/i18n/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const cards = [
    { label: t("about.c1.label"), title: t("about.c1.title"), content: t("about.c1.content") },
    { label: t("about.c2.label"), title: t("about.c2.title"), content: t("about.c2.content") },
    { label: t("about.c3.label"), title: t("about.c3.title"), content: t("about.c3.content") },
    { label: t("about.c4.label"), title: t("about.c4.title"), content: t("about.c4.content") },
  ];

  return (
    <main className="min-h-screen px-6 pb-28">
      <div className="max-w-6xl mx-auto pt-28 md:pt-40">
        <motion.div
          className="mb-24 md:mb-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="section-line" />
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">{t("about.badge")}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-6">
            {t("about.title1")}<br />
            <span className="text-gradient italic">{t("about.title2")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg font-body leading-relaxed">
            {t("about.subtitle")}
          </p>
        </motion.div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border/40 rounded-xl overflow-hidden">
          {cards.map((c) => (
            <StaggerItem key={c.label}>
              <div className="bg-card/60 p-10 md:p-12 h-full group hover:bg-card transition-colors duration-500">
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-4 block">{c.label}</span>
                <h3 className="text-xl md:text-2xl font-display font-semibold mb-4">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">{c.content}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
      <div className="max-w-6xl mx-auto mt-24">
        <Footer />
      </div>
    </main>
  );
}
