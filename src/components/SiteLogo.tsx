import { Link } from "react-router-dom";
import siterixIcon from "@/assets/siterix-s-icon.png";

export function SiteLogo() {
  return (
    <Link
      to="/"
      className="fixed top-5 left-5 z-50 w-10 h-10 rounded-full overflow-hidden border border-border/40 bg-card/80 backdrop-blur-xl shadow-lg hover:scale-110 transition-transform duration-200"
    >
      <img src={siterixIcon} alt="Siterix Studios" className="w-full h-full object-cover" />
    </Link>
  );
}
