import { useLanguage } from "@/i18n/LanguageContext";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/30 pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-2xl font-display font-bold text-gradient">Siterix Studio</h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs">
            A boutique studio crafting high-performance digital products with precision and purpose.
          </p>
          <a
            href="mailto:siterixstudios@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            siterixstudios@gmail.com
          </a>
          <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
            <MapPin className="w-4 h-4" />
            Israel · Worldwide
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <h4 className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground">Navigation</h4>
          <nav className="flex flex-col gap-2.5">
            {[
              { to: "/", label: t("nav.home") },
              { to: "/services", label: t("nav.services") },
              { to: "/work", label: t("nav.work") },
              { to: "/process", label: t("nav.process") },
              { to: "/pricing", label: t("nav.pricing") },
              { to: "/about", label: t("nav.about") },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <h4 className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground">Start a Project</h4>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            Have an idea? Let's bring it to life together.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-body font-semibold text-primary hover:text-primary/80 transition-colors group"
          >
            Get in Touch
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl-flip" />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground font-body tracking-[0.1em]">
          © {year} Siterix Studio. {t("footer.rights")}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-muted-foreground font-body tracking-[0.1em]">Available for {year}</span>
        </div>
      </div>
    </footer>
  );
}
