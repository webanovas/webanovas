import { Footer } from "@/components/Footer";
import { AnimatedProgress } from "@/components/AnimatedProgress";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ProcessPage() {
  const { t } = useLanguage();

  const phases = [
    {
      number: "01",
      percent: 25,
      title: t("process.p1.title"),
      description: t("process.p1.desc"),
      deliverables: [t("process.p1.d1"), t("process.p1.d2"), t("process.p1.d3")],
    },
    {
      number: "02",
      percent: 75,
      title: t("process.p2.title"),
      description: t("process.p2.desc"),
      deliverables: [t("process.p2.d1"), t("process.p2.d2"), t("process.p2.d3")],
    },
    {
      number: "03",
      percent: 100,
      title: t("process.p3.title"),
      description: t("process.p3.desc"),
      deliverables: [t("process.p3.d1"), t("process.p3.d2"), t("process.p3.d3")],
    },
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
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">{t("process.badge")}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-6">
            {t("process.title1")}<br />
            <span className="text-gradient italic">{t("process.title2")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg font-body leading-relaxed">
            {t("process.subtitle")}
          </p>
        </motion.div>

        <StaggerChildren className="space-y-px border border-border/40 rounded-xl overflow-hidden">
          {phases.map((p) => (
            <StaggerItem key={p.number}>
              <div className="bg-card/60 p-10 md:p-14 group hover:bg-card transition-colors duration-500">
                <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
                  <div className="md:w-48 shrink-0">
                    <span className="text-5xl md:text-6xl font-display font-bold text-gradient">{p.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-display font-semibold mb-2">{p.title}</h3>
                    <AnimatedProgress value={p.percent} className="mb-5 max-w-xs" />
                    <p className="text-muted-foreground text-sm leading-relaxed font-body mb-6">{p.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {p.deliverables.map((d) => (
                        <span key={d} className="text-[10px] uppercase tracking-[0.2em] text-primary/70 border border-primary/20 rounded-full px-3 py-1 font-body">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
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
