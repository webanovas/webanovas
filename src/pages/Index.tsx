import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "<1s", label: "Avg. Load Time" },
  { value: "24/7", label: "Global Support" },
];

const features = [
  {
    number: "01",
    title: "Performance",
    description: "Every millisecond counts. We engineer experiences that load instantly and perform flawlessly at any scale.",
  },
  {
    number: "02",
    title: "Design",
    description: "Interfaces that captivate. We craft visual experiences that feel intuitive and look extraordinary.",
  },
  {
    number: "03",
    title: "Architecture",
    description: "Solid foundations for complex systems. Scalable, secure, and built to handle real-world demands.",
  },
  {
    number: "04",
    title: "Strategy",
    description: "Every decision backed by purpose. We align technology with your business goals for measurable impact.",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen px-6 pb-28">
      <div className="max-w-6xl mx-auto pt-28 md:pt-40">
        {/* Hero */}
        <motion.div
          className="mb-32 md:mb-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="section-line" />
              <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
                Available for 2026
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight leading-[0.9] mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Digital
            <br />
            <span className="text-gradient italic">excellence.</span>
          </motion.h1>

          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed font-body">
              A boutique studio crafting high-performance digital products with precision, purpose, and an obsessive attention to detail.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 gap-3 group w-fit">
              <Link to="/work">
                View Work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px mb-32 md:mb-40 border border-border/40 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card/60 p-8 text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-12">
            <div className="section-line" />
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
              What We Do
            </span>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border/40 rounded-xl overflow-hidden">
            {features.map((f) => (
              <StaggerItem key={f.number}>
                <div className="bg-card/60 p-10 md:p-12 h-full group cursor-default transition-colors duration-500 hover:bg-card">
                  <span className="text-xs font-body text-primary tracking-[0.3em] mb-6 block">{f.number}</span>
                  <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4 transition-colors duration-300 group-hover:text-gradient">
                    {f.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">{f.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </main>
  );
};

export default Index;
