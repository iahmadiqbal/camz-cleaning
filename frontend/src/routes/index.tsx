import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaShieldAlt,
  FaLeaf,
  FaClock,
  FaStar,
  FaCheckCircle,
  FaPhoneAlt,
  FaCalendarCheck,
  FaSprayCan,
  FaSmile,
} from "react-icons/fa";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { services, testimonials } from "@/lib/data";
import teamImg from "@/assets/team.jpg";
import ecoImg from "@/assets/eco.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CAMZ Cleaning — Trusted Cleaning Services" },
      { name: "description", content: "Professional residential, commercial, carpet & vehicle cleaning. Book online in under 60 seconds." },
      { property: "og:title", content: "CAMZ Cleaning — Trusted Cleaning Services" },
      { property: "og:description", content: "Professional cleaning, eco-friendly products, vetted pros. Book in 60 seconds." },
    ],
  }),
  component: Home,
});

const stats = [
  { icon: FaSmile, n: "12k+", l: "Happy clients" },
  { icon: FaSprayCan, n: "25k+", l: "Jobs completed" },
  { icon: FaStar, n: "4.9★", l: "Average rating" },
  { icon: FaShieldAlt, n: "100%", l: "Insured" },
];

const steps = [
  { icon: FaPhoneAlt, title: "1. Choose service", desc: "Pick from 5 expert services tailored for any space." },
  { icon: FaCalendarCheck, title: "2. Book a slot", desc: "Pick a date & time that works — instant confirmation." },
  { icon: FaSprayCan, title: "3. We clean it", desc: "Our vetted pros arrive on time with eco-safe supplies." },
  { icon: FaSmile, title: "4. Enjoy", desc: "Relax in your spotless space — satisfaction guaranteed." },
];

function Home() {
  return (
    <SiteLayout>
      <PageTransition direction="fade">
        <HeroSlideshow />

        {/* Stats strip */}
        <section className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-soft-blue grid place-items-center text-primary text-xl">
                  <s.icon />
                </div>
                <div>
                  <div className="text-2xl font-bold text-deep-blue">{s.n}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services preview with images */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">What we do</span>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold text-deep-blue">Services tailored to you</h2>
            <p className="mt-4 text-muted-foreground">From cozy apartments to large offices — we have the right plan.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link to="/booking/$service" params={{ service: s.id }} className="block group h-full">
                  <div className="h-full rounded-2xl overflow-hidden bg-card border border-border hover:shadow-[var(--shadow-elegant)] hover:-translate-y-2 transition-all duration-300">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-deep-blue">
                        {s.price}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{s.icon}</span>
                        <h3 className="font-bold text-lg text-deep-blue group-hover:text-primary transition-colors">{s.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                      <div className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm">
                        Book now <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-[image:var(--gradient-soft)] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">How it works</span>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold text-deep-blue">Booking in 4 simple steps</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative bg-card rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[image:var(--gradient-hero)] grid place-items-center text-primary-foreground text-xl shadow-lg mb-4">
                    <s.icon />
                  </div>
                  <h3 className="font-bold text-deep-blue">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us with team image */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Why CAMZ</span>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold text-deep-blue">Cleaners you can trust</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                For over a decade we've helped families and businesses enjoy cleaner, healthier spaces.
                Every cleaner is background-checked, fully insured and trained on the latest eco-friendly methods.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Background-checked & insured pros",
                  "100% satisfaction guarantee",
                  "Eco-friendly, pet-safe products",
                  "Flexible scheduling 7 days/week",
                  "Easy online booking & rescheduling",
                ].map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-primary text-lg flex-shrink-0" />
                    <span className="text-foreground">{t}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]">
                <img src={teamImg} alt="Our cleaning team" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-5 shadow-[var(--shadow-elegant)] border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground grid place-items-center text-xl">
                    <FaShieldAlt />
                  </div>
                  <div>
                    <div className="font-bold text-deep-blue">150+ Pros</div>
                    <div className="text-xs text-muted-foreground">All vetted & insured</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Eco section */}
        <section className="bg-soft-blue py-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]"
            >
              <img src={ecoImg} alt="Eco-friendly products" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <FaLeaf className="text-primary text-4xl mb-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-deep-blue">Eco-friendly. Pet & kid safe.</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                We only use plant-based, biodegradable cleaning products. Tough on grime, gentle on your family
                and the planet. No harsh chemicals — ever.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {["100% Natural", "Zero Harsh\nChemicals", "Biodegradable"].map((t) => (
                  <div key={t} className="bg-card rounded-xl p-4 text-center shadow-[var(--shadow-card)]">
                    <FaCheckCircle className="text-primary mx-auto mb-2" />
                    <div className="text-xs font-semibold text-deep-blue whitespace-pre-line">{t}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Reviews</span>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold text-deep-blue">Loved by 12,000+ clients</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow"
              >
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => <FaStar key={j} />)}
                </div>
                <p className="text-foreground/90 italic">"{t.text}"</p>
                <div className="mt-5 pt-5 border-t border-border flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground grid place-items-center font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-deep-blue">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] text-primary-foreground p-10 md:p-16 text-center shadow-[var(--shadow-elegant)]"
          >
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "radial-gradient(circle at 20% 30%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 40%)"
            }} />
            <div className="relative">
              <FaClock className="mx-auto text-3xl mb-4 opacity-90" />
              <h2 className="text-3xl md:text-5xl font-bold">Ready for a cleaner space?</h2>
              <p className="mt-4 opacity-90 text-lg max-w-xl mx-auto">
                Book your first cleaning today and enjoy <span className="font-bold underline">10% off</span>. Takes less than 60 seconds.
              </p>
              <Link
                to="/services"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-deep-blue font-semibold hover:scale-105 transition-transform shadow-2xl"
              >
                Get Started <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        </section>
      </PageTransition>
    </SiteLayout>
  );
}
