import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { ShieldCheck, FileText, RefreshCw, Check, X } from "lucide-react";

type Doc = { label: string; available: boolean };
type Application = {
  id: number;
  name: string;
  email: string;
  status: "Pending" | "Approved" | "Rejected";
  docs: Doc[];
  requestedOn: string;
};

const initialApplications: Application[] = [
  {
    id: 1, name: "Alex Morgan", email: "alex.morgan@gmail.com", status: "Pending",
    requestedOn: "Apr 20, 2026",
    docs: [{ label: "Police Certificate", available: true }, { label: "Experience Letter", available: true }],
  },
  {
    id: 2, name: "Jamie Rivera", email: "jamie.rivera@gmail.com", status: "Pending",
    requestedOn: "Apr 18, 2026",
    docs: [{ label: "Police Certificate", available: false }, { label: "Experience Letter", available: false }],
  },
  {
    id: 3, name: "Taylor Brooks", email: "taylor.brooks@gmail.com", status: "Approved",
    requestedOn: "Apr 10, 2026",
    docs: [{ label: "Police Certificate", available: true }, { label: "Experience Letter", available: true }],
  },
  {
    id: 4, name: "Jordan Smith", email: "jordan.smith@gmail.com", status: "Rejected",
    requestedOn: "Apr 05, 2026",
    docs: [{ label: "Police Certificate", available: true }, { label: "Experience Letter", available: false }],
  },
];

const TABS = ["Pending", "Approved", "Rejected"] as const;

function avatar(name: string) { return name.charAt(0).toUpperCase(); }
function avatarColor(name: string) {
  const colors = ["bg-green-100 text-green-600", "bg-blue-100 text-blue-600", "bg-purple-100 text-purple-600", "bg-orange-100 text-orange-600"];
  return colors[name.charCodeAt(0) % colors.length];
}

export default function AdminStaffVerification() {
  const [apps, setApps] = useState<Application[]>(initialApplications);
  const [tab, setTab] = useState<"Pending" | "Approved" | "Rejected">("Pending");
  const [reviewing, setReviewing] = useState<Application | null>(null);

  const update = (id: number, status: "Approved" | "Rejected") => {
    setApps((p) => p.map((a) => a.id === id ? { ...a, status } : a));
    setReviewing((p) => p?.id === id ? { ...p, status } : p);
  };

  const filtered = apps.filter((a) => a.status === tab);

  return (
    <AdminLayout>
      <PageTransition direction="right">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-deep-blue">Staff Verification</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Review staff documents and approve applications.</p>
          </div>
          <button className="w-9 h-9 rounded-xl border border-border bg-card grid place-items-center hover:bg-muted transition-colors">
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-6">
          {TABS.map((t) => {
            const count = apps.filter((a) => a.status === t).length;
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
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
            <ShieldCheck className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No {tab.toLowerCase()} applications.</p>
          </div>
        ) : (
          <div className="space-y-4">
              {filtered.map((app, i) => (
                <div
                  key={app.id}
                  className="rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] overflow-hidden"
                >
                  {/* Top — avatar + name + status */}
                  <div className="flex items-center gap-3 px-5 pt-5 pb-4">
                    <div className={`w-11 h-11 rounded-full grid place-items-center font-bold text-lg flex-shrink-0 ${avatarColor(app.name)}`}>
                      {avatar(app.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-deep-blue text-sm">{app.name}</div>
                      <div className="text-xs text-muted-foreground">{app.email}</div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${
                      app.status === "Approved" ? "bg-green-100 text-green-700" :
                      app.status === "Rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {app.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Documents */}
                  <div className="px-5 pb-4 grid grid-cols-2 gap-3">
                    {app.docs.map((doc) => (
                      <div
                        key={doc.label}
                        className={`rounded-xl border p-4 text-center transition-all ${
                          doc.available
                            ? "border-blue-100 bg-blue-50/60"
                            : "border-border bg-muted/40"
                        }`}
                      >
                        {doc.available
                          ? <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                          : <FileText className="w-6 h-6 mx-auto mb-2 text-muted-foreground/40" />
                        }
                        <div className={`text-xs font-semibold ${doc.available ? "text-deep-blue" : "text-muted-foreground"}`}>
                          {doc.label}
                        </div>
                        {doc.available ? (
                          <button className="text-[10px] font-bold text-blue-500 mt-1 hover:underline uppercase tracking-wide">
                            View PDF
                          </button>
                        ) : (
                          <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wide font-medium">
                            No Document
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Review button */}
                  <div className="px-5 pb-5">
                    <button
                      onClick={() => setReviewing(app)}
                      className="w-full py-3.5 rounded-2xl bg-primary text-white font-bold text-sm tracking-wide hover:bg-primary/90 transition-all"
                    >
                      REVIEW APPLICATION
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Review Modal */}
        {reviewing && (
            <div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setReviewing(null)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm grid place-items-center p-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-3xl bg-card p-6 shadow-[var(--shadow-elegant)]"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-deep-blue text-lg">Review Application</h3>
                  <button onClick={() => setReviewing(null)} className="p-1 rounded-lg hover:bg-muted transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Staff info */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 mb-5">
                  <div className={`w-12 h-12 rounded-full grid place-items-center font-bold text-xl flex-shrink-0 ${avatarColor(reviewing.name)}`}>
                    {avatar(reviewing.name)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-deep-blue">{reviewing.name}</div>
                    <div className="text-xs text-muted-foreground">{reviewing.email}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Requested on {reviewing.requestedOn}</div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    reviewing.status === "Approved" ? "bg-green-100 text-green-700" :
                    reviewing.status === "Rejected" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>{reviewing.status}</span>
                </div>

                {/* Docs */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {reviewing.docs.map((doc) => (
                    <div key={doc.label} className={`rounded-xl border p-4 text-center ${doc.available ? "border-blue-100 bg-blue-50/60" : "border-border bg-muted/40"}`}>
                      {doc.available
                        ? <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                        : <FileText className="w-6 h-6 mx-auto mb-2 text-muted-foreground/40" />
                      }
                      <div className={`text-xs font-semibold ${doc.available ? "text-deep-blue" : "text-muted-foreground"}`}>{doc.label}</div>
                      {doc.available
                        ? <span className="text-[10px] font-bold text-blue-500 mt-1 uppercase tracking-wide">View PDF</span>
                        : <span className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wide font-medium">No Document</span>
                      }
                    </div>
                  ))}
                </div>

                {/* Actions */}
                {reviewing.status === "Pending" && (
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => update(reviewing.id, "Rejected")}
                      className="py-3 rounded-xl border-2 border-red-500 text-red-500 font-semibold text-sm hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                      <X className="w-4 h-4" /> Reject
                    </button>
                    <button onClick={() => update(reviewing.id, "Approved")}
                      className="py-3 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" /> Approve
                    </button>
                  </div>
                )}
                {reviewing.status === "Approved" && (
                  <button onClick={() => update(reviewing.id, "Rejected")}
                    className="w-full py-3 rounded-xl border-2 border-red-400 text-red-500 font-semibold text-sm hover:bg-red-50 transition-all">
                    Revoke Approval
                  </button>
                )}
                {reviewing.status === "Rejected" && (
                  <button onClick={() => update(reviewing.id, "Approved")}
                    className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-all">
                    Approve
                  </button>
                )}
              </div>
            </div>
          )}
      </PageTransition>
    </AdminLayout>
  );
}
