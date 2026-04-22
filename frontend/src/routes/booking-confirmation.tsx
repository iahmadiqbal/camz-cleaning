import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { BookingStepper } from "@/components/BookingStepper";
import { bookingStore } from "@/lib/bookingStore";
import { ArrowLeft, Calendar, MapPin, User, CreditCard, DollarSign, Clock, CheckCircle2, CircleDot } from "lucide-react";

export const Route = createFileRoute("/booking-confirmation")({
  component: Confirmation,
});

const progressSteps = [
  { key: "pending", label: "Pending" },
  { key: "accepted", label: "Accepted" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "approved", label: "Approved" },
];

function Confirmation() {
  const data = bookingStore.get();
  const bookingId = "#07054E1A";
  const currentStep = 0; // Pending

  const ratePerHour = data.price || 10;
  const hoursWorked = 0;
  const estimatedTotal = 30;
  const taxRate = 0.05;
  const tax = estimatedTotal * taxRate;
  const total = estimatedTotal + tax;
  const currency = "CAD";

  return (
    <SiteLayout>
      <PageTransition direction="fade">
        <div className="max-w-lg mx-auto px-4 py-8">
          <BookingStepper current={5} />

          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          {/* Page title */}
          <h1 className="text-2xl font-bold text-deep-blue mb-5">Booking Details</h1>

          {/* ── Card 1: Booking Info ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] mb-4"
          >
            {/* ID + Status */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-mono">{bookingId}</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">
                <Clock className="w-3 h-3" /> PENDING
              </span>
            </div>

            {/* Service name */}
            <h2 className="text-xl font-bold text-primary mb-4">
              {data.serviceTitle || "Vehicle Detailing"}
            </h2>

            {/* Detail rows */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground w-24 flex-shrink-0">Date & Time:</span>
                <span className="text-sm font-medium text-foreground">
                  {data.date || "Apr 23, 2026"} – {data.time || "02:11 AM"}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground w-24 flex-shrink-0">Location:</span>
                <span className="text-sm font-medium text-foreground flex-1 text-right">
                  {(data.details?.location as string) || "Togh Sarai, Khyber Pakhtunkhwa"}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground w-24 flex-shrink-0">Cleaner:</span>
                <span className="text-sm font-medium text-muted-foreground italic">Finding cleaner...</span>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground w-24 flex-shrink-0">Billing:</span>
                <span className="text-sm font-medium text-foreground">
                  {data.pricingMode === "hourly" ? "Hourly Billing" : "Fixed Billing"}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground w-24 flex-shrink-0">Price:</span>
                <span className="text-sm font-semibold text-primary">
                  {currency} ${ratePerHour}/hr (Est. ${estimatedTotal}.00)
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Card 2: Job Progress ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] mb-4"
          >
            <h3 className="text-base font-bold text-deep-blue mb-5">Job Progress</h3>

            <div className="flex items-center justify-between relative">
              {/* connecting line */}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-border z-0" />

              {progressSteps.map((step, i) => {
                const isDone = i < currentStep;
                const isActive = i === currentStep;
                return (
                  <div key={step.key} className="flex flex-col items-center gap-1.5 z-10 flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        isDone || isActive
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-border text-muted-foreground"
                      }`}
                    >
                      {isDone || isActive ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <CircleDot className="w-4 h-4 opacity-30" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-medium text-center leading-tight ${
                        isActive ? "text-primary font-bold" : isDone ? "text-deep-blue" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Card 3: Billing Summary ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] mb-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-base font-bold text-deep-blue">Billing Summary</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-medium text-foreground">{currency} $ {ratePerHour}.00/hr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time Worked</span>
                <span className="font-medium text-foreground">{hoursWorked.toFixed(2)} hrs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax ({(taxRate * 100).toFixed(0)}%)</span>
                <span className="font-medium text-foreground">{currency} ${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-border my-4" />

            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-foreground">Total</span>
              <span className="text-xl font-bold text-green-600">{currency} ${total.toFixed(2)}</span>
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/tracking"
              className="px-5 py-2.5 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-medium text-sm"
            >
              Track booking
            </Link>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-lg border border-border font-medium text-sm hover:bg-muted transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </PageTransition>
    </SiteLayout>
  );
}
