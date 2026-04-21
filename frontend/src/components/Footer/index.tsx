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
          <p className="text-base opacity-80 leading-relaxed">Camz Cleaning delivers reliable, professional residential and commercial cleaning services focused on quality, consistency, and complete customer satisfaction across communities.</p>
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="text-sm font-semibold text-white mb-3">Follow us</p>
            <div className="flex gap-3">
            {[
              { Icon: FaInstagram, href: "https://www.instagram.com/camzcleaning", label: "Instagram" },
              { Icon: FaTwitter, href: "https://x.com/camzcleaning", label: "Twitter" },
              { Icon: FaFacebook, href: "https://www.facebook.com/Camzcleaning1", label: "Facebook" },
              { Icon: FaLinkedin, href: "https://www.linkedin.com/company/camzcleaning", label: "LinkedIn" },
              { Icon: FaYoutube, href: "https://www.youtube.com/@CamzCleaning", label: "YouTube" },
            ].map(({ Icon, href, label }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" aria-label={label} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 grid place-items-center transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Services</h4>
          <ul className="space-y-2.5 text-base">
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
          <ul className="space-y-2.5 text-base">
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
          <ul className="space-y-3 text-base opacity-80">
            <li>
              <a href="mailto:info@camzcleaning.com" className="flex items-center gap-2 hover:opacity-100 hover:text-soft-blue transition-all">
                <Mail className="w-4 h-4 flex-shrink-0" /> info@camzcleaning.com
              </a>
            </li>
            <li>
              <a href="tel:+15878371977" className="flex items-center gap-2 hover:opacity-100 hover:text-soft-blue transition-all">
                <Phone className="w-4 h-4 flex-shrink-0" /> +1 587-837-1977
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" /> Calgary, AB, Canada
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 flex-shrink-0 text-center text-xs">🕐</span> 9:00 AM – 5:00 PM
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
        <span className="text-white opacity-100">© 2025 CAMZ Cleaning. All rights reserved.</span>
        <Link to="/privacy-policy" className="text-white opacity-100 hover:text-soft-blue transition-all">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
