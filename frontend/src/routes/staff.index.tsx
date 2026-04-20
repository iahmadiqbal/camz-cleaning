import { createFileRoute, Link } from "@tanstack/react-router";
import { StaffLayout } from "@/components/StaffLayout";
import { staffJobs } from "@/lib/data";
import { Play, Briefcase, CheckCircle2, Clock, MapPin, Star } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/staff/")({
  head: () => ({ meta: [{ title: "Staff Dashboard — CAMZ Cleaning" }] }),
  component: StaffDashboard,
});

function StaffDashboard() {
  const [shiftActive, setShiftActive] = useState(false);
  const [shiftStart, setShiftStart] = useState<string | null>(null);

  const todayJobs = staffJobs.filter((j) => j.date === "2025-04-20");
  const completedToday = todayJobs.filter((j) => j.status === "Completed").length;

  const toggleShift = () => {
    if (!shiftActive) {
      setShiftStart(new Date().toLocaleTimeString());
      setShiftActive(true);
    } else {
      setShiftActive(false);
      setShiftStart(null);
    }
  };

  return (
    <StaffLayout>
      <div className="max-w-4xl mx-auto">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-deep-blue">Good morning, Alex 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">Saturday, April 20 · {todayJobs.length} jobs today</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Today's Jobs", value: todayJobs.length, icon: Briefcase },
            { label: "Completed", value: completedToday, icon: CheckCircle2 },
            { label: "Rating", value: "4.9", icon: Star },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] text-center">
              <div className="w-10 h-10 rounded-lg bg-primary text-white grid place-items-center mx-auto mb-2">
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-deep-blue">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Shift card */}
        <div className={`rounded-2xl p-6 mb-6 shadow-[var(--shadow-elegant)] ${shiftActive ? "bg-[image:var(--gradient-hero)] text-primary-foreground" : "bg-card border border-border"}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-sm font-medium ${shiftActive ? "opacity-80" : "text-muted-foreground"}`}>
                {shiftActive ? `Shift started at ${shiftStart}` : "Shift not started"}
              </div>
              <div className={`text-2xl font-bold mt-1 ${shiftActive ? "" : "text-deep-blue"}`}>
                {shiftActive ? "On Duty" : "Off Duty"}
              </div>
            </div>
            <button
              onClick={toggleShift}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${shiftActive ? "bg-white/20 hover:bg-white/30 text-white" : "bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-card)]"}`}
            >
              {shiftActive ? <><CheckCircle2 className="w-4 h-4" /> End Shift</> : <><Play className="w-4 h-4" /> Start Shift</>}
            </button>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: Play, label: "Start Shift", action: toggleShift },
            { icon: Briefcase, label: "View Jobs", to: "/staff/jobs" },
            { icon: CheckCircle2, label: "Complete Job", to: "/staff/jobs" },
          ].map((item) => (
            item.to ? (
              <Link key={item.label} to={item.to}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all text-center">
                <div className="w-12 h-12 rounded-xl bg-primary text-white grid place-items-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-deep-blue">{item.label}</span>
              </Link>
            ) : (
              <button key={item.label} onClick={item.action}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all text-center w-full">
                <div className="w-12 h-12 rounded-xl bg-primary text-white grid place-items-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-deep-blue">{item.label}</span>
              </button>
            )
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Today's jobs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-deep-blue">Today's Jobs</h2>
              <Link to="/staff/jobs" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {todayJobs.map((job) => (
                <div key={job.id} className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-deep-blue text-sm">{job.service}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{job.address}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Clock className="w-3 h-3" />{job.time}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${job.status === "In Progress" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div>
            <h2 className="font-bold text-deep-blue mb-3">My Performance</h2>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-center">
                  <div className="text-2xl font-bold text-deep-blue">142</div>
                  <div className="text-xs text-muted-foreground">Jobs completed</div>
                </div>
                <div className="p-3 rounded-xl bg-primary/10 text-center">
                  <div className="text-2xl font-bold text-deep-blue flex items-center justify-center gap-1">
                    4.9 <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  </div>
                  <div className="text-xs text-muted-foreground">Avg rating</div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "On-time arrival", pct: 96 },
                  { label: "Customer satisfaction", pct: 98 },
                  { label: "Job completion rate", pct: 100 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium text-deep-blue">{item.pct}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
}
