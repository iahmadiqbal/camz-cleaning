import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { ArrowRight, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — CAMZ Cleaning" }] }),
  component: LoginPage,
});

const inputCls = "w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm";

function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === "phone" && !otpSent) {
      setOtpSent(true);
      return;
    }
    setLoading(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("camz_customer", "true");
    }
    setTimeout(() => navigate({ to: "/customer-dashboard" }), 800);
  };

  return (
    <SiteLayout>
      <PageTransition direction="fade">
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-deep-blue">Welcome back</h1>
              <p className="text-muted-foreground mt-2 text-sm">Sign in to manage your bookings</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-elegant)]">
              {/* Tab */}
              <div className="flex rounded-xl bg-muted p-1 mb-6">
                {(["login", "register"] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${tab === t ? "bg-card shadow text-deep-blue" : "text-muted-foreground"}`}>{t === "login" ? "Sign In" : "Register"}</button>
                ))}
              </div>

              {/* Method toggle */}
              <div className="flex gap-2 mb-5">
                <button onClick={() => { setMethod("email"); setOtpSent(false); }} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm transition-colors ${method === "email" ? "border-primary bg-soft-blue text-primary" : "border-border"}`}>
                  <FaEnvelope className="w-3.5 h-3.5" /> Email
                </button>
                <button onClick={() => { setMethod("phone"); setOtpSent(false); }} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm transition-colors ${method === "phone" ? "border-primary bg-soft-blue text-primary" : "border-border"}`}>
                  <FaPhone className="w-3.5 h-3.5" /> Phone
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === "register" && (
                  <div><label className="block text-sm font-medium mb-1.5">Full name</label><input required className={inputCls} placeholder="Jane Doe" /></div>
                )}

                {method === "email" ? (
                  <>
                    <div><label className="block text-sm font-medium mb-1.5">Email</label><input required type="email" className={inputCls} placeholder="jane@example.com" /></div>
                    <div><label className="block text-sm font-medium mb-1.5">Password</label><input required type="password" className={inputCls} placeholder="••••••••" /></div>
                  </>
                ) : (
                  <>
                    <div><label className="block text-sm font-medium mb-1.5">Phone number</label><input required type="tel" className={inputCls} placeholder="+1 (403) 000-0000" /></div>
                    {otpSent && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                        <label className="block text-sm font-medium mb-1.5">Enter OTP</label>
                        <input required className={inputCls} placeholder="6-digit code" maxLength={6} />
                        <p className="text-xs text-muted-foreground mt-1.5">OTP sent to your phone (demo: any code works)</p>
                      </motion.div>
                    )}
                  </>
                )}

                <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-semibold shadow-[var(--shadow-card)] disabled:opacity-60 mt-2">
                  {loading ? "Signing in..." : method === "phone" && !otpSent ? "Send OTP" : tab === "login" ? "Sign In" : "Create Account"}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-5 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Demo only — no real auth
              </p>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              {tab === "login" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setTab(tab === "login" ? "register" : "login")} className="text-primary font-medium hover:underline">
                {tab === "login" ? "Register" : "Sign In"}
              </button>
            </p>

            <div className="mt-4 text-center">
              <Link to="/staff/login" className="text-xs text-muted-foreground hover:text-primary">Staff login →</Link>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </SiteLayout>
  );
}
