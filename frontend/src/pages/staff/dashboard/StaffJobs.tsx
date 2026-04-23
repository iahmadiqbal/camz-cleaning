
import { motion } from "framer-motion";
import { useState } from "react";
import { StaffLayout } from "@/components/StaffLayout";
import { PageTransition } from "@/components/PageTransition";
import { staffJobs } from "@/lib/data";
import { MapPin, Clock, User, Camera, CheckCircle2, X, Navigation } from "lucide-react";


type Job = typeof staffJobs[0];

export default function StaffJobs() {
  const [jobs, setJobs] = useState(staffJobs);
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [step, setStep] = useState<"before" | "checklist" | "after" | "done">("before");

  const openJob = (job: Job) => { setActiveJob(job); setStep("before"); };
  const closeJob = () => setActiveJob(null);

  const markComplete = (id: string) => {
    setJobs((prev) => prev.map((j) => j.id === id ? { ...j, status: "Completed" } : j));
    setActiveJob(null);
  };

  const checklist = ["Vacuumed all floors", "Cleaned bathrooms", "Wiped surfaces", "Mopped floors", "Emptied trash", "Cleaned kitchen"];
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (item: string) => setChecked((p) => p.includes(item) ? p.filter((x) => x !== item) : [...p, item]);

  return (
    <StaffLayout>
      <PageTransition direction="left">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-deep-blue mb-6">My Jobs</h1>

          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-bold text-deep-blue">{job.service}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{job.id} · {job.date}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                    job.status === "Completed" ? "bg-primary text-white" :
                    job.status === "In Progress" ? "bg-primary text-white" :
                    "bg-primary text-white"
                  }`}>{job.status}</span>
                </div>

                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 flex-shrink-0" />{job.address}</div>
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{job.time}</div>
                  <div className="flex items-center gap-2"><User className="w-3.5 h-3.5" />{job.customer}</div>
                </div>

                {job.notes && (
                  <div className="mt-3 p-3 rounded-lg bg-primary/10 text-xs text-deep-blue">
                    📝 {job.notes}
                  </div>
                )}

                {job.status !== "Completed" && (
                  <div className="mt-4 flex gap-2">
                    <a href={`https://maps.google.com/?q=${encodeURIComponent(job.address)}`} target="_blank" rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-sm font-medium hover:bg-soft-blue transition-colors">
                      <Navigation className="w-3.5 h-3.5" /> Navigate
                    </a>
                    <button onClick={() => openJob(job)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground text-sm font-medium shadow-[var(--shadow-card)]">
                      <Camera className="w-3.5 h-3.5" /> Start Job
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Job execution modal */}
        {activeJob && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={closeJob}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-card p-6 shadow-[var(--shadow-elegant)] max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-deep-blue">{activeJob.service} — {activeJob.id}</h3>
                <button onClick={closeJob} className="p-1 rounded hover:bg-muted"><X className="w-5 h-5" /></button>
              </div>

              {/* Steps */}
              <div className="flex gap-2 mb-6">
                {(["before", "checklist", "after"] as const).map((s, i) => (
                  <div key={s} className={`flex-1 h-1.5 rounded-full ${["before", "checklist", "after"].indexOf(step) >= i ? "bg-primary" : "bg-muted"}`} />
                ))}
              </div>

              {step === "before" && (
                <div>
                  <h4 className="font-semibold text-deep-blue mb-3">Upload Before Photos</h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[1, 2].map((n) => (
                      <label key={n} className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors">
                        <Camera className="w-6 h-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Photo {n}</span>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    ))}
                  </div>
                  <button onClick={() => setStep("checklist")} className="w-full py-2.5 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-medium">Next: Checklist</button>
                </div>
              )}

              {step === "checklist" && (
                <div>
                  <h4 className="font-semibold text-deep-blue mb-3">Job Checklist</h4>
                  <div className="space-y-2 mb-4">
                    {checklist.map((item) => (
                      <label key={item} className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-soft-blue transition-colors">
                        <input type="checkbox" checked={checked.includes(item)} onChange={() => toggle(item)} className="w-4 h-4 accent-primary" />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                  <button onClick={() => setStep("after")} disabled={checked.length < 3}
                    className="w-full py-2.5 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-medium disabled:opacity-50">
                    Next: After Photos
                  </button>
                </div>
              )}

              {step === "after" && (
                <div>
                  <h4 className="font-semibold text-deep-blue mb-3">Upload After Photos</h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[1, 2].map((n) => (
                      <label key={n} className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors">
                        <Camera className="w-6 h-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Photo {n}</span>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    ))}
                  </div>
                  <textarea className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-primary/40" rows={2} placeholder="Optional notes..." />
                  <button onClick={() => markComplete(activeJob.id)}
                    className="w-full py-2.5 rounded-lg bg-green-600 text-white font-medium flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Mark as Completed
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </PageTransition>
    </StaffLayout>
  );
}

