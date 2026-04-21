import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-deep-blue text-primary-foreground mt-8">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <img src="/images/transparentlogo.png" alt="CAMZ Cleaning" className="h-16 w-auto object-contain brightness-0 invert" />
          </div>
          <p className="text-sm opacity-80 leading-relaxed">Trusted cleaning professionals serving homes and businesses since 2013.</p>
          <div className="flex gap-3 mt-4">
            {[
              { Icon: FaInstagram, href: "https://www.instagram.com/camzcleaning" },
              { Icon: FaTwitter, href: "https://x.com/camzcleaning" },
              { Icon: FaFacebook, href: "https://www.facebook.com/Camzcleaning1" },
              { Icon: FaLinkedin, href: "https://www.linkedin.com/company/camzcleaning" },
              { Icon: FaYoutube, href: "https://www.youtube.com/@CamzCleaning" },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Services</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Residential Cleaning", to: "/booking/$service", params: { service: "residential" } },
              { label: "Commercial Cleaning", to: "/booking/$service", params: { service: "commercial" } },
              { label: "Move-In / Move-Out", to: "/booking/$service", params: { service: "move" } },
              { label: "Carpet & Sofa", to: "/booking/$service", params: { service: "carpet" } },
              { label: "Vehicle Detailing", to: "/booking/$service", params: { service: "vehicle" } },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  params={item.params}
                  className="opacity-70 hover:opacity-100 hover:text-soft-blue transition-all"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Company</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Home", to: "/" },
              { label: "About Us", to: "/about" },
              { label: "All Services", to: "/services" },
              { label: "Track Booking", to: "/tracking" },
              { label: "Login", to: "/login" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="opacity-70 hover:opacity-100 hover:text-soft-blue transition-all"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Contact</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li>
              <a href="tel:+15551234567" className="flex items-center gap-2 hover:opacity-100 hover:text-soft-blue transition-all">
                <Phone className="w-4 h-4 flex-shrink-0" /> (555) 123-4567
              </a>
            </li>
            <li>
              <a href="mailto:hello@camzcleaning.com" className="flex items-center gap-2 hover:opacity-100 hover:text-soft-blue transition-all">
                <Mail className="w-4 h-4 flex-shrink-0" /> hello@camzcleaning.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" /> 100 Clean St, Toronto, ON
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white">
        © 2025 CAMZ Cleaning. All rights reserved.
      </div>
    </footer>
  );
}
