import { createFileRoute, redirect } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { services, serviceCategories } from "@/lib/data";
import { Plus, Settings, Trash2, ChevronUp, ChevronDown, RefreshCw, Search, X } from "lucide-react";
import { Modal } from "./admin.bookings";

export const Route = createFileRoute("/admin/services")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("camz_admin")) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: ServicesAdmin,
});

type ServiceState = { enabled: boolean; expanded: boolean; price: string };

function ServicesAdmin() {
  const [svcState, setSvcState] = useState<Record<string, ServiceState>>(
    Object.fromEntries(
      services.map((s) => [s.id, { enabled: true, expanded: s.id === "carpet", price: s.price }])
    )
  );
  const [categories, setCategories] = useState(serviceCategories);
  const [activeCategory, setActiveCategory] = useState("specialty");
  const [searchQuery, setSearchQuery] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");

  const toggleExpand = (id: string) =>
    setSvcState((p) => ({ ...p, [id]: { ...p[id], expanded: !p[id].expanded } }));
  const toggleEnabled = (id: string) =>
    setSvcState((p) => ({ ...p, [id]: { ...p[id], enabled: !p[id].enabled } }));
  const deleteCategory = (id: string) => {
    setCategories((p) => p.filter((c) => c.id !== id));
    if (activeCategory === id) setActiveCategory("");
  };
  const deleteService = (id: string) =>
    setSvcState((p) => { const next = { ...p }; delete next[id]; return next; });
  const openEdit = (id: string) => { setEditing(id); setEditPrice(svcState[id].price); };
  const saveEdit = () => {
    if (!editing) return;
    setSvcState((p) => ({ ...p, [editing]: { ...p[editing], price: editPrice } }));
    setEditing(null);
  };

  // Filter services by active category + search query
  const filteredServices = (() => {
    const q = searchQuery.trim().toLowerCase();
    let list = activeCategory
      ? services.filter((s) => s.category === activeCategory && svcState[s.id])
      : services.filter((s) => svcState[s.id]);
    if (q) {
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.desc.toLowerCase().includes(q) ||
          s.features.some((f) => f.toLowerCase().includes(q)) ||
          (s.long && s.long.toLowerCase().includes(q))
      );
    }
    return list;
  })();

  return (
    <AdminLayout>
      <PageTransition direction="bottom">
        <div className="space-y-8 pt-2">
          {/* Platform Categories */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-deep-blue">Platform Categories</h2>
                <button className="text-muted-foreground hover:text-foreground">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <button className="flex items-center gap-1.5 bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl">
                <Plus className="w-3.5 h-3.5" /> CATEGORY
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-3 pt-3 px-2">
              {categories.map((cat, i) => {
                const svc = services.find((s) => s.category === cat.id);
                const isActive = activeCategory === cat.id;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative flex-shrink-0 w-24 h-24 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                      isActive ? "bg-purple-500 text-white shadow-lg scale-105" : "bg-card text-foreground shadow-sm border border-border hover:shadow-md"
                    }`}
                  >
                    {/* delete badge */}
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }}
                      className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-10"
                    >
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                    <span className="text-2xl">{svc?.icon || "✨"}</span>
                    <span className="text-xs font-semibold text-center">{cat.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Category Services */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-deep-blue">Category Services</h2>
              <button className="flex items-center gap-1.5 bg-green-500 text-white text-xs font-semibold px-3 py-2 rounded-xl">
                <Plus className="w-3.5 h-3.5" /> SERVICE
              </button>
            </div>

            {/* Search bar */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services by name, feature…"
                className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              {filteredServices.map((svc, i) => {
                const state = svcState[svc.id];
                if (!state) return null;
                return (
                  <motion.div
                    key={svc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-2xl shadow-[var(--shadow-card)] border border-border"
                  >
                    {/* Header */}
                    <button
                      onClick={() => toggleExpand(svc.id)}
                      className="w-full flex items-center justify-between px-4 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${state.enabled ? "bg-green-500" : "bg-gray-300"}`} />
                        <div className="text-left">
                          <p className="text-sm font-semibold text-deep-blue">{svc.title}</p>
                          <p className="text-xs text-blue-500 font-medium">{state.price}</p>
                        </div>
                      </div>
                      {state.expanded
                        ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      }
                    </button>

                    {/* Expanded */}
                    {state.expanded && (
                      <div className="px-4 pb-4 border-t border-border">
                        {/* Status toggle */}
                        <div className="flex items-center justify-between py-3">
                          <span className="text-sm text-foreground font-medium">
                            Status ({state.enabled ? "Active" : "Inactive"})
                          </span>
                          <button
                            onClick={() => toggleEnabled(svc.id)}
                            className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${state.enabled ? "bg-blue-500" : "bg-gray-300"}`}
                          >
                            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${state.enabled ? "translate-x-6" : "translate-x-0.5"}`} />
                          </button>
                        </div>

                        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{svc.long || svc.desc}</p>

                        {/* Configure + Delete */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(svc.id)}
                            className="flex items-center gap-1.5 bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-600 transition-colors"
                          >
                            <Settings className="w-3.5 h-3.5" /> CONFIGURE
                          </button>
                          <button
                            onClick={() => deleteService(svc.id)}
                            className="w-10 h-10 flex items-center justify-center bg-red-50 rounded-xl hover:bg-red-100 transition-colors border border-red-100"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {filteredServices.length === 0 && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10 text-muted-foreground text-sm"
                  >
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    {searchQuery
                      ? <>No services match "<span className="font-semibold text-foreground">{searchQuery}</span>"<br /><button onClick={() => setSearchQuery("")} className="mt-2 text-xs text-primary underline underline-offset-2">Clear search</button></>
                      : "No services in this category."
                    }
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </section>
        </div>

        {editing && (
          <Modal title={`Configure — ${services.find((s) => s.id === editing)?.title}`} onClose={() => setEditing(null)}>
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
