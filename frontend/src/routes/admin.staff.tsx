import { createFileRoute, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { staff } from "@/lib/data";
import { Plus, Star, Clock, Trash2 } from "lucide-react";
import { Modal } from "./admin.bookings";

export const Route = createFileRoute("/admin/staff")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("camz_admin")) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: StaffPage,
});

const workingHours: Record<number, string> = { 1: "38h this week", 2: "42h this week", 3: "31h this week", 4: "0h (on leave)" };

function StaffPage() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<number | null>(null);
  return (
    <AdminLayout>
      <PageTransition direction="right">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">Staff</h1>
            <p className="text-muted-foreground mt-1 text-sm">Manage your cleaning team.</p>
          </div>
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-medium shadow-[var(--shadow-card)]">
            <Plus className="w-4 h-4" /> Add Staff
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {staff.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground grid place-items-center font-bold text-lg">
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <button onClick={() => {}} className="p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
              <h3 className="mt-3 font-semibold text-deep-blue">{s.name}</h3>
              <p className="text-xs text-muted-foreground">{s.role}</p>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-muted-foreground"><Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />{s.rating} rating</span>
                  <span className="text-muted-foreground">{s.jobs} jobs</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3 h-3" />{workingHours[s.id]}</div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{s.status}</span>
                <button onClick={() => setView(s.id)} className="text-xs text-primary hover:underline">View details</button>
              </div>
            </motion.div>
          ))}
        </div>

        {open && (
          <Modal title="Add new staff" onClose={() => setOpen(false)}>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1.5">Full name</label><input className="w-full px-4 py-2.5 rounded-lg border border-border bg-background" /></div>
              <div><label className="block text-sm font-medium mb-1.5">Role</label><select className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"><option>Cleaner</option><option>Senior Cleaner</option><option>Team Lead</option><option>Detailer</option></select></div>
              <div><label className="block text-sm font-medium mb-1.5">Email</label><input type="email" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background" /></div>
              <div><label className="block text-sm font-medium mb-1.5">Phone</label><input type="tel" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background" /></div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg border border-border">Cancel</button>
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">Add Staff</button>
            </div>
          </Modal>
        )}

        {view !== null && (() => {
          const s = staff.find((x) => x.id === view)!;
          return (
            <Modal title={`${s.name} — Details`} onClose={() => setView(null)}>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Role</span><span className="font-medium">{s.role}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{s.status}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Jobs completed</span><span className="font-medium">{s.jobs}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Rating</span><span className="font-medium">★ {s.rating}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Working hours</span><span className="font-medium">{workingHours[s.id]}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Availability</span><span className="font-medium text-green-700">{s.status === "Active" ? "Available today" : "On leave"}</span></div>
              </div>
              <div className="mt-5 flex justify-end">
                <button onClick={() => setView(null)} className="px-4 py-2 rounded-lg border border-border text-sm">Close</button>
              </div>
            </Modal>
          );
        })()}
      </PageTransition>
    </AdminLayout>
  );
}
