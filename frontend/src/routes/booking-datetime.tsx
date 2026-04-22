import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FaArrowLeft, FaArrowRight, FaCalendarAlt, FaClock,
  FaMapMarkerAlt, FaLocationArrow, FaSearch, FaCheckCircle, FaPencilAlt
} from "react-icons/fa";
import { SiteLayout } from "@/components/SiteLayout";
import { bookingStore } from "@/lib/bookingStore";

export const Route = createFileRoute("/booking-datetime")({
  component: SchedulePage,
});

function StepBar({ current, total, serviceTitle }: { current: number; total: number; serviceTitle: string }) {
  return (
    <div className="mb-8">
      <div className="flex gap-2 mb-3">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < current ? "bg-primary" : "bg-border"}`} />
        ))}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Step {current} of {total}</span>
        <span className="text-primary font-semibold">{serviceTitle}</span>
      </div>
    </div>
  );
}

// ─── Calendar Modal ───────────────────────────────────────────────────────────
function CalendarModal({ selected, onSelect, onClose }: { selected: string; onSelect: (d: string) => void; onClose: () => void }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(selected ? parseInt(selected.split("-")[0]) : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected ? parseInt(selected.split("-")[1]) - 1 : today.getMonth());
  const [tempSelected, setTempSelected] = useState(selected);

  const monthName = new Date(viewYear, viewMonth).toLocaleString("default", { month: "long" });
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day); d.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const toISO = (day: number) => `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const formatHeader = () => {
    if (!tempSelected) return "Select date";
    const d = new Date(tempSelected + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        className="relative w-full max-w-sm bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 z-10"
      >
        {/* Header */}
        <p className="text-sm text-muted-foreground mb-1">Select date</p>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-deep-blue">{formatHeader()}</h2>
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <FaPencilAlt className="text-muted-foreground text-sm" />
          </button>
        </div>

        <div className="border-t border-border pt-4">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => {}} className="flex items-center gap-1 font-semibold text-deep-blue text-sm">
              {monthName} {viewYear} <span className="text-xs">▼</span>
            </button>
            <div className="flex gap-1">
              <button onClick={prevMonth} className="p-2 rounded-full hover:bg-muted transition-colors">
                <FaArrowLeft className="text-xs text-muted-foreground" />
              </button>
              <button onClick={nextMonth} className="p-2 rounded-full hover:bg-muted transition-colors">
                <FaArrowRight className="text-xs text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} className="text-center text-xs font-semibold text-muted-foreground py-1">{d}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const iso = toISO(day);
              const isSel = tempSelected === iso;
              const disabled = isDisabled(day);
              const isToday = iso === toISO(today.getDate()) && viewMonth === today.getMonth() && viewYear === today.getFullYear();
              return (
                <button
                  key={day}
                  disabled={disabled}
                  onClick={() => setTempSelected(iso)}
                  className={`aspect-square rounded-full text-sm font-medium transition-all flex items-center justify-center ${
                    isSel ? "bg-primary text-white shadow-md" :
                    isToday ? "border-2 border-primary text-primary font-bold" :
                    disabled ? "text-muted-foreground/30 cursor-not-allowed" :
                    "hover:bg-primary/10 text-foreground"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-5 pt-4 border-t border-border">
          <button onClick={onClose} className="text-primary font-semibold text-sm px-4 py-2">Cancel</button>
          <button
            onClick={() => { if (tempSelected) { onSelect(tempSelected); onClose(); } }}
            className="text-primary font-semibold text-sm px-4 py-2"
          >
            OK
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Clock Modal ──────────────────────────────────────────────────────────────
function ClockModal({ selected, onSelect, onClose }: { selected: string; onSelect: (t: string) => void; onClose: () => void }) {
  const parseTime = (t: string) => {
    if (!t) return { h: 1, m: 0, ampm: "AM" as "AM" | "PM" };
    const [time, period] = t.split(" ");
    const [hStr, mStr] = time.split(":");
    return { h: parseInt(hStr), m: parseInt(mStr), ampm: period as "AM" | "PM" };
  };

  const init = parseTime(selected);
  const [hour, setHour] = useState(init.h);
  const [minute, setMinute] = useState(init.m);
  const [ampm, setAmpm] = useState<"AM" | "PM">(init.ampm);
  const [mode, setMode] = useState<"hour" | "minute">("hour");

  const pad = (n: number) => String(n).padStart(2, "0");

  // Clock face click
  const handleClockClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const x = e.clientX - rect.left - cx;
    const y = e.clientY - rect.top - cy;
    const angle = Math.atan2(x, -y) * (180 / Math.PI);
    const deg = (angle + 360) % 360;

    if (mode === "hour") {
      const h = Math.round(deg / 30) % 12 || 12;
      setHour(h);
      setMode("minute");
    } else {
      const m = Math.round(deg / 6) % 60;
      setMinute(m);
    }
  };

  const hourAngle = ((hour % 12) / 12) * 360;
  const minuteAngle = (minute / 60) * 360;
  const activeAngle = mode === "hour" ? hourAngle : minuteAngle;
  const activeValue = mode === "hour" ? hour % 12 || 12 : minute;

  const cx = 120, cy = 120, r = 90;
  const handX = cx + r * Math.sin((activeAngle * Math.PI) / 180);
  const handY = cy - r * Math.cos((activeAngle * Math.PI) / 180);

  const numbers = mode === "hour"
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 12 }, (_, i) => i * 5);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        className="relative w-full max-w-sm bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 z-10"
      >
        <p className="text-sm text-muted-foreground mb-3">Select time</p>

        {/* Time display */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => setMode("hour")}
            className={`text-5xl font-bold rounded-xl px-3 py-1 transition-all ${mode === "hour" ? "bg-primary text-white" : "text-foreground"}`}
          >
            {pad(hour)}
          </button>
          <span className="text-4xl font-bold text-foreground">:</span>
          <button
            onClick={() => setMode("minute")}
            className={`text-5xl font-bold rounded-xl px-3 py-1 transition-all ${mode === "minute" ? "bg-primary text-white" : "text-foreground"}`}
          >
            {pad(minute)}
          </button>
          <div className="flex flex-col gap-1 ml-2">
            <button
              onClick={() => setAmpm("AM")}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${ampm === "AM" ? "bg-primary text-white" : "border border-border hover:border-primary"}`}
            >
              AM
            </button>
            <button
              onClick={() => setAmpm("PM")}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${ampm === "PM" ? "bg-primary text-white" : "border border-border hover:border-primary"}`}
            >
              PM
            </button>
          </div>
        </div>

        {/* Analog clock */}
        <div className="flex justify-center mb-4">
          <svg width="240" height="240" className="cursor-pointer" onClick={handleClockClick}>
            {/* Clock face */}
            <circle cx={cx} cy={cy} r={cx - 4} fill="var(--color-muted)" />
            {/* Numbers */}
            {numbers.map((n, i) => {
              const angle = ((i + 1) / 12) * 360;
              const nx = cx + (r - 18) * Math.sin((angle * Math.PI) / 180);
              const ny = cy - (r - 18) * Math.cos((angle * Math.PI) / 180);
              const isActive = mode === "hour" ? n === (hour % 12 || 12) : n === minute;
              return (
                <text
                  key={n}
                  x={nx} y={ny}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="14"
                  fontWeight={isActive ? "bold" : "normal"}
                  fill={isActive ? "white" : "var(--color-foreground)"}
                >
                  {mode === "minute" ? pad(n) : n}
                </text>
              );
            })}
            {/* Hand */}
            <line x1={cx} y1={cy} x2={handX} y2={handY} stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
            {/* Center dot */}
            <circle cx={cx} cy={cy} r="4" fill="var(--color-primary)" />
            {/* End dot */}
            <circle cx={handX} cy={handY} r="18" fill="var(--color-primary)" />
            <text x={handX} y={handY} textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="bold" fill="white">
              {activeValue}
            </text>
          </svg>
        </div>

        {/* Keyboard icon + actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <span className="text-muted-foreground text-lg">⌨</span>
          </button>
          <div className="flex gap-4">
            <button onClick={onClose} className="text-primary font-semibold text-sm px-4 py-2">Cancel</button>
            <button
              onClick={() => {
                onSelect(`${pad(hour)}:${pad(minute)} ${ampm}`);
                onClose();
              }}
              className="text-primary font-semibold text-sm px-4 py-2"
            >
              OK
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function SchedulePage() {
  const navigate = useNavigate();
  const data = bookingStore.get();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [addressSuggestion, setAddressSuggestion] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showClock, setShowClock] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatDate = (iso: string) => {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const [locLoading, setLocLoading] = useState(false);

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setAddress("Location not supported");
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            { headers: { "Accept-Language": "en" } }
          );
          const json = await res.json();
          // Build a clean readable address
          const a = json.address || {};
          const parts = [
            a.house_number && a.road ? `${a.house_number} ${a.road}` : a.road,
            a.suburb || a.neighbourhood || a.city_district,
            a.city || a.town || a.village,
            a.state,
            a.country,
          ].filter(Boolean);
          const addr = parts.length > 0 ? parts.join(", ") : json.display_name;
          setAddress(addr);
          setAddressSuggestion("");
        } catch {
          setAddress(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        }
        setLocLoading(false);
      },
      (err) => {
        if (err.code === 1) setAddress("Location permission denied");
        else setAddress("Unable to get location");
        setLocLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleAddressChange = (val: string) => {
    setAddress(val);
    setAddressSuggestion(val.length > 3 ? val + ", Calgary, AB" : "");
  };

  const submit = () => {
    const e: Record<string, string> = {};
    if (!date) e.date = "Please select a date";
    if (!time) e.time = "Please select a time";
    if (!address) e.address = "Please enter your address";
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    bookingStore.set({ date, time, location: addressSuggestion || address });
    navigate({ to: "/booking-pricing" });
  };

  return (
    <SiteLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-[image:var(--gradient-hero)] px-6 pt-6 pb-10">
          <button
            onClick={() => navigate({ to: `/booking/${data.service || ""}` })}
            className="text-white/80 hover:text-white mb-4 flex items-center gap-2 text-sm"
          >
            <FaArrowLeft /> Back
          </button>
          <h1 className="text-2xl font-bold text-white text-center">Schedule & Location</h1>
        </div>

        <div className="max-w-lg mx-auto px-6 mt-8 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl shadow-[var(--shadow-elegant)] p-6">
            <StepBar current={2} total={4} serviceTitle={data.serviceTitle || ""} />

            {/* Schedule Appointment */}
            <div className="rounded-2xl border border-border p-5 mb-5">
              <div className="flex items-center gap-2 mb-4">
                <FaCalendarAlt className="text-primary" />
                <h3 className="font-semibold text-deep-blue">Schedule Appointment</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* Date */}
                <div>
                  <button
                    onClick={() => setShowCalendar(true)}
                    className={`w-full p-4 rounded-xl border-2 text-center transition-all ${date ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
                  >
                    <FaCalendarAlt className={`mx-auto mb-1 text-xl ${date ? "text-primary" : "text-muted-foreground"}`} />
                    <div className={`text-sm font-medium ${date ? "text-deep-blue" : "text-muted-foreground"}`}>
                      {date ? formatDate(date) : "Select Date"}
                    </div>
                  </button>
                  {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
                </div>
                {/* Time */}
                <div>
                  <button
                    onClick={() => setShowClock(true)}
                    className={`w-full p-4 rounded-xl border-2 text-center transition-all ${time ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
                  >
                    <FaClock className={`mx-auto mb-1 text-xl ${time ? "text-primary" : "text-muted-foreground"}`} />
                    <div className={`text-sm font-medium ${time ? "text-deep-blue" : "text-muted-foreground"}`}>
                      {time || "Select Time"}
                    </div>
                  </button>
                  {errors.time && <p className="text-xs text-destructive mt-1">{errors.time}</p>}
                </div>
              </div>
            </div>

            {/* Work Location */}
            <div className="rounded-2xl border border-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <FaMapMarkerAlt className="text-primary" />
                <h3 className="font-semibold text-deep-blue">Work Location</h3>
              </div>
              <button
                onClick={handleCurrentLocation}
                disabled={locLoading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-border hover:border-primary text-primary font-semibold text-sm transition-all mb-3 disabled:opacity-60"
              >
                <FaLocationArrow className={locLoading ? "animate-spin" : ""} />
                {locLoading ? "Getting location..." : "Use Current Location"}
              </button>
              <div>
                <div className="flex items-center gap-2 border-2 border-border rounded-xl px-4 py-3 focus-within:border-primary transition-all">
                  <FaSearch className="text-muted-foreground flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search Address"
                    value={address === "Current Location" ? "" : address}
                    onChange={(e) => handleAddressChange(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  {address && <FaCheckCircle className="text-primary flex-shrink-0" />}
                </div>
                {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
                {addressSuggestion && (
                  <motion.button
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => { setAddress(addressSuggestion); setAddressSuggestion(""); }}
                    className="mt-2 w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/5 border border-primary/20 text-sm text-deep-blue hover:bg-primary/10 transition-all"
                  >
                    <FaCheckCircle className="text-primary flex-shrink-0" />
                    {addressSuggestion}
                  </motion.button>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate({ to: `/booking/${data.service || ""}` })}
                className="flex-1 py-3 rounded-xl border-2 border-border text-foreground font-semibold hover:border-primary hover:text-primary transition-all"
              >
                Back
              </button>
              <button
                onClick={submit}
                className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                Continue <FaArrowRight className="text-sm" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showCalendar && (
          <CalendarModal
            selected={date}
            onSelect={setDate}
            onClose={() => setShowCalendar(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showClock && (
          <ClockModal
            selected={time}
            onSelect={setTime}
            onClose={() => setShowClock(false)}
          />
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}
