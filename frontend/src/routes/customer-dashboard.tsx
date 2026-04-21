import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CustomerLayout } from "@/components/CustomerLayout";
import { bookings } from "@/lib/data";
import { CalendarDays, Clock, CheckCircle2, RotateCcw, Plus, MapPin, Bell, X } from "lucide-react";

export const Route = createFileRoute("/customer-dashboard")({
  head: () => ({ meta: [{ title: "My Dashboard — CAMZ Cleaning" }] }),
  component: CustomerDashboard,
});

const statusColor = (s: string) =>
  ({
    Pending: "bg-primary text-white",
    Confirmed: "bg-primary text-white",
    "In Progress": "bg-primary text-white",
    Completed: "bg-primary text-white",
  }[s] || "bg-primary text-white");

const statusIcon = (s: string) =>
  ({
    Pending: Clock,
    Confirmed: CalendarDays,
    "In Progress": Clock,
    Completed: CheckCircle2,
  }[s] || Clock);

const myBookings = bookings;

function CustomerDashboard() {
  const navigate = useNavigate();
  const active = myBookings.filter((b) => b.status !== "Completed");
  const past = myBookings.filter((b) => b.status === "Completed");

  const customerName = (() => {
    try {
      const data = sessionStorage.getItem("camz_customer");
      if (!data) return "there";
      const parsed = JSON.parse(data);
      return parsed.name || "there";
    } catch {
      return "there";
    }
  })();

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("camz_customer")) {
      navigate({ to: "/login" });
    }
  }, []);

  const [notifications, setNotifications] = useState([
    { id: 1, msg: "Booking BK-1042 confirmed!", type: "success", time: "2 min ago" },
    { id: 2, msg: "Alex Morgan has been assigned to your job.", type: "info", time: "1 hr ago" },
    { id: 3, msg: "Your cleaner is on the way!", type: "info", time: "3 hr ago" },
    { id: 4, msg: "Job completed — hope you love it! ⭐", type: "success", time: "Yesterday" },
  ]);
  const dismissNotif = (id: number) => setNotifications((p) => p.filter((n) => n.id !== id));

  return (
    <CustomerLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">My Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-sm">Welcome back, {customerName}</p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-medium shadow-[var(--shadow-card)] text-sm"
          >
            <Plus className="w-4 h-4" /> New Booking
          </Link>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-deep-blue">Notifications</h2>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground">{notifications.length}</span>
            </div>
            <div className="space-y-2">
              {notifications.map((n) => (
                <div key={n.id}
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-sm ${n.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-blue-50 border-blue-200 text-blue-800"}`}>
                  <span>{n.msg}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs opacity-60">{n.time}</span>
                    <button onClick={() => dismissNotif(n.id)} className="opacity-60 hover:opacity-100"><X className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: myBookings.length, icon: CalendarDays },
            { label: "Active", value: active.length, icon: Clock },
            { label: "Completed", value: past.length, icon: CheckCircle2 },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] text-center">
              <div className="w-10 h-10 rounded-lg bg-primary text-white grid place-items-center mx-auto mb-2">
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-deep-blue">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Active bookings */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-deep-blue mb-4">Active Bookings</h2>
          {active.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">No active bookings</div>
          ) : (
            <div className="space-y-3">
              {active.map((b) => {
                const Icon = statusIcon(b.status);
                return (
                  <div key={b.id} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-primary text-white grid place-items-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-deep-blue">{b.service} Cleaning</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {b.date} · {b.staff !== "—" ? `Cleaner: ${b.staff}` : "Awaiting assignment"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(b.status)}`}>{b.status}</span>
                      <Link to="/tracking" className="text-xs text-primary hover:underline flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Track
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Past bookings */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-deep-blue mb-4">Past Bookings</h2>
          {past.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">No past bookings</div>
          ) : (
            <div className="space-y-3">
              {past.map((b) => (
                <div key={b.id} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#28A745] text-white grid place-items-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-deep-blue">{b.service} Cleaning</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{b.date} · ${b.amount} · {b.staff}</div>
                    </div>
                  </div>
                  <Link
                    to={`/booking/$service` as never}
                    params={{ service: b.service.toLowerCase().replace(" ", "") } as never}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Rebook
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preferences */}
        <div>
          <h2 className="text-lg font-bold text-deep-blue mb-4">My Preferences</h2>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Special instructions</label>
              <textarea className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40" rows={2} placeholder="e.g. Please use fragrance-free products" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Entry details</label>
              <input className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="e.g. Key under mat, door code 1234" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Pet information</label>
              <input className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="e.g. 1 dog, friendly, keep door closed" />
            </div>
            <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Save preferences</button>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
