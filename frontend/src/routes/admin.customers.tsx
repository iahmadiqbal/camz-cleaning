import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { customers } from "@/lib/data";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/admin/customers")({
  component: CustomersPage,
});

function CustomersPage() {
  return (
    <AdminLayout>
      <PageTransition direction="right">
        <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">Customers</h1>
        <p className="text-muted-foreground mt-1 text-sm">All registered customers.</p>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground grid place-items-center font-bold">
                  {c.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold text-deep-blue">{c.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" />{c.email}</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <div className="p-2 rounded-lg bg-muted/50"><div className="text-lg font-bold text-deep-blue">{c.bookings}</div><div className="text-xs text-muted-foreground">Bookings</div></div>
                <div className="p-2 rounded-lg bg-muted/50"><div className="text-lg font-bold text-deep-blue">${c.spent}</div><div className="text-xs text-muted-foreground">Spent</div></div>
              </div>
            </motion.div>
          ))}
        </div>
      </PageTransition>
    </AdminLayout>
  );
}
