import { motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

type Direction = "top" | "bottom" | "left" | "right" | "fade";

const variants: Record<Direction, { initial: object; animate: object }> = {
  top: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
  bottom: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
  fade: { initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 } },
};

export function PageTransition({ children, direction = "top" }: { children: ReactNode; direction?: Direction }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [path]);

  const v = variants[direction];
  return (
    <motion.div
      initial={v.initial}
      animate={v.animate}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
