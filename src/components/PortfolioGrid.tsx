import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export type PortfolioProject = {
  id: string;
  number: string;
  category: { en: string; he: string; es: string };
  title: string;
  description: { en: string; he: string; es: string };
  url: string;
  image: string;
  accent: "navy" | "terracotta" | "olive" | "blue";
};

/**
 * Editorial portfolio grid inspired by mishelcodearch.
 * Large image cards with index number, category, title, and arrow.
 * Easy to swap images later — just change `image` URLs in projects array.
 */
export const projects: PortfolioProject[] = [
  {
    id: "yoga-bamoshava",
    number: "01",
    category: { en: "Wellness · Yoga Studio", he: "וולנס · סטודיו יוגה", es: "Bienestar · Estudio de Yoga" },
    title: "Yoga BaMoshava",
    description: {
      en: "Calm, conversion-focused presence for a boutique yoga studio.",
      he: "נוכחות שקטה וממוקדת המרה לסטודיו יוגה בוטיק.",
      es: "Presencia tranquila y enfocada en conversión para un estudio boutique.",
    },
    url: "https://yogabamoshava.co.il/siterix",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80&auto=format&fit=crop",
    accent: "olive",
  },
  {
    id: "project-02",
    number: "02",
    category: { en: "E-commerce · Fashion", he: "מסחר · אופנה", es: "E-commerce · Moda" },
    title: "Project Two",
    description: {
      en: "Replace this card with one of your projects — image, title, link.",
      he: "החלף את הכרטיסייה הזו באחד הפרויקטים שלך — תמונה, שם, קישור.",
      es: "Reemplaza esta tarjeta con uno de tus proyectos.",
    },
    url: "#",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80&auto=format&fit=crop",
    accent: "terracotta",
  },
  {
    id: "project-03",
    number: "03",
    category: { en: "SaaS · Dashboard", he: "SaaS · דשבורד", es: "SaaS · Panel" },
    title: "Project Three",
    description: {
      en: "Replace this card with one of your projects.",
      he: "החלף את הכרטיסייה הזו באחד הפרויקטים שלך.",
      es: "Reemplaza esta tarjeta con uno de tus proyectos.",
    },
    url: "#",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80&auto=format&fit=crop",
    accent: "blue",
  },
  {
    id: "project-04",
    number: "04",
    category: { en: "Hospitality · Restaurant", he: "אירוח · מסעדה", es: "Hostelería · Restaurante" },
    title: "Project Four",
    description: {
      en: "Replace this card with one of your projects.",
      he: "החלף את הכרטיסייה הזו באחד הפרויקטים שלך.",
      es: "Reemplaza esta tarjeta con uno de tus proyectos.",
    },
    url: "#",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&auto=format&fit=crop",
    accent: "navy",
  },
  {
    id: "project-05",
    number: "05",
    category: { en: "Branding · Studio", he: "מיתוג · סטודיו", es: "Branding · Estudio" },
    title: "Project Five",
    description: {
      en: "Replace this card with one of your projects.",
      he: "החלף את הכרטיסייה הזו באחד הפרויקטים שלך.",
      es: "Reemplaza esta tarjeta con uno de tus proyectos.",
    },
    url: "#",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1200&q=80&auto=format&fit=crop",
    accent: "olive",
  },
  {
    id: "project-06",
    number: "06",
    category: { en: "Personal · Portfolio", he: "אישי · פורטפוליו", es: "Personal · Portafolio" },
    title: "Project Six",
    description: {
      en: "Replace this card with one of your projects.",
      he: "החלף את הכרטיסייה הזו באחד הפרויקטים שלך.",
      es: "Reemplaza esta tarjeta con uno de tus proyectos.",
    },
    url: "#",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80&auto=format&fit=crop",
    accent: "terracotta",
  },
];

const accentClass: Record<PortfolioProject["accent"], string> = {
  navy: "bg-foreground",
  terracotta: "bg-terracotta",
  olive: "bg-olive",
  blue: "bg-primary",
};

export function PortfolioGrid() {
  const { lang } = useLanguage();
  const l = lang as "en" | "he" | "es";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {projects.map((p, i) => (
        <motion.a
          key={p.id}
          href={p.url}
          target={p.url !== "#" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="group relative block"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: (i % 2) * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Image frame */}
          <div className="relative aspect-[4/3] overflow-hidden bg-card rounded-sm">
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            {/* Accent triangle corner */}
            <div
              className={`absolute top-0 right-0 w-16 h-16 ${accentClass[p.accent]}`}
              style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            />
            {/* Number block */}
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-2.5 py-1 rounded-sm">
              <span className="text-[10px] font-body font-semibold tracking-[0.2em] text-foreground" dir="ltr">
                {p.number}
              </span>
            </div>
            {/* Hover overlay arrow */}
            <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          {/* Caption */}
          <div className="mt-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-body block mb-2">
                {p.category[l] ?? p.category.en}
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-medium tracking-tight group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed max-w-md">
                {p.description[l] ?? p.description.en}
              </p>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
