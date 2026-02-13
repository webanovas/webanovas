import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import { useIsMobile } from "@/hooks/use-mobile";
import { Smartphone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <main className="min-h-screen px-4 md:px-6 pb-28">
      <div className="max-w-6xl mx-auto pt-24 md:pt-40">
        <motion.div
          className="mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="section-line" />
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">{t("lab.badge")}</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-display font-bold tracking-tight mb-4 md:mb-6">
            {t("lab.title1")}<span className="text-gradient italic">{t("lab.title2")}</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-body max-w-md leading-relaxed">
            {t("lab.subtitle")}
          </p>
        </motion.div>

        {isMobile && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-4 h-4 text-primary" />
              <span className="text-xs font-body font-medium text-primary uppercase tracking-[0.2em]">{t("lab.mobileExclusive")}</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <ShakeDetector />
              <GyroTilt />
              <SwipeCards />
            </div>
          </motion.div>
        )}

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
      <div className="max-w-6xl mx-auto mt-16 md:mt-24">
        <Footer />
      </div>
    </main>
  );
}
