import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";

const cards = [
  {
    label: "FOUNDER",
    title: "Al Joel",
    content: "Developer, designer, and digital strategist with a passion for building products that make a lasting impact.",
  },
  {
    label: "BASED IN",
    title: "Israel → Global",
    content: "Operating globally from Israel. We collaborate with clients across time zones to deliver world-class results.",
  },
  {
    label: "PHILOSOPHY",
    title: '"Less, but better."',
    content: "We strip away the unnecessary to reveal what truly matters — clarity, function, and beauty in every pixel.",
  },
  {
    label: "THE STACK",
    title: "Modern & Scalable",
    content: "Python, Java, and modern JavaScript frameworks. We choose the right tools for each project, never a one-size-fits-all approach.",
  },
];

export default function About() {
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
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">The Studio</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-6">
            Digital identity,<br />
            <span className="text-gradient italic">redefined.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg font-body leading-relaxed">
            A boutique studio focused on building digital products that are as purposeful as they are beautiful.
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
