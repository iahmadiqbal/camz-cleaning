import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { FaAward, FaHeart, FaLeaf, FaUsers, FaArrowRight, FaCheckCircle } from "react-icons/fa";
const teamImg = "/images/team.jpg";
const moveImg = "/images/svc-move.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CAMZ Cleaning" },
      { name: "description", content: "Meet the team, mission and values behind CAMZ Cleaning." },
    ],
  }),
  component: About,
});

const values = [
  { icon: FaHeart, title: "Care", desc: "Every space treated like our own home." },
  { icon: FaLeaf, title: "Eco-friendly", desc: "Safe, plant-based products only." },
  { icon: FaAward, title: "Excellence", desc: "Quality that exceeds expectations." },
  { icon: FaUsers, title: "Community", desc: "Supporting local cleaners & clients." },
];

const milestones = [
  { y: "2013", t: "Founded", d: "Started with one van and a big mission." },
  { y: "2017", t: "10k clients", d: "Hit our first major milestone." },
  { y: "2020", t: "Eco switch", d: "Went 100% plant-based products." },
  { y: "2025", t: "150+ pros", d: "Serving 25k+ jobs every year." },
];

function About() {
  return (
    <SiteLayout>
      <PageTransition direction="right">
        {/* Hero Banner */}
        <section className="relative h-[420px] md:h-[520px] overflow-hidden">
          <img 
            src="/images/hero-2.jpg"
            alt="About CAMZ Cleaning" 
            className="w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/92 via-deep-blue/65 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-2xl text-primary-foreground">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-semibold tracking-wide"
                >
                  Our Story
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-bold mb-4"
                >
                  About CAMZ Cleaning
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl opacity-85 max-w-lg mb-6 leading-relaxed"
                >
                  We're on a mission to make sparkling clean spaces accessible to everyone — with care, integrity and zero hassle.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-3 text-sm"
                >
                  {["Trusted since 2013", "150+ vetted pros", "12,000+ happy clients"].map((t) => (
                    <div key={t} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                      <FaCheckCircle className="text-soft-blue text-xs" /> {t}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Story with image */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our story</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-deep-blue">From one van to 150+ pros</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                CAMZ Cleaning started in 2013 with a simple goal: deliver consistent, trustworthy cleaning that
                people could rely on week after week. Today we serve thousands of homes and businesses, but we
                still treat every space with the same personal care.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our team of trained, vetted cleaners uses only eco-conscious products and modern techniques.
                Whether it's a one-time deep clean or a recurring service, we show up on time and leave nothing but shine.
              </p>
              <Link to="/services" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-semibold hover:scale-105 transition-transform">
                See our services <FaArrowRight />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]"
            >
              <img src={teamImg} alt="Team" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[image:var(--gradient-soft)] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our values</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-deep-blue">What we stand for</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Four core values guide every decision we make — from how we hire our cleaners to the products we use in your home.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-[image:var(--gradient-hero)] grid place-items-center text-primary-foreground text-xl mb-4">
                    <v.icon />
                  </div>
                  <div className="font-bold text-deep-blue text-lg">{v.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{v.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-deep-blue text-center"
          >
            Our journey
          </motion.h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.y}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl border-2 border-primary/20 bg-card p-6 hover:border-primary transition-colors"
              >
                <div className="text-3xl font-bold text-primary">{m.y}</div>
                <div className="font-semibold text-deep-blue mt-1">{m.t}</div>
                <div className="text-sm text-muted-foreground mt-2">{m.d}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Eco banner */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]"
          >
            <img src={moveImg} alt="Move-in move-out cleaning" loading="lazy" className="w-full h-72 md:h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/85 to-deep-blue/30 grid place-items-center">
              <div className="text-center text-primary-foreground px-6 max-w-2xl">
                <FaLeaf className="text-4xl mx-auto mb-4" />
                <h3 className="text-2xl md:text-4xl font-bold">Cleaner spaces, greener planet.</h3>
                <p className="mt-3 opacity-90">Plant-based, biodegradable, pet-safe — always.</p>
              </div>
            </div>
          </motion.div>
        </section>
      </PageTransition>
    </SiteLayout>
  );
}
