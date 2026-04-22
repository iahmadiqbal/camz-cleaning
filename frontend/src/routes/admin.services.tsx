import { createFileRoute, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { services } from "@/lib/data";
import { Edit, X, ToggleLeft, ToggleRight, Plus } from "lucide-react";
import { Modal } from "./admin.bookings";

export const Route = createFileRoute("/admin/services")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("camz_admin")) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: ServicesAdmin,
});

type ServiceState = { enabled: boolean; price: string; addons: string[] };

function ServicesAdmin() {
  const [svcState, setSvcState] = useState<Record<string, ServiceState>>(
    Object.fromEntries(services.map((s) => [s.id, { enabled: true, price: s.price, addons: ["Standard Clean", "Deep Clean"] }]))
  );
  const [editing, setEditing] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [newAddon, setNewAddon] = useState("");

  const toggle = (id: string) => setSvcState((p) => ({ ...p, [id]: { ...p[id], enabled: !p[id].enabled } }));
  const openEdit = (id: string) => { setEditing(id); setEditPrice(svcState[id].price); };
  const saveEdit = () => {
    if (!editing) return;
    setSvcState((p) => ({ ...p, [editing]: { ...p[editing], price: editPrice } }));
    setEditing(null);
  };
  const addAddon = (id: string) => {
    if (!newAddon.trim()) return;
    setSvcState((p) => ({ ...p, [id]: { ...p[id], addons: [...p[id].addons, newAddon.trim()] } }));
    setNewAddon("");
  };
  const removeAddon = (id: string, addon: string) => {
    setSvcState((p) => ({ ...p, [id]: { ...p[id], addons: p[id].addons.filter((a) => a !== addon) } }));
  };

  return (
    <AdminLayout>
      <PageTransition direction="bottom">
        <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">Services</h1>
        <p className="text-muted-foreground mt-1 text-sm mb-6">Enable/disable services, edit pricing and manage add-ons.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => {
            const state = svcState[s.id];
            return (
              <motion.div key={s.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
                className={`rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)] transition-opacity ${state.enabled ? "border-border" : "border-border opacity-50"}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{s.icon}</div>
                  <button onClick={() => toggle(s.id)} className="text-primary">
                    {state.enabled ? <ToggleRight className="w-7 h-7 text-green-600" /> : <ToggleLeft className="w-7 h-7 text-muted-foreground" />}
                  </button>
                </div>
                <h3 className="font-bold text-deep-blue">{s.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-primary font-semibold text-sm">{state.price}</span>
                  <button onClick={() => openEdit(s.id)} className="flex items-center gap-1 text-xs text-primary hover:underline">
                    <Edit className="w-3 h-3" /> Edit price
                  </button>
                </div>

                {/* Add-ons */}
                <div className="mt-4">
                  <div className="text-xs font-medium text-deep-blue mb-2">Add-ons</div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {state.addons.map((a) => (
                      <span key={a} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-white text-xs">
                        {a}
                        <button onClick={() => removeAddon(s.id, a)} className="hover:text-destructive"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <input value={newAddon} onChange={(e) => setNewAddon(e.target.value)} placeholder="New add-on..." className="flex-1 px-2 py-1 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary/40" />
                    <button onClick={() => addAddon(s.id)} className="p-1.5 rounded-lg bg-primary text-primary-foreground"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {editing && (
          <Modal title={`Edit pricing — ${services.find((s) => s.id === editing)?.title}`} onClose={() => setEditing(null)}>
            <label className="block text-sm font-medium mb-1.5">Price label</label>
            <input className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} placeholder="e.g. From $89" />
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-border text-sm">Cancel</button>
              <button onClick={saveEdit} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm">Save</button>
            </div>
          </Modal>
        )}
      </PageTransition>
    </AdminLayout>
  );
}
