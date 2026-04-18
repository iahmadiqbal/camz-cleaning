import { motion } from "framer-motion";

const steps = ["Service", "Details", "Date & Time", "Pricing", "Checkout", "Done"];

export function BookingStepper({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between max-w-3xl mx-auto mb-10">
      {steps.map((s, i) => (
        <div key={s} className="flex-1 flex items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`flex flex-col items-center gap-2`}
          >
            <div className={`w-9 h-9 rounded-full grid place-items-center text-sm font-semibold transition-colors ${
              i <= current ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {i < current ? "✓" : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i <= current ? "text-deep-blue" : "text-muted-foreground"}`}>{s}</span>
          </motion.div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 ${i < current ? "bg-primary" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
