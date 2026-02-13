import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { Progress } from "@/components/ui/progress";

const phases = [
  {
    phase: "Phase 01",
    percent: 25,
    title: "Discovery",
    description: "We dive deep into your vision, goals, and audience. Through research and strategic planning, we define the project scope, create wireframes, and establish the creative direction.",
  },
  {
    phase: "Phase 02",
    percent: 50,
    title: "Development",
    description: "Where concepts become reality. Our engineers build your product with clean code, modern frameworks, and meticulous attention to detail — ensuring performance at every step.",
  },
  {
    phase: "Phase 03",
    percent: 25,
    title: "Deployment",
    description: "We rigorously test, optimize, and launch your product. Post-launch, we monitor performance and provide support to ensure everything runs flawlessly.",
  },
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen px-6 pb-28">
      <div className="max-w-5xl mx-auto pt-32">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
            How We Work
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">The Playbook.</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A structured, transparent workflow designed to deliver exceptional results on time and within scope.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {phases.map((p) => (
            <div key={p.phase} className="glass-card p-8 hover:border-primary/30 transition-colors duration-300">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="bg-primary/15 text-primary border-0 text-xs tracking-wider">
                  {p.phase}
                </Badge>
                <span className="text-xs text-muted-foreground">{p.percent}%</span>
              </div>
              <Progress value={p.percent} className="mb-5 h-1.5 bg-secondary" />
              <h3 className="text-xl font-semibold mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
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
