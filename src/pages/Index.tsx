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
  ExternalLink,
  Code,
  Zap,
  Users,
  Globe,
} from "lucide-react";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/RevealText";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import siterixIcon from "@/assets/siterix-s-icon.png";
import mockupImg from "@/assets/case-shira-mockup.png";

const Index = () => {
  const { t, lang } = useLanguage();
  const isHe = lang === "he";

  // Parallax for hero
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.85]);

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
      features: [t("pricing.f.customResponsive"), t("pricing.f.upTo4"), t("pricing.f.contactForm"), t("pricing.f.basicSeo")],
      delivery: "3–5 days",
      popular: false,
    },
    {
      tier: t("pricing.professional"),
      title: t("pricing.professionalTitle"),
      price: "$900",
      description: t("pricing.professionalDesc"),
      features: [t("pricing.f.upTo8"), t("pricing.f.advancedAnim"), t("pricing.f.cmsInteg"), t("pricing.f.perfOpt"), t("pricing.f.prioritySupport")],
      delivery: "1–2 weeks",
      popular: true,
    },
    {
      tier: t("pricing.enterprise"),
      title: t("pricing.enterpriseTitle"),
      price: "$2,500",
      description: t("pricing.enterpriseDesc"),
      features: [t("pricing.f.customApp"), t("pricing.f.backendDb"), t("pricing.f.userAuth"), t("pricing.f.adminDash"), t("pricing.f.ongoingSupport")],
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

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ===================== HERO ===================== */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center px-6 pt-28 md:pt-32"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto w-full relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <img
              src={siterixIcon}
              alt="Siterix Studios"
              className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="section-line" />
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
              {t("home.badge")}
            </span>
          </motion.div>

          <h1 className="text-[14vw] md:text-[10vw] lg:text-[9vw] font-display font-black tracking-[-0.04em] leading-[0.85] mb-8">
            <Reveal delay={0.35}>{t("home.hero1")}</Reveal>
            <br />
            <Reveal delay={0.5} className="text-gradient italic">
              {t("home.hero2")}
            </Reveal>
          </h1>

          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 max-w-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed font-body">
              {t("home.subtitle")}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button asChild size="lg" className="rounded-full px-7 gap-3 group">
                <a href="#contact">
                  {t("nav.startProject")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl-flip" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-7 gap-3 group">
                <a href="#work">
                  {t("home.cta")}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl-flip" />
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          dir="ltr"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-body">Scroll</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
            animate={{ scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ originY: 0 }}
          />
        </motion.div>
      </section>

      {/* ===================== KINETIC MARQUEE ===================== */}
      <section className="py-10 md:py-14 border-y border-border/30 bg-card/20">
        <Marquee duration={28}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="text-5xl md:text-7xl font-display font-black italic tracking-tight px-8 inline-flex items-center gap-8"
            >
              DESIGN
              <span className="text-primary">●</span>
              DEVELOP
              <span className="text-primary">●</span>
              DEPLOY
              <span className="text-primary">●</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-px border border-border/40 rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-card/60 p-8 md:p-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div
                className="text-4xl md:text-6xl font-display font-black text-gradient mb-2"
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
      <section id="services" className="px-6 py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="section-line" />
              <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
                {t("services.badge")}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-black tracking-[-0.03em]">
              <Reveal>{t("services.title")}</Reveal>
              <span className="text-gradient">.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground font-body max-w-xl">
              {t("services.subtitle")}
            </p>
          </div>

          <div className="space-y-px border border-border/40 rounded-2xl overflow-hidden">
            {services.map((s, i) => (
              <motion.div
                key={s.number}
                className="bg-card/60 p-10 md:p-14 group hover:bg-card transition-colors duration-500"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:w-56 shrink-0">
                    <span className="text-5xl md:text-7xl font-display font-black text-gradient">
                      {s.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-body">
                      {s.category}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 transition-colors group-hover:text-gradient">
                      {s.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed font-body mb-6 max-w-2xl">
                      {s.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {s.details.map((d) => (
                        <span
                          key={d}
                          className="text-[10px] uppercase tracking-[0.2em] text-primary/80 border border-primary/25 rounded-full px-3 py-1.5 font-body"
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

      {/* ===================== KINETIC SUB-MARQUEE (reverse) ===================== */}
      <section className="py-6 border-y border-border/30 bg-primary/5 overflow-hidden">
        <Marquee duration={36} reverse>
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="text-2xl md:text-3xl font-body uppercase tracking-[0.3em] text-primary/70 px-8 inline-flex items-center gap-8"
            >
              · React · TypeScript · Tailwind · Supabase · Framer Motion
            </span>
          ))}
        </Marquee>
      </section>

      {/* ===================== WORK / CASE STUDY ===================== */}
      <section id="work" className="px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="section-line" />
              <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
                {isHe ? "מקרה בוחן" : "Case Study"}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-black tracking-[-0.03em] leading-[0.9]">
              <Reveal>{isHe ? "יוגה" : "Yoga"}</Reveal>
              <br />
              <Reveal delay={0.1} className="text-gradient italic">
                {isHe ? "במושבה." : "BaMoshava."}
              </Reveal>
            </h2>
          </div>

          <motion.div
            className="rounded-2xl overflow-hidden mb-12 border border-border/40"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={mockupImg} alt="Yoga BaMoshava" className="w-full" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Users, text: isHe ? "עלייה משמעותית בפניות" : "Significant lift in inquiries" },
              { icon: Zap, text: isHe ? "טעינה מתחת לשנייה" : "Sub-second load time" },
              { icon: Globe, text: isHe ? "דומיין מותאם אישית" : "Custom domain & branding" },
            ].map((r, i) => (
              <motion.div
                key={i}
                className="glass-card p-6 flex items-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <r.icon className="w-6 h-6 text-primary shrink-0" />
                <span className="text-sm font-body text-foreground leading-relaxed">{r.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="outline" className="rounded-full px-7 gap-2 group">
              <a
                href="https://yogabamoshava.co.il/siterix"
                target="_blank"
                rel="noopener noreferrer"
              >
                {isHe ? "צפו באתר החי" : "View Live Site"}
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full px-7 gap-2 group">
              <Link to="/work">
                {isHe ? "המקרה המלא" : "Read full case study"}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl-flip" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== PROCESS ===================== */}
      <section id="process" className="px-6 py-24 md:py-32 bg-card/20 border-y border-border/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="section-line" />
              <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
                {t("process.badge")}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-black tracking-[-0.03em] leading-[0.9]">
              <Reveal>{t("process.title1")}</Reveal>{" "}
              <Reveal delay={0.1} className="text-gradient italic">
                {t("process.title2")}
              </Reveal>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {phases.map((p, i) => (
              <motion.div
                key={p.number}
                className="glass-card p-8 md:p-10 relative overflow-hidden group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute -top-4 -right-2 text-[8rem] font-display font-black text-primary/5 leading-none pointer-events-none select-none">
                  {p.number}
                </div>
                <span className="relative text-xs font-body text-primary tracking-[0.3em] block mb-4">
                  STEP {p.number}
                </span>
                <h3 className="relative text-2xl md:text-3xl font-display font-bold mb-4 group-hover:text-gradient transition-colors">
                  {p.title}
                </h3>
                <p className="relative text-sm text-muted-foreground font-body leading-relaxed">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section id="pricing" className="px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="section-line" />
              <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
                {t("pricing.badge")}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-black tracking-[-0.03em] leading-[0.9]">
              <Reveal>{t("pricing.title1")}</Reveal>
              <br />
              <Reveal delay={0.1} className="text-gradient italic">
                {t("pricing.title2")}
              </Reveal>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground font-body max-w-xl">
              {t("pricing.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.tier}
                className={`glass-card p-8 md:p-10 flex flex-col h-full relative ${
                  pkg.popular ? "border-primary/40 md:-translate-y-3" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: pkg.popular ? -12 : 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-8 px-4 py-1 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-body font-semibold rounded-full">
                    {t("pricing.mostPopular")}
                  </div>
                )}
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-4 block">
                  {pkg.tier}
                </span>
                <h3 className="text-2xl font-display font-bold mb-2">{pkg.title}</h3>
                <div className="flex items-baseline gap-1 mb-4" dir="ltr">
                  <span className="text-5xl font-display font-black text-gradient">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground font-body">+</span>
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-8">
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm font-body">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-muted-foreground font-body mb-6">
                  {t("pricing.delivery")}{" "}
                  <span className="text-foreground">{pkg.delivery}</span>
                </div>
                <Button
                  asChild
                  className={`w-full rounded-full gap-2 group ${
                    pkg.popular
                      ? ""
                      : "bg-secondary/50 border border-border/50 text-foreground hover:bg-secondary"
                  }`}
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
            className="glass-card p-8 md:p-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
              {t("pricing.notSure")}
            </h3>
            <p className="text-muted-foreground font-body mb-6 max-w-md mx-auto">
              {t("pricing.notSureDesc")}
            </p>
            <Button asChild size="lg" className="rounded-full px-8 gap-2 group">
              <Link to="/quiz">
                {t("pricing.takeQuiz")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl-flip" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section id="about" className="px-6 py-24 md:py-32 bg-card/20 border-y border-border/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="section-line" />
              <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
                {t("about.badge")}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-black tracking-[-0.03em] leading-[0.9]">
              <Reveal>{t("about.title1")}</Reveal>
              <br />
              <Reveal delay={0.1} className="text-gradient italic">
                {t("about.title2")}
              </Reveal>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border/40 rounded-2xl overflow-hidden">
            {aboutCards.map((c, i) => (
              <motion.div
                key={c.label}
                className="bg-card/60 p-10 md:p-12 group hover:bg-card transition-colors duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-body mb-4 block">
                  {c.label}
                </span>
                <h3 className="text-2xl font-display font-bold mb-4">{c.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">
                  {c.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section id="contact" className="px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="section-line" />
              <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
                {t("contact.badge")}
              </span>
              <div className="section-line" />
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-black tracking-[-0.03em] leading-[0.9]">
              <Reveal>{t("contact.title1")}</Reveal>
              <br />
              <Reveal delay={0.1} className="text-gradient italic">
                {t("contact.title2")}
              </Reveal>
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground font-body">
              {t("contact.subtitle")}
            </p>
          </div>

          <motion.form
            className="glass-card p-8 md:p-10 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-[0.15em] font-body">
                  {t("contact.name")}
                </Label>
                <Input
                  id="name"
                  placeholder={t("contact.namePh")}
                  className="bg-secondary/50 border-border/50 font-body"
                  disabled={sending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-[0.15em] font-body">
                  {t("contact.email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("contact.emailPh")}
                  className="bg-secondary/50 border-border/50 font-body"
                  disabled={sending}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs uppercase tracking-[0.15em] font-body">
                {t("contact.message")}
              </Label>
              <Textarea
                id="message"
                placeholder={t("contact.messagePh")}
                rows={5}
                className="bg-secondary/50 border-border/50 font-body"
                disabled={sending}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full font-body gap-2 group"
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
      <footer className="px-6 pt-16 pb-28 border-t border-border/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={siterixIcon} alt="" className="w-10 h-10 object-contain" />
              <h3 className="text-xl font-display font-bold text-gradient">Siterix Studio</h3>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs">
              {t("home.subtitle")}
            </p>
            <a
              href="mailto:siterixstudios@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              siterixstudios@gmail.com
            </a>
            <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
              <MapPin className="w-4 h-4" />
              Israel · Worldwide
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { to: "#home", label: t("nav.home") },
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
            <h4 className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground">
              Explore
            </h4>
            <Link
              to="/lab"
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors block w-fit"
            >
              {t("nav.lab")}
            </Link>
            <Link
              to="/quiz"
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors block w-fit"
            >
              {t("pricing.takeQuiz")}
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-body font-semibold text-primary hover:text-primary/80 transition-colors group"
            >
              {isHe ? "צרו קשר" : "Get in Touch"}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl-flip" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-border/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-body tracking-[0.1em]">
            © {new Date().getFullYear()} Siterix Studio. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-muted-foreground font-body tracking-[0.1em]">
              Available for {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
