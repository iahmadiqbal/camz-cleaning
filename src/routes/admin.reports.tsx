import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { revenueData, serviceBreakdown } from "@/lib/data";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/admin/reports")({
  component: ReportsPage,
});

const COLORS = ["oklch(0.45 0.18 260)", "oklch(0.6 0.2 255)", "oklch(0.7 0.15 240)", "oklch(0.5 0.1 220)", "oklch(0.4 0.12 280)"];

function ReportsPage() {
  return (
    <AdminLayout>
      <PageTransition direction="top">
        <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">Reports</h1>
        <p className="text-muted-foreground mt-1 text-sm">Insights into your business performance.</p>

        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold text-deep-blue mb-4">Monthly revenue</h3>
            <div className="h-72">
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

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold text-deep-blue mb-4">Service breakdown</h3>
            <div className="h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={serviceBreakdown} dataKey="value" nameKey="name" outerRadius={100} label>
                    {serviceBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </AdminLayout>
  );
}
