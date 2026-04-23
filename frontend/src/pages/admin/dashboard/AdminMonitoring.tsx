
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { staff, staffJobs } from "@/lib/data";
import { MapPin, Clock, CheckCircle2, AlertCircle, Navigation } from "lucide-react";


const staffLocations = [
  { id: 1, name: "Alex Morgan", lat: 51.0486, lng: -114.0708, area: "NW Calgary", job: "JB-201", status: "On Job" },
  { id: 2, name: "Jamie Rivera", lat: 51.0447, lng: -114.0719, area: "SW Calgary", job: "JB-202", status: "In Progress" },
  { id: 3, name: "Taylor Brooks", lat: 51.0534, lng: -114.0625, area: "NE Calgary", job: "JB-203", status: "Travelling" },
  { id: 4, name: "Jordan Smith", lat: 51.0401, lng: -114.0850, area: "SE Calgary", job: null, status: "On Leave" },
];

const statusColor = (s: string) => ({
  "On Job": "bg-green-100 text-green-800",
  "In Progress": "bg-purple-100 text-purple-800",
  "Travelling": "bg-blue-100 text-blue-800",
  "On Leave": "bg-yellow-100 text-yellow-800",
  "Idle": "bg-muted text-muted-foreground",
}[s] || "bg-muted text-muted-foreground");

const statusIcon = (s: string) => ({
  "On Job": CheckCircle2,
  "In Progress": Clock,
  "Travelling": Navigation,
  "On Leave": AlertCircle,
}[s] || Clock);

export default function MonitoringPage() {
  const activeJobs = staffJobs.filter((j) => j.status === "In Progress" || j.status === "Assigned");

  return (
    <AdminLayout>
      <PageTransition direction="top">
        <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">Real-Time Monitoring</h1>
        <p className="text-muted-foreground mt-1 text-sm mb-6">Track staff location and job progress.</p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map placeholder */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-deep-blue">Staff Map — Calgary</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" /> Live
              </span>
            </div>
            {/* Map visual (demo) */}
            <div className="relative bg-[#e8f0e8] h-80 md:h-96 overflow-hidden">
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                {Array.from({ length: 10 }).map((_, i) => (
                  <g key={i}>
                    <line x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="#666" strokeWidth="1" />
                    <line x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="#666" strokeWidth="1" />
                  </g>
                ))}
              </svg>
              {/* Road lines */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#ccc" strokeWidth="3" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#ccc" strokeWidth="3" />
                <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#ddd" strokeWidth="1.5" />
                <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#ddd" strokeWidth="1.5" />
                <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#ddd" strokeWidth="1.5" />
                <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#ddd" strokeWidth="1.5" />
              </svg>
              {/* Staff pins */}
              {staffLocations.map((s, i) => {
                const x = 20 + i * 20;
                const y = 25 + (i % 2) * 40;
                const Icon = statusIcon(s.status);
                return (
                  <motion.div key={s.id}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1, type: "spring" }}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                    <div className={`w-10 h-10 rounded-full border-2 border-white shadow-lg grid place-items-center text-white text-xs font-bold ${s.status === "On Leave" ? "bg-yellow-500" : s.status === "In Progress" ? "bg-purple-600" : "bg-primary"}`}>
                      {s.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-xs whitespace-nowrap">
                        <div className="font-semibold text-deep-blue">{s.name}</div>
                        <div className="text-muted-foreground">{s.area}</div>
                        <div className={`mt-1 px-1.5 py-0.5 rounded-full text-xs font-medium inline-block ${statusColor(s.status)}`}>{s.status}</div>
                      </div>
                    </div>
                    {s.status === "In Progress" && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white animate-pulse" />
                    )}
                  </motion.div>
                );
              })}
              <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur rounded-lg px-3 py-2 text-xs text-muted-foreground border border-border">
                📍 Calgary, Alberta · Demo map
              </div>
            </div>
          </motion.div>

          {/* Staff status list */}
          <div className="space-y-3">
            <h3 className="font-semibold text-deep-blue">Staff Status</h3>
            {staffLocations.map((s, i) => {
              const Icon = statusIcon(s.status);
              const job = s.job ? staffJobs.find((j) => j.id === s.job) : null;
              return (
                <motion.div key={s.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground grid place-items-center font-bold text-sm flex-shrink-0">
                      {s.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-deep-blue text-sm">{s.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="w-3 h-3" />{s.area}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${statusColor(s.status)}`}>{s.status}</span>
                  </div>
                  {job && (
                    <div className="mt-3 p-2.5 rounded-lg bg-muted/50 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="w-3 h-3" />{job.time} · {job.service}</div>
                      <div className="flex items-center gap-1.5 text-muted-foreground truncate"><MapPin className="w-3 h-3 flex-shrink-0" />{job.address}</div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Active jobs table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6">
          <h3 className="font-semibold text-deep-blue mb-3">Active Jobs Progress</h3>
          <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>{["Job ID", "Staff", "Service", "Address", "Time", "Status", "Photos"].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-deep-blue">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {activeJobs.map((job, i) => (
                    <motion.tr key={job.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                      className="border-t border-border hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs">{job.id}</td>
                      <td className="px-4 py-3 font-medium">{staffLocations.find((s) => s.job === job.id)?.name || "—"}</td>
                      <td className="px-4 py-3">{job.service}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs max-w-[180px] truncate">{job.address}</td>
                      <td className="px-4 py-3">{job.time}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === "In Progress" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`}>{job.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5 text-xs">
                          <span className={`px-2 py-0.5 rounded-full ${job.photos.before ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>Before</span>
                          <span className={`px-2 py-0.5 rounded-full ${job.photos.after ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>After</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </PageTransition>
    </AdminLayout>
  );
}

