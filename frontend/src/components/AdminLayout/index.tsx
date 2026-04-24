import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, CalendarDays, CreditCard, UserCheck, BarChart3, Search, Bell, ArrowLeft, LogOut, ConciergeBell, CalendarOff, ShieldCheck, HeadphonesIcon } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/customers", label: "Customers", icon: UserCheck },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/admin/reports", label: "Reports", icon: BarChart3 },
  { to: "/admin/services", label: "Services", icon: ConciergeBell },
  { to: "/admin/leave", label: "Leave", icon: CalendarOff },
  { to: "/admin/staff-verification", label: "Verification", icon: ShieldCheck },
  { to: "/admin/support", label: "Support", icon: HeadphonesIcon },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { pathname: path } = useLocation();

  const authed = typeof window !== "undefined" && !!sessionStorage.getItem("camz_admin");

  if (!authed) {
    if (typeof window !== "undefined") window.location.replace("/admin/login");
    return null;
  }

  const logout = () => {
    sessionStorage.removeItem("camz_admin");
    window.location.replace("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-[image:var(--gradient-soft)]">
      {/* Sidebar */}
      <aside
        className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground"
      >
        <div className="px-6 py-3 border-b border-sidebar-border flex items-center justify-start overflow-hidden h-16">
          <img src="/images/cleaninglogo.png" alt="CAMZ" className="w-[90px] h-[90px] object-contain scale-[2.2] brightness-0 invert" />
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item, i) => {
            const active = item.exact ? path === item.to : path.startsWith(item.to);
            return (
              <div key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </div>
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
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="h-16 bg-card border-b border-border px-4 md:px-8 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <Link to="/" className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="hidden md:block">
              <h1 className="text-base font-bold text-deep-blue capitalize">
                {path === "/admin" ? "Dashboard" : path.split("/admin/")[1]?.replace(/-/g, " ") || "Admin"}
              </h1>
              <p className="text-xs text-muted-foreground">CAMZ Cleaning · Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search..."
                className="w-48 pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:w-64 transition-all"
              />
            </div>

            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-soft-blue text-white grid place-items-center text-xs font-bold shadow-sm">
                AD
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-deep-blue leading-none">Admin</div>
                <div className="text-xs text-muted-foreground mt-0.5">Owner</div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-x-auto pb-24 md:pb-8">{children}</main>
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex z-40">
          {navItems.map((item) => {
            const active = item.exact ? path === item.to : path.startsWith(item.to);
            return (
              <Link key={item.to} to={item.to}
                className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                <item.icon className="w-5 h-5" />
                <span className="text-[10px]">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

