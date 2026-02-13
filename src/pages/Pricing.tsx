import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const packages = [
  {
    tier: "STARTER",
    title: "Landing Page",
    price: "$800",
    description: "Perfect for businesses that need a strong online presence with a single, high-converting page.",
    features: [
      "Custom responsive design",
      "Up to 5 sections",
      "Contact form integration",
      "SEO optimization",
      "Mobile-first approach",
      "1 round of revisions",
    ],
    delivery: "5–7 days",
    popular: false,
  },
  {
    tier: "PROFESSIONAL",
    title: "Multi-Page Website",
    price: "$2,500",
    description: "A complete web experience with multiple pages, animations, and a premium feel that sets you apart.",
    features: [
      "Up to 8 custom pages",
      "Advanced animations & transitions",
      "CMS integration",
      "Performance optimization",
      "Analytics setup",
      "3 rounds of revisions",
      "Priority support",
    ],
    delivery: "2–3 weeks",
    popular: true,
  },
  {
    tier: "ENTERPRISE",
    title: "Web Application",
    price: "$5,000",
    description: "Full-scale web systems with backend logic, user authentication, dashboards, and complex functionality.",
    features: [
      "Custom web application",
      "Backend & database setup",
      "User authentication",
      "Admin dashboard",
      "API integrations",
      "Scalable architecture",
      "Ongoing support plan",
      "Unlimited revisions",
    ],
    delivery: "4–8 weeks",
    popular: false,
  },
];

export default function Pricing() {
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
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">Pricing</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-6">
            Investment<br />
            <span className="text-gradient italic">packages.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-xl">
            Transparent starting prices for every scope. Every project is unique — reach out for a tailored quote.
          </p>
        </motion.div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {packages.map((pkg) => (
            <StaggerItem key={pkg.tier}>
              <div className={`glass-card p-8 md:p-10 flex flex-col h-full relative ${pkg.popular ? "border-primary/40" : ""}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-8 px-4 py-1 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-body font-semibold rounded-full">
                    Most Popular
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
                  Delivery: <span className="text-foreground">{pkg.delivery}</span>
                </div>

                <Button asChild className={`w-full rounded-full gap-2 group ${pkg.popular ? "" : "variant-outline bg-secondary/50 border border-border/50 text-foreground hover:bg-secondary"}`}>
                  <Link to="/contact">
                    Get a Quote
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
          <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4">Need something custom?</h3>
          <p className="text-muted-foreground font-body mb-6 max-w-md mx-auto">
            Every project is different. Let's discuss your vision and we'll craft a proposal that fits your exact needs and budget.
          </p>
          <Button asChild size="lg" className="rounded-full px-8 gap-2 group">
            <Link to="/contact">
              Let's Talk
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
      <div className="max-w-6xl mx-auto mt-24">
        <Footer />
      </div>
    </main>
  );
}
