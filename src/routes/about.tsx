import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { Award, Heart, Leaf, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CAMZ Cleaning" },
      { name: "description", content: "Learn about CAMZ Cleaning's mission, team, and values." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Heart, title: "Care", desc: "Every space treated like our own." },
  { icon: Leaf, title: "Eco-friendly", desc: "Safe, green products only." },
  { icon: Award, title: "Excellence", desc: "Quality that exceeds expectations." },
  { icon: Users, title: "Community", desc: "Supporting local cleaners and clients." },
];

function About() {
  return (
    <SiteLayout>
      <PageTransition direction="right">
        <section className="bg-[image:var(--gradient-hero)] text-primary-foreground py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold">
              About CAMZ Cleaning
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-5 text-lg opacity-90">
              We're on a mission to make sparkling clean spaces accessible to everyone — with care, integrity and zero hassle.
            </motion.p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-deep-blue">Our story</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                CAMZ Cleaning started in 2013 with a simple goal: deliver consistent, trustworthy cleaning that
                people could rely on week after week. Today we serve thousands of homes and businesses, but we
                still treat every space with the same personal care.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our team of trained, vetted cleaners uses only eco-conscious products and modern techniques.
                Whether it's a one-time deep clean or a recurring service, we show up on time and leave nothing but shine.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-card border border-border p-6 shadow-[var(--shadow-card)]"
                >
                  <v.icon className="w-8 h-8 text-primary mb-3" />
                  <div className="font-semibold text-deep-blue">{v.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{v.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </PageTransition>
    </SiteLayout>
  );
}
