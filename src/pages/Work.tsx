import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";

import vanguardImg from "@/assets/work-vanguard.jpg";
import nexusImg from "@/assets/work-nexus.jpg";
import artistImg from "@/assets/work-artist.jpg";

const projects = [
  {
    category: "LUXURY REAL ESTATE",
    title: "Vanguard Estates",
    description: "A premium property showcase platform with immersive visuals, smooth animations, and an elegant browsing experience.",
    year: "2025",
    image: vanguardImg,
  },
  {
    category: "AI / SAAS",
    title: "Nexus AI",
    description: "An intelligent SaaS dashboard featuring real-time analytics, AI-powered insights, and a sleek modern interface.",
    year: "2025",
    image: nexusImg,
  },
  {
    category: "CREATIVE",
    title: "The Artist Loft",
    description: "A bold creative portfolio with dynamic layouts, rich media galleries, and an expressive artistic design.",
    year: "2024",
    image: artistImg,
  },
];

export default function Work() {
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
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">Portfolio</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-6">
            Selected<br />
            <span className="text-gradient italic">work.</span>
          </h1>
        </motion.div>

        <StaggerChildren className="space-y-6">
          {projects.map((p, i) => (
            <StaggerItem key={p.title}>
              <div className="glass-card overflow-hidden group">
                <div className="h-56 md:h-72 relative overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                  <span className="text-[120px] md:text-[200px] font-display font-bold absolute -right-4 -bottom-12 text-foreground/[0.03] leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-body">{p.category}</span>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl md:text-3xl font-display font-semibold">{p.title}</h3>
                    <span className="text-xs text-muted-foreground font-body">{p.year}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body max-w-lg">{p.description}</p>
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
