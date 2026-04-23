import { createFileRoute, redirect } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { appStore, type AppCustomer, type Platform } from "@/lib/appStore";
import {
  Search,
  Calendar,
  RefreshCw,
  Plus,
  FileText,
  Pencil,
  Trash2,
  ChevronRight,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export const Route = createFileRoute("/admin/customers")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("camz_admin")) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: CustomersPage,
});

type Platform = "APP" | "GOOGLE" | "REFERRAL" | "FACEBOOK" | "WEBSITE";

interface Customer {
  id: number;
  name: string;
  email: string;
  platform: Platform;
  joined: string;
  bookings: number;
  spent: number;
}

const mockCustomers: Customer[] = [
  { id: 1, name: "Ahmad", email: "ahmadev42@gmail.com", platform: "APP", joined: "Apr 19, 2026", bookings: 5, spent: 450 },
  { id: 2, name: "Ahmad", email: "ahmaddev42@gmail.com", platform: "APP", joined: "Apr 18, 2026", bookings: 3, spent: 280 },
  { id: 3, name: "Anas", email: "chanas.tahir.55@gmail.com", platform: "GOOGLE", joined: "Apr 14, 2026", bookings: 8, spent: 920 },
  { id: 4, name: "Anas", email: "anast4390@gmail.com", platform: "REFERRAL", joined: "Apr 14, 2026", bookings: 2, spent: 180 },
  { id: 5, name: "New Customer", email: "abc@gmail.com", platform: "FACEBOOK", joined: "Apr 14, 2026", bookings: 1, spent: 89 },
  { id: 6, name: "Sarah Johnson", email: "sarah@example.com", platform: "APP", joined: "Mar 10, 2026", bookings: 12, spent: 1480 },
  { id: 7, name: "Mark Chen", email: "mark@example.com", platform: "WEBSITE", joined: "Feb 22, 2026", bookings: 24, spent: 7200 },
];

const platformColors: Record<Platform, string> = {
  APP: "border border-gray-300 text-gray-500",
  GOOGLE: "bg-red-50 text-red-500 border border-red-200",
  REFERRAL: "border border-gray-300 text-gray-500",
  FACEBOOK: "border border-blue-300 text-blue-500",
  WEBSITE: "border border-gray-300 text-gray-500",
};

function avatarColor(name: string) {
  const colors = ["bg-blue-100 text-blue-600", "bg-purple-100 text-purple-600", "bg-green-100 text-green-600", "bg-orange-100 text-orange-600"];
  return colors[name.charCodeAt(0) % colors.length];
}

function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<Customer | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<Customer | null>(null);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", platform: "APP" as Platform });

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setCustomers((p) => p.filter((c) => c.id !== id));
    setShowDeleteModal(null);
  };

  const handleAdd = () => {
    if (!newCustomer.name || !newCustomer.email) return;
    const id = Math.max(...customers.map((c) => c.id)) + 1;
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    setCustomers((p) => [...p, { ...newCustomer, id, joined: today, bookings: 0, spent: 0 }]);
    setNewCustomer({ name: "", email: "", platform: "APP" });
    setShowAddModal(false);
  };

  const handleEdit = () => {
    if (!showEditModal) return;
    setCustomers((p) => p.map((c) => c.id === showEditModal.id ? showEditModal : c));
    setShowEditModal(null);
  };

  return (
    <AdminLayout>
      <PageTransition direction="right">
        <div className="relative min-h-full pb-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
            <button onClick={() => setCustomers(mockCustomers)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <RefreshCw className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm"
            />
          </div>

          {/* Filter by Date */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium mb-4 hover:bg-gray-200 transition-colors">
            <Calendar className="w-4 h-4" />
            Filter by Date
          </button>

          {/* Total count */}
          <p className="text-sm text-gray-600 font-medium mb-4">
            Total Customers: <span className="font-bold text-gray-900">{filtered.length}</span>
          </p>

          {/* Customer Cards */}
          <div className="space-y-3">
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
              >
                {/* Top row */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 ${avatarColor(c.name)}`}>
                    {c.name[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                    <p className="text-xs text-gray-400 truncate">{c.email}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex-shrink-0 ${platformColors[c.platform]}`}>
                    {c.platform}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 mb-3" />

                {/* Platform + Joined */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[10px] text-blue-400 font-semibold tracking-wide uppercase">Platform</p>
                    <p className="text-sm font-semibold text-gray-800">{c.platform}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-blue-400 font-semibold tracking-wide uppercase">Joined</p>
                    <p className="text-sm font-semibold text-gray-800">{c.joined}</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  {/* Create Invoice */}
                  <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-blue-500 text-xs font-semibold hover:bg-blue-50 transition-colors">
                    <FileText className="w-4 h-4" />
                    Create Invoice
                  </button>
                  {/* Edit */}
                  <button
                    onClick={() => setShowEditModal(c)}
                    className="w-10 h-10 flex items-center justify-center bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
                  >
                    <Pencil className="w-4 h-4 text-orange-400" />
                  </button>
                  {/* Delete */}
                  <button
                    onClick={() => setShowDeleteModal(c)}
                    className="w-10 h-10 flex items-center justify-center bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                  {/* Arrow / Detail */}
                  <button className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                  </button>
                </div>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400 text-sm">No customers found.</div>
            )}
          </div>

          {/* Floating Add Customer Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="fixed bottom-24 right-6 flex items-center gap-2 bg-blue-500 text-white font-semibold px-5 py-3.5 rounded-2xl shadow-lg hover:bg-blue-600 transition-colors z-30"
          >
            <Plus className="w-5 h-5" />
            Add Customer
          </button>
        </div>

        {/* ── Add Customer Modal ── */}
        <AnimatePresence>
          {showAddModal && (
            <Modal title="Add Customer" onClose={() => setShowAddModal(false)}>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                  <input
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Customer name"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                  <input
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="email@example.com"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Platform</label>
                  <select
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={newCustomer.platform}
                    onChange={(e) => setNewCustomer((p) => ({ ...p, platform: e.target.value as Platform }))}
                  >
                    {(["APP", "GOOGLE", "REFERRAL", "FACEBOOK", "WEBSITE"] as Platform[]).map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-5">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium">Cancel</button>
                <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600">Add</button>
              </div>
            </Modal>
          )}
        </AnimatePresence>

        {/* ── Edit Customer Modal ── */}
        <AnimatePresence>
          {showEditModal && (
            <Modal title="Edit Customer" onClose={() => setShowEditModal(null)}>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                  <input
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={showEditModal.name}
                    onChange={(e) => setShowEditModal((p) => p ? { ...p, name: e.target.value } : p)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                  <input
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={showEditModal.email}
                    onChange={(e) => setShowEditModal((p) => p ? { ...p, email: e.target.value } : p)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Platform</label>
                  <select
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={showEditModal.platform}
                    onChange={(e) => setShowEditModal((p) => p ? { ...p, platform: e.target.value as Platform } : p)}
                  >
                    {(["APP", "GOOGLE", "REFERRAL", "FACEBOOK", "WEBSITE"] as Platform[]).map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-5">
                <button onClick={() => setShowEditModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium">Cancel</button>
                <button onClick={handleEdit} className="flex-1 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600">Save</button>
              </div>
            </Modal>
          )}
        </AnimatePresence>

        {/* ── Delete Confirm Modal ── */}
        <AnimatePresence>
          {showDeleteModal && (
            <Modal title="Delete Customer?" onClose={() => setShowDeleteModal(null)}>
              <p className="text-sm text-gray-500 mb-5">
                Are you sure you want to delete <span className="font-semibold text-gray-800">{showDeleteModal.name}</span>? This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setShowDeleteModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium">Cancel</button>
                <button onClick={() => handleDelete(showDeleteModal.id)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600">Delete</button>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </PageTransition>
    </AdminLayout>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl p-5 shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
