import { createFileRoute, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { customers, bookings } from "@/lib/data";
import { Mail, ChevronDown, ChevronUp } from "lucide-react";

export const Route = createFileRoute("/admin/customers")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("camz_admin")) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: CustomersPage,
});

function CustomersPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<number, string>>({});

  return (
    <AdminLayout>
      <PageTransition direction="right">
        <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">Customers</h1>
        <p className="text-muted-foreground mt-1 text-sm mb-6">Customer database with booking history and preferences.</p>

        <div className="space-y-3">
          {customers.map((c, i) => {
            const cBookings = bookings.filter((b) => b.customer === c.name);
            const isOpen = expanded === c.id;
            return (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : c.id)} className="w-full p-5 flex items-center justify-between gap-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground grid place-items-center font-bold flex-shrink-0">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-deep-blue">{c.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" />{c.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex gap-4 text-center">
                      <div><div className="font-bold text-deep-blue">{c.bookings}</div><div className="text-xs text-muted-foreground">Bookings</div></div>
                      <div><div className="font-bold text-deep-blue">${c.spent}</div><div className="text-xs text-muted-foreground">Spent</div></div>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </button>

                {isOpen && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-border p-5 space-y-4">
                    {/* Booking history */}
                    <div>
                      <h4 className="text-sm font-semibold text-deep-blue mb-2">Booking History</h4>
                      {cBookings.length === 0 ? (
                        <p className="text-xs text-muted-foreground">No bookings found</p>
                      ) : (
                        <div className="space-y-1.5">
                          {cBookings.map((b) => (
                            <div key={b.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-muted/50">
                              <span className="font-mono">{b.id}</span>
                              <span>{b.service}</span>
                              <span>{b.date}</span>
                              <span className="font-semibold">${b.amount}</span>
                              <span className={`px-2 py-0.5 rounded-full font-medium ${b.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>{b.status}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Notes & preferences */}
                    <div>
                      <h4 className="text-sm font-semibold text-deep-blue mb-2">Notes & Preferences</h4>
                      <textarea
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                        rows={3}
                        placeholder="Add notes about this customer (preferences, entry details, pets, etc.)"
                        value={notes[c.id] || ""}
                        onChange={(e) => setNotes((p) => ({ ...p, [c.id]: e.target.value }))}
                      />
                      <button className="mt-2 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium">Save notes</button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </PageTransition>
    </AdminLayout>
  );
}
