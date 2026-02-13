import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";

const services = [
  {
    badge: "FRONT-END",
    title: "Landing Pages",
    description: "High-converting, beautifully crafted landing pages designed to make an unforgettable first impression. Responsive, fast, and optimized for results.",
  },
  {
    badge: "FULL-STACK",
    title: "Web Systems",
    description: "Complete web applications built from the ground up. From user dashboards to complex platforms — scalable architecture that grows with your business.",
  },
  {
    badge: "OPTIMIZATION",
    title: "Performance",
    description: "Speed audits, Core Web Vitals optimization, and infrastructure tuning. We make your existing products faster and more reliable.",
  },
];

export default function Services() {
  return (
    <main className="min-h-screen px-6 pb-28">
      <div className="max-w-5xl mx-auto pt-32">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
            What We Do
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Expertise.</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Focused services designed to deliver exceptional digital products with clarity and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.badge} className="glass-card p-8 hover:border-primary/30 transition-colors duration-300">
              <Badge variant="secondary" className="mb-4 bg-primary/15 text-primary border-0 text-xs tracking-wider">
                {s.badge}
              </Badge>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
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
