import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { services, serviceCategories } from "@/lib/data";
import { Plus, Trash2, RefreshCw, X, ChevronDown, ChevronUp, Check, Settings } from "lucide-react";
import { Modal } from "./AdminBookings";
import { FaCar, FaCouch, FaHome, FaBuilding, FaSprayCan, FaStar, FaLeaf, FaShieldAlt } from "react-icons/fa";

type ServiceState = { enabled: boolean; price: string; expanded: boolean };

// Category icon map
const catIconMap: Record<string, React.ElementType> = {
  vehicle: FaCar,
  specialty: FaCouch,
  residential: FaHome,
  commercial: FaBuilding,
};

// Category bg colors (selected state)
const catBgMap: Record<string, string> = {
  vehicle:     "bg-red-500",
  specialty:   "bg-purple-500",
  residential: "bg-blue-500",
  commercial:  "bg-teal-500",
};

const ICONS = [
  { id: "star",     Icon: FaStar      },
  { id: "home",     Icon: FaHome      },
  { id: "spray",    Icon: FaSprayCan  },
  { id: "leaf",     Icon: FaLeaf      },
  { id: "shield",   Icon: FaShieldAlt },
  { id: "car",      Icon: FaCar       },
  { id: "couch",    Icon: FaCouch     },
  { id: "building", Icon: FaBuilding  },
];

const COLORS = [
  { id: "black",  cls: "bg-gray-900"   },
  { id: "purple", cls: "bg-purple-500" },
  { id: "orange", cls: "bg-orange-400" },
  { id: "green",  cls: "bg-green-500"  },
  { id: "red",    cls: "bg-red-500"    },
  { id: "blue",   cls: "bg-blue-500"   },
  { id: "teal",   cls: "bg-teal-500"   },
];

export default function ServicesAdmin() {
  const [svcState, setSvcState] = useState<Record<string, ServiceState>>(
    Object.fromEntries(services.map((s) => [s.id, { enabled: true, price: s.price, expanded: false }]))
  );
  const [categories, setCategories] = useState(serviceCategories);
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0]?.id ?? "");
  const [newCatOpen, setNewCatOpen] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", icon: "star", color: "black" });
  const [editing, setEditing] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");

  const toggleExpand = (id: string) =>
    setSvcState((p) => ({ ...p, [id]: { ...p[id], expanded: !p[id].expanded } }));

  const toggleEnabled = (id: string) =>
    setSvcState((p) => ({ ...p, [id]: { ...p[id], enabled: !p[id].enabled } }));

  const deleteCategory = (id: string) => {
    setCategories((p) => p.filter((c) => c.id !== id));
    if (activeCategory === id) setActiveCategory(categories.find((c) => c.id !== id)?.id ?? "");
  };

  const openEdit = (id: string) => { setEditing(id); setEditPrice(svcState[id]?.price ?? ""); };
  const saveEdit = () => {
    if (!editing) return;
    setSvcState((p) => ({ ...p, [editing]: { ...p[editing], price: editPrice } }));
    setEditing(null);
  };

  const createCategory = () => {
    if (!newCat.name.trim()) return;
    const id = newCat.name.toLowerCase().replace(/\s+/g, "-");
    setCategories((p) => [...p, { id, label: newCat.name }]);
    setActiveCategory(id);
    setNewCatOpen(false);
    setNewCat({ name: "", icon: "star", color: "black" });
  };

  const catServices = services.filter((s) => s.category === activeCategory && svcState[s.id]);

  return (
    <AdminLayout>
      <PageTransition direction="bottom">
        <div className="space-y-8 pt-2">

          {/* Platform Categories */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-deep-blue">Platform Categories</h2>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setNewCatOpen(true)}
                className="flex items-center gap-1.5 bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> CATEGORY
              </button>
            </div>

            {/* Horizontal scroll category cards */}
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {categories.map((cat, i) => {
                const Icon = catIconMap[cat.id] ?? FaStar;
                const isActive = activeCategory === cat.id;
                const bg = catBgMap[cat.id] ?? "bg-blue-500";

                return (
                  <div
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative flex-shrink-0 w-24 h-24 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all shadow-sm ${
                      isActive
                        ? `${bg} text-white shadow-lg scale-105`
                        : "bg-card border border-border text-foreground hover:shadow-md"
                    }`}
                  >
                    {/* Delete badge */}
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-10"
                    >
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>

                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? "bg-white/20" : "bg-muted"}`}>
                      <Icon className={`text-xl ${isActive ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <span className={`text-xs font-semibold text-center leading-tight ${isActive ? "text-white" : "text-foreground"}`}>
                      {cat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Category Services */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-deep-blue">Category Services</h2>
              <button className="flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-green-600 transition-colors">
                <Plus className="w-3.5 h-3.5" /> SERVICE
              </button>
            </div>

            <div className="space-y-3">
              {catServices.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground text-sm">
                  No services in this category.
                </div>
              ) : (
                catServices.map((svc, i) => {
                  const state = svcState[svc.id];
                  if (!state) return null;
                  return (
                    <div
                      key={svc.id}
                      className="bg-card rounded-2xl shadow-[var(--shadow-card)] border border-border overflow-hidden"
                    >
                      {/* Header row */}
                      <button
                        onClick={() => toggleExpand(svc.id)}
                        className="w-full flex items-center justify-between px-4 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${state.enabled ? "bg-green-500" : "bg-gray-300"}`} />
                          <div className="text-left">
                            <p className="text-sm font-bold text-deep-blue">{svc.title}</p>
                            <p className="text-xs text-blue-500 font-medium mt-0.5">
                              Fixed &amp; Hourly Available &nbsp;·&nbsp; 0 Add-ons
                            </p>
                          </div>
                        </div>
                        {state.expanded
                          ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        }
                      </button>

                      {/* Expanded panel */}
                        {state.expanded && (
                          <div className="px-4 pb-4 border-t border-border">
                            {/* Image */}
                            <div className="mt-3 rounded-xl overflow-hidden h-32">
                              <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                            </div>

                            {/* Status toggle */}
                            <div className="flex items-center justify-between py-3 mt-1">
                              <span className="text-sm font-medium text-foreground">
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

                            {/* Price + actions */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEdit(svc.id)}
                                className="flex items-center gap-1.5 bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-600 transition-colors"
                              >
                                <Settings className="w-3.5 h-3.5" /> CONFIGURE
                              </button>
                              <button
                                onClick={() => setSvcState((p) => { const n = { ...p }; delete n[svc.id]; return n; })}
                                className="w-10 h-10 flex items-center justify-center bg-red-50 rounded-xl hover:bg-red-100 transition-colors border border-red-100"
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </div>
                          </div>
                        )}
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>

        {/* Configure Price Modal */}
        {editing && (
          <Modal title={`Configure — ${services.find((s) => s.id === editing)?.title}`} onClose={() => setEditing(null)}>
            <label className="block text-sm font-medium mb-1.5">Price label</label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              placeholder="e.g. From $89"
            />
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-border text-sm">Cancel</button>
              <button onClick={saveEdit} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm">Save</button>
            </div>
          </Modal>
        )}

        {/* New Category Modal */}
        {newCatOpen && (
            <div
              onClick={() => setNewCatOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm grid place-items-center p-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-3xl bg-card p-6 shadow-[var(--shadow-elegant)]"
              >
                <h3 className="text-xl font-bold text-deep-blue mb-5">New Category</h3>

                {/* Name */}
                <label className="block text-sm font-medium text-foreground mb-1.5">Category Name</label>
                <input
                  value={newCat.name}
                  onChange={(e) => setNewCat((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g., Deep Cleaning"
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 mb-5"
                />

                {/* Icon picker */}
                <label className="block text-sm font-medium text-muted-foreground mb-3">Platform Icon</label>
                <div className="flex gap-2 flex-wrap mb-5">
                  {ICONS.map(({ id, Icon }) => {
                    const active = newCat.icon === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setNewCat((p) => ({ ...p, icon: id }))}
                        className={`w-12 h-12 rounded-2xl grid place-items-center transition-all ${
                          active ? "bg-blue-500 text-white shadow-md scale-105" : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        <Icon className="text-lg" />
                      </button>
                    );
                  })}
                </div>

                {/* Color picker */}
                <label className="block text-sm font-medium text-muted-foreground mb-3">Branding Color</label>
                <div className="flex gap-3 flex-wrap mb-6">
                  {COLORS.map(({ id, cls }) => {
                    const active = newCat.color === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setNewCat((p) => ({ ...p, color: id }))}
                        className={`w-11 h-11 rounded-full ${cls} grid place-items-center transition-all ${
                          active ? "ring-2 ring-offset-2 ring-foreground scale-110" : "hover:scale-105"
                        }`}
                      >
                        {active && <Check className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setNewCatOpen(false)}
                    className="text-primary font-semibold text-sm hover:underline flex-shrink-0"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createCategory}
                    disabled={!newCat.name.trim()}
                    className="flex-1 py-3.5 rounded-2xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-600 transition-all disabled:opacity-40"
                  >
                    Create Category
                  </button>
                </div>
              </div>
            </div>
          )}
      </PageTransition>
    </AdminLayout>
  );
}
