import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

type NavItem = { id: string; label: string; href: string };

function useNavLinks(): NavItem[] {
  const { t } = useLanguage();
  return [
    { id: "home", label: t("nav.home"), href: "#home" },
    { id: "services", label: t("nav.services"), href: "#services" },
    { id: "work", label: t("nav.work"), href: "#work" },
    { id: "process", label: t("nav.process"), href: "#process" },
    { id: "pricing", label: t("nav.pricing"), href: "#pricing" },
    { id: "about", label: t("nav.about"), href: "#about" },
  ];
}

/** Tracks which section id is currently in view */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive((visible[0].target as HTMLElement).id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids.join(",")]);
  return active;
}

function smoothScrollTo(id: string, navigate: (p: string) => void, isHome: boolean) {
  if (!isHome) {
    navigate("/#" + id);
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function DesktopNav() {
  const links = useNavLinks();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const active = useActiveSection(links.map((l) => l.id));

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 rounded-full bg-foreground/95 backdrop-blur-xl border border-foreground/20 px-2 py-2 shadow-2xl shadow-foreground/20">
        {links.map((link) => {
          const isActive = isHome && active === link.id;
          return (
            <button
              key={link.id}
              onClick={() => smoothScrollTo(link.id, navigate, isHome)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 whitespace-nowrap",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-background/70 hover:text-background"
              )}
            >
              {link.label}
            </button>
          );
        })}
        <NavLink
          to="/lab"
          className={({ isActive }) =>
            cn(
              "px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 whitespace-nowrap",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-background/70 hover:text-background"
            )
          }
        >
          {t("nav.lab")}
        </NavLink>
        <button
          onClick={() => smoothScrollTo("contact", navigate, isHome)}
          className="px-5 py-2 rounded-full text-sm font-body font-medium ml-1 whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
        >
          {t("nav.startProject")}
        </button>
      </div>
    </nav>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const links = useNavLinks();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleClick = (id: string) => {
    setOpen(false);
    setTimeout(() => smoothScrollTo(id, navigate, isHome), 250);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-[60] w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30"
        aria-label="Toggle navigation"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.nav
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[55] bg-card/95 backdrop-blur-xl border-t border-border/40 rounded-t-3xl px-6 pb-8 pt-6"
            >
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30 mx-auto mb-6" />
              <div className="grid grid-cols-3 gap-3 mb-4">
                {links.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleClick(link.id)}
                    className="flex items-center justify-center px-3 py-3 rounded-xl text-sm font-body font-medium bg-secondary/60 text-muted-foreground hover:text-foreground transition-all"
                  >
                    {link.label}
                  </button>
                ))}
                <NavLink
                  to="/lab"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-center px-3 py-3 rounded-xl text-sm font-body font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/60 text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  {t("nav.lab")}
                </NavLink>
              </div>
              <button
                onClick={() => handleClick("contact")}
                className="block w-full text-center px-5 py-3.5 rounded-xl text-sm font-body font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all"
              >
                {t("nav.startProject")}
              </button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function FloatingNav() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileNav /> : <DesktopNav />;
}
