import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, ExternalLink, Calendar, MapPin, Globe, Palette, Code, Zap, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import mockupImg from "@/assets/case-shira-mockup.png";
import heroImg from "@/assets/case-shira-hero.jpg";
import studioImg from "@/assets/case-shira-studio.jpg";
import groupImg from "@/assets/case-shira-group.jpg";

export default function Work() {
  const { t, lang } = useLanguage();
  const isHe = lang === "he";

  const challenge = isHe
    ? "שירה פלג, מורת יוגה מנוסה מהוד השרון, ניהלה את הסטודיו שלה בעיקר דרך רשתות חברתיות וקבוצות WhatsApp. היא הייתה צריכה אתר מקצועי שישדרג את הנוכחות הדיגיטלית שלה, יאפשר ללקוחות לראות את מערכת השעות, ויחזק את המותג שלה."
    : "Shira Peleg, an experienced yoga instructor from Hod HaSharon, managed her studio primarily through social media and WhatsApp groups. She needed a professional website to elevate her digital presence, let clients view schedules, and strengthen her brand.";

  const solution = isHe
    ? "בנינו אתר מותאם לחלוטין בעברית (RTL) עם עיצוב שקט ורגוע שמשדר את אווירת הסטודיו. האתר כולל מערכת ניהול תוכן מלאה, לוח שיעורים דינמי, דף צוות, גלריה ואזור אדמין מובנה."
    : "We built a fully Hebrew (RTL) custom website with a calm, serene design reflecting the studio's atmosphere. It includes a full CMS, dynamic schedule, team page, gallery, and built-in admin area.";

  const results = isHe
    ? [
        { icon: Users, text: "עלייה משמעותית בפניות מלקוחות חדשים" },
        { icon: Globe, text: "נוכחות דיגיטלית מקצועית עם דומיין מותאם" },
        { icon: Zap, text: "זמן טעינה מהיר — מתחת לשנייה" },
        { icon: CheckCircle, text: "ניהול עצמאי מלא של תוכן ושיעורים" },
      ]
    : [
        { icon: Users, text: "Significant increase in new client inquiries" },
        { icon: Globe, text: "Professional digital presence with custom domain" },
        { icon: Zap, text: "Fast load time — under 1 second" },
        { icon: CheckCircle, text: "Full self-managed content & schedule system" },
      ];

  const techStack = ["React", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion"];

  const features = isHe
    ? ["עיצוב RTL מלא בעברית", "מערכת ניהול תוכן (CMS)", "לוח שיעורים דינמי", "דף צוות עם תמונות", "טופס יצירת קשר", "אזור אדמין מאובטח", "עיצוב רספונסיבי", "אנימציות חלקות"]
    : ["Full RTL Hebrew design", "Content Management System", "Dynamic class schedule", "Team page with photos", "Contact form", "Secure admin area", "Responsive design", "Smooth animations"];

  return (
    <main className="min-h-screen px-6 pb-28">
      <div className="max-w-6xl mx-auto pt-28 md:pt-40">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="section-line" />
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
              {isHe ? "מקרה בוחן" : "Case Study"}
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-6">
            {isHe ? "יוגה" : "Yoga"}<br />
            <span className="text-gradient italic">{isHe ? "במושבה." : "BaMoshava."}</span>
          </h1>
          <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-2xl">
            {isHe
              ? "אתר מותאם אישית לסטודיו יוגה בהוד השרון — עיצוב שקט, ניהול תוכן מלא ונוכחות דיגיטלית מקצועית."
              : "A custom-built website for a yoga studio in Hod HaSharon — serene design, full content management, and professional digital presence."}
          </p>
        </motion.div>

        {/* Hero Mockup */}
        <motion.div
          className="mb-20 md:mb-28"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="rounded-2xl overflow-hidden">
            <img
              src={mockupImg}
              alt="Yoga BaMoshava website mockup"
              className="w-full"
            />
          </div>
        </motion.div>

        {/* Project Info Bar */}
        <motion.div
          className="glass-card p-6 md:p-8 mb-20 md:mb-28 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {[
            { icon: Calendar, label: isHe ? "שנה" : "Year", value: "2025" },
            { icon: MapPin, label: isHe ? "מיקום" : "Location", value: isHe ? "הוד השרון" : "Hod HaSharon" },
            { icon: Palette, label: isHe ? "קטגוריה" : "Category", value: isHe ? "יוגה / בריאות" : "Yoga / Wellness" },
            { icon: Globe, label: isHe ? "דומיין" : "Domain", value: "yogabamoshava.co.il" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-body block mb-1">
                  {item.label}
                </span>
                <span className="text-xs sm:text-sm font-body font-medium text-foreground break-all">{item.value}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* The Challenge */}
        <StaggerChildren className="mb-20 md:mb-28">
          <StaggerItem>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-body block mb-4">
                  {isHe ? "האתגר" : "The Challenge"}
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">
                  {isHe ? "מרשתות חברתיות לנוכחות דיגיטלית אמיתית" : "From Social Media to Real Digital Presence"}
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {challenge}
                </p>
              </div>
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img src={studioImg} alt="Studio interior" className="w-full h-full object-cover" />
              </div>
            </div>
          </StaggerItem>
        </StaggerChildren>

        {/* The Solution */}
        <StaggerChildren className="mb-20 md:mb-28">
          <StaggerItem>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="order-2 md:order-1 rounded-xl overflow-hidden aspect-[4/3]">
                <img src={groupImg} alt="Yoga class" className="w-full h-full object-cover" />
              </div>
              <div className="order-1 md:order-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-body block mb-4">
                  {isHe ? "הפתרון" : "The Solution"}
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">
                  {isHe ? "אתר שנושם את אווירת הסטודיו" : "A Website That Breathes the Studio's Vibe"}
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {solution}
                </p>
              </div>
            </div>
          </StaggerItem>
        </StaggerChildren>

        {/* Features Grid */}
        <motion.div
          className="mb-20 md:mb-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-body block mb-4">
            {isHe ? "מה כלול" : "What's Included"}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-10">
            {isHe ? "פיצ'רים ויכולות" : "Features & Capabilities"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                className="glass-card p-5 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <CheckCircle className="w-5 h-5 text-primary mx-auto mb-3" />
                <span className="text-sm font-body text-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="mb-20 md:mb-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-body block mb-4">
            {isHe ? "טכנולוגיה" : "Tech Stack"}
          </span>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full border border-border/40 bg-secondary/30 text-sm font-body text-muted-foreground"
              >
                <Code className="w-3.5 h-3.5 inline-block mr-1.5 rtl-flip" />
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <StaggerChildren className="mb-20 md:mb-28">
          <StaggerItem>
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-body block mb-4">
              {isHe ? "תוצאות" : "Results"}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-10">
              {isHe ? "ההשפעה" : "The Impact"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((result, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-6 flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <result.icon className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-sm font-body text-foreground leading-relaxed">{result.text}</span>
                </motion.div>
              ))}
            </div>
          </StaggerItem>
        </StaggerChildren>

        {/* Visit Site + CTA */}
        <motion.div
          className="glass-card p-8 md:p-12 text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            {isHe ? "רוצים משהו דומה?" : "Want Something Similar?"}
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
            {isHe
              ? "בואו נדבר על הפרויקט שלכם ונבנה יחד משהו מדהים."
              : "Let's talk about your project and build something amazing together."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 gap-2 group">
              <Link to="/contact">
                {isHe ? "התחילו פרויקט" : "Start a Project"}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl-flip" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 gap-2 group">
              <a href="https://yogabamoshava.co.il/siterix" target="_blank" rel="noopener noreferrer">
                {isHe ? "צפו באתר החי" : "View Live Site"}
                <ExternalLink className="w-4 h-4" />
              </a>
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
