import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen px-6 pb-28">
      <div className="max-w-2xl mx-auto pt-32">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
            Let's Talk
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Start a Project.</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Have an idea? Let's bring it to life. Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>

        <form
          className="glass-card p-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "mailto:hello@webanovas.com";
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" className="bg-secondary/50 border-border/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" className="bg-secondary/50 border-border/50" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Tell us about your project</Label>
            <Textarea id="message" placeholder="Describe your project, goals, and timeline..." rows={5} className="bg-secondary/50 border-border/50" />
          </div>
          <Button type="submit" size="lg" className="w-full rounded-full">
            Send Message <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </form>
      </div>
      <div className="max-w-5xl mx-auto mt-24">
        <Footer />
      </div>
    </main>
  );
}
