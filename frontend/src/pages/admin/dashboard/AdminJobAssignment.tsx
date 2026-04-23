
import { motion } from "framer-motion";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { bookings, staff } from "@/lib/data";
import { UserPlus, MapPin, Briefcase, Clock, X, CheckCircle2 } from "lucide-react";


export default function JobAssignment() {
  const unassigned = bookings.filter((b) => b.staff === "—" || b.status === "Pending");
  const [assigning, setAssigning] = useState<string | null>(null);
  const [assigned, setAssigned] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string>("");

  const confirm = () => {
    if (!assigning || !selected) return;
    setAssigned((p) => ({ ...p, [assigning]: selected }));
    setAssigning(null);
    setSelected("");
  };

  const activeStaff = staff.filter((s) => s.status === "Active");

  return (
    <AdminLayout>
      <PageTransition direction="bottom">
        <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">Job Assignment</h1>
        <p className="text-muted-foreground mt-1 text-sm mb-6">Manually assign cleaners to pending bookings.</p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Unassigned jobs */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="font-semibold text-deep-blue">Unassigned / Pending Jobs ({unassigned.length})</h2>
            {unassigned.map((b, i) => (
              <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{b.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-medium">{b.status}</span>
                    </div>
                    <div className="font-semibold text-deep-blue mt-1">{b.customer}</div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{b.service}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.date}</span>
                    </div>
                    {assigned[b.id] && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-green-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Assigned to {assigned[b.id]}
                      </div>
                    )}
                  </div>
                  <button onClick={() => { setAssigning(b.id); setSelected(""); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground text-xs font-medium shadow-[var(--shadow-card)] flex-shrink-0">
                    <UserPlus className="w-3.5 h-3.5" /> Assign
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Staff availability */}
          <div>
            <h2 className="font-semibold text-deep-blue mb-3">Available Staff</h2>
            <div className="space-y-3">
              {activeStaff.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground grid place-items-center font-bold text-sm flex-shrink-0">
                      {s.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-deep-blue text-sm">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.role}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="w-3 h-3" />Calgary NW</span>
                    <span className="text-primary font-medium">{s.jobs} jobs done</span>
                  </div>
                  <div className="mt-2 w-full bg-muted rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${Math.min((s.jobs / 200) * 100, 100)}%` }} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Workload: {s.jobs < 100 ? "Low" : s.jobs < 150 ? "Medium" : "High"}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Assign modal */}
        {assigning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setAssigning(null)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-[var(--shadow-elegant)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-deep-blue">Assign {assigning}</h3>
                <button onClick={() => setAssigning(null)} className="p-1 rounded hover:bg-muted"><X className="w-5 h-5" /></button>
              </div>
              <label className="block text-sm font-medium mb-2">Select cleaner</label>
              <div className="space-y-2 mb-5">
                {activeStaff.map((s) => (
                  <label key={s.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${selected === s.name ? "border-primary bg-soft-blue" : "border-border hover:border-primary/50"}`}>
                    <input type="radio" name="staff" value={s.name} checked={selected === s.name} onChange={() => setSelected(s.name)} className="accent-primary" />
                    <div className="w-8 h-8 rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground grid place-items-center text-xs font-bold">
                      {s.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.role} · ★{s.rating}</div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setAssigning(null)} className="flex-1 py-2 rounded-lg border border-border text-sm">Cancel</button>
                <button onClick={confirm} disabled={!selected} className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm disabled:opacity-50">Confirm</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </PageTransition>
    </AdminLayout>
  );
}

