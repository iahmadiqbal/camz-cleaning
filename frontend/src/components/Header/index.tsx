import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/tracking", label: "Tracking" },
  { to: "/admin/login", label: "Admin" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img src="/images/cleaninglogo.png" alt="CAMZ Cleaning" className="w-[90px] h-[90px] object-contain scale-[2.2] group-hover:scale-[2.4] transition-transform" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-white hover:bg-primary transition-colors rounded-md"
              activeProps={{ className: "!text-white !bg-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/login" className="ml-1 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-white hover:bg-primary transition-colors rounded-md">
            Login
          </Link>
          <Link
            to="/services"
            className="ml-2 px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm shadow-lg hover:bg-primary/90 hover:scale-105 transition-all"
          >
            Book Now
          </Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden border-t border-border bg-background"
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-white hover:bg-primary transition-colors"
                activeProps={{ className: "!text-white !bg-primary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-white hover:bg-primary transition-colors">Login</Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
