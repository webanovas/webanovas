import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import siterixIcon from "@/assets/siterix-s-icon.png";

export function SiteLogo() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.6]);
  const cornerOpacity = useTransform(scrollY, [200, 400], [0, 1]);

  return (
    <>
      {/* Large decorative logo on homepage hero */}
      {isHome && (
        <motion.div
          className="fixed top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none select-none"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden opacity-60">
            <img src={siterixIcon} alt="" className="w-full h-full object-cover" draggable={false} />
          </div>
        </motion.div>
      )}

      {/* Small corner logo - clickable, leads to about */}
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
    </>
  );
}
