import type { ReactNode } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full">
      <Header />
      <main className="flex-1 overflow-x-hidden w-full">{children}</main>
      <Footer />
    </div>
  );
}
