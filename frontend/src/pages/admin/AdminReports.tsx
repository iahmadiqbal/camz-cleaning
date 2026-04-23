
import { motion } from "framer-motion";
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { DollarSign, Clock, CheckCircle2, RefreshCw } from "lucide-react";


// Mock data — replace with API later
const mockReportData = {
  netRevenue: 40.05,
  pending: 10,
  active: 0,
};

export default function ReportsPage() {
  const [data, setData] = useState(mockReportData);

  const refresh = () => setData({ ...mockReportData });

  return (
    <AdminLayout>
      <PageTransition direction="top">
        <div className="pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
            <button
              onClick={refresh}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Net Platform Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold tracking-wide uppercase mb-1">
                  Net Platform Revenue
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  ${data.netRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Pending + Active */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-yellow-100"
            >
              <div className="w-9 h-9 rounded-xl bg-yellow-50 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{data.pending}</p>
              <p className="text-xs text-gray-400 font-semibold tracking-wide uppercase mt-1">
                Pending
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{data.active}</p>
              <p className="text-xs text-gray-400 font-semibold tracking-wide uppercase mt-1">
                Active
              </p>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </AdminLayout>
  );
}

