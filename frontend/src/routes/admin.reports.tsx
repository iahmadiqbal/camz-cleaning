import { createFileRoute, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { revenueData, serviceBreakdown, staff, bookings } from "@/lib/data";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line } from "recharts";

export const Route = createFileRoute("/admin/reports")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("camz_admin")) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: ReportsPage,
});

const COLORS = ["oklch(0.45 0.18 260)", "oklch(0.6 0.2 255)", "oklch(0.7 0.15 240)", "oklch(0.5 0.1 220)", "oklch(0.4 0.12 280)"];

const bookingTrends = [
  { week: "W1", bookings: 18 }, { week: "W2", bookings: 24 },
  { week: "W3", bookings: 21 }, { week: "W4", bookings: 31 },
  { week: "W5", bookings: 28 }, { week: "W6", bookings: 35 },
];

function ReportsPage() {
  return (
    <AdminLayout>
      <PageTransition direction="top">
        <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">Reports</h1>
        <p className="text-muted-foreground mt-1 text-sm">Revenue, staff performance and booking trends.</p>

        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          {/* Revenue */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold text-deep-blue mb-4">Monthly Revenue</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={revenueData}>
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="oklch(0.45 0.18 260)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Service breakdown */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold text-deep-blue mb-4">Service Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={serviceBreakdown} dataKey="value" nameKey="name" outerRadius={90} label={({ name, value }) => `${name} ${value}%`}>
                    {serviceBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Booking trends */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold text-deep-blue mb-4">Booking Trends (Weekly)</h3>
            <div className="h-64">
              <ResponsiveContainer>
                <LineChart data={bookingTrends}>
                  <XAxis dataKey="week" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="bookings" stroke="oklch(0.45 0.18 260)" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Staff performance */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold text-deep-blue mb-4">Staff Performance</h3>
            <div className="space-y-4">
              {staff.map((s) => (
                <div key={s.id}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-deep-blue">{s.name}</span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{s.jobs} jobs</span>
                      <span className="text-yellow-600">★ {s.rating}</span>
                      <span className={s.status === "Active" ? "text-green-600" : "text-yellow-600"}>{s.status}</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${Math.min((s.jobs / 200) * 100, 100)}%` }} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.role}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </AdminLayout>
  );
}
