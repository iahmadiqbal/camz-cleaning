import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaCheckCircle, FaShieldAlt, FaClock, FaLeaf } from "react-icons/fa";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { services } from "@/lib/data";
import carpetImg from "@/assets/svc-carpet.jpg";

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
          const steps = 50;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const current = (end / steps) * step;
            if (step >= steps) { setCount(end); clearInterval(timer); }
            else setCount(parseFloat(current.toFixed(1)));
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref}>{count}{suffix}</span>;
}

function ServicesPage() {
  return (
    <SiteLayout>
      <PageTransition direction="left">
        {/* Hero Banner with unique image */}
        <section className="relative h-[420px] md:h-[520px] overflow-hidden">
          <img
            src={carpetImg}
            alt="CAMZ Cleaning Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/80 via-deep-blue/60 to-deep-blue/80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-primary-foreground px-6 max-w-3xl">
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
                className="text-lg md:text-xl opacity-90 max-w-xl mx-auto mb-6"
              >
                From homes to offices, carpets to cars — we have a professional cleaning plan for every need.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 justify-center text-sm"
              >
                {[
                  { icon: FaShieldAlt, text: "Fully Insured" },
                  { icon: FaClock, text: "Book in 60s" },
                  { icon: FaLeaf, text: "Eco-Friendly" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                    <b.icon className="text-soft-blue" /> {b.text}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
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
                        <span className="text-4xl drop-shadow-lg">{s.icon}</span>
                        <span className="px-3 py-1 rounded-full bg-white/90 text-deep-blue text-xs font-bold">{s.price}</span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-xl text-deep-blue group-hover:text-primary transition-colors">{s.title}</h3>
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
            ))}
          </div>

          {/* Trust strip with animated counters */}
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
                <div className="text-4xl font-bold text-deep-blue mb-1">
                  <CountUp end={s.end} suffix={s.suffix} />
                </div>
                <div className="text-sm font-semibold text-deep-blue mt-1">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </PageTransition>
    </SiteLayout>
  );
}
