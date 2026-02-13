import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";

const projects = [
  {
    badge: "LUXURY REAL ESTATE",
    title: "Vanguard Estates",
    description: "A premium property showcase platform with immersive visuals, smooth animations, and an elegant browsing experience for high-end real estate.",
  },
  {
    badge: "AI / SAAS",
    title: "Nexus AI",
    description: "An intelligent SaaS dashboard featuring real-time analytics, AI-powered insights, and a sleek interface designed for modern data-driven teams.",
  },
  {
    badge: "CREATIVE",
    title: "The Artist Loft",
    description: "A bold creative portfolio with dynamic layouts, rich media galleries, and an expressive design that showcases artistic work beautifully.",
  },
];

export default function Work() {
  return (
    <main className="min-h-screen px-6 pb-28">
      <div className="max-w-5xl mx-auto pt-32">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
            Portfolio
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Selected Work.</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated collection of projects that reflect our commitment to quality and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div key={p.title} className="glass-card overflow-hidden hover:border-primary/30 transition-colors duration-300">
              <div className="h-48 bg-secondary/50 flex items-center justify-center text-muted-foreground text-sm">
                Preview
              </div>
              <div className="p-8">
                <Badge variant="secondary" className="mb-4 bg-primary/15 text-primary border-0 text-xs tracking-wider">
                  {p.badge}
                </Badge>
                <h3 className="text-xl font-semibold mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-24">
        <Footer />
      </div>
    </main>
  );
}
