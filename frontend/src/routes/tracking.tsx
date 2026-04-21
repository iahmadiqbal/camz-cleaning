import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { Clock, CheckCircle2, Loader2, MapPin, Phone, MessageSquare, Star, AlertCircle, Home, X, Copy, Check, Calendar, Sparkles } from "lucide-react";
const vehicleImg = "/images/svc-vehicle.jpg";

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
  { key: "pending", label: "Booking Received", desc: "We've received your booking and are matching you with the best available cleaner.", icon: Clock, time: "9:00 AM" },
  { key: "confirmed", label: "Cleaner Assigned", desc: "Akram Khan has been assigned to your booking and is preparing for your service.", icon: CheckCircle2, time: "9:15 AM" },
  { key: "progress", label: "Cleaning in Progress", desc: "Your cleaner is currently at your location performing the service.", icon: Loader2, time: "2:00 PM" },
  { key: "completed", label: "Service Completed", desc: "All done! We hope you love your sparkling clean space.", icon: Sparkles, time: "4:00 PM" },
];

function Tracking() {
  const current = 2;
  const [showCallModal, setShowCallModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [arrivalTime, setArrivalTime] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setArrivalTime((t) => (t > 0 ? t - 1 : 0));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("+1 (555) 123-4567");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SiteLayout>
      <PageTransition direction="bottom">
        {/* Hero Banner */}
        <section className="relative h-[340px] md:h-[420px] overflow-hidden">
          <img src={vehicleImg} alt="Track your booking" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/92 via-deep-blue/65 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-2xl text-primary-foreground">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-semibold tracking-wide"
                >
                  Live Tracking
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-5xl font-bold mb-4"
                >
                  Your Cleaner is On the Way
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-base md:text-lg opacity-85 mb-4 leading-relaxed"
                >
                  Real-time updates on your residential cleaning service
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium"
                >
                  Booking #BK-1042 · Residential Cleaning
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-b from-soft-blue/5 to-transparent py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-6">

            {/* Arrival countdown + cleaner card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 rounded-3xl border-2 border-primary bg-gradient-to-br from-white to-soft-blue/10 p-6 md:p-8 shadow-[var(--shadow-elegant)]"
            >
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-5 mb-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-soft-blue flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                        JM
                      </div>
                      <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">Your Assigned Cleaner</p>
                      <h3 className="text-xl font-bold text-deep-blue mb-1">James Mitchell</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-deep-blue">4.9</span>
                        <span className="text-sm text-muted-foreground">· 250+ jobs</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        On the way to you
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Your vetted professional is fully insured, background-checked, and rated 4.9★ by 250+ customers.</p>
                </div>

                {/* Live countdown */}
                <div className="text-center md:text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Arriving in</p>
                  <motion.div
                    key={arrivalTime}
                    initial={{ scale: 1.2, color: "#2563eb" }}
                    animate={{ scale: 1, color: "#1e3a5f" }}
                    className="text-5xl font-black text-primary"
                  >
                    {arrivalTime}
                  </motion.div>
                  <p className="text-sm text-muted-foreground">minutes</p>
                  <p className="text-xs text-muted-foreground mt-1">Est. arrival: 2:00 PM</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-border">
                <button
                  onClick={() => setShowCallModal(true)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-primary text-primary font-medium hover:bg-primary/5 transition-colors"
                  onClick={() => setShowMessageModal(true)}>
                  <MessageSquare className="w-4 h-4" /> Message
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors"
                  onClick={() => setShowTrackModal(true)}>
                  <MapPin className="w-4 h-4" /> Track
                </button>
              </div>
            </motion.div>

            {/* Progress Timeline - Horizontal on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 rounded-3xl border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-card)]"
            >
              <h3 className="text-xl font-bold text-deep-blue mb-8">Service Progress</h3>

              {/* Desktop horizontal timeline */}
              <div className="hidden md:block">
                <div className="relative">
                  {/* Progress bar */}
                  <div className="absolute top-6 left-0 right-0 h-1 bg-border rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(current / (stages.length - 1)) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4 relative">
                    {stages.map((s, i) => {
                      const done = i < current;
                      const active = i === current;
                      const Icon = s.icon;
                      return (
                        <div key={s.key} className="flex flex-col items-center text-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.15 }}
                            className={`w-12 h-12 rounded-full grid place-items-center z-10 mb-3 ${
                              done ? "bg-primary text-white" :
                              active ? "bg-gradient-to-br from-primary to-soft-blue text-white shadow-lg ring-4 ring-primary/20" :
                              "bg-muted text-muted-foreground"
                            }`}
                          >
                            {done ? <CheckCircle2 className="w-6 h-6" /> :
                             active ? <Icon className="w-6 h-6 animate-spin" /> :
                             <Icon className="w-6 h-6" />}
                          </motion.div>
                          <div className={`font-semibold text-sm ${done || active ? "text-deep-blue" : "text-muted-foreground"}`}>
                            {s.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{s.time}</div>
                          {active && (
                            <span className="mt-1 text-xs px-2 py-0.5 rounded-full bg-primary text-white font-semibold">Now</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mobile vertical timeline */}
              <div className="md:hidden space-y-4">
                {stages.map((s, i) => {
                  const done = i < current;
                  const active = i === current;
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full grid place-items-center ${
                          done ? "bg-primary text-white" :
                          active ? "bg-gradient-to-br from-primary to-soft-blue text-white shadow-lg scale-110" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {done ? <CheckCircle2 className="w-5 h-5" /> :
                           active ? <Icon className="w-5 h-5 animate-spin" /> :
                           <Icon className="w-5 h-5" />}
                        </div>
                        {i < stages.length - 1 && <div className={`w-0.5 h-8 mt-1 ${done ? "bg-primary" : "bg-border"}`} />}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold text-sm ${done || active ? "text-deep-blue" : "text-muted-foreground"}`}>{s.label}</span>
                          {active && <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-white">Now</span>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Active stage description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20"
                >
                  <p className="text-sm text-deep-blue font-medium">
                    <span className="font-bold">Current status: </span>{stages[current].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Service & Booking Details */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-lg font-bold text-deep-blue mb-5">Service Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b border-border">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Service</p>
                      <p className="font-bold text-deep-blue">Residential Cleaning</p>
                    </div>
                    <p className="text-xl font-bold text-primary">$89.99</p>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-border">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Duration</p>
                      <p className="font-bold text-deep-blue">2 hours</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Time</p>
                      <p className="font-bold text-deep-blue">2:00 - 4:00 PM</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">Includes</p>
                    <ul className="space-y-1.5">
                      {["Dusting & vacuuming", "Kitchen cleaning", "Bathroom cleaning", "Floor mopping"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-lg font-bold text-deep-blue mb-5">Booking Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-3 border-b border-border">
                    <Home className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Address</p>
                      <p className="text-sm font-medium text-deep-blue">123 Main Street, Apt 4B</p>
                      <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b border-border">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Date</p>
                      <p className="text-sm font-medium text-deep-blue">Today, Monday</p>
                      <p className="text-sm text-muted-foreground">April 21, 2026</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">Special Instructions</p>
                    <div className="p-3 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm text-foreground">Please use the side entrance. Keys are under the mat.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Help */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-deep-blue mb-1">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">Questions or need to reschedule? We're here 24/7.</p>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setShowSupportModal(true)} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">Contact Support</button>
                    <button onClick={() => setShowRescheduleModal(true)} className="px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">Reschedule</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </PageTransition>

      {/* Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-xs w-full p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-deep-blue">Call Cleaner</h2>
              <button onClick={() => setShowCallModal(false)} className="p-1 hover:bg-muted rounded-lg transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="text-center mb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-soft-blue flex items-center justify-center text-2xl font-bold text-white mx-auto mb-2 shadow-lg">JM</div>
              <h3 className="text-lg font-bold text-deep-blue">James Mitchell</h3>
              <p className="text-xs text-muted-foreground">Professional · 4.9★ · 250+ jobs</p>
            </div>
            <div className="bg-soft-blue/20 border border-soft-blue rounded-xl p-4 mb-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">Phone</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-deep-blue">+1 (555) 123-4567</p>
                <button onClick={handleCopy} className="p-1.5 hover:bg-white rounded-lg transition-colors">
                  {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <a href="tel:+15551234567" className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <button onClick={() => setShowCallModal(false)} className="w-full px-3 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-xs w-full p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-deep-blue">Message Cleaner</h2>
              <button onClick={() => setShowMessageModal(false)} className="p-1 hover:bg-muted rounded-lg transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-soft-blue/20">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-soft-blue flex items-center justify-center text-sm font-bold text-white">JM</div>
              <div>
                <p className="font-semibold text-deep-blue text-sm">James Mitchell</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" /> Online
                </p>
              </div>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full border border-border rounded-xl p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <div className="space-y-2 mt-3">
              <button
                onClick={() => { setMessage(""); setShowMessageModal(false); }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> Send Message
              </button>
              <button onClick={() => setShowMessageModal(false)} className="w-full px-3 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-xs w-full p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-deep-blue">Contact Support</h2>
              <button onClick={() => setShowSupportModal(false)} className="p-1 hover:bg-muted rounded-lg transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-3 mb-4">
              <a href="tel:+18001234567" className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Call Support</p>
                  <p className="text-xs text-muted-foreground">+1 (800) 123-4567 · 24/7</p>
                </div>
              </a>
              <a href="mailto:support@camzcleaning.com" className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Email Support</p>
                  <p className="text-xs text-muted-foreground">support@camzcleaning.com</p>
                </div>
              </a>
            </div>
            <button onClick={() => setShowSupportModal(false)} className="w-full px-3 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-xs w-full p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-deep-blue">Reschedule Booking</h2>
              <button onClick={() => setShowRescheduleModal(false)} className="p-1 hover:bg-muted rounded-lg transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 mb-4">
              <p className="text-xs text-yellow-700 font-medium">⚠️ Free cancellation up to 24h before service. Late changes may incur a fee.</p>
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1 block">New Date</label>
                <input type="date" className="w-full border border-border rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1 block">New Time</label>
                <select className="w-full border border-border rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option>08:00 AM</option>
                  <option>10:00 AM</option>
                  <option>12:00 PM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <button onClick={() => setShowRescheduleModal(false)} className="w-full px-3 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
                Confirm Reschedule
              </button>
              <button onClick={() => setShowRescheduleModal(false)} className="w-full px-3 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Track Modal */}
      {showTrackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-xs w-full p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-deep-blue">Live Location</h2>
              <button onClick={() => setShowTrackModal(false)} className="p-1 hover:bg-muted rounded-lg transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="rounded-xl bg-soft-blue/20 border border-soft-blue p-4 mb-4 text-center">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-2" />
              <p className="font-semibold text-deep-blue">James Mitchell</p>
              <p className="text-sm text-muted-foreground mt-1">Currently 2.3 km away</p>
              <p className="text-xs text-muted-foreground mt-0.5">Est. arrival in 12 minutes</p>
            </div>
            <div className="rounded-xl bg-muted/50 border border-border p-3 mb-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Last known location</p>
              <p className="text-sm font-medium text-deep-blue">Main St & 5th Ave, New York</p>
              <p className="text-xs text-muted-foreground">Updated 2 minutes ago</p>
            </div>
            <button onClick={() => setShowTrackModal(false)} className="w-full px-3 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">
              Close
            </button>
          </motion.div>
        </div>
      )}
    </SiteLayout>
  );
}
