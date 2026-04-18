import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { BookingStepper } from "@/components/BookingStepper";
import { bookingStore } from "@/lib/bookingStore";
import { CreditCard, Lock } from "lucide-react";

export const Route = createFileRoute("/booking-checkout")({
  component: Checkout,
});

const inputCls = "w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40";

function Checkout() {
  const navigate = useNavigate();
  const data = bookingStore.get();
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/booking-confirmation" }), 900);
  };

  return (
    <SiteLayout>
      <PageTransition direction="bottom">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <BookingStepper current={4} />
          <h1 className="text-2xl md:text-3xl font-bold text-deep-blue mb-6">Checkout</h1>

          <form onSubmit={submit} className="grid md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] space-y-5">
              <h3 className="font-semibold text-deep-blue flex items-center gap-2"><CreditCard className="w-5 h-5" /> Payment details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1.5">Full name</label><input required className={inputCls} placeholder="Jane Doe" /></div>
                <div><label className="block text-sm font-medium mb-1.5">Email</label><input required type="email" className={inputCls} placeholder="jane@example.com" /></div>
                <div className="sm:col-span-2"><label className="block text-sm font-medium mb-1.5">Address</label><input required className={inputCls} placeholder="123 Main St." /></div>
                <div className="sm:col-span-2"><label className="block text-sm font-medium mb-1.5">Card number</label><input required className={inputCls} placeholder="4242 4242 4242 4242" /></div>
                <div><label className="block text-sm font-medium mb-1.5">Expiry</label><input required className={inputCls} placeholder="MM / YY" /></div>
                <div><label className="block text-sm font-medium mb-1.5">CVC</label><input required className={inputCls} placeholder="123" /></div>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Lock className="w-3 h-3" /> This is a UI demo — no payment is processed.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-border bg-[image:var(--gradient-soft)] p-6 shadow-[var(--shadow-card)] h-fit">
              <h3 className="font-semibold text-deep-blue mb-3">Order summary</h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between"><span>{data.serviceTitle || "Service"}</span><span>${(data.price || 0).toFixed(2)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>{data.date} {data.time}</span></div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex justify-between font-bold text-deep-blue text-lg">
                <span>Total</span><span>${(data.price || 0).toFixed(2)}</span>
              </div>
              <button disabled={loading} className="mt-5 w-full px-6 py-3 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-semibold shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all disabled:opacity-60">
                {loading ? "Processing..." : `Pay $${(data.price || 0).toFixed(2)}`}
              </button>
            </motion.div>
          </form>
        </div>
      </PageTransition>
    </SiteLayout>
  );
}
