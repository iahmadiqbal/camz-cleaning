import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaArrowRight, FaCheckCircle, FaShieldAlt, FaClock, FaLeaf,
  FaCar, FaCouch, FaHome, FaBuilding, FaBoxOpen, FaSearch, FaTimes,
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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = (() => {
    const q = searchQuery.trim().toLowerCase();
    let list = activeCategory ? services.filter((s) => s.category === activeCategory) : services;
    if (q) {
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.desc.toLowerCase().includes(q) ||
          s.features.some((f) => f.toLowerCase().includes(q)) ||
          (s.long && s.long.toLowerCase().includes(q))
      );
    }
    return list;
  })();

  const showResults = !!activeCategory || searchQuery.trim().length > 0;

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

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-xl mx-auto mb-10"
          >
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, e.g. carpet, move-out, vehicle…"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-card text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              >
                <FaTimes className="text-sm" />
              </button>
            )}
          </motion.div>

          {/* Service Categories — same as home page */}
          <div className="text-center mb-10">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Browse by type</span>
            <h2 className="mt-2 text-3xl font-bold text-deep-blue">Service Categories</h2>
            <p className="text-muted-foreground mt-2 text-sm">Pick a category to explore what we offer</p>
          </div>

          {/* 4 big category cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {serviceCategories.map((cat, i) => {
              const Icon = categoryIcons[cat.id];
              const bgClass = { vehicle: "bg-[image:var(--gradient-hero)]", specialty: "bg-deep-blue", residential: "bg-primary", commercial: "bg-soft-blue" }[cat.id] ?? "bg-primary";
              const desc = { vehicle: "Auto detailing & car cleaning", specialty: "Carpet, sofa & move-in/out", residential: "Homes & apartments", commercial: "Offices, retail & clinics" }[cat.id] ?? "";
              const count = services.filter((s) => s.category === cat.id).length;
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 ${bgClass} ${
                    isActive ? "ring-2 ring-offset-2 ring-primary shadow-xl scale-[1.02]" : "hover:shadow-lg hover:-translate-y-1"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/20 grid place-items-center mb-4">
                    {Icon && <Icon className="text-white text-2xl" />}
                  </div>
                  <div className="font-bold text-white text-lg leading-tight">{cat.label}</div>
                  <div className="text-white/75 text-xs mt-1">{desc}</div>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/90 bg-white/20 px-2.5 py-1 rounded-full">
                    {count} service{count !== 1 ? "s" : ""}
                  </div>
                  {isActive && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white grid place-items-center">
                      <FaCheckCircle className="text-primary text-sm" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Filtered service cards */}
          <AnimatePresence mode="wait">
            {showResults && (
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {filtered.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <FaSearch className="mx-auto text-3xl mb-3 opacity-30" />
                    <p className="text-sm">No services found for "<span className="font-semibold text-foreground">{searchQuery}</span>"</p>
                    <button
                      onClick={() => { setSearchQuery(""); setActiveCategory(null); }}
                      className="mt-3 text-xs text-primary underline underline-offset-2"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {filtered.map((s, i) => {
                      const SvcIcon = serviceIconMap[s.id];
                      return (
                        <motion.div
                          key={s.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                        >
                          <Link to="/booking/$service" params={{ service: s.id }} className="block group h-full">
                            <div className="h-full rounded-2xl overflow-hidden bg-card border border-border hover:shadow-[var(--shadow-elegant)] hover:-translate-y-2 transition-all duration-300">
                              <div className="aspect-[4/3] overflow-hidden relative">
                                <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-deep-blue">{s.price}</div>
                                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-deep-blue/80 backdrop-blur text-xs font-semibold text-white">⏱ {s.duration}</div>
                              </div>
                              <div className="p-6">
                                <div className="flex items-center gap-3">
                                  {SvcIcon && <SvcIcon className="text-2xl text-primary" />}
                                  <h3 className="font-bold text-lg text-deep-blue group-hover:text-primary transition-colors">{s.title}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                                <ul className="mt-3 space-y-1">
                                  {s.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-xs text-foreground/70">
                                      <FaCheckCircle className="text-primary flex-shrink-0 text-xs" />{f}
                                    </li>
                                  ))}
                                </ul>
                                <div className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm">
                                  Book now <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
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
