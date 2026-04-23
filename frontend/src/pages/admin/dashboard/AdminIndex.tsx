import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import {
  Users,
  CheckCircle2,
  Loader2,
  Briefcase,
  RefreshCw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";



const weeklyData = [
  { day: "Mon", bookings: 0 },
  { day: "Tue", bookings: 0 },
  { day: "Wed", bookings: 0 },
  { day: "Thu", bookings: 0 },
  { day: "Fri", bookings: 0 },
  { day: "Sat", bookings: 0 },
  { day: "Sun", bookings: 13 },
];

const statusColor: Record<string, string> = {
  COMPLETED: "text-green-600 border-green-500",
  PENDING: "text-yellow-600 border-yellow-500",
  CONFIRMED: "text-blue-600 border-blue-500",
  "IN PROGRESS": "text-purple-600 border-purple-500",
};

const timelineDot: Record<string, string> = {
  COMPLETED: "bg-green-500",
  PENDING: "bg-yellow-400",
  CONFIRMED: "bg-blue-500",
  "IN PROGRESS": "bg-purple-500",
};

const recentTimeline = [
  { service: "Vehicle Detailing", customer: "Anas Tahir Customer", status: "COMPLETED" },
  { service: "Carpet / Sofa Cleaning", customer: "ahmad", status: "PENDING" },
  { service: "Carpet / Sofa Cleaning", customer: "ahmad", status: "PENDING" },
  { service: "Carpet / Sofa Cleaning", customer: "ahmad", status: "PENDING" },
  { service: "Carpet / Sofa Cleaning", customer: "ahmad", status: "PENDING" },
  { service: "Vehicle Detailing", customer: "ahmad", status: "PENDING" },
  { service: "Vehicle Detailing", customer: "ahmad", status: "PENDING" },
  { service: "Vehicle Detailing", customer: "ahmad", status: "PENDING" },
  { service: "Vehicle Detailing", customer: "ahmad", status: "PENDING" },
  { service: "Vehicle Detailing", customer: "ahmad", status: "PENDING" },
];

type TabType = "overview";

export default function AdminHome() {
  const [activeTab] = useState<TabType>("overview");

  const completedPct = 23;
  const pendingPct = 76;

  return (
    <AdminLayout>
      <PageTransition direction="top">
        <div className="space-y-6">
          {/* Platform Health */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">Platform Health</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-border"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-blue-500">4</div>
                <div className="text-xs text-gray-400 font-medium mt-1 tracking-wide">TOTAL USERS</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-border"
              >
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-green-500">2</div>
                <div className="text-xs text-gray-400 font-medium mt-1 tracking-wide">VERIFIED CLEANERS</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-border"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <Loader2 className="w-5 h-5 text-blue-300 animate-spin" />
                </div>
                <div className="text-3xl font-bold text-blue-500">0</div>
                <div className="text-xs text-gray-400 font-medium mt-1 tracking-wide">WORKING NOW</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-border"
              >
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-green-500">0</div>
                <div className="text-xs text-gray-400 font-medium mt-1 tracking-wide">AVAILABLE FOR JOBS</div>
              </motion.div>
            </div>
          </section>

          {/* Analytics */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-gray-900">Analytics</h2>
              <button className="text-sm text-blue-500 font-medium">View More Detail</button>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-border">
              <p className="text-sm text-gray-400 mb-4">Weekly Bookings Growth</p>
              <div className="h-40 w-full min-w-0">
                <ResponsiveContainer width="99%" height={160} minWidth={0}>
                  <BarChart data={weeklyData} barSize={28}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                    <YAxis hide />
                    <Tooltip cursor={false} />
                    <Bar dataKey="bookings" radius={[6, 6, 0, 0]}>
                      {weeklyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.bookings > 0 ? "#3b82f6" : "#e5e7eb"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Completed</p>
                  <p className="text-xl font-bold text-green-500">{completedPct}%</p>
                  <div className="mt-2 h-1 bg-green-200 rounded-full">
                    <div className="h-1 bg-green-500 rounded-full" style={{ width: `${completedPct}%` }} />
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Pending</p>
                  <p className="text-xl font-bold text-yellow-500">{pendingPct}%</p>
                  <div className="mt-2 h-1 bg-yellow-200 rounded-full">
                    <div className="h-1 bg-yellow-400 rounded-full" style={{ width: `${pendingPct}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Management Console */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">Management Console</h2>
            <div className="grid grid-cols-4 md:grid-cols-4 gap-3">
              {[
                { label: "Users", icon: Users, color: "text-blue-400", bg: "bg-blue-50", to: "/admin/customers" },
                { label: "Verify", icon: CheckCircle2, color: "text-green-400", bg: "bg-green-50", to: "/admin/staff-verification" },
                { label: "Support", icon: Briefcase, color: "text-blue-400", bg: "bg-blue-50", to: "/admin/support" },
                { label: "Leave", icon: RefreshCw, color: "text-blue-400", bg: "bg-blue-50", to: "/admin/leave" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="bg-white rounded-2xl p-3 flex flex-col items-center gap-2 shadow-sm border border-border hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Timeline */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">Recent Timeline</h2>
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-200" />
              <div className="space-y-3">
                {recentTimeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-start gap-4"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full mt-3 flex-shrink-0 z-10 ${timelineDot[item.status] || "bg-gray-300"}`} />
                    <div className="flex-1 bg-white rounded-2xl px-4 py-3 shadow-sm border border-border flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.service}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Users className="w-3 h-3 text-gray-400" />
                          <p className="text-xs text-gray-400">{item.customer}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${statusColor[item.status] || "text-gray-500 border-gray-300"}`}>
                        {item.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </PageTransition>
    </AdminLayout>
  );
}

