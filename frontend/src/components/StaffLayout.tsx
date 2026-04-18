import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Briefcase, CalendarOff, LogOut, Sparkles } from "lucide-react";
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
    // Protected route — redirect to staff login if not authenticated
    if (!sessionStorage.getItem("camz_staff")) {
      window.location.href = "/staff/login";
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("camz_staff");
    window.location.href = "/staff/login";
  };

  return (
    <div className="min-h-screen bg-[image:var(--gradient-soft)] flex flex-col">
      {/* Top bar */}
      <header className="h-14 bg-card border-b border-border px-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[image:var(--gradient-hero)] grid place-items-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-deep-blue text-sm">CAMZ Staff</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground grid place-items-center text-xs font-bold">AM</div>
          <Link to="/staff/login" onClick={logout} className="p-1.5 rounded hover:bg-muted text-muted-foreground"><LogOut className="w-4 h-4" /></Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pb-20">{children}</main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex z-40">
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
      </nav>
    </div>
  );
}
