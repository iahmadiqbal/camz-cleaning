import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — CAMZ Cleaning" }] }),
  component: AdminLogin,
});

const inputCls = "w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm";

function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email") as string;
    const password = fd.get("password") as string;

    // Demo credentials
    if (email === "admin@camzcleaning.com" && password === "admin123") {
      setLoading(true);
      sessionStorage.setItem("camz_admin", "true");
      setTimeout(() => navigate({ to: "/admin" }), 800);
    } else {
      setError("Invalid credentials. Use admin@camzcleaning.com / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-[image:var(--gradient-soft)] flex items-center justify-center px-4">
      <PageTransition direction="fade">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[image:var(--gradient-hero)] grid place-items-center mx-auto mb-4 shadow-[var(--shadow-elegant)]">
              <Sparkles className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-deep-blue">Admin Panel</h1>
            <p className="text-muted-foreground mt-1 text-sm">CAMZ Cleaning — Control Center</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-elegant)]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input name="email" required type="email" className={inputCls} placeholder="admin@camzcleaning.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <input name="password" required type="password" className={inputCls} placeholder="••••••••" />
              </div>
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
                  {error}
                </motion.p>
              )}
              <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-semibold shadow-[var(--shadow-card)] disabled:opacity-60 mt-2">
                {loading ? "Signing in..." : "Sign In"} {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Demo: admin@camzcleaning.com / admin123
            </p>
          </div>
        </motion.div>
      </PageTransition>
    </div>
  );
}
