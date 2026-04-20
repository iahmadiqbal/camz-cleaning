import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LayoutDashboard, CalendarDays, Users, Sparkles, CreditCard, UserCheck, BarChart3, Search, Bell, ArrowLeft, ClipboardList, Radio, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/admin/job-assignment", label: "Job Assignment", icon: ClipboardList },
  { to: "/admin/monitoring", label: "Monitoring", icon: Radio },
  { to: "/admin/staff", label: "Staff", icon: Users },
  { to: "/admin/services", label: "Services", icon: Sparkles },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/admin/customers", label: "Customers", icon: UserCheck },
  { to: "/admin/reports", label: "Reports", icon: BarChart3 },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Protected route — redirect to admin login if not authenticated
    if (typeof window !== 'undefined' && !sessionStorage.getItem("camz_admin")) {
      window.location.href = "/admin/login";
    }
  }, []);

  const logout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem("camz_admin");
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="min-h-screen flex bg-[image:var(--gradient-soft)]">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground"
      >
        <div className="px-6 py-5 border-b border-sidebar-border flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary grid place-items-center"><Sparkles className="w-5 h-5" /></div>
          <div>
            <div className="font-bold">CAMZ Admin</div>
            <div className="text-xs opacity-70">Control center</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item, i) => {
            const active = item.exact ? path === item.to : path.startsWith(item.to);
            return (
              <motion.div
                key={item.to}
                initial={{ x: -30, opacity: 0 }}
                animate={mounted ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-sidebar-accent">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-sidebar-accent text-left">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="h-16 bg-card border-b border-border px-4 md:px-8 flex items-center justify-between gap-4"
        >
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search bookings, staff..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-muted">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground grid place-items-center text-sm font-semibold">AD</div>
              <div className="hidden sm:block text-sm">
                <div className="font-medium">Admin</div>
                <div className="text-xs text-muted-foreground">Owner</div>
              </div>
            </div>
          </div>
        </motion.header>
        <main className="flex-1 p-4 md:p-8 overflow-x-auto">{children}</main>
      </div>
    </div>
  );
}
