import { createFileRoute, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { StaffLayout } from "@/components/StaffLayout";
import { PageTransition } from "@/components/PageTransition";
import { leaveRequests } from "@/lib/data";
import { Plus, X } from "lucide-react";

export const Route = createFileRoute("/staff/leave")({
  head: () => ({ meta: [{ title: "Leave Request — CAMZ Cleaning" }] }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("camz_staff")) {
      throw redirect({ to: "/staff/login" });
    }
  },
  component: StaffLeave,
});

const inputCls = "w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";

function StaffLeave() {
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState(leaveRequests.filter((r) => r.staff === "Jordan Smith"));
  const [form, setForm] = useState({ from: "", to: "", reason: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequests((p) => [...p, { id: Date.now(), staff: "Jordan Smith", ...form, status: "Pending" }]);
    setOpen(false);
    setForm({ from: "", to: "", reason: "" });
  };

  return (
    <StaffLayout>
      <PageTransition direction="right">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-deep-blue">Leave Requests</h1>
            <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-medium text-sm shadow-[var(--shadow-card)]">
              <Plus className="w-4 h-4" /> Apply Leave
            </button>
          </div>

          {requests.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">No leave requests yet</div>
          ) : (
            <div className="space-y-3">
              {requests.map((r, i) => (
                <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-deep-blue">{r.from} → {r.to}</div>
                      <div className="text-sm text-muted-foreground mt-1">{r.reason}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                      r.status === "Approved" ? "bg-green-100 text-green-800" :
                      r.status === "Rejected" ? "bg-red-100 text-red-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>{r.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-card p-6 shadow-[var(--shadow-elegant)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-deep-blue">Apply for Leave</h3>
                <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-muted"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={submit} className="space-y-4">
                <div><label className="block text-sm font-medium mb-1.5">From date</label><input required type="date" className={inputCls} value={form.from} onChange={(e) => setForm((p) => ({ ...p, from: e.target.value }))} /></div>
                <div><label className="block text-sm font-medium mb-1.5">To date</label><input required type="date" className={inputCls} value={form.to} onChange={(e) => setForm((p) => ({ ...p, to: e.target.value }))} /></div>
                <div><label className="block text-sm font-medium mb-1.5">Reason</label><textarea required className={`${inputCls} resize-none`} rows={3} value={form.reason} onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))} placeholder="Briefly explain your reason..." /></div>
                <div className="flex justify-end gap-2 pt-1">
                  <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg border border-border text-sm">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm">Submit</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </PageTransition>
    </StaffLayout>
  );
}
