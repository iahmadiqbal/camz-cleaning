import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — CAMZ Cleaning" }] }),
  component: LoginPage,
});

const inputCls =
  "w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm";

interface Customer {
  name: string;
  email: string;
  phone: string;
  password: string;
}

function getCustomers(): Customer[] {
  try {
    return JSON.parse(localStorage.getItem("camz_customers") || "[]");
  } catch {
    return [];
  }
}

function saveCustomer(c: Customer) {
  const list = getCustomers();
  list.push(c);
  localStorage.setItem("camz_customers", JSON.stringify(list));
}

function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const reset = () => {
    setError(""); setSuccess("");
    setName(""); setEmail(""); setPhone("");
    setPassword(""); setOtp(""); setOtpSent(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");

    // Phone OTP flow
    if (method === "phone") {
      if (!otpSent) {
        if (!phone.trim()) return setError("Please enter your phone number.");
        setOtpSent(true);
        setSuccess("OTP sent! (demo: enter any 6-digit code)");
        return;
      }
      if (otp.length < 6) return setError("Enter a valid 6-digit OTP.");
    }

    setLoading(true);

    setTimeout(() => {
      if (tab === "register") {
        // --- REGISTER ---
        if (method === "email") {
          if (!name.trim()) { setLoading(false); return setError("Full name is required."); }
          if (!email.trim()) { setLoading(false); return setError("Email is required."); }
          if (password.length < 6) { setLoading(false); return setError("Password must be at least 6 characters."); }
          const exists = getCustomers().find((c) => c.email === email.trim().toLowerCase());
          if (exists) { setLoading(false); return setError("An account with this email already exists."); }
          saveCustomer({ name: name.trim(), email: email.trim().toLowerCase(), phone: "", password });
          sessionStorage.setItem("camz_customer", JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase() }));
        } else {
          if (!name.trim()) { setLoading(false); return setError("Full name is required."); }
          if (!phone.trim()) { setLoading(false); return setError("Phone number is required."); }
          const exists = getCustomers().find((c) => c.phone === phone.trim());
          if (exists) { setLoading(false); return setError("An account with this phone already exists."); }
          saveCustomer({ name: name.trim(), email: "", phone: phone.trim(), password: "" });
          sessionStorage.setItem("camz_customer", JSON.stringify({ name: name.trim(), phone: phone.trim() }));
        }
        navigate({ to: "/customer-dashboard" });

      } else {
        // --- LOGIN ---
        if (method === "email") {
          if (!email.trim() || !password) { setLoading(false); return setError("Please enter email and password."); }
          const user = getCustomers().find(
            (c) => c.email === email.trim().toLowerCase() && c.password === password
          );
          if (!user) { setLoading(false); return setError("Invalid email or password."); }
          sessionStorage.setItem("camz_customer", JSON.stringify({ name: user.name, email: user.email }));
        } else {
          const user = getCustomers().find((c) => c.phone === phone.trim());
          if (!user) { setLoading(false); return setError("No account found with this phone number."); }
          sessionStorage.setItem("camz_customer", JSON.stringify({ name: user.name, phone: user.phone }));
        }
        navigate({ to: "/customer-dashboard" });
      }
      setLoading(false);
    }, 600);
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
              <h1 className="text-3xl font-bold text-deep-blue">
                {tab === "login" ? "Welcome back" : "Create account"}
              </h1>
              <p className="text-muted-foreground mt-2 text-sm">
                {tab === "login" ? "Sign in to manage your bookings" : "Register to start booking cleanings"}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-elegant)]">
              {/* Tab */}
              <div className="flex rounded-xl bg-muted p-1 mb-6">
                {(["login", "register"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTab(t); reset(); }}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-card shadow text-deep-blue" : "text-muted-foreground"}`}
                  >
                    {t === "login" ? "Sign In" : "Register"}
                  </button>
                ))}
              </div>

              {/* Method toggle */}
              <div className="flex gap-2 mb-5">
                <button
                  onClick={() => { setMethod("email"); reset(); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm transition-colors ${method === "email" ? "border-primary bg-primary text-white" : "border-border text-foreground"}`}
                >
                  <FaEnvelope className="w-3.5 h-3.5" /> Email
                </button>
                <button
                  onClick={() => { setMethod("phone"); reset(); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm transition-colors ${method === "phone" ? "border-primary bg-primary text-white" : "border-border text-foreground"}`}
                >
                  <FaPhone className="w-3.5 h-3.5" /> Phone
                </button>
              </div>

              {/* Error / Success */}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 mb-4">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 mb-4">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> {success}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name — register only */}
                {tab === "register" && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Full name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required className={inputCls} placeholder="Jane Doe" />
                  </div>
                )}

                {method === "email" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Email</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className={inputCls} placeholder="jane@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Password</label>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" className={inputCls} placeholder="••••••••" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Phone number</label>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} required type="tel" className={inputCls} placeholder="+1 (403) 000-0000" />
                    </div>
                    {otpSent && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                        <label className="block text-sm font-medium mb-1.5">Enter OTP</label>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} required className={inputCls} placeholder="6-digit code" maxLength={6} />
                      </motion.div>
                    )}
                  </>
                )}

                <button
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-semibold shadow-[var(--shadow-card)] disabled:opacity-60 mt-2"
                >
                  {loading ? "Please wait..." :
                    method === "phone" && !otpSent ? "Send OTP" :
                    tab === "login" ? "Sign In" : "Create Account"}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              {tab === "login" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => { setTab(tab === "login" ? "register" : "login"); reset(); }} className="text-primary font-medium hover:underline">
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
