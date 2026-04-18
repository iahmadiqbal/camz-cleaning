import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { payments } from "@/lib/data";

export const Route = createFileRoute("/admin/payments")({
  component: PaymentsPage,
});

function PaymentsPage() {
  return (
    <AdminLayout>
      <PageTransition direction="left">
        <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">Payments</h1>
        <p className="text-muted-foreground mt-1 text-sm">All transactions across your bookings.</p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>{["ID", "Customer", "Amount", "Method", "Date", "Status"].map((h) => <th key={h} className="px-4 py-3 font-semibold text-deep-blue">{h}</th>)}</tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <motion.tr key={p.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="border-t border-border hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                    <td className="px-4 py-3 font-medium">{p.customer}</td>
                    <td className="px-4 py-3 font-semibold">${p.amount}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.method}</td>
                    <td className="px-4 py-3">{p.date}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{p.status}</span></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </PageTransition>
    </AdminLayout>
  );
}
