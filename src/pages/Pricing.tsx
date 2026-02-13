import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Pricing() {
  const { t } = useLanguage();

  const packages = [
    {
      tier: t("pricing.starter"),
      title: t("pricing.starterTitle"),
      price: "$350",
      description: t("pricing.starterDesc"),
      features: [
        t("pricing.f.customResponsive"),
        t("pricing.f.upTo4"),
        t("pricing.f.contactForm"),
        t("pricing.f.basicSeo"),
        t("pricing.f.mobileFriendly"),
        t("pricing.f.1revision"),
      ],
      delivery: "3–5 days",
      popular: false,
    },
    {
      tier: t("pricing.professional"),
      title: t("pricing.professionalTitle"),
      price: "$900",
      description: t("pricing.professionalDesc"),
      features: [
        t("pricing.f.upTo8"),
        t("pricing.f.advancedAnim"),
        t("pricing.f.cmsInteg"),
        t("pricing.f.perfOpt"),
        t("pricing.f.analytics"),
        t("pricing.f.3revisions"),
        t("pricing.f.prioritySupport"),
      ],
      delivery: "1–2 weeks",
      popular: true,
    },
    {
      tier: t("pricing.enterprise"),
      title: t("pricing.enterpriseTitle"),
      price: "$2,500",
      description: t("pricing.enterpriseDesc"),
      features: [
        t("pricing.f.customApp"),
        t("pricing.f.backendDb"),
        t("pricing.f.userAuth"),
        t("pricing.f.adminDash"),
        t("pricing.f.apiInteg"),
        t("pricing.f.scalableArch"),
        t("pricing.f.ongoingSupport"),
        t("pricing.f.unlimitedRev"),
      ],
      delivery: "4–8 weeks",
      popular: false,
    },
  ];

  return (
    <main className="min-h-screen px-6 pb-28">
      <div className="max-w-6xl mx-auto pt-28 md:pt-40">
        <motion.div
          className="mb-20 md:mb-28"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="section-line" />
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">{t("pricing.badge")}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-6">
            {t("pricing.title1")}<br />
            <span className="text-gradient italic">{t("pricing.title2")}</span>
          </h1>
          <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-xl">
            {t("pricing.subtitle")}
          </p>
        </motion.div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {packages.map((pkg) => (
            <StaggerItem key={pkg.tier}>
              <div className={`glass-card p-8 md:p-10 flex flex-col h-full relative ${pkg.popular ? "border-primary/40" : ""}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-8 px-4 py-1 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-body font-semibold rounded-full">
                    {t("pricing.mostPopular")}
                  </div>
                )}
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-4 block">{pkg.tier}</span>
                <h3 className="text-2xl font-display font-semibold mb-2">{pkg.title}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-display font-bold text-gradient">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground font-body">+</span>
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-8">{pkg.description}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm font-body">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-xs text-muted-foreground font-body mb-6">
                  {t("pricing.delivery")} <span className="text-foreground">{pkg.delivery}</span>
                </div>

                <Button asChild className={`w-full rounded-full gap-2 group ${pkg.popular ? "" : "variant-outline bg-secondary/50 border border-border/50 text-foreground hover:bg-secondary"}`}>
                  <Link to={`/contact?package=${encodeURIComponent(pkg.title)}&price=${encodeURIComponent(pkg.price)}`}>
                    {t("pricing.getQuote")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <motion.div
          className="glass-card p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4">{t("pricing.notSure")}</h3>
          <p className="text-muted-foreground font-body mb-6 max-w-md mx-auto">
            {t("pricing.notSureDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="rounded-full px-8 gap-2 group">
              <Link to="/quiz">
                {t("pricing.takeQuiz")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 gap-2 group">
              <Link to="/contact">
                {t("pricing.contactUs")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="max-w-6xl mx-auto mt-24">
        <Footer />
      </div>
    </main>
  );
}
