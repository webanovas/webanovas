import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import siterixIcon from "@/assets/siterix-s-icon.png";

export function SiteLogo() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // On homepage: large centered logo that shrinks to corner on scroll
  // On other pages: always show small corner logo
  const scale = useTransform(scrollY, [0, 300], [1, 0]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const cornerOpacity = useTransform(scrollY, [150, 350], [0, 1]);

  return (
    <>
      {/* Large hero logo - only on homepage */}
      {isHome && (
        <motion.div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          style={{ scale, opacity }}
        >
          <Link to="/about" className="pointer-events-auto block">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-primary/30 shadow-xl shadow-primary/20 hover:scale-110 transition-transform duration-300">
              <img src={siterixIcon} alt="Siterix Studios" className="w-full h-full object-cover" />
            </div>
          </Link>
        </motion.div>
      )}

      {/* Small corner logo - appears on scroll (homepage) or always (other pages) */}
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
