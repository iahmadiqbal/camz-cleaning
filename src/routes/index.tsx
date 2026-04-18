import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Sparkles, Clock, Star } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { services, testimonials } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CAMZ Cleaning — Trusted Cleaning Services" },
      { name: "description", content: "Professional residential, commercial, carpet & vehicle cleaning. Book online in seconds." },
      { property: "og:title", content: "CAMZ Cleaning — Trusted Cleaning Services" },
      { property: "og:description", content: "Professional residential, commercial, carpet & vehicle cleaning. Book online in seconds." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <PageTransition direction="top">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] text-primary-foreground">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "radial-gradient(circle at 20% 30%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 40%)"
          }} />
          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-sm mb-5">
                <Sparkles className="w-4 h-4" /> Rated #1 cleaning service
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                A spotless space, <br />delivered with care.
              </h1>
              <p className="mt-5 text-lg opacity-90 max-w-lg">
                Book vetted, insured cleaning professionals in under 60 seconds.
                Homes, offices, carpets and cars — we do it all.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-deep-blue font-semibold shadow-[var(--shadow-elegant)] hover:scale-105 transition-transform">
                  Book Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/about" className="px-6 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition-colors font-medium">
                  Learn more
                </Link>
              </div>
              <div className="mt-10 flex gap-8 text-sm">
                <div><div className="text-2xl font-bold">12k+</div><div className="opacity-80">Happy clients</div></div>
                <div><div className="text-2xl font-bold">4.9★</div><div className="opacity-80">Avg rating</div></div>
                <div><div className="text-2xl font-bold">100%</div><div className="opacity-80">Insured</div></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative aspect-square rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-[var(--shadow-elegant)]">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {[Shield, Sparkles, Clock, Star].map((Icon, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="rounded-2xl bg-white/15 backdrop-blur p-6 flex flex-col justify-between"
                    >
                      <Icon className="w-8 h-8" />
                      <div className="text-sm font-medium">
                        {["Insured", "Eco friendly", "On time", "Top rated"][i]}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services preview */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-deep-blue">Our Services</h2>
            <p className="mt-3 text-muted-foreground">Pick the perfect cleaning solution for your needs.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to="/booking/$service" params={{ service: s.id }} className="block group h-full">
                  <div className="h-full rounded-2xl border border-border bg-card p-6 hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all">
                    <div className="text-4xl mb-4">{s.icon}</div>
                    <h3 className="font-semibold text-lg text-deep-blue group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">{s.price}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="bg-[image:var(--gradient-soft)] py-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-deep-blue">Why CAMZ?</h2>
              <p className="mt-4 text-muted-foreground">
                For over a decade we've helped families and businesses enjoy cleaner, healthier spaces.
                Our cleaners are background checked, fully insured and trained on the latest eco-friendly methods.
              </p>
              <ul className="mt-6 space-y-3">
                {["Background-checked professionals", "100% satisfaction guarantee", "Eco-friendly products", "Flexible scheduling"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary grid place-items-center text-primary-foreground text-xs">✓</div>
                    <span className="text-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {[
                { n: "12k+", l: "Bookings done" }, { n: "98%", l: "Repeat clients" },
                { n: "150+", l: "Trained cleaners" }, { n: "4.9★", l: "Average rating" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-card p-6 text-center shadow-[var(--shadow-card)]">
                  <div className="text-3xl font-bold text-primary">{s.n}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-blue text-center">What clients say</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex gap-1 text-yellow-500 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-foreground/90">"{t.text}"</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-[image:var(--gradient-hero)] text-primary-foreground p-10 md:p-16 text-center shadow-[var(--shadow-elegant)]"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Ready for a cleaner space?</h2>
            <p className="mt-3 opacity-90 max-w-lg mx-auto">Book your first cleaning today and enjoy 10% off.</p>
            <Link to="/services" className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-white text-deep-blue font-semibold hover:scale-105 transition-transform">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      </PageTransition>
    </SiteLayout>
  );
}
