import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment = current < 70 ? Math.random() * 20 + 15 : Math.random() * 10 + 8;
      current = Math.min(current + increment, 100);
      setProgress(Math.floor(current));
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 200);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-0 left-0 right-0 h-1 origin-left"
            style={{ background: "linear-gradient(90deg, #003A78, #3B82F6, #6592DB)" }}
          />

          <div className="flex flex-col items-center gap-10">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="relative"
            >
              <img
                src="/images/transparentlogo.png"
                alt="CAMZ Cleaning"
                className="h-32 w-auto object-contain"
              />
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 blur-xl rounded-full opacity-30"
                style={{ background: "#3B82F6" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-2xl font-bold tracking-tight" style={{ color: "#003A78" }}>
                CAMZ Cleaning
              </span>
              <span className="text-sm text-gray-400 tracking-widest uppercase">
                Professional Cleaning Services
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-2 w-64"
            >
              <div className="w-full h-0.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #003A78, #3B82F6)",
                    transition: "width 0.15s ease-out",
                  }}
                />
              </div>
              <span className="text-xs text-gray-400 tabular-nums">{progress}%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
