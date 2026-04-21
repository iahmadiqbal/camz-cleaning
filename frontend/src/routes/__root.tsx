import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { Preloader } from "../components/Preloader";
import { FaArrowRight, FaHome, FaPhoneAlt } from "react-icons/fa";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[image:var(--gradient-soft)] opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-soft-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-lg text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/images/transparentlogo.png" alt="CAMZ Cleaning" className="h-14 w-auto object-contain opacity-80" />
        </div>

        {/* 404 */}
        <div className="text-[120px] md:text-[160px] font-black leading-none text-deep-blue/10 select-none">
          404
        </div>
        <div className="-mt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-deep-blue">Page not found</h1>
          <p className="mt-3 text-muted-foreground text-lg max-w-sm mx-auto">
            Looks like this page got cleaned up. Let's get you back to a sparkling space.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 hover:scale-105 transition-all shadow-lg"
          >
            <FaHome /> Go Home
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="tel:+15878371977"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-border text-foreground font-semibold hover:bg-muted transition-colors"
          >
            <FaPhoneAlt className="text-primary" /> Call Us
          </a>
        </div>

        {/* Quick links */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center text-sm">
          {[
            { label: "Services", to: "/services" },
            { label: "About", to: "/about" },
            { label: "Track Booking", to: "/tracking" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-1.5 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <>
      <Preloader />
      <Outlet />
    </>
  );
}
