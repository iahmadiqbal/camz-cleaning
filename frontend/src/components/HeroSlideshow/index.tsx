import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { FaShieldHalved, FaLeaf, FaClock } from "react-icons/fa6";

const slides = [
  {
    image: "/images/hero-1.jpg",
    tag: "Residential Cleaning",
    title: "A spotless home,",
    accent: "delivered with care.",
    desc: "Book vetted, insured cleaning pros in under 60 seconds. Your home — sparkling clean.",
  },
  {
    image: "/images/hero-3.jpg",
    tag: "Commercial Cleaning",
    title: "Workspaces that",
    accent: "shine all week.",
    desc: "Daily, weekly, or custom commercial plans — keep your team productive in a pristine space.",
  },
  {
    image: "/images/hero-2.jpg",
    tag: "Move-In / Move-Out",
    title: "Stress-free moves,",
    accent: "spotless spaces.",
    desc: "Get every deposit dollar back. We deep clean every nook so your old place sparkles.",
  },
];

const badges = [
  { icon: FaShieldHalved, text: "Fully Insured" },
  { icon: FaClock, text: "Book in 60s" },
  { icon: FaLeaf, text: "Eco-Friendly" },
];

export function HeroSlideshow() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = slides[idx];

  return (
    <section className="relative h-[680px] md:h-[760px] overflow-hidden" style={{ maxWidth: "100vw" }}>
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/92 via-deep-blue/65 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content — left aligned */}
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
              {/* Tag */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-semibold tracking-wide"
              >
                {slide.tag}
              </motion.span>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                {slide.title}
                <br />
                <span className="bg-gradient-to-r from-soft-blue to-white bg-clip-text text-transparent">
                  {slide.accent}
                </span>
              </h1>

              <p className="mt-5 text-lg md:text-xl opacity-85 max-w-lg leading-relaxed">
                {slide.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3 items-center"
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-deep-blue font-bold text-base shadow-2xl hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.4)] hover:scale-105 transition-all"
            >
              Book Now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+15878371977"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border-2 border-white/35 backdrop-blur hover:bg-white/10 transition-colors font-medium text-base"
            >
              <FaPhoneAlt className="text-soft-blue" />
              +1 587-837-1977
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            {badges.map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-sm text-white/80">
                <b.icon className="text-soft-blue text-base" />
                {b.text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-6 md:left-[calc((100vw-80rem)/2+1.5rem)] flex gap-2 z-10">
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
