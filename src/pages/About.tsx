import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { User, MapPin, Lightbulb, Code } from "lucide-react";

const cards = [
  {
    icon: User,
    title: "Founder",
    content: "Ben Gale — Developer, designer, and digital strategist with a passion for building products that make an impact.",
  },
  {
    icon: MapPin,
    title: "Based In",
    content: "Israel, operating globally. We collaborate with clients and teams across time zones to deliver world-class results.",
  },
  {
    icon: Lightbulb,
    title: "Our Philosophy",
    content: '"Less, but better." We believe in stripping away the unnecessary to reveal what truly matters — clarity, function, and beauty.',
  },
  {
    icon: Code,
    title: "The Stack",
    content: "Python, Java, and modern JavaScript frameworks. We choose the right tools for each project, never forcing a one-size-fits-all approach.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen px-6 pb-28">
      <div className="max-w-5xl mx-auto pt-32">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
            The Studio
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Digital identity,
            <br />
            <span className="text-muted-foreground">redefined.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A boutique studio focused on building digital products that are as purposeful as they are beautiful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((c) => (
            <div key={c.title} className="glass-card p-8 hover:border-primary/30 transition-colors duration-300">
              <c.icon className="w-5 h-5 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{c.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.content}</p>
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
