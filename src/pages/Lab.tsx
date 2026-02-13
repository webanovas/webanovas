import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import { useIsMobile } from "@/hooks/use-mobile";
import { Smartphone } from "lucide-react";

import { ThemeSwitcher } from "@/components/lab/ThemeSwitcher";
import { MagneticButton } from "@/components/lab/MagneticButton";
import { TextScramble } from "@/components/lab/TextScramble";
import { TiltCard } from "@/components/lab/TiltCard";
import { ParticleTrail } from "@/components/lab/ParticleTrail";
import { ShakeDetector } from "@/components/lab/ShakeDetector";
import { GyroTilt } from "@/components/lab/GyroTilt";
import { SwipeCards } from "@/components/lab/SwipeCards";

export default function Lab() {
  const isMobile = useIsMobile();

  return (
    <main className="min-h-screen px-4 md:px-6 pb-28">
      <div className="max-w-5xl mx-auto pt-24 md:pt-32">
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 md:mb-6 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
            Playground
          </Badge>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-4 md:mb-6">The Lab.</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive experiments showcasing what we can build. Go ahead — play around.
          </p>
        </motion.div>

        {/* Mobile-only section */}
        {isMobile && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Mobile Exclusive</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <ShakeDetector />
              <GyroTilt />
              <SwipeCards />
            </div>
          </motion.div>
        )}

        {/* Desktop shows swipe cards too */}
        {!isMobile && (
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <StaggerItem className="md:col-span-2">
              <ThemeSwitcher />
            </StaggerItem>
            <StaggerItem>
              <MagneticButton />
            </StaggerItem>
            <StaggerItem>
              <TextScramble />
            </StaggerItem>
            <StaggerItem>
              <TiltCard />
            </StaggerItem>
            <StaggerItem>
              <ParticleTrail />
            </StaggerItem>
            <StaggerItem className="md:col-span-2">
              <SwipeCards />
            </StaggerItem>
          </StaggerChildren>
        )}

        {/* Mobile: show all experiments */}
        {isMobile && (
          <div className="grid grid-cols-1 gap-4">
            <ThemeSwitcher />
            <MagneticButton />
            <TextScramble />
            <TiltCard />
            <ParticleTrail />
          </div>
        )}
      </div>
      <div className="max-w-5xl mx-auto mt-16 md:mt-24">
        <Footer />
      </div>
    </main>
  );
}
