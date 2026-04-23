import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { User, Mail, Phone, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Users } from "lucide-react";


interface Customer {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "customer" | "cleaner";
}

function getCustomers(): Customer[] {
  try { return JSON.parse(localStorage.getItem("camz_customers") || "[]"); }
  catch { return []; }
}

function saveCustomer(c: Customer) {
  const list = getCustomers();
  list.push(c);
  localStorage.setItem("camz_customers", JSON.stringify(list));
}

const inputCls =
  "w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm placeholder:text-muted-foreground";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("camz_customer")) {
      navigate("/customer-dashboard");
    }
  }, [navigate]);

  const [tab, setTab] = useState<"login" | "signup">("signup");
  const [role, setRole] = useState<"customer" | "cleaner">("customer");
  const [loginRole, setLoginRole] = useState<"customer" | "cleaner">("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const reset = () => {
    setError(""); setSuccess("");
    setName(""); setEmail(""); setPhone(""); setPassword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);

    setTimeout(() => {
      if (tab === "signup") {
        if (!name.trim()) { setLoading(false); return setError("Full name is required."); }
        if (!email.trim()) { setLoading(false); return setError("Email is required."); }
        if (!phone.trim()) { setLoading(false); return setError("Phone number is required."); }
        if (password.length < 6) { setLoading(false); return setError("Password must be at least 6 characters."); }
        const exists = getCustomers().find((c) => c.email === email.trim().toLowerCase());
        if (exists) { setLoading(false); return setError("An account with this email already exists."); }
        saveCustomer({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), password, role });
        sessionStorage.setItem("camz_customer", JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), role }));
        navigate("/customer-dashboard");
      } else {
        if (!email.trim() || !password) { setLoading(false); return setError("Please enter email and password."); }
        const user = getCustomers().find((c) => c.email === email.trim().toLowerCase() && c.password === password);
        if (!user) { setLoading(false); return setError("Invalid email or password."); }
        sessionStorage.setItem("camz_customer", JSON.stringify({ name: user.name, email: user.email, role: user.role }));
        if (user.role === "cleaner") {
          navigate("/staff/");
        } else {
          navigate("/customer-dashboard");
        }
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
            {/* Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-deep-blue">
                {tab === "signup" ? "Create Account" : "Welcome back"}
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                {tab === "signup"
                  ? "Join Camz Cleaner today and experience clean."
                  : loginRole === "cleaner"
                  ? "Sign in to manage your cleaning jobs"
                  : "Login into your Camz Cleaner account"}
              </p>
            </div>

            {/* Customer / Cleaner toggle — both tabs */}
            <div className="rounded-2xl border border-border bg-card p-4 mb-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-sm font-medium text-foreground">
                <Users className="w-4 h-4 text-primary" />
                Are you a Customer or Cleaner?
              </div>
              <div className="flex gap-2">
                {(["customer", "cleaner"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => tab === "signup" ? setRole(r) : setLoginRole(r)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${
                      (tab === "signup" ? role : loginRole) === r
                        ? "bg-primary text-white shadow"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Form card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-elegant)]">
              {/* Error / Success */}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 mb-4">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5 mb-4">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> {success}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name — signup only */}
                {tab === "signup" && (
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input value={name} onChange={(e) => setName(e.target.value)} required className={inputCls} placeholder="Enter your full name" />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className={inputCls} placeholder="Enter your email" />
                  </div>
                </div>

                {/* Phone — signup only */}
                {tab === "signup" && (
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} required type="tel" className={inputCls} placeholder="+1 416 123 4567" />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      type={showPassword ? "text" : "password"}
                      className={inputCls + " pr-11"}
                      placeholder={tab === "signup" ? "Create a password" : "Enter your password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-base shadow hover:bg-primary/90 transition-colors disabled:opacity-60 mt-2"
                >
                  {loading ? "Please wait..." : tab === "signup" ? "Sign Up" : "Sign In"}
                </button>
              </form>
            </div>

            {/* Switch tab */}
            <p className="text-center text-sm text-muted-foreground mt-5">
              {tab === "signup" ? "Already have an account? " : "Don't have an account? "}
              <button
                onClick={() => { setTab(tab === "signup" ? "login" : "signup"); reset(); }}
                className="text-primary font-semibold hover:underline"
              >
                {tab === "signup" ? "Login" : "Sign Up"}
              </button>
            </p>

            <div className="mt-3 text-center">
              <Link to="/staff/login" className="text-xs text-muted-foreground hover:text-primary">Staff login →</Link>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </SiteLayout>
  );
}

