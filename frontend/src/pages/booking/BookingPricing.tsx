import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaClipboardCheck, FaClock, FaMinus, FaPlus } from "react-icons/fa";
import { SiteLayout } from "@/components/SiteLayout";
import { bookingStore } from "@/lib/bookingStore";


function StepBar({ current, total, serviceTitle }: { current: number; total: number; serviceTitle: string }) {
  return (
    <div className="mb-8">
      <div className="flex gap-2 mb-3">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < current ? "bg-primary" : "bg-border"}`} />
        ))}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Step {current} of {total}</span>
        <span className="text-primary font-semibold">{serviceTitle}</span>
      </div>
    </div>
  );
}

const HOURLY_RATE = 20;
const TAX_RATE = 0.05;

// Base prices per service
function getFixedPrice(data: ReturnType<typeof bookingStore.get>) {
  const d = data.details || {};
  const svc = data.service || "";
  if (svc === "residential") {
    const bedBase: Record<string, number> = { "1": 89, "2": 109, "3": 129, "4": 149, "5+": 179 };
    const bathAdd: Record<string, number> = { "1": 0, "2": 20, "3": 35, "4+": 50 };
    const base = (bedBase[String(d.bedrooms)] || 89) + (bathAdd[String(d.washrooms)] || 0);
    const deep = d.cleaningType === "Deep Clean" ? 40 : 0;
    const addons = ((d.addons as string[]) || []).length * 25;
    return base + deep + addons;
  }
  if (svc === "move") {
    const bedBase: Record<string, number> = { "1": 179, "2": 219, "3": 259, "4+": 299 };
    const condAdd: Record<string, number> = { Light: 0, Medium: 40, Heavy: 80 };
    return (bedBase[String(d.bedrooms)] || 179) + (condAdd[String(d.condition)] || 0);
  }
  if (svc === "carpet") {
    const qty = Number(d.qty) || 1;
    const dirtAdd: Record<string, number> = { Light: 0, Medium: 15, Heavy: 30 };
    const perUnit = d.itemType === "Sofa" ? 79 : 59;
    return qty * perUnit + (dirtAdd[String(d.dirtLevel)] || 0) * qty;
  }
  if (svc === "vehicle") {
    const vehicleBase: Record<string, number> = { Sedan: 99, SUV: 129, Truck: 149, Van: 139, Motorcycle: 79 };
    const tierAdd: Record<string, number> = { Basic: 40, Full: 100, Premium: 150 };
    return (vehicleBase[String(d.vehicleType)] || 99) + (tierAdd[String(d.tier)] || 40);
  }
  return 89;
}

export default function PricingPage() {
  const navigate = useNavigate();
  const [, force] = useState(0);
  useEffect(() => { const u = bookingStore.subscribe(() => force((n) => n + 1)); return () => { u(); }; }, []);
  const data = bookingStore.get();

  const isCommercial = data.service === "commercial";
  const [mode, setMode] = useState<"fixed" | "hourly">("fixed");
  const [hours, setHours] = useState(2);

  const fixedPrice = getFixedPrice(data);
  const servicePrice = mode === "fixed" ? fixedPrice : hours * HOURLY_RATE;
  const tax = +(servicePrice * TAX_RATE).toFixed(2);
  const total = +(servicePrice + tax).toFixed(2);

  const confirm = () => {
    bookingStore.set({ pricingMode: mode, hours: mode === "hourly" ? hours : undefined, price: total });
    navigate("/booking-checkout");
  };

  return (
    <SiteLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-[image:var(--gradient-hero)] px-6 pt-6 pb-10">
          <button onClick={() => navigate("/booking-datetime")} className="text-white/80 hover:text-white mb-4 flex items-center gap-2 text-sm">
            <FaArrowLeft /> Back
          </button>
          <h1 className="text-2xl font-bold text-white text-center">Pricing Mode</h1>
        </div>

        <div className="max-w-lg mx-auto px-6 mt-8 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl shadow-[var(--shadow-elegant)] p-6">
            <StepBar current={3} total={4} serviceTitle={data.serviceTitle || ""} />

            {isCommercial ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 grid place-items-center mb-4">
                  <FaClipboardCheck className="text-primary text-2xl" />
                </div>
                <h2 className="text-xl font-bold text-deep-blue mb-2">Custom Quote</h2>
                <p className="text-sm text-muted-foreground mb-6">Our team will review your request and contact you within 24 hours with a custom price.</p>
                <button onClick={confirm} className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all">
                  Submit Quote Request
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-deep-blue mb-1">Choose Pricing Type</h2>
                <p className="text-sm text-muted-foreground mb-6">Select how you want to be billed for this service.</p>

                {/* Pricing mode cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setMode("fixed")}
                    className={`p-5 rounded-2xl border-2 text-center transition-all ${
                      mode === "fixed" ? "border-primary bg-primary text-white shadow-lg" : "border-border bg-card hover:border-primary"
                    }`}
                  >
                    <FaClipboardCheck className={`mx-auto text-2xl mb-2 ${mode === "fixed" ? "text-white" : "text-primary"}`} />
                    <div className={`font-bold text-sm ${mode === "fixed" ? "text-white" : "text-deep-blue"}`}>Fixed Price</div>
                    <div className={`text-xs mt-1 ${mode === "fixed" ? "text-white/80" : "text-muted-foreground"}`}>Pay based on service details</div>
                  </button>
                  <button
                    onClick={() => setMode("hourly")}
                    className={`p-5 rounded-2xl border-2 text-center transition-all ${
                      mode === "hourly" ? "border-primary bg-primary text-white shadow-lg" : "border-border bg-card hover:border-primary"
                    }`}
                  >
                    <FaClock className={`mx-auto text-2xl mb-2 ${mode === "hourly" ? "text-white" : "text-primary"}`} />
                    <div className={`font-bold text-sm ${mode === "hourly" ? "text-white" : "text-deep-blue"}`}>Hourly Price</div>
                    <div className={`text-xs mt-1 ${mode === "hourly" ? "text-white/80" : "text-muted-foreground"}`}>Pay based on time spent</div>
                  </button>
                </div>

                {/* Hourly counter */}
                {mode === "hourly" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <h3 className="font-bold text-deep-blue mb-4">Estimated Hours</h3>
                    <div className="flex items-center justify-center gap-6">
                      <button
                        onClick={() => setHours((h) => Math.max(1, h - 1))}
                        className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-deep-blue">{hours}</div>
                        <div className="text-xs text-muted-foreground">Hours</div>
                      </div>
                      <button
                        onClick={() => setHours((h) => Math.min(12, h + 1))}
                        className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Price breakdown */}
                <div className="space-y-3 py-4 border-t border-border mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Price:</span>
                    <span className="font-medium">${servicePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (5%):</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="font-bold text-deep-blue text-lg">Total:</span>
                    <span className="font-bold text-primary text-lg">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate("/booking-datetime")}
                    className="flex-1 py-2.5 rounded-xl border-2 border-border text-foreground font-semibold hover:border-primary hover:text-primary transition-all text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={confirm}
                    className="flex-1 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    Confirm Booking <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </SiteLayout>
  );
}

