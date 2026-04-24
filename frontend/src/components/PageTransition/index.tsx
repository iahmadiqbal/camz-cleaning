import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

type Direction = "top" | "bottom" | "left" | "right" | "fade";

export function PageTransition({ children, direction = "top" }: { children: ReactNode; direction?: Direction }) {
  const { pathname: path } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [path]);

  return <div style={{ animation: "none", transform: "none", opacity: 1 }}>{children}</div>;
}
