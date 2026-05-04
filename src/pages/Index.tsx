import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Heart, Zap, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Footer } from "@/components/Footer";

import workYoga from "@/assets/work-yoga.jpg";
import workEstates from "@/assets/work-estates.jpg";
import workNexus from "@/assets/work-nexus.jpg";
import workArtist from "@/assets/work-artist.jpg";
import workRestaurant from "@/assets/work-restaurant.jpg";
import workFashion from "@/assets/work-fashion.jpg";

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  bg: string;       // section background tailwind class
  accent: string;   // accent blob color class
  href?: string;
};

const Index = () => {
  const { t, lang } = useLanguage();
  const isHe = lang === "he";

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const projects: Project[] = [
    {
      title: isHe ? "יוגה במושבה" : "Yoga BaMoshava",
      category: isHe ? "אתר סטודיו" : "Studio Website",
      description: isHe
        ? "אתר רגוע לסטודיו יוגה בהוד השרון, מערכת ניהול מלאה ולוח שיעורים דינמי."
        : "A serene website for a yoga studio in Hod HaSharon — full CMS and dynamic class schedule.",
      image: workYoga,
      bg: "bg-peach-soft",
      accent: "bg-peach",
      href: "/work",
    },
    {
      title: "Vanguard Estates",
      category: isHe ? "נדל\"ן יוקרה" : "Luxury Real Estate",
      description: isHe
        ? "פלטפורמת תצוגת נכסים פרימיום עם חוויית גלישה אלגנטית ואנימציות חלקות."
        : "A premium property showcase platform with an elegant browsing experience.",
      image: workEstates,
      bg: "bg-mint-soft",
      accent: "bg-mint",
    },
    {
      title: "Nexus AI",
      category: isHe ? "סאאס בינה מלאכותית" : "AI / SaaS",
      description: isHe
        ? "דאשבורד SaaS חכם עם אנליטיקה בזמן אמת ותובנות מבוססות AI."
        : "An intelligent SaaS dashboard with real-time analytics and AI-powered insights.",
      image: workNexus,
      bg: "bg-lavender-soft",
      accent: "bg-lavender",
    },
    {
      title: "The Artist Loft",
      category: isHe ? "פורטפוליו יצירתי" : "Creative Portfolio",
      description: isHe
        ? "פורטפוליו אמן נועז עם פריסות דינמיות וגלריות מדיה עשירות."
        : "A bold creative portfolio with dynamic layouts and rich media galleries.",
      image: workArtist,
      bg: "bg-butter-soft",
      accent: "bg-butter",
    },
    {
      title: "Larkmont",
      category: isHe ? "מסעדה בוטיק" : "Boutique Restaurant",
      description: isHe
        ? "אתר מסעדה עם תפריט אינטראקטיבי, מערכת הזמנות וגלריית מנות."
        : "A restaurant website with interactive menu, reservations, and dish gallery.",
      image: workRestaurant,
      bg: "bg-peach-soft",
      accent: "bg-peach",
    },
    {
      title: "Maison Noir",
      category: isHe ? "מסחר אופנה" : "Fashion Commerce",
      description: isHe
        ? "חנות אונליין עם חווית קנייה חלקה, פילטרים חכמים וצ'קאאוט מהיר."
        : "An e-commerce store with smooth shopping flow, smart filters and fast checkout.",
      image: workFashion,
      bg: "bg-mint-soft",
      accent: "bg-mint",
    },
  ];

  return (
    <main className="relative">
      {/* ============== HERO — cream ============== */}
      <section ref={heroRef} className="relative min-h-screen bg-cream overflow-hidden flex items-center">
        {/* Floating blobs */}
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-peach blob opacity-60 animate-float"
          style={{ y: useTransform(heroProgress, [0, 1], [0, 200]) }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-mint blob-2 opacity-50 animate-float"
          style={{ y: useTransform(heroProgress, [0, 1], [0, -100]), animationDelay: "1s" }}
        />
        <motion.div
          className="absolute bottom-10 left-1/3 w-72 h-72 bg-lavender blob opacity-40 animate-wobble"
          style={{ y: useTransform(heroProgress, [0, 1], [0, -200]) }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/70 backdrop-blur border border-border/40 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-body uppercase tracking-[0.2em] text-foreground/70">
              {t("home.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display font-light tracking-tight leading-[0.9] mb-8"
          >
            {t("home.hero1")}
            <br />
            <span className="italic font-normal text-gradient">{t("home.hero2")}</span>
          </motion.h1>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-foreground/70 max-w-md leading-relaxed font-body"
            >
              {t("home.subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button asChild size="lg" className="rounded-full px-8 gap-3 group bg-foreground text-background hover:bg-foreground/90">
                <a href="#work">
                  {isHe ? "צפו בעבודות" : "See the work"}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl-flip" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 font-body">
              {isHe ? "גללו" : "Scroll"}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-10 bg-foreground/30"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ============== Marquee strip ============== */}
      <section className="relative bg-foreground text-background py-8 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center gap-12 px-6 shrink-0">
              {[
                isHe ? "אתרים מותאמים אישית" : "Custom-built websites",
                isHe ? "טעינה מהירה" : "Lightning fast",
                isHe ? "עיצוב יצירתי" : "Creative design",
                isHe ? "אנימציות חלקות" : "Smooth animations",
                isHe ? "תמיכה מלאה" : "Full support",
                isHe ? "עברית ואנגלית" : "Hebrew & English",
              ].map((item, i) => (
                <span key={`${dup}-${i}`} className="flex items-center gap-12 text-2xl md:text-4xl font-display italic">
                  {item}
                  <Star className="w-5 h-5 text-primary shrink-0" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============== Manifesto / cream ============== */}
      <section className="relative bg-cream py-32 md:py-48 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-butter blob opacity-50 animate-float" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-peach-soft blob-2 opacity-70 animate-wobble" />

        <div className="relative max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-10"
          >
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-xs font-body uppercase tracking-[0.3em] text-foreground/60">
              {isHe ? "המניפסט שלנו" : "Our Manifesto"}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-light leading-[1.1] tracking-tight"
          >
            {isHe ? (
              <>
                אנחנו לא בונים סתם אתרים. אנחנו בונים <span className="italic text-gradient">חוויות שנושמות</span>, אתרים שמספרים סיפור — ומביאים תוצאות.
              </>
            ) : (
              <>
                We don't just build websites. We craft <span className="italic text-gradient">breathing experiences</span> that tell your story — and deliver results.
              </>
            )}
          </motion.h2>
        </div>
      </section>

      {/* ============== Work Zigzag ============== */}
      <section id="work" className="relative">
        <div className="bg-foreground text-background py-20 md:py-28 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-xs font-body uppercase tracking-[0.3em] text-background/60">
                  {isHe ? "העבודות שלנו" : "Selected Work"}
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tight">
                {isHe ? (
                  <>שש עבודות. <span className="italic text-primary">סיפור אחד.</span></>
                ) : (
                  <>Six projects. <span className="italic text-primary">One story.</span></>
                )}
              </h2>
            </motion.div>
          </div>
        </div>

        {projects.map((p, i) => {
          const isReversed = i % 2 === 1;
          return (
            <div key={p.title} className={`relative ${p.bg} py-24 md:py-36 overflow-hidden`}>
              {/* decorative blobs */}
              <div
                className={`absolute ${isReversed ? "-left-24" : "-right-24"} top-10 w-72 h-72 ${p.accent} blob opacity-40 animate-float`}
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <div
                className={`absolute ${isReversed ? "right-10" : "left-10"} bottom-10 w-40 h-40 ${p.accent} blob-2 opacity-30 animate-wobble`}
              />

              <div className="relative max-w-6xl mx-auto px-6">
                <div className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${isReversed ? "md:[direction:rtl]" : ""}`}>
                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? 60 : -60, rotate: isReversed ? 4 : -4 }}
                    whileInView={{ opacity: 1, x: 0, rotate: isReversed ? 2 : -2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="md:[direction:ltr]"
                  >
                    <div className="relative group">
                      <div className={`absolute -inset-4 ${p.accent} blob opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        width={1024}
                        height={768}
                        className="relative w-full rounded-3xl shadow-2xl shadow-foreground/20 group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  </motion.div>

                  {/* Text */}
                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="md:[direction:ltr]"
                    dir={isHe ? "rtl" : "ltr"}
                  >
                    <span className="inline-block text-6xl md:text-7xl font-display font-light text-foreground/15 leading-none mb-2" dir="ltr">
                      0{i + 1}
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-foreground/60 font-body mb-4">
                      {p.category}
                    </span>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mb-6">
                      {p.title}
                    </h3>
                    <p className="text-base md:text-lg text-foreground/70 font-body leading-relaxed mb-8 max-w-md">
                      {p.description}
                    </p>
                    {p.href && (
                      <Button asChild variant="outline" className="rounded-full border-foreground/30 hover:bg-foreground hover:text-background gap-2 group">
                        <Link to={p.href}>
                          {isHe ? "צפו בפרויקט" : "View project"}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl-flip" />
                        </Link>
                      </Button>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ============== Stats — cream ============== */}
      <section className="relative bg-cream py-28 md:py-36 overflow-hidden">
        <div className="absolute -top-10 left-1/4 w-56 h-56 bg-mint-soft blob opacity-70 animate-float" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-lavender-soft blob-2 opacity-60 animate-wobble" />

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { value: "100%", label: t("home.stat2") },
              { value: "<1s", label: t("home.stat3") },
              { value: "24/7", label: t("home.stat4") },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ rotate: 0, scale: 1.03 }}
                className="bg-card p-10 rounded-3xl border border-border/40 text-center shadow-xl shadow-foreground/5"
              >
                <div className="text-6xl md:text-7xl font-display font-light text-gradient mb-3" dir="ltr">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-foreground/60 font-body">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============== CTA — peach ============== */}
      <section className="relative bg-peach-soft py-32 md:py-44 overflow-hidden">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-peach blob opacity-40"
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tight leading-[1.05] mb-8"
          >
            {isHe ? (
              <>בואו נבנה<br /><span className="italic text-gradient">משהו יפה</span> ביחד.</>
            ) : (
              <>Let's build<br /><span className="italic text-gradient">something beautiful</span> together.</>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground/70 font-body mb-10 max-w-xl mx-auto"
          >
            {isHe
              ? "ספרו לנו על הפרויקט שלכם — ונחזיר לכם הצעה מותאמת תוך 24 שעות."
              : "Tell us about your project — we'll get back to you with a tailored proposal within 24 hours."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button asChild size="lg" className="rounded-full px-10 py-6 text-base gap-3 group bg-foreground text-background hover:bg-foreground/90">
              <Link to="/contact">
                {isHe ? "התחילו פרויקט" : "Start a project"}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 rtl-flip" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Index;
