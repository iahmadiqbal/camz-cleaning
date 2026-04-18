import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { FaArrowRight, FaStar, FaShieldAlt, FaLeaf } from "react-icons/fa";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    badge: "✨ #1 Trusted Cleaners",
    title: "A spotless home,",
    accent: "delivered with care.",
    desc: "Book vetted, insured cleaning pros in under 60 seconds. Your home — sparkling clean.",
  },
  {
    image: hero2,
    badge: "👋 Friendly Pros",
    title: "Real people,",
    accent: "really good at clean.",
    desc: "Background-checked, trained, and rated 4.9★ by 12,000+ happy customers.",
  },
  {
    image: hero3,
    badge: "🏢 Office & Commercial",
    title: "Workspaces that",
    accent: "shine all week.",
    desc: "Daily, weekly, or custom commercial plans — keep your team productive in a pristine space.",
  },
];

export function HeroSlideshow() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = slides[idx];

  return (
    <section className="relative h-[640px] md:h-[720px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/90 via-deep-blue/70 to-deep-blue/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="max-w-2xl text-primary-foreground">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-sm font-medium mb-5 border border-white/20">
                {slide.badge}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                {slide.title} <br />
                <span className="bg-gradient-to-r from-soft-blue to-white bg-clip-text text-transparent">
                  {slide.accent}
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl opacity-90 max-w-lg">{slide.desc}</p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-deep-blue font-semibold shadow-2xl hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.5)] hover:scale-105 transition-all"
            >
              Book Now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="px-7 py-3.5 rounded-xl border-2 border-white/40 backdrop-blur hover:bg-white/10 transition-colors font-medium"
            >
              Learn more
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-6 text-sm"
          >
            {[
              { icon: FaStar, text: "4.9★ rating" },
              { icon: FaShieldAlt, text: "Fully insured" },
              { icon: FaLeaf, text: "Eco-friendly" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 opacity-90">
                <b.icon className="text-soft-blue" /> {b.text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-10 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
