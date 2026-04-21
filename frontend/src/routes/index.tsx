import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  FaArrowRight,
  FaShieldAlt,
  FaLeaf,
  FaClock,
  FaStar,
  FaCheckCircle,
  FaPhoneAlt,
  FaCalendarCheck,
  FaSprayCan,
  FaSmile,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { services, testimonials } from "@/lib/data";
const teamImg = "/images/team.jpg";
const ecoImg = "/images/eco.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CAMZ Cleaning — Trusted Cleaning Services" },
      { name: "description", content: "Professional residential, commercial, carpet & vehicle cleaning. Book online in under 60 seconds." },
      { property: "og:title", content: "CAMZ Cleaning — Trusted Cleaning Services" },
      { property: "og:description", content: "Professional cleaning, eco-friendly products, vetted pros. Book in 60 seconds." },
    ],
  }),
  component: Home,
});

const stats = [
  { icon: FaSmile, n: "12k+", end: 12, suffix: "k+", l: "Happy clients" },
  { icon: FaSprayCan, n: "25k+", end: 25, suffix: "k+", l: "Jobs completed" },
  { icon: FaStar, n: "4.9★", end: 4.9, suffix: "★", l: "Average rating" },
  { icon: FaShieldAlt, n: "100%", end: 100, suffix: "%", l: "Insured" },
];

function CountUp({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const isDecimal = end % 1 !== 0;
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * end;
            setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.round(current));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const steps = [
  { icon: FaPhoneAlt, title: "1. Choose service", desc: "Pick from 5 expert services tailored for any space." },
  { icon: FaCalendarCheck, title: "2. Book a slot", desc: "Pick a date & time that works — instant confirmation." },
  { icon: FaSprayCan, title: "3. We clean it", desc: "Our vetted pros arrive on time with eco-safe supplies." },
  { icon: FaSmile, title: "4. Enjoy", desc: "Relax in your spotless space — satisfaction guaranteed." },
];

function ReviewsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", slidesToScroll: 1, containScroll: "trimSnaps", breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 3 }
    }},
    [Autoplay({ delay: 7000, stopOnInteraction: true })]
  );

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); emblaApi.off("reInit", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative px-10">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex" style={{ gap: "24px" }}>
          {testimonials.map((t) => (
            <div key={t.name} className="min-w-0 shrink-0 grow-0 w-full md:w-[calc(33.333%-16px)]">
              <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] hover:-translate-y-1 transition-all h-full">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => <FaStar key={j} />)}
                </div>
                <p className="text-foreground/90 italic">"{t.text}"</p>
                <div className="mt-5 pt-5 border-t border-border flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground grid place-items-center font-bold">{t.name[0]}</div>
                  <div>
                    <div className="font-semibold text-deep-blue">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-30 transition-all"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-30 transition-all"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

function Home() {
  return (
    <SiteLayout>
      <PageTransition direction="fade">
        <HeroSlideshow />

        {/* Stats strip */}
        <section className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-xl bg-soft-blue grid place-items-center text-primary text-xl mb-1">
                  <s.icon />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-deep-blue">
                  <CountUp end={s.end} suffix={s.suffix} />
                </div>
                <div className="text-sm text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services preview with images */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">What we do</span>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold text-deep-blue">Services tailored to you</h2>
            <p className="mt-4 text-muted-foreground">
              Whether it's your home, office, car, or carpets — we have a professional cleaning plan for every need and budget. Simply pick a service, choose your time, and we'll handle the rest.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link to="/booking/$service" params={{ service: s.id }} className="block group h-full">
                  <div className="h-full rounded-2xl overflow-hidden bg-card border border-border hover:shadow-[var(--shadow-elegant)] hover:-translate-y-2 transition-all duration-300">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-deep-blue">
                        {s.price}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{s.icon}</span>
                        <h3 className="font-bold text-lg text-deep-blue group-hover:text-primary transition-colors">{s.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                      <ul className="mt-3 space-y-1">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-foreground/70">
                            <FaCheckCircle className="text-primary flex-shrink-0 text-xs" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm">
                        Book now <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom content after service cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 grid sm:grid-cols-3 gap-6"
          >
            {[
              {
                icon: FaSprayCan,
                title: "All supplies included",
                desc: "No need to buy anything. Our pros bring all eco-friendly cleaning products and equipment.",
              },
              {
                icon: FaShieldAlt,
                title: "100% satisfaction guarantee",
                desc: "Not happy? We'll re-clean for free. No questions asked — your satisfaction is our priority.",
              },
              {
                icon: FaCalendarCheck,
                title: "Flexible scheduling",
                desc: "Book same-day, next-day, or plan ahead. Reschedule or cancel anytime up to 24 hours before.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-soft-blue grid place-items-center text-primary text-xl flex-shrink-0">
                  <item.icon />
                </div>
                <div>
                  <h4 className="font-bold text-deep-blue mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
            >
              View all services <FaArrowRight />
            </Link>
          </motion.div>
        </section>

        {/* How it works */}
        <section className="bg-[image:var(--gradient-soft)] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">How it works</span>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold text-deep-blue">Booking in 4 simple steps</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative bg-card rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[image:var(--gradient-hero)] grid place-items-center text-primary-foreground text-xl shadow-lg mb-4">
                    <s.icon />
                  </div>
                  <h3 className="font-bold text-deep-blue">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us with team image */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Why CAMZ</span>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold text-deep-blue">Cleaners you can trust</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                For over a decade we've helped families and businesses enjoy cleaner, healthier spaces.
                Every cleaner is background-checked, fully insured and trained on the latest eco-friendly methods.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Background-checked & insured pros",
                  "100% satisfaction guarantee",
                  "Eco-friendly, pet-safe products",
                  "Flexible scheduling 7 days/week",
                  "Easy online booking & rescheduling",
                ].map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-primary text-lg flex-shrink-0" />
                    <span className="text-foreground">{t}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]">
                <img src={teamImg} alt="Our cleaning team" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-5 shadow-[var(--shadow-elegant)] border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground grid place-items-center text-xl">
                    <FaShieldAlt />
                  </div>
                  <div>
                    <div className="font-bold text-deep-blue">150+ Pros</div>
                    <div className="text-xs text-muted-foreground">All vetted & insured</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Eco section */}
        <section className="bg-soft-blue py-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]"
            >
              <img src={ecoImg} alt="Eco-friendly products" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <FaLeaf className="text-white text-4xl mb-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Eco-friendly. Pet & kid safe.</h2>
              <p className="mt-4 text-white/90 text-lg">
                We only use plant-based, biodegradable cleaning products. Tough on grime, gentle on your family
                and the planet. No harsh chemicals — ever.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {["100% Natural", "Zero Harsh\nChemicals", "Biodegradable"].map((t) => (
                  <div key={t} className="bg-card rounded-xl p-4 text-center shadow-[var(--shadow-card)]">
                    <FaCheckCircle className="text-primary mx-auto mb-2" />
                    <div className="text-xs font-semibold text-deep-blue whitespace-pre-line">{t}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials with Embla Carousel */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Reviews</span>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold text-deep-blue">Loved by 12,000+ clients</h2>
          </motion.div>
          <ReviewsCarousel />
        </section>

        {/* Milestones Timeline */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our journey</span>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold text-deep-blue">Trusted since 2013</h2>
            <p className="mt-4 text-muted-foreground">Over a decade of making spaces sparkle across Canada.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { y: "2013", t: "Founded", d: "Started with one van and a big mission." },
              { y: "2017", t: "10k clients", d: "Hit our first major milestone." },
              { y: "2020", t: "Eco switch", d: "Went 100% plant-based products." },
              { y: "2025", t: "150+ pros", d: "Serving 25k+ jobs every year." },
            ].map((m, i) => (
              <motion.div
                key={m.y}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl border-2 border-primary/20 bg-card p-6 hover:border-primary transition-colors hover:shadow-[var(--shadow-elegant)]"
              >
                <div className="text-3xl font-bold text-primary">{m.y}</div>
                <div className="font-semibold text-deep-blue mt-1">{m.t}</div>
                <div className="text-sm text-muted-foreground mt-2">{m.d}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trust strip */}
        <section className="bg-soft-blue py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {[
                { n: "60s", l: "Average booking time", d: "Book your service in under a minute" },
                { n: "Free", l: "Cancellation", d: "Cancel or reschedule up to 24h before" },
                { n: "100%", l: "Satisfaction guarantee", d: "We re-clean for free if you're not happy" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-4xl font-bold text-white">{s.n}</div>
                  <div className="text-sm font-semibold text-white mt-1">{s.l}</div>
                  <div className="text-xs text-white/80 mt-1">{s.d}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-elegant)]"
          >
            {/* Background image with overlay */}
            <div className="absolute inset-0">
              <img src={ecoImg} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-deep-blue/85" />
            </div>

            <div className="relative text-primary-foreground text-center py-16 px-6 md:py-20 md:px-16">

              <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                Your cleanest home <br className="hidden md:block" />
                <span className="text-soft-blue">starts today.</span>
              </h2>

              <p className="text-lg opacity-80 max-w-lg mx-auto mb-10">
                Book in under 60 seconds. Vetted pros, eco-friendly products, 100% satisfaction guaranteed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-deep-blue font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
                >
                  Book Now
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/tracking"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Track a Booking
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm opacity-70">
                {["No credit card required", "Cancel anytime", "Insured & vetted pros"].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <FaCheckCircle className="text-soft-blue" /> {t}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </PageTransition>
    </SiteLayout>
  );
}
