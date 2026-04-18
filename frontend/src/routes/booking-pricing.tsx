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

  // Service-based pricing engine per document
  const calcPrice = () => {
    const d = data.details || {};
    const svc = data.service || "";

    if (svc === "residential") {
      const bedBase: Record<string, number> = { "1": 89, "2": 109, "3": 129, "4": 149, "5+": 179 };
      const bathAdd: Record<string, number> = { "1": 0, "2": 20, "3": 35, "4+": 50 };
      const base = (bedBase[String(d.bedrooms)] || 89) + (bathAdd[String(d.washrooms)] || 0);
      const deepClean = d.type === "Deep Clean" ? 40 : 0;
      const addons = ((d.addons as string[]) || []).length * 25;
      return base + deepClean + addons;
    }
    if (svc === "move") {
      const bedBase: Record<string, number> = { "1": 179, "2": 219, "3": 259, "4+": 299 };
      const condAdd: Record<string, number> = { Light: 0, Medium: 40, Heavy: 80 };
      const base = bedBase[String(d.bedrooms)] || 179;
      const cond = condAdd[String(d.condition)] || 0;
      const carpet = d.carpet ? 60 : 0;
      const wall = d.wall ? 40 : 0;
      return base + cond + carpet + wall;
    }
    if (svc === "carpet") {
      const qty = Number(d.qty) || 1;
      const dirtAdd: Record<string, number> = { Light: 0, Medium: 15, Heavy: 30 };
      const perUnit = d.itemType === "Sofa" ? 79 : 59;
      return qty * perUnit + (dirtAdd[String(d.dirt)] || 0) * qty;
    }
    if (svc === "vehicle") {
      const vehicleBase: Record<string, number> = { Sedan: 99, SUV: 129, Truck: 149, Van: 139 };
      const svcAdd: Record<string, number> = { Exterior: 0, Interior: 20, "Full Detail": 50 };
      return (vehicleBase[String(d.vehicle)] || 99) + (svcAdd[String(d.serviceType)] || 0);
    }
    if (svc === "commercial") {
      return 0; // Quote-based
    }
    return 89;
  };

  const isQuote = data.service === "commercial";
  const subtotal = calcPrice();
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
              {isQuote ? (
                <div className="text-center py-4">
                  <div className="text-4xl mb-3">📋</div>
                  <div className="font-bold text-deep-blue text-lg">Custom Quote</div>
                  <p className="text-sm text-muted-foreground mt-2">Our team will review your request and contact you within 24 hours with a custom price.</p>
                  <button onClick={next} className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-semibold shadow-[var(--shadow-card)]">
                    Submit Quote Request <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-sm text-muted-foreground">Estimated total</div>
                  <div className="text-4xl font-bold text-deep-blue mt-1">${total}</div>
                  <div className="mt-4 space-y-1.5 text-sm">
                    <div className="flex justify-between"><span>Subtotal</span><span>${subtotal}</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Tax (8%)</span><span>${tax}</span></div>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-soft-blue text-xs text-deep-blue flex gap-2">
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    Final price may vary based on actual conditions on site.
                  </div>
                  <button onClick={next} className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-semibold shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                    Proceed to payment <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
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
