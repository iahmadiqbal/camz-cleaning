import { createFileRoute, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { TrendingUp, CreditCard, Banknote, Clock, ChevronRight, RefreshCw, SearchX } from "lucide-react";

export const Route = createFileRoute("/admin/payments")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("camz_admin")) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: PaymentsPage,
});

type PaymentMethod = "COD" | "Card" | "Online";
type PaymentStatus = "Paid" | "Pending" | "Failed";

interface Transaction {
  id: string;
  service: string;
  customer: string;
  datetime: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
}

interface CleanerPayout {
  id: string;
  name: string;
  totalEarned: number;
  paidOut: number;
  currency: string;
}

const mockTransactions: Transaction[] = [
  { id: "TX-001", service: "Vehicle Detailing", customer: "Anas Tahir Customer", datetime: "Apr 22, 2026 • 7:14 PM", amount: 0.03, currency: "CAD", status: "Paid", method: "COD" },
  { id: "TX-002", service: "Vehicle Detailing", customer: "Anas Tahir Customer", datetime: "Apr 22, 2026 • 7:06 PM", amount: 0.02, currency: "CAD", status: "Paid", method: "COD" },
  { id: "TX-003", service: "Carpet / Sofa Cleaning", customer: "Ahmad", datetime: "Apr 21, 2026 • 3:00 PM", amount: 40.00, currency: "CAD", status: "Pending", method: "Card" },
  { id: "TX-004", service: "Carpet / Sofa Cleaning", customer: "Ahmad", datetime: "Apr 21, 2026 • 2:45 PM", amount: 40.00, currency: "CAD", status: "Pending", method: "Card" },
  { id: "TX-005", service: "Vehicle Detailing", customer: "Ahmad", datetime: "Apr 20, 2026 • 11:00 AM", amount: 30.00, currency: "CAD", status: "Pending", method: "COD" },
  { id: "TX-006", service: "Residential Cleaning", customer: "Sarah Johnson", datetime: "Apr 20, 2026 • 9:00 AM", amount: 149.00, currency: "CAD", status: "Paid", method: "Card" },
  { id: "TX-007", service: "Commercial Cleaning", customer: "Mark Chen", datetime: "Apr 19, 2026 • 11:00 AM", amount: 320.00, currency: "CAD", status: "Paid", method: "Card" },
  { id: "TX-008", service: "Move-In / Move-Out", customer: "Priya Patel", datetime: "Apr 18, 2026 • 2:00 PM", amount: 245.00, currency: "CAD", status: "Failed", method: "Card" },
];

const mockPayouts: CleanerPayout[] = [
  { id: "P-001", name: "Anas Tahir", totalEarned: 40.05, paidOut: 0.00, currency: "CAD" },
  { id: "P-002", name: "Alex Morgan", totalEarned: 308.00, paidOut: 200.00, currency: "CAD" },
  { id: "P-003", name: "Jamie Rivera", totalEarned: 320.00, paidOut: 320.00, currency: "CAD" },
];

type Tab = "All" | "Paid" | "Pending" | "Card" | "COD" | "Failed" | "Payouts";
const tabs: Tab[] = ["All", "Paid", "Pending", "Card", "COD", "Failed", "Payouts"];

function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [payouts, setPayouts] = useState<CleanerPayout[]>(mockPayouts);

  const filtered = transactions.filter((t) => {
    if (activeTab === "All") return true;
    if (activeTab === "Paid") return t.status === "Paid";
    if (activeTab === "Pending") return t.status === "Pending";
    if (activeTab === "Card") return t.method === "Card";
    if (activeTab === "COD") return t.method === "COD";
    if (activeTab === "Failed") return t.status === "Failed";
    return true;
  });

  const totalRevenue = transactions.filter((t) => t.status === "Paid").reduce((s, t) => s + t.amount, 0);
  const cardPayments = transactions.filter((t) => t.method === "Card" && t.status === "Paid").reduce((s, t) => s + t.amount, 0);
  const codPayments = transactions.filter((t) => t.method === "COD" && t.status === "Paid").reduce((s, t) => s + t.amount, 0);
  const outstandingCleaners = payouts.reduce((s, p) => s + (p.totalEarned - p.paidOut), 0);

  const totalPayoutEarned = payouts.reduce((s, p) => s + p.totalEarned, 0);
  const totalPaidOut = payouts.reduce((s, p) => s + p.paidOut, 0);
  const totalOutstanding = totalPayoutEarned - totalPaidOut;
  const pendingPayouts = payouts.filter((p) => p.totalEarned > p.paidOut).length;

  const settleNow = (id: string) => {
    setPayouts((prev) => prev.map((p) => p.id === id ? { ...p, paidOut: p.totalEarned } : p));
  };

  return (
    <AdminLayout>
      <PageTransition direction="left">
        <div className="pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-bold text-gray-900">Payments & Revenue</h1>
            <button onClick={() => { setTransactions(mockTransactions); setPayouts(mockPayouts); }} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <RefreshCw className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 mb-5 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── ALL TAB: Stats + Transactions ── */}
          {activeTab === "All" && (
            <>
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Total Revenue", value: `CAD $${totalRevenue.toFixed(2)}`, icon: TrendingUp, iconBg: "bg-green-100", iconColor: "text-green-500" },
                  { label: "Card Payments", value: `CAD $${cardPayments.toFixed(2)}`, icon: CreditCard, iconBg: "bg-purple-100", iconColor: "text-purple-500" },
                  { label: "Cash on Delivery", value: `CAD $${codPayments.toFixed(2)}`, icon: Banknote, iconBg: "bg-green-100", iconColor: "text-green-500" },
                  { label: "Outstanding (Cleaners)", value: `CAD $${outstandingCleaners.toFixed(2)}`, icon: Clock, iconBg: "bg-yellow-100", iconColor: "text-yellow-500" },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center mb-2`}>
                      <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
                    </div>
                    <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <h2 className="text-base font-bold text-gray-900 mb-3">All Transactions</h2>
              <TransactionList items={transactions} />
            </>
          )}

          {/* ── PAYOUTS TAB ── */}
          {activeTab === "Payouts" && (
            <>
              {/* Payout overview card */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="bg-blue-500 rounded-2xl p-4 mb-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Banknote className="w-4 h-4 opacity-80" />
                  <span className="text-xs font-semibold tracking-wide opacity-80">CLEANER PAYOUTS OVERVIEW</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <p className="text-[10px] opacity-70 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Total Earned</p>
                    <p className="text-sm font-bold">CAD ${totalPayoutEarned.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] opacity-70 flex items-center gap-1">✓ Paid Out</p>
                    <p className="text-sm font-bold">CAD ${totalPaidOut.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-yellow-300 flex items-center gap-1">⚠ Outstanding</p>
                    <p className="text-sm font-bold text-yellow-300">CAD ${totalOutstanding.toFixed(2)}</p>
                  </div>
                </div>
                {pendingPayouts > 0 && (
                  <div className="bg-white/20 rounded-xl px-3 py-2 text-xs">
                    ⚠ {pendingPayouts} cleaner{pendingPayouts > 1 ? "s" : ""} have pending payments. Tap a card to settle.
                  </div>
                )}
              </motion.div>

              {/* Filter chips */}
              <div className="flex gap-2 mb-4">
                {[`All Cleaners ${payouts.length}`, `Outstanding ${pendingPayouts}`, `Settled ${payouts.length - pendingPayouts}`].map((label, i) => (
                  <button key={label} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${i === 0 ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-500 border-gray-200"}`}>
                    {label}
                  </button>
                ))}
              </div>

              {/* Cleaner payout cards */}
              <div className="space-y-3">
                {payouts.map((p, i) => {
                  const outstanding = p.totalEarned - p.paidOut;
                  const pct = p.totalEarned > 0 ? Math.round((p.paidOut / p.totalEarned) * 100) : 100;
                  const isPending = outstanding > 0;
                  return (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      className={`bg-white rounded-2xl p-4 shadow-sm border ${isPending ? "border-yellow-200" : "border-gray-100"}`}>
                      {/* Name row */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                            {p.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{p.name}</p>
                            <p className={`text-xs font-medium ${isPending ? "text-yellow-500" : "text-green-500"}`}>
                              {isPending ? "Payment Pending" : "Fully Settled"}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-gray-50 rounded-xl p-2 text-center">
                          <p className="text-sm font-bold text-gray-900">${p.totalEarned.toFixed(2)}</p>
                          <p className="text-[10px] text-gray-400">Total Earned</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-2 text-center">
                          <p className="text-sm font-bold text-green-600">${p.paidOut.toFixed(2)}</p>
                          <p className="text-[10px] text-gray-400">Paid Out</p>
                        </div>
                        <div className="bg-yellow-50 rounded-xl p-2 text-center">
                          <p className="text-sm font-bold text-yellow-600">${outstanding.toFixed(2)}</p>
                          <p className="text-[10px] text-gray-400">Outstanding</p>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                        <span>Payout completion</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full mb-3">
                        <div className="h-1.5 bg-blue-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>

                      {/* Settle Now */}
                      {isPending && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-yellow-500">
                            {p.currency} ${outstanding.toFixed(2)} unpaid
                          </span>
                          <button onClick={() => settleNow(p.id)}
                            className="flex items-center gap-1.5 bg-yellow-400 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-yellow-500 transition-colors">
                            💰 Settle Now
                          </button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}

          {/* ── FILTERED TABS ── */}
          {activeTab !== "All" && activeTab !== "Payouts" && (
            filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <SearchX className="w-14 h-14 mb-4 text-gray-300" />
                <p className="text-base font-semibold text-gray-600">No services found</p>
                <p className="text-sm mt-1">Try adjusting your search or category</p>
              </div>
            ) : (
              <TransactionList items={filtered} />
            )
          )}
        </div>
      </PageTransition>
    </AdminLayout>
  );
}

function TransactionList({ items }: { items: Transaction[] }) {
  return (
    <div className="space-y-3">
      {items.map((t, i) => (
        <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <Banknote className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">{t.service}</p>
            <p className="text-xs text-gray-400">{t.customer}</p>
            <p className="text-xs text-gray-400">{t.datetime}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-bold text-gray-900">{t.currency} ${t.amount.toFixed(2)}</p>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              t.status === "Paid" ? "text-green-600 bg-green-50" :
              t.status === "Pending" ? "text-yellow-600 bg-yellow-50" :
              "text-red-500 bg-red-50"
            }`}>
              {t.status.toUpperCase()}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
