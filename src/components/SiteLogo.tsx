import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import siterixIcon from "@/assets/siterix-s-icon.png";
import { useLanguage } from "@/i18n/LanguageContext";

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
        className="block w-11 h-11 hover:scale-110 transition-transform duration-200"
      >
        <img src={siterixIcon} alt="Siterix Studios" className="w-full h-full object-contain" />
      </Link>
    </motion.div>
  );
}

export function HeroLogoBackground() {
  const { dir } = useLanguage();
  const isRtl = dir === "rtl";

  return (
    <div
      className={`absolute inset-0 flex items-center pointer-events-none select-none overflow-visible ${
        isRtl ? "justify-start" : "justify-end"
      }`}
    >
      <motion.img
        src={siterixIcon}
        alt=""
        draggable={false}
        className={`w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[520px] lg:h-[520px] object-contain opacity-[0.15] ${
          isRtl ? "-translate-x-1/4" : "translate-x-1/4"
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
      />
    </div>
  );
}
