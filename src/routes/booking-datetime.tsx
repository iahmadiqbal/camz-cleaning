import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { BookingStepper } from "@/components/BookingStepper";
import { timeSlots } from "@/lib/data";
import { bookingStore } from "@/lib/bookingStore";
import { Calendar as CalIcon, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/booking-datetime")({
  component: DateTime,
});

function DateTime() {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  // Generate next 14 days
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const submit = () => {
    if (!date || !time) return;
    bookingStore.set({ date, time });
    navigate({ to: "/booking-pricing" });
  };

  return (
    <SiteLayout>
      <PageTransition direction="right">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <BookingStepper current={2} />
          <h1 className="text-2xl md:text-3xl font-bold text-deep-blue mb-6">Pick a date & time</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-2 mb-4 text-deep-blue"><CalIcon className="w-5 h-5" /><h3 className="font-semibold">Select date</h3></div>
              <div className="grid grid-cols-4 gap-2">
                {days.map((d) => {
                  const iso = d.toISOString().slice(0, 10);
                  const sel = date === iso;
                  return (
                    <button key={iso} onClick={() => setDate(iso)} className={`p-3 rounded-xl border text-center transition-all ${sel ? "bg-primary text-primary-foreground border-primary scale-105" : "border-border hover:border-primary"}`}>
                      <div className="text-xs opacity-70">{d.toLocaleDateString(undefined, { weekday: "short" })}</div>
                      <div className="font-bold text-lg">{d.getDate()}</div>
                      <div className="text-xs opacity-70">{d.toLocaleDateString(undefined, { month: "short" })}</div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-2 mb-4 text-deep-blue"><Clock className="w-5 h-5" /><h3 className="font-semibold">Select time</h3></div>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((t) => (
                  <button key={t} onClick={() => setTime(t)} className={`p-3 rounded-xl border text-sm font-medium transition-all ${time === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>{t}</button>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-8 flex justify-end">
            <button disabled={!date || !time} onClick={submit} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-semibold shadow-[var(--shadow-card)] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[var(--shadow-elegant)] transition-shadow">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </PageTransition>
    </SiteLayout>
  );
}
