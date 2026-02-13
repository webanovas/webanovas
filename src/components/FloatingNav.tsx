import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
  { to: "/lab", label: "Lab" },
];

export function FloatingNav() {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-2rem)]">
      <div className="flex items-center gap-1 rounded-full bg-secondary/80 backdrop-blur-xl border border-border/50 px-2 py-2 overflow-x-auto scrollbar-hide">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              cn(
                "px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0",
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
              "px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ml-1 whitespace-nowrap flex-shrink-0",
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
