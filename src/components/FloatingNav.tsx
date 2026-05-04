import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

// Smoothly scroll to an element with a small offset for fixed nav.
function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 8;
  window.scrollTo({ top, behavior: "smooth" });
}

type NavItem = { id?: string; to?: string; label: string };

function useNavItems(): NavItem[] {
  const { t } = useLanguage();
  return [
    { id: "home", label: t("nav.home") },
    { id: "services", label: t("nav.services") },
    { id: "work", label: t("nav.work") },
    { id: "process", label: t("nav.process") },
    { id: "about", label: t("nav.about") },
    { id: "pricing", label: t("nav.pricing") },
    { to: "/lab", label: t("nav.lab") },
  ];
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
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

function SectionLink({
  item,
  onClick,
  isHomePage,
  isActive,
  className,
  activeClass,
  inactiveClass,
}: {
  item: NavItem;
  onClick?: () => void;
  isHomePage: boolean;
  isActive: boolean;
  className: string;
  activeClass: string;
  inactiveClass: string;
}) {
  const navigate = useNavigate();

  if (item.to) {
    return (
      <NavLink
        to={item.to}
        onClick={onClick}
        className={({ isActive: routeActive }) =>
          cn(className, routeActive ? activeClass : inactiveClass)
        }
      >
        {item.label}
      </NavLink>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isHomePage) {
      navigate("/", { state: { scrollTo: item.id } });
    } else if (item.id) {
      smoothScrollTo(item.id);
    }
    onClick?.();
  };

  return (
    <a
      href={`/#${item.id}`}
      onClick={handleClick}
      className={cn(className, isActive ? activeClass : inactiveClass)}
    >
      {item.label}
    </a>
  );
}

function DesktopNav() {
  const { t } = useLanguage();
  const items = useNavItems();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const sectionIds = items.filter((i) => i.id).map((i) => i.id as string);
  const active = useActiveSection(sectionIds);

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 rounded-full bg-card/90 backdrop-blur-xl border border-border/40 px-2 py-2 shadow-2xl shadow-foreground/10">
        {items.map((item) => (
          <SectionLink
            key={item.id ?? item.to}
            item={item}
            isHomePage={isHomePage}
            isActive={isHomePage && item.id === active}
            className="px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 whitespace-nowrap"
            activeClass="bg-primary text-primary-foreground"
            inactiveClass="text-foreground/60 hover:text-foreground"
          />
        ))}
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            cn(
              "px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ml-1 whitespace-nowrap",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-foreground text-background hover:bg-foreground/90"
            )
          }
        >
          {t("nav.startProject")}
        </NavLink>
      </div>
    </nav>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const items = useNavItems();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const sectionIds = items.filter((i) => i.id).map((i) => i.id as string);
  const active = useActiveSection(sectionIds);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-[60] w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 transition-transform duration-300 hover:scale-105 active:scale-95"
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
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[55] bg-card/95 backdrop-blur-xl border-t border-border/40 rounded-t-3xl px-6 pb-8 pt-6"
            >
              <div className="w-10 h-1 rounded-full bg-foreground/20 mx-auto mb-6" />
              <div className="grid grid-cols-3 gap-3 mb-4">
                {items.map((item) => (
                  <SectionLink
                    key={item.id ?? item.to}
                    item={item}
                    isHomePage={isHomePage}
                    isActive={isHomePage && item.id === active}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center px-3 py-3 rounded-xl text-sm font-body font-medium transition-all duration-300 text-center"
                    activeClass="bg-primary text-primary-foreground"
                    inactiveClass="bg-secondary/60 text-foreground/70 hover:text-foreground"
                  />
                ))}
              </div>
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block w-full text-center px-5 py-3.5 rounded-xl text-sm font-body font-semibold transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  )
                }
              >
                {t("nav.startProject")}
              </NavLink>
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
