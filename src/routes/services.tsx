import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { services } from "@/lib/data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — CAMZ Cleaning" },
      { name: "description", content: "Choose from residential, move-out, commercial, carpet & vehicle cleaning services." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageTransition direction="left">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-deep-blue">Choose your service</h1>
            <p className="mt-3 text-muted-foreground">Pick a service to start your booking.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to="/booking/$service" params={{ service: s.id }} className="block group h-full">
                  <div className="h-full rounded-2xl border border-border bg-card p-8 hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all relative overflow-hidden">
                    <div className="absolute -right-8 -top-8 text-8xl opacity-10">{s.icon}</div>
                    <div className="text-5xl mb-4 relative">{s.icon}</div>
                    <h3 className="font-bold text-xl text-deep-blue">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-primary font-semibold">{s.price}</span>
                      <span className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                        Book <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </PageTransition>
    </SiteLayout>
  );
}
