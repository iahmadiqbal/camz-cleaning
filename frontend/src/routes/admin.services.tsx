import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { services } from "@/lib/data";

export const Route = createFileRoute("/admin/services")({
  component: ServicesAdmin,
});

function ServicesAdmin() {
  return (
    <AdminLayout>
      <PageTransition direction="bottom">
        <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">Services</h1>
        <p className="text-muted-foreground mt-1 text-sm">Configure your offered services.</p>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-deep-blue">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-primary font-semibold text-sm">{s.price}</span>
                <button className="text-sm text-primary hover:underline">Edit</button>
              </div>
            </motion.div>
          ))}
        </div>
      </PageTransition>
    </AdminLayout>
  );
}
