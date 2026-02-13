import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
  { to: "/pricing", label: "Pricing" },
  { to: "/lab", label: "Lab" },
];

function DesktopNav() {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 rounded-full bg-card/90 backdrop-blur-xl border border-border/40 px-2 py-2 shadow-2xl shadow-black/40">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              cn(
                "px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 whitespace-nowrap",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            cn(
              "px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ml-1 whitespace-nowrap",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-foreground text-background hover:bg-foreground/90"
            )
          }
        >
          Start Project
        </NavLink>
      </div>
    </nav>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);

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
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center justify-center px-3 py-3 rounded-xl text-sm font-body font-medium transition-all duration-200 text-center",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/60 text-muted-foreground hover:text-foreground"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block w-full text-center px-5 py-3.5 rounded-xl text-sm font-body font-semibold transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  )
                }
              >
                Start Project
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
