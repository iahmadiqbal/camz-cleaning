import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { BookingStepper } from "@/components/BookingStepper";
import { bookingStore } from "@/lib/bookingStore";
import { ArrowRight, Info } from "lucide-react";

export const Route = createFileRoute("/booking-pricing")({
  component: Pricing,
});

function Pricing() {
  const navigate = useNavigate();
  const [, force] = useState(0);
  useEffect(() => { const u = bookingStore.subscribe(() => force((n) => n + 1)); return () => { u(); }; }, []);
  const data = bookingStore.get();
  const base = 89;
  const addonsCount = ((data.details?.addons as string[]) || []).length;
  const subtotal = base + addonsCount * 25;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const next = () => {
    bookingStore.set({ price: total });
    navigate({ to: "/booking-checkout" });
  };

  return (
    <SiteLayout>
      <PageTransition direction="left">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <BookingStepper current={3} />
          <h1 className="text-2xl md:text-3xl font-bold text-deep-blue mb-6">Estimated price</h1>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="font-semibold text-deep-blue mb-4">Booking summary</h3>
              <dl className="space-y-3 text-sm">
                <Row k="Service" v={data.serviceTitle || "—"} />
                <Row k="Date" v={data.date || "—"} />
                <Row k="Time" v={data.time || "—"} />
                {Object.entries(data.details || {}).map(([k, v]) => (
                  <Row key={k} k={k} v={Array.isArray(v) ? v.join(", ") : String(v)} />
                ))}
              </dl>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border-2 border-primary bg-[image:var(--gradient-soft)] p-6 shadow-[var(--shadow-elegant)]">
              <div className="text-sm text-muted-foreground">Estimated total</div>
              <div className="text-4xl font-bold text-deep-blue mt-1">${total}</div>
              <div className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Tax</span><span>${tax}</span></div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-soft-blue text-xs text-deep-blue flex gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Final price may vary based on actual conditions on site.
              </div>
              <button onClick={next} className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-semibold shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                Proceed to payment <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </SiteLayout>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-border last:border-0">
      <dt className="text-muted-foreground capitalize">{k}</dt>
      <dd className="font-medium text-right">{v}</dd>
    </div>
  );
}
