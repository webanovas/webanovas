import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Loader2,
  CheckCircle,
  Mail,
  MapPin,
} from "lucide-react";
import { Reveal } from "@/components/RevealText";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import siterixIcon from "@/assets/siterix-s-icon.png";
import { PortfolioGrid } from "@/components/PortfolioGrid";

const Index = () => {
  const { t, lang } = useLanguage();
  const isHe = lang === "he";

  // Subtle hero parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0.2]);

  // ---- Data ----
  const stats = [
    { value: "100%", label: t("home.stat2") },
    { value: "<1s", label: t("home.stat3") },
    { value: "24/7", label: t("home.stat4") },
  ];

  const services = [
    {
      number: "01",
      category: t("services.s1.cat"),
      title: t("services.s1.title"),
      description: t("services.s1.desc"),
      details: [t("services.s1.d1"), t("services.s1.d2"), t("services.s1.d3")],
    },
    {
      number: "02",
      category: t("services.s2.cat"),
      title: t("services.s2.title"),
      description: t("services.s2.desc"),
      details: [t("services.s2.d1"), t("services.s2.d2"), t("services.s2.d3")],
    },
    {
      number: "03",
      category: t("services.s3.cat"),
      title: t("services.s3.title"),
      description: t("services.s3.desc"),
      details: [t("services.s3.d1"), t("services.s3.d2"), t("services.s3.d3")],
    },
  ];

  const phases = [
    { number: "01", title: t("process.p1.title"), description: t("process.p1.desc") },
    { number: "02", title: t("process.p2.title"), description: t("process.p2.desc") },
    { number: "03", title: t("process.p3.title"), description: t("process.p3.desc") },
  ];

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
        t("pricing.f.ongoingSupport"),
      ],
      delivery: "4–8 weeks",
      popular: false,
    },
  ];

  const aboutCards = [
    { label: t("about.c1.label"), title: t("about.c1.title"), content: t("about.c1.content") },
    { label: t("about.c2.label"), title: t("about.c2.title"), content: t("about.c2.content") },
    { label: t("about.c3.label"), title: t("about.c3.title"), content: t("about.c3.content") },
    { label: t("about.c4.label"), title: t("about.c4.title"), content: t("about.c4.content") },
  ];

  // Contact form
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending || sent) return;
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { name, email, message },
      });
      if (error) throw error;
      setSent(true);
      toast.success("Message sent successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  // Section header (reusable)
  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-8 h-px bg-primary/60" />
      <span className="text-[10px] font-body uppercase tracking-[0.35em] text-muted-foreground">
        {children}
      </span>
    </div>
  );

  return (
    <main className="min-h-screen overflow-x-hidden grain">
      {/* ===================== HERO ===================== */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-28 pb-20"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-6xl mx-auto w-full relative z-10"
        >
          {/* Top meta bar */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-px bg-foreground/40" />
              <span className="text-[10px] font-body uppercase tracking-[0.35em] text-muted-foreground">
                {t("home.badge")}
              </span>
            </motion.div>
            <motion.span
              dir="ltr"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-[10px] font-body uppercase tracking-[0.35em] text-muted-foreground"
            >
              EST. 2024 — TLV
            </motion.span>
          </div>

          {/* Geometric square logo, mishelcodearch-inspired */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-12 md:mb-16 relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] overflow-hidden rounded-sm bg-foreground"
          >
            <div
              className="absolute top-0 right-0 w-[42%] h-[42%] bg-terracotta"
              style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-[35%] h-[35%] bg-olive"
              style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" dir="ltr">
              <span className="text-primary text-[11px] md:text-xs font-body font-semibold tracking-[0.4em]">
                SITERIX
              </span>
              <div className="w-10 h-px bg-background/40" />
              <span className="text-primary text-[11px] md:text-xs font-body font-semibold tracking-[0.4em]">
                STUDIO
              </span>
            </div>
          </motion.div>

          {/* Hero headline */}
          <h1 className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-display font-medium tracking-[-0.025em] leading-[0.98] mb-10 max-w-5xl mx-auto">
            <Reveal delay={0.55}>{t("home.hero1")}</Reveal>{" "}
            <Reveal delay={0.7} className="text-gradient italic font-semibold">
              {t("home.hero2")}
            </Reveal>
          </h1>

          <motion.p
            className="text-center text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed font-body mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
          >
            {t("home.subtitle")}
          </motion.p>

          <motion.div
            className="flex justify-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
          >
            <Button asChild size="lg" className="rounded-full px-7 gap-2 group">
              <a href="#contact">
                {t("nav.startProject")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl-flip" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-7 gap-2 group border-foreground/20 hover:bg-foreground hover:text-background"
            >
              <a href="#work">
                {t("home.cta")}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl-flip" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Subtle scroll indicator */}
        <motion.div
          dir="ltr"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-body">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-foreground/40 to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ originY: 0 }}
          />
        </motion.div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 md:gap-16 border-t border-border/40 pt-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div
                className="text-3xl md:text-5xl font-display font-medium text-foreground mb-3"
                dir="ltr"
              >
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground font-body">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section id="services" className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <SectionLabel>{t("services.badge")}</SectionLabel>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-[-0.02em] leading-[1.05] max-w-2xl">
              <Reveal>{t("services.title")}</Reveal>
              <span className="text-primary">.</span>
            </h2>
            <p className="mt-6 text-base text-muted-foreground font-body max-w-lg leading-relaxed">
              {t("services.subtitle")}
            </p>
          </div>

          <div className="divide-y divide-border/40 border-t border-b border-border/40">
            {services.map((s, i) => (
              <motion.div
                key={s.number}
                className="py-10 md:py-14 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-start">
                  <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-3">
                    <span className="text-sm font-body text-muted-foreground tracking-[0.2em]">
                      {s.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 font-body">
                      {s.category}
                    </span>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="text-2xl md:text-3xl font-display font-medium tracking-tight transition-colors group-hover:text-primary">
                      {s.title}
                    </h3>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body mb-5">
                      {s.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {s.details.map((d) => (
                        <span
                          key={d}
                          className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80 border border-border/60 rounded-full px-3 py-1 font-body"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WORK / PORTFOLIO ===================== */}
      <section id="work" className="px-6 md:px-12 py-24 md:py-32 bg-secondary/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <SectionLabel>{isHe ? "עבודות נבחרות" : "Selected Work"}</SectionLabel>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-[-0.02em] leading-[1.02]">
                <Reveal>{isHe ? "פרויקטים" : "Projects"}</Reveal>{" "}
                <Reveal delay={0.1} className="text-gradient italic font-semibold">
                  {isHe ? "שלנו" : "we shipped"}
                </Reveal>
              </h2>
            </div>
            <span dir="ltr" className="text-[10px] font-body uppercase tracking-[0.3em] text-muted-foreground">
              06 PROJECTS
            </span>
          </div>

          <PortfolioGrid />

          <motion.div
            className="mt-16 pt-10 border-t border-foreground/10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground font-body mb-5">
              {isHe ? "רוצה אתר ברמה הזו?" : "Want a site at this level?"}
            </p>
            <Button asChild size="lg" className="rounded-full px-7 gap-2 group">
              <a href="#contact">
                {isHe ? "בואו נדבר" : "Let's talk"}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl-flip" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===================== PROCESS ===================== */}
      <section id="process" className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <SectionLabel>{t("process.badge")}</SectionLabel>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-[-0.02em] leading-[1.05]">
              <Reveal>{t("process.title1")}</Reveal>{" "}
              <Reveal delay={0.1} className="text-gradient italic font-semibold">
                {t("process.title2")}
              </Reveal>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border/40 border border-border/40 rounded-xl overflow-hidden">
            {phases.map((p, i) => (
              <motion.div
                key={p.number}
                className="bg-background p-8 md:p-10 group hover:bg-card/40 transition-colors duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-[10px] font-body text-muted-foreground tracking-[0.3em] block mb-6">
                  STEP / {p.number}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-medium mb-4 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section id="pricing" className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <SectionLabel>{t("pricing.badge")}</SectionLabel>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-[-0.02em] leading-[1.05]">
              <Reveal>{t("pricing.title1")}</Reveal>{" "}
              <Reveal delay={0.1} className="text-gradient italic font-semibold">
                {t("pricing.title2")}
              </Reveal>
            </h2>
            <p className="mt-6 text-base text-muted-foreground font-body max-w-lg leading-relaxed">
              {t("pricing.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border/40 border border-border/40 rounded-xl overflow-hidden mb-10">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.tier}
                className={`bg-background p-8 md:p-10 flex flex-col h-full relative ${
                  pkg.popular ? "bg-card/40" : ""
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4 px-3 py-0.5 bg-primary/10 text-primary text-[9px] uppercase tracking-[0.2em] font-body font-medium rounded-full">
                    {t("pricing.mostPopular")}
                  </div>
                )}
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-body mb-4 block">
                  {pkg.tier}
                </span>
                <h3 className="text-xl font-display font-medium mb-3">{pkg.title}</h3>
                <div className="flex items-baseline gap-1 mb-5" dir="ltr">
                  <span className="text-3xl font-display font-medium">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground font-body">+</span>
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-8">
                  {pkg.description}
                </p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm font-body">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-[11px] text-muted-foreground/80 font-body mb-5 tracking-wide">
                  {t("pricing.delivery")}{" "}
                  <span className="text-foreground">{pkg.delivery}</span>
                </div>
                <Button
                  asChild
                  variant={pkg.popular ? "default" : "outline"}
                  className="w-full rounded-full gap-2 group"
                >
                  <a
                    href={`/contact?package=${encodeURIComponent(pkg.title)}&price=${encodeURIComponent(pkg.price)}`}
                  >
                    {t("pricing.getQuote")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl-flip" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center pt-8 border-t border-border/40"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground font-body mb-5">
              {t("pricing.notSureDesc")}
            </p>
            <Button asChild variant="ghost" className="rounded-full px-6 gap-2 group">
              <Link to="/quiz">
                {t("pricing.takeQuiz")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl-flip" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section id="about" className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <SectionLabel>{t("about.badge")}</SectionLabel>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-[-0.02em] leading-[1.05]">
              <Reveal>{t("about.title1")}</Reveal>{" "}
              <Reveal delay={0.1} className="text-gradient italic font-semibold">
                {t("about.title2")}
              </Reveal>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 border-t border-border/40 pt-12">
            {aboutCards.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-body mb-4 block">
                  {c.label}
                </span>
                <h3 className="text-xl font-display font-medium mb-3">{c.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">
                  {c.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section id="contact" className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <SectionLabel>{t("contact.badge")}</SectionLabel>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-[-0.02em] leading-[1.05]">
              <Reveal>{t("contact.title1")}</Reveal>{" "}
              <Reveal delay={0.1} className="text-gradient italic font-semibold">
                {t("contact.title2")}
              </Reveal>
            </h2>
            <p className="mt-6 text-base text-muted-foreground font-body leading-relaxed">
              {t("contact.subtitle")}
            </p>
          </div>

          <motion.form
            className="space-y-6 border-t border-border/40 pt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em] font-body text-muted-foreground">
                  {t("contact.name")}
                </Label>
                <Input
                  id="name"
                  placeholder={t("contact.namePh")}
                  className="bg-transparent border-0 border-b border-border/60 rounded-none px-0 font-body focus-visible:ring-0 focus-visible:border-primary"
                  disabled={sending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] font-body text-muted-foreground">
                  {t("contact.email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("contact.emailPh")}
                  className="bg-transparent border-0 border-b border-border/60 rounded-none px-0 font-body focus-visible:ring-0 focus-visible:border-primary"
                  disabled={sending}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em] font-body text-muted-foreground">
                {t("contact.message")}
              </Label>
              <Textarea
                id="message"
                placeholder={t("contact.messagePh")}
                rows={4}
                className="bg-transparent border-0 border-b border-border/60 rounded-none px-0 font-body focus-visible:ring-0 focus-visible:border-primary resize-none"
                disabled={sending}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="rounded-full font-body gap-2 group px-8"
              disabled={sending || sent}
            >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : sent ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Sent!
                </>
              ) : (
                <>
                  {t("contact.send")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl-flip" />
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="px-6 md:px-12 pt-20 pb-28 border-t border-border/30 mt-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={siterixIcon} alt="" className="w-8 h-8 object-contain" />
              <h3 className="text-base font-display font-medium">Siterix Studio</h3>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs">
              {t("home.subtitle")}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-body uppercase tracking-[0.25em] text-muted-foreground">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { to: "#services", label: t("nav.services") },
                { to: "#work", label: t("nav.work") },
                { to: "#process", label: t("nav.process") },
                { to: "#pricing", label: t("nav.pricing") },
                { to: "#about", label: t("nav.about") },
              ].map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-body uppercase tracking-[0.25em] text-muted-foreground">
              Contact
            </h4>
            <a
              href="mailto:siterixstudios@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              siterixstudios@gmail.com
            </a>
            <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              Israel · Worldwide
            </div>
            <Link
              to="/lab"
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors block w-fit"
            >
              {t("nav.lab")}
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto border-t border-border/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground/70 font-body tracking-[0.1em]">
            © {new Date().getFullYear()} Siterix Studio.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-muted-foreground/70 font-body tracking-[0.1em]">
              Available for {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
