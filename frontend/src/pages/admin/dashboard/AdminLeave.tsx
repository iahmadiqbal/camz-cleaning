import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { leaveRequests } from "@/lib/data";
import { RefreshCw, CalendarDays, Users } from "lucide-react";

type LeaveRequest = {
  id: number;
  staff: string;
  from: string;
  to: string;
  reason: string;
  status: string;
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function requestedOn(id: number) {
  // simulate a requested date based on id
  const base = new Date("2026-04-13");
  base.setDate(base.getDate() + id * 9);
  return base.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export default function AdminLeave() {
  const [requests, setRequests] = useState<LeaveRequest[]>(leaveRequests);
  const [filter, setFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");

  const update = (id: number, status: string) =>
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

  const filtered = filter === "All" ? requests : requests.filter((r) => r.status === filter);

  const counts = {
    pending:  requests.filter((r) => r.status === "Pending").length,
    approved: requests.filter((r) => r.status === "Approved").length,
    rejected: requests.filter((r) => r.status === "Rejected").length,
  };

  const avatar = (name: string) => name.charAt(0).toUpperCase();

  const avatarColor = (name: string) => {
    const colors = ["bg-blue-100 text-blue-600", "bg-purple-100 text-purple-600", "bg-green-100 text-green-600", "bg-orange-100 text-orange-600"];
    return colors[name.charCodeAt(0) % colors.length];
  };

  return (
    <AdminLayout>
      <PageTransition direction="right">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-deep-blue">Manage Leave Requests</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Review and action staff leave requests.</p>
          </div>
          <button
            onClick={() => setRequests(leaveRequests)}
            className="w-9 h-9 rounded-xl border border-border bg-card grid place-items-center hover:bg-muted transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["All", "Pending", "Approved", "Rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? "bg-primary text-white shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {f}
              {f === "Pending" && counts.pending > 0 && (
                <span className="ml-1.5 bg-yellow-400 text-white text-xs rounded-full px-1.5 py-0.5">{counts.pending}</span>
              )}
            </button>
          ))}
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No {filter !== "All" ? filter.toLowerCase() : ""} leave requests.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((r, i) => (
                <div
                  key={r.id}
                  className="rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] overflow-hidden"
                >
                  {/* Top row — avatar + name + status */}
                  <div className="flex items-center gap-3 px-5 pt-5 pb-4">
                    <div className={`w-11 h-11 rounded-full grid place-items-center font-bold text-lg flex-shrink-0 ${avatarColor(r.staff)}`}>
                      {avatar(r.staff)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-deep-blue text-sm">{r.staff}</div>
                      <div className="text-xs text-muted-foreground">Requested on {requestedOn(r.id)}</div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${
                      r.status === "Approved" ? "bg-green-100 text-green-700" :
                      r.status === "Rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {r.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border mx-5" />

                  {/* Date range + reason */}
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-deep-blue mb-2">
                      <CalendarDays className="w-4 h-4 text-primary flex-shrink-0" />
                      {formatDate(r.from)} – {formatDate(r.to)}
                    </div>
                    <p className="text-sm text-muted-foreground">{r.reason}</p>
                  </div>

                  {/* Action buttons */}
                  {r.status === "Pending" && (
                    <div className="px-5 pb-5 grid grid-cols-2 gap-3">
                      <button
                        onClick={() => update(r.id, "Rejected")}
                        className="py-3 rounded-xl border-2 border-red-500 text-red-500 font-semibold text-sm hover:bg-red-50 transition-all"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => update(r.id, "Approved")}
                        className="py-3 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-all"
                      >
                        Approve
                      </button>
                    </div>
                  )}

                  {r.status === "Approved" && (
                    <div className="px-5 pb-5">
                      <button
                        onClick={() => update(r.id, "Rejected")}
                        className="w-full py-3 rounded-xl border-2 border-red-400 text-red-500 font-semibold text-sm hover:bg-red-50 transition-all"
                      >
                        Revoke Approval
                      </button>
                    </div>
                  )}

                  {r.status === "Rejected" && (
                    <div className="px-5 pb-5">
                      <button
                        onClick={() => update(r.id, "Approved")}
                        className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-all"
                      >
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </PageTransition>
    </AdminLayout>
  );
}
