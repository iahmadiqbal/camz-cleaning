import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { BookingStepper } from "@/components/BookingStepper";
import { bookingStore } from "@/lib/bookingStore";
import { cleaners } from "@/lib/data";
import { CheckCircle2, User } from "lucide-react";

export const Route = createFileRoute("/booking-confirmation")({
  component: Confirmation,
});

function Confirmation() {
  const data = bookingStore.get();
  const cleaner = cleaners[Math.floor(Math.random() * cleaners.length)];
  const bookingId = "BK-" + Math.floor(1000 + Math.random() * 9000);

  return (
    <SiteLayout>
      <PageTransition direction="fade">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <BookingStepper current={5} />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-[image:var(--gradient-hero)] grid place-items-center text-primary-foreground shadow-[var(--shadow-elegant)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="mt-6 text-3xl md:text-4xl font-bold text-deep-blue">Booking confirmed!</h1>
            <p className="mt-2 text-muted-foreground">A confirmation has been sent to your email.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <div className="text-xs text-muted-foreground">Booking ID</div>
                <div className="font-bold text-deep-blue">{bookingId}</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-soft-blue text-deep-blue text-xs font-semibold">Confirmed</span>
            </div>
            <dl className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
              <Row k="Service" v={data.serviceTitle || "—"} />
              <Row k="Date" v={data.date || "—"} />
              <Row k="Time" v={data.time || "—"} />
              <Row k="Total paid" v={`$${(data.price || 0).toFixed(2)}`} />
            </dl>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="mt-6 p-4 rounded-xl bg-[image:var(--gradient-soft)] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground grid place-items-center"><User className="w-6 h-6" /></div>
              <div>
                <div className="text-xs text-muted-foreground">Your cleaner</div>
                <div className="font-semibold text-deep-blue">{cleaner}</div>
                <div className="text-xs text-muted-foreground">★ 4.9 · 200+ jobs completed</div>
              </div>
            </motion.div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/tracking" className="px-5 py-2.5 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-medium">Track booking</Link>
              <Link to="/" className="px-5 py-2.5 rounded-lg border border-border font-medium hover:bg-soft-blue">Back to home</Link>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </SiteLayout>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-muted-foreground text-xs uppercase tracking-wider">{k}</dt>
      <dd className="font-medium mt-1">{v}</dd>
    </div>
  );
}
