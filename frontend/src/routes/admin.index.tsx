import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { CalendarDays, DollarSign, Users, CheckCircle2, Clock } from "lucide-react";
import { bookings } from "@/lib/data";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { revenueData } from "@/lib/data";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

const stats = [
  { label: "Total Bookings", value: "1,284", icon: CalendarDays, change: "+12%" },
  { label: "Revenue", value: "$48,200", icon: DollarSign, change: "+18%" },
  { label: "Active Staff", value: "24", icon: Users, change: "+2" },
  { label: "Completed Jobs", value: "1,108", icon: CheckCircle2, change: "+9%" },
  { label: "Pending Jobs", value: "32", icon: Clock, change: "-4%" },
];

function AdminHome() {
  return (
    <AdminLayout>
      <PageTransition direction="top">
        <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">Welcome back — here's what's happening today.</p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-soft-blue text-primary grid place-items-center"><s.icon className="w-5 h-5" /></div>
                <span className="text-xs font-medium text-primary">{s.change}</span>
              </div>
              <div className="mt-3 text-2xl font-bold text-deep-blue">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold text-deep-blue mb-4">Revenue trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="oklch(0.45 0.18 260)" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold text-deep-blue mb-4">Recent bookings</h3>
            <div className="space-y-3">
              {bookings.slice(0, 5).map((b) => (
                <div key={b.id} className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">{b.customer}</div>
                    <div className="text-xs text-muted-foreground">{b.service}</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-soft-blue text-deep-blue font-medium">{b.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </AdminLayout>
  );
}
