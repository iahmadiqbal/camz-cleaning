import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { staff } from "@/lib/data";
import { Plus, Star } from "lucide-react";
import { Modal } from "./admin.bookings";

export const Route = createFileRoute("/admin/staff")({
  component: StaffPage,
});

function StaffPage() {
  const [open, setOpen] = useState(false);
  return (
    <AdminLayout>
      <PageTransition direction="right">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">Staff</h1>
            <p className="text-muted-foreground mt-1 text-sm">Your cleaning team.</p>
          </div>
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-medium shadow-[var(--shadow-card)]">
            <Plus className="w-4 h-4" /> Add Staff
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {staff.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground grid place-items-center font-bold text-lg">
                {s.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="mt-3 font-semibold text-deep-blue">{s.name}</h3>
              <p className="text-xs text-muted-foreground">{s.role}</p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{s.jobs} jobs</span>
                <span className="flex items-center gap-1 font-medium"><Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />{s.rating}</span>
              </div>
              <div className="mt-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${s.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{s.status}</span></div>
            </motion.div>
          ))}
        </div>

        {open && (
          <Modal title="Add new staff" onClose={() => setOpen(false)}>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1.5">Full name</label><input className="w-full px-4 py-2.5 rounded-lg border border-border bg-background" /></div>
              <div><label className="block text-sm font-medium mb-1.5">Role</label><select className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"><option>Cleaner</option><option>Senior Cleaner</option><option>Team Lead</option><option>Detailer</option></select></div>
              <div><label className="block text-sm font-medium mb-1.5">Email</label><input type="email" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background" /></div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg border border-border">Cancel</button>
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">Add Staff</button>
            </div>
          </Modal>
        )}
      </PageTransition>
    </AdminLayout>
  );
}
