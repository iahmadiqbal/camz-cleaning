import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaArrowRight, FaCheckCircle, FaShieldAlt, FaClock, FaLeaf, FaFire,
  FaCar, FaCouch, FaHome, FaBuilding, FaBoxOpen,
} from "react-icons/fa";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { services, serviceCategories } from "@/lib/data";
const residentialImg = "/images/svc-residential.jpg";

const categoryIcons: Record<string, React.ElementType> = {
  vehicle: FaCar,
  specialty: FaCouch,
  residential: FaHome,
  commercial: FaBuilding,
};

const serviceIconMap: Record<string, React.ElementType> = {
  residential: FaHome,
  move: FaBoxOpen,
  commercial: FaBuilding,
  carpet: FaCouch,
  vehicle: FaCar,
};

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — CAMZ Cleaning" },
      { name: "description", content: "Choose from residential, move-out, commercial, carpet & vehicle cleaning services." },
    ],
  }),
  component: ServicesPage,
});

function CountUp({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const isDecimal = end % 1 !== 0;
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * end;
            setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.round(current));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("vehicle");

  const filtered = services.filter((s) => s.category === activeCategory);

  return (
    <SiteLayout>
      <PageTransition direction="left">
        {/* Hero Banner */}
        <section className="relative h-[420px] md:h-[520px] overflow-hidden">
          <img src={residentialImg} alt="CAMZ Cleaning Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/92 via-deep-blue/65 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-2xl text-primary-foreground">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-semibold tracking-wide"
                >
                  What We Offer
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
                >
                  Choose Your
                  <span className="block bg-gradient-to-r from-soft-blue to-white bg-clip-text text-transparent">
                    Perfect Service
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl opacity-85 max-w-lg mb-6 leading-relaxed"
                >
                  From homes to offices, carpets to cars — we have a professional cleaning plan for every need.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-4 text-sm"
                >
                  {[
                    { icon: FaShieldAlt, text: "Fully Insured" },
                    { icon: FaClock, text: "Book in 60s" },
                    { icon: FaLeaf, text: "Eco-Friendly" },
                  ].map((b) => (
                    <div key={b.text} className="flex items-center gap-2 text-white/80">
                      <b.icon className="text-soft-blue" /> {b.text}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-16">

          {/* Recommended Services — centered title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 justify-center mb-2">
                <FaFire className="text-orange-500 text-xl" />
                <h2 className="text-2xl font-bold text-deep-blue">Recommended Services</h2>
              </div>
              <p className="text-sm text-muted-foreground">Most popular picks by our customers</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {services.filter((s) => s.recommended).map((s, i) => {
                const SvcIcon = serviceIconMap[s.id];
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link to="/booking/$service" params={{ service: s.id }} className="block group">
                      <div className="rounded-2xl overflow-hidden border border-border bg-card hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all duration-300 flex gap-4 p-4 items-center">
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {SvcIcon && <SvcIcon className="text-primary text-base flex-shrink-0" />}
                            <h4 className="font-bold text-deep-blue text-sm group-hover:text-primary transition-colors truncate">{s.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="text-xs font-semibold text-primary">{s.price}</span>
                            <span className="text-xs text-muted-foreground">· {s.duration}</span>
                          </div>
                        </div>
                        <FaArrowRight className="text-primary text-xs flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Service Categories — centered title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-deep-blue">Service Categories</h2>
            <p className="text-sm text-muted-foreground mt-1">Browse by category to find the right service</p>
          </div>

          {/* Category tabs — centered */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {serviceCategories.map((cat) => {
              const Icon = categoryIcons[cat.id];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-card border border-border text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {Icon && <Icon className="text-base" />}
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Filtered service cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((s, i) => {
                const SvcIcon = serviceIconMap[s.id];
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8 }}
                  >
                    <Link to="/booking/$service" params={{ service: s.id }} className="block group h-full">
                      <div className="h-full rounded-2xl overflow-hidden border border-border bg-card hover:shadow-[var(--shadow-elegant)] transition-all flex flex-col">
                        <div className="aspect-video overflow-hidden relative">
                          <img
                            src={s.image}
                            alt={s.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/60 to-transparent" />
                          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-primary-foreground">
                            <span className="px-3 py-1 rounded-full bg-white/90 text-deep-blue text-xs font-bold">{s.price}</span>
                            <span className="px-3 py-1 rounded-full bg-deep-blue/80 text-white text-xs font-semibold">⏱ {s.duration}</span>
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center gap-3 mb-2">
                            {SvcIcon && <SvcIcon className="text-2xl text-primary" />}
                            <h3 className="font-bold text-xl text-deep-blue group-hover:text-primary transition-colors">{s.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{s.long}</p>
                          <ul className="mt-4 space-y-1.5 flex-1">
                            {s.features.map((f) => (
                              <li key={f} className="flex items-center gap-2 text-sm">
                                <FaCheckCircle className="text-primary text-xs flex-shrink-0" />
                                <span className="text-foreground/80">{f}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6 inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                            Book this service <FaArrowRight />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl bg-soft-blue p-8 grid sm:grid-cols-3 gap-6 text-center"
          >
            {[
              { end: 60, suffix: "s", label: "Average booking time", desc: "Book your service in under a minute" },
              { end: 24, suffix: "h", label: "Free cancellation", desc: "Cancel or reschedule anytime before" },
              { end: 100, suffix: "%", label: "Satisfaction guarantee", desc: "We re-clean for free if you're not happy" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <div className="text-4xl font-bold text-white mb-1">
                  <CountUp end={s.end} suffix={s.suffix} />
                </div>
                <div className="text-sm font-semibold text-white mt-1">{s.label}</div>
                <div className="text-xs text-white/80 mt-1">{s.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </PageTransition>
    </SiteLayout>
  );
}
