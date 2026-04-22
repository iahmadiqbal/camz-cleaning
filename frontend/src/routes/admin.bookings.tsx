import { createFileRoute, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { bookings, cleaners } from "@/lib/data";
import { Edit, X, UserPlus } from "lucide-react";

export const Route = createFileRoute("/admin/bookings")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("camz_admin")) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: BookingsPage,
});

const statusColor = (s: string) => ({
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-blue-100 text-blue-800",
  "In Progress": "bg-purple-100 text-purple-800",
  Completed: "bg-green-100 text-green-800",
}[s] || "bg-muted");

function BookingsPage() {
  const [assignFor, setAssignFor] = useState<string | null>(null);
  const [editFor, setEditFor] = useState<string | null>(null);
  const [deleteFor, setDeleteFor] = useState<string | null>(null);

  return (
    <AdminLayout>
      <PageTransition direction="left">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">Bookings</h1>
            <p className="text-muted-foreground mt-1 text-sm">Manage all customer bookings.</p>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  {["ID", "Customer", "Service", "Date", "Staff", "Status", "Amount", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-deep-blue">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <motion.tr
                    key={b.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-t border-border hover:bg-muted/30"
                  >
                    <td className="px-4 py-3 font-mono text-xs">{b.id}</td>
                    <td className="px-4 py-3 font-medium">{b.customer}</td>
                    <td className="px-4 py-3">{b.service}</td>
                    <td className="px-4 py-3">{b.date}</td>
                    <td className="px-4 py-3">{b.staff}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(b.status)}`}>{b.status}</span></td>
                    <td className="px-4 py-3 font-semibold">${b.amount}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => setAssignFor(b.id)} title="Assign" className="p-1.5 rounded hover:bg-soft-blue text-primary"><UserPlus className="w-4 h-4" /></button>
                        <button onClick={() => setEditFor(b.id)} title="Edit" className="p-1.5 rounded hover:bg-soft-blue text-primary"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteFor(b.id)} title="Cancel" className="p-1.5 rounded hover:bg-red-50 text-destructive"><X className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {assignFor && (
          <Modal title={`Assign Job ${assignFor}`} onClose={() => setAssignFor(null)}>
            <label className="block text-sm font-medium mb-1.5">Select staff</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-background">
              {cleaners.map((c) => <option key={c}>{c}</option>)}
            </select>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setAssignFor(null)} className="px-4 py-2 rounded-lg border border-border">Cancel</button>
              <button onClick={() => setAssignFor(null)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">Assign</button>
            </div>
          </Modal>
        )}
        {editFor && (
          <Modal title={`Edit Booking ${editFor}`} onClose={() => setEditFor(null)}>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1.5">Date</label><input type="date" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background" /></div>
              <div><label className="block text-sm font-medium mb-1.5">Status</label><select className="w-full px-4 py-2.5 rounded-lg border border-border bg-background"><option>Pending</option><option>Confirmed</option><option>In Progress</option><option>Completed</option></select></div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setEditFor(null)} className="px-4 py-2 rounded-lg border border-border">Cancel</button>
              <button onClick={() => setEditFor(null)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">Save</button>
            </div>
          </Modal>
        )}
        {deleteFor && (
          <Modal title="Cancel booking?" onClose={() => setDeleteFor(null)}>
            <p className="text-sm text-muted-foreground">This will cancel booking <b>{deleteFor}</b>. This action cannot be undone.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setDeleteFor(null)} className="px-4 py-2 rounded-lg border border-border">Keep</button>
              <button onClick={() => setDeleteFor(null)} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-medium">Confirm Cancel</button>
            </div>
          </Modal>
        )}
      </PageTransition>
    </AdminLayout>
  );
}

export function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-card p-6 shadow-[var(--shadow-elegant)]"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-deep-blue">{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-5 h-5" /></button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
