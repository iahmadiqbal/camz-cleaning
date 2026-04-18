import { Sparkles, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-deep-blue text-primary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold">CAMZ Cleaning</span>
          </div>
          <p className="text-sm opacity-80">Trusted cleaning professionals serving homes and businesses since 2013.</p>
          <div className="flex gap-3 mt-4">
            {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Residential</li><li>Commercial</li><li>Move-In / Out</li><li>Carpet & Sofa</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>About</li><li>Careers</li><li>Blog</li><li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 123-4567</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@camzcleaning.com</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 100 Clean St.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs opacity-70">
        © 2025 CAMZ Cleaning. All rights reserved.
      </div>
    </footer>
  );
}
