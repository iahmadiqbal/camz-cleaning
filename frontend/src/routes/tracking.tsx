import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { Clock, CheckCircle2, Loader2, Calendar } from "lucide-react";

export const Route = createFileRoute("/tracking")({
  head: () => ({
    meta: [
      { title: "Track Booking — CAMZ Cleaning" },
      { name: "description", content: "Track the live status of your cleaning booking." },
    ],
  }),
  component: Tracking,
});

const stages = [
  { key: "pending", label: "Pending", desc: "We're matching you with a cleaner.", icon: Clock },
  { key: "confirmed", label: "Confirmed", desc: "Your cleaner is assigned.", icon: Calendar },
  { key: "progress", label: "In Progress", desc: "Your service is being performed.", icon: Loader2 },
  { key: "completed", label: "Completed", desc: "All done — hope you love it!", icon: CheckCircle2 },
];

function Tracking() {
  const current = 2; // demo: in progress

  return (
    <SiteLayout>
      <PageTransition direction="bottom">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-deep-blue">
            Track your booking
          </motion.h1>
          <p className="text-muted-foreground mt-2">Booking #BK-1042 · Residential Cleaning</p>

          <div className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-card)]">
            <div className="space-y-6">
              {stages.map((s, i) => {
                const done = i < current;
                const active = i === current;
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.key}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-11 h-11 rounded-full grid place-items-center transition-all ${
                        done ? "bg-primary text-primary-foreground" :
                        active ? "bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-elegant)] scale-110" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        <Icon className={`w-5 h-5 ${active && s.key === "progress" ? "animate-spin" : ""}`} />
                      </div>
                      {i < stages.length - 1 && <div className={`w-0.5 flex-1 min-h-12 mt-2 ${done ? "bg-primary" : "bg-border"}`} />}
                    </div>
                    <div className="pb-6 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold ${done || active ? "text-deep-blue" : "text-muted-foreground"}`}>{s.label}</h3>
                        {active && <span className="text-xs px-2 py-0.5 rounded-full bg-soft-blue text-deep-blue font-medium">Now</span>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </PageTransition>
    </SiteLayout>
  );
}
