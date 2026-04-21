import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Briefcase, CalendarOff, LogOut, ArrowLeft, Bell } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";

const nav = [
  { to: "/staff", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/staff/jobs", label: "Jobs", icon: Briefcase },
  { to: "/staff/leave", label: "Leave", icon: CalendarOff },
];

export function StaffLayout({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("camz_staff")) {
      window.location.href = "/staff/login";
    }
  }, []);

  const logout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("camz_staff");
      window.location.href = "/staff/login";
    }
  };

  const pageTitle = path === "/staff" ? "Dashboard" : path.split("/staff/")[1]?.replace(/-/g, " ") || "Staff";

  return (
    <div className="min-h-screen flex bg-[image:var(--gradient-soft)]">
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground">
        <div className="px-6 py-5 border-b border-sidebar-border flex items-center gap-2">
          <img src="/images/transparentlogo.png" alt="CAMZ" className="h-12 w-auto object-contain brightness-0 invert" />
          <div>
            <div className="font-bold">CAMZ Staff</div>
            <div className="text-xs opacity-70">Cleaner portal</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = item.exact ? path === item.to : path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
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

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="hidden md:block">
            <h1 className="text-base font-bold text-deep-blue capitalize">{pageTitle}</h1>
            <p className="text-xs text-muted-foreground">CAMZ Cleaning · Staff Portal</p>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-[image:var(--gradient-hero)] text-white grid place-items-center text-xs font-bold shadow-sm">AM</div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-deep-blue leading-none">Alex Morgan</div>
                <div className="text-xs text-muted-foreground mt-0.5">Cleaner</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-x-auto pb-20 md:pb-8">{children}</main>
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex z-40">
          {nav.map((item) => {
            const active = item.exact ? path === item.to : path.startsWith(item.to);
            return (
              <Link key={item.to} to={item.to}
                className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
          <Link to="/" className="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to site
          </Link>
        </nav>
      </div>
    </div>
  );
}
