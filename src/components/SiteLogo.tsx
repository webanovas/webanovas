import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import siterixIcon from "@/assets/siterix-s-icon.png";

export function SiteLogo() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const cornerOpacity = useTransform(scrollY, [100, 300], [0, 1]);

  return (
    <motion.div
      className="fixed top-5 left-5 z-50"
      style={isHome ? { opacity: cornerOpacity } : undefined}
      initial={!isHome ? { opacity: 0, scale: 0.8 } : undefined}
      animate={!isHome ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/about"
        className="block w-10 h-10 rounded-full overflow-hidden border border-border/40 bg-card/80 backdrop-blur-xl shadow-lg hover:scale-110 transition-transform duration-200"
      >
        <img src={siterixIcon} alt="Siterix Studios" className="w-full h-full object-cover" />
      </Link>
    </motion.div>
  );
}

export function HeroLogoBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <motion.img
        src={siterixIcon}
        alt=""
        draggable={false}
        className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] object-cover opacity-[0.07]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.07, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
      />
    </div>
  );
}
