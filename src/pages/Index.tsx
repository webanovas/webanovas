import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap, Palette, Server, Target } from "lucide-react";

const features = [
  {
    icon: Zap,
    badge: "PERFORMANCE",
    title: "Built for Speed",
    description: "Every millisecond counts. We engineer experiences that load instantly and perform flawlessly at any scale.",
  },
  {
    icon: Palette,
    badge: "UI / UX",
    title: "Pixel-Perfect Design",
    description: "Interfaces that captivate. We craft visual experiences that feel intuitive and look extraordinary.",
  },
  {
    icon: Server,
    badge: "BACKEND",
    title: "Robust Architecture",
    description: "Solid foundations for complex systems. Scalable, secure, and built to handle real-world demands.",
  },
  {
    icon: Target,
    badge: "STRATEGY",
    title: "Purpose-Driven",
    description: "Every decision backed by strategy. We align technology with your business goals for measurable impact.",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen px-6 pb-28">
      <div className="max-w-5xl mx-auto pt-32">
        {/* Hero */}
        <div className="text-center mb-24">
          <Badge className="mb-6 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
            Available for 2026
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Digital purity.
            <br />
            <span className="text-muted-foreground">Engineered for scale.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            We are a boutique web development studio crafting high-performance digital products with precision and purpose.
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/work">View Selection</Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f) => (
            <div key={f.badge} className="glass-card p-8 group hover:border-primary/30 transition-colors duration-300">
              <Badge variant="secondary" className="mb-4 bg-primary/15 text-primary border-0 text-xs tracking-wider">
                {f.badge}
              </Badge>
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Index;
