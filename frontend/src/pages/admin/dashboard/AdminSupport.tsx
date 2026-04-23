import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { RefreshCw, Phone, User, MessageSquare, X, Check } from "lucide-react";

type Ticket = {
  id: number;
  type: "Customers" | "Cleaners";
  status: "OPEN" | "CLOSED";
  date: string;
  title: string;
  description: string;
  name: string;
  email: string;
};

const initialTickets: Ticket[] = [
  {
    id: 1, type: "Customers", status: "OPEN", date: "Apr 14, 2026",
    title: "customer side issue",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Do eiusmod tempor incididun...",
    name: "Anas Tahir Customer", email: "customer@gmail.com",
  },
  {
    id: 2, type: "Customers", status: "OPEN", date: "Apr 16, 2026",
    title: "Booking not confirmed",
    description: "I made a booking 2 days ago but still haven't received a confirmation email or any update.",
    name: "Sarah Johnson", email: "sarah@example.com",
  },
  {
    id: 3, type: "Cleaners", status: "OPEN", date: "Apr 13, 2026",
    title: "App not loading jobs",
    description: "The staff app is not showing my assigned jobs for today. I have restarted multiple times.",
    name: "Alex Morgan", email: "alex.morgan@gmail.com",
  },
  {
    id: 4, type: "Cleaners", status: "CLOSED", date: "Apr 10, 2026",
    title: "Payment not received",
    description: "My weekly payment was not deposited on time. Please check and resolve as soon as possible.",
    name: "Jamie Rivera", email: "jamie.rivera@gmail.com",
  },
  {
    id: 5, type: "Customers", status: "CLOSED", date: "Apr 08, 2026",
    title: "Refund request",
    description: "I would like to request a refund for my last booking as the cleaner did not show up.",
    name: "Mark Chen", email: "mark@example.com",
  },
];

const TABS = ["Customers", "Cleaners"] as const;

function avatarColor(name: string) {
  const colors = ["bg-blue-100 text-blue-600", "bg-purple-100 text-purple-600", "bg-green-100 text-green-600", "bg-orange-100 text-orange-600"];
  return colors[name.charCodeAt(0) % colors.length];
}

export default function AdminSupport() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [tab, setTab] = useState<"Customers" | "Cleaners">("Customers");
  const [selected, setSelected] = useState<Ticket | null>(null);

  const closeTicket = (id: number) =>
    setTickets((p) => p.map((t) => t.id === id ? { ...t, status: "CLOSED" } : t));

  const filtered = tickets.filter((t) => t.type === tab);
  const openCount = filtered.filter((t) => t.status === "OPEN").length;

  return (
    <AdminLayout>
      <PageTransition direction="right">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-deep-blue">Support Center</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage customer and cleaner support tickets.</p>
          </div>
          <button className="w-9 h-9 rounded-xl border border-border bg-card grid place-items-center hover:bg-muted transition-colors">
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-6">
          {TABS.map((t) => {
            const count = tickets.filter((tk) => tk.type === t && tk.status === "OPEN").length;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3 text-sm font-semibold transition-all relative ${
                  tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
                {count > 0 && (
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    tab === t ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>{count}</span>
                )}
                {tab === t && (
                  <motion.div layoutId="support-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tickets */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No tickets for {tab.toLowerCase()}.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((ticket, i) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] overflow-hidden"
                >
                  {/* Top — status + date */}
                  <div className="flex items-center justify-between px-5 pt-5 pb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      ticket.status === "OPEN"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {ticket.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{ticket.date}</span>
                  </div>

                  {/* Title + description */}
                  <div className="px-5 pb-4">
                    <h3 className="font-bold text-deep-blue text-sm mb-1">{ticket.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{ticket.description}</p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border mx-5" />

                  {/* User info + phone */}
                  <div className="flex items-center gap-3 px-5 py-4">
                    <div className={`w-9 h-9 rounded-full grid place-items-center flex-shrink-0 ${avatarColor(ticket.name)}`}>
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-deep-blue truncate">{ticket.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{ticket.email}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelected(ticket)}
                        className="text-xs text-primary font-medium hover:underline"
                      >
                        View
                      </button>
                      <button className="w-9 h-9 rounded-full bg-green-50 border border-green-200 grid place-items-center hover:bg-green-100 transition-colors">
                        <Phone className="w-4 h-4 text-green-600" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm grid place-items-center p-4"
            >
              <motion.div
                initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 24 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-3xl bg-card p-6 shadow-[var(--shadow-elegant)]"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-deep-blue text-lg">Ticket Details</h3>
                  <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-muted transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${selected.status === "OPEN" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
                    {selected.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{selected.date}</span>
                </div>

                <h4 className="font-bold text-deep-blue mb-2">{selected.title}</h4>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{selected.description}</p>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 mb-5">
                  <div className={`w-10 h-10 rounded-full grid place-items-center flex-shrink-0 ${avatarColor(selected.name)}`}>
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-deep-blue text-sm">{selected.name}</div>
                    <div className="text-xs text-muted-foreground">{selected.email}</div>
                  </div>
                  <button className="w-9 h-9 rounded-full bg-green-50 border border-green-200 grid place-items-center hover:bg-green-100 transition-colors">
                    <Phone className="w-4 h-4 text-green-600" />
                  </button>
                </div>

                {selected.status === "OPEN" && (
                  <button
                    onClick={() => { closeTicket(selected.id); setSelected(null); }}
                    className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Mark as Resolved
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageTransition>
    </AdminLayout>
  );
}
