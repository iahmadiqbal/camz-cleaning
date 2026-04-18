import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
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
        {/* Header */}
        <section className="bg-[image:var(--gradient-hero)] text-primary-foreground py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              Choose your service
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-lg opacity-90"
            >
              Pick a service to start your booking. All plans come with our 100% satisfaction guarantee.
            </motion.p>
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

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl bg-soft-blue p-8 grid sm:grid-cols-3 gap-6 text-center"
          >
            {[
              { n: "60s", l: "Average booking time" },
              { n: "Free", l: "Cancel up to 24h before" },
              { n: "100%", l: "Satisfaction guarantee" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-3xl font-bold text-deep-blue">{s.n}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </PageTransition>
    </SiteLayout>
  );
}
