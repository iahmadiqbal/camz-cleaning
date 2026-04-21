import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/staff/login")({
  head: () => ({ meta: [{ title: "Staff Login — CAMZ Cleaning" }] }),
  component: StaffLogin,
});

const inputCls = "w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm";

function StaffLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Already logged in → redirect
  if (typeof window !== "undefined" && sessionStorage.getItem("camz_staff")) {
    navigate({ to: "/staff" });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("camz_staff", "true");
    }
    setTimeout(() => navigate({ to: "/staff" }), 800);
  };

  return (
    <div className="min-h-screen bg-[image:var(--gradient-soft)] flex items-center justify-center px-4">
      <PageTransition direction="fade">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[image:var(--gradient-hero)] grid place-items-center mx-auto mb-4 shadow-[var(--shadow-elegant)]">
              <Sparkles className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-deep-blue">Staff Portal</h1>
            <p className="text-muted-foreground mt-1 text-sm">CAMZ Cleaning — Cleaner App</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-elegant)]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1.5">Staff ID / Email</label><input required className={inputCls} placeholder="staff@camzcleaning.com" /></div>
              <div><label className="block text-sm font-medium mb-1.5">Password</label><input required type="password" className={inputCls} placeholder="••••••••" /></div>
              <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-semibold shadow-[var(--shadow-card)] disabled:opacity-60 mt-2">
                {loading ? "Signing in..." : "Sign In"} {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Demo — any credentials work
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            <Link to="/login" className="hover:text-primary">Customer login →</Link>
          </p>
        </motion.div>
      </PageTransition>
    </div>
  );
}
