import { Link, useParams } from "react-router-dom";
import { CustomerLayout } from "@/components/CustomerLayout";
import { ArrowLeft, Calendar, MapPin, User, CreditCard, DollarSign, Clock, CheckCircle2, CircleDot } from "lucide-react";
import { bookings, services } from "@/lib/data";

const progressSteps = [
  { key: "pending", label: "Pending" },
  { key: "accepted", label: "Accepted" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "approved", label: "Approved" },
];

const statusToStep: Record<string, number> = {
  Pending: 0,
  Confirmed: 1,
  "In Progress": 2,
  Completed: 3,
  Approved: 4,
};

const servicePricing: Record<string, { ratePerHour: number; estimatedTotal: number; billingType: string }> = {
  Residential: { ratePerHour: 89, estimatedTotal: 89, billingType: "Fixed Billing" },
  Commercial:  { ratePerHour: 50, estimatedTotal: 320, billingType: "Hourly Billing" },
  "Move-Out":  { ratePerHour: 179, estimatedTotal: 179, billingType: "Fixed Billing" },
  Carpet:      { ratePerHour: 59, estimatedTotal: 59, billingType: "Fixed Billing" },
  "Vehicle Detail": { ratePerHour: 10, estimatedTotal: 30, billingType: "Hourly Billing" },
};

const statusBadgeStyle = (status: string) => {
  switch (status) {
    case "Pending":     return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    case "Confirmed":   return "bg-blue-100 text-blue-700 border border-blue-300";
    case "In Progress": return "bg-purple-100 text-purple-700 border border-purple-300";
    case "Completed":   return "bg-green-100 text-green-700 border border-green-300";
    case "Approved":    return "bg-emerald-100 text-emerald-700 border border-emerald-300";
    default:            return "bg-gray-100 text-gray-700 border border-gray-300";
  }
};

export default function BookingDetails() {
  const { id } = useParams<{ id: string }>();

  const booking = bookings.find((b) => b.id === id) ?? bookings[0];
  const serviceKey = booking.service === "Vehicle Detail" ? "vehicle" : booking.service.toLowerCase().replace(/[^a-z]/g, "");
  const serviceInfo = services.find((s) => s.id === serviceKey || s.title.toLowerCase().includes(booking.service.toLowerCase()));

  const pricing = servicePricing[booking.service] ?? { ratePerHour: 10, estimatedTotal: 30, billingType: "Hourly Billing" };
  const currency = "CAD";
  const taxRate = 0.05;
  const hoursWorked = 0;
  const tax = pricing.estimatedTotal * taxRate;
  const total = pricing.estimatedTotal + tax;
  const currentStep = statusToStep[booking.status] ?? 0;

  const b = {
    id: `#${booking.id}`,
    status: booking.status,
    service: serviceInfo?.title ?? booking.service + " Cleaning",
    date: booking.date,
    time: "02:11 AM",
    location: "Togh Sarai, Khyber Pakhtunkhwa",
    cleaner: booking.staff !== "—" ? booking.staff : null,
    billingType: pricing.billingType,
    ratePerHour: pricing.ratePerHour,
    currency,
    estimatedTotal: pricing.estimatedTotal,
    hoursWorked,
    taxRate,
    currentStep,
  };

  return (
    <CustomerLayout>
      <div className="max-w-lg mx-auto">
        <Link to="/customer-dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-2xl font-bold text-deep-blue mb-6">Booking Details</h1>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground font-mono">{b.id}</span>
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${statusBadgeStyle(b.status)}`}>
              <Clock className="w-3 h-3" />{b.status.toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-bold text-primary mb-4">{b.service}</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground w-24 flex-shrink-0">Date & Time:</span>
              <span className="text-sm font-medium text-foreground">{b.date} – {b.time}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground w-24 flex-shrink-0">Location:</span>
              <span className="text-sm font-medium text-foreground text-right flex-1">{b.location}</span>
            </div>
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground w-24 flex-shrink-0">Cleaner:</span>
              <span className="text-sm font-medium text-muted-foreground italic">{b.cleaner ?? "Finding cleaner..."}</span>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground w-24 flex-shrink-0">Billing:</span>
              <span className="text-sm font-medium text-foreground">{b.billingType}</span>
            </div>
            <div className="flex items-start gap-3">
              <DollarSign className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground w-24 flex-shrink-0">Price:</span>
              <span className="text-sm font-semibold text-primary">{b.currency} ${b.ratePerHour}/hr (Est. ${b.estimatedTotal}.00)</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] mb-4">
          <h3 className="text-base font-bold text-deep-blue mb-5">Job Progress</h3>
          <div className="flex items-center justify-between relative">
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-border z-0" />
            {progressSteps.map((step, i) => {
              const isDone = i < b.currentStep;
              const isActive = i === b.currentStep;
              return (
                <div key={step.key} className="flex flex-col items-center gap-1.5 z-10 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${isDone || isActive ? "bg-primary border-primary text-white" : "bg-white border-border text-muted-foreground"}`}>
                    {isDone || isActive ? <CheckCircle2 className="w-4 h-4" /> : <CircleDot className="w-4 h-4 opacity-30" />}
                  </div>
                  <span className={`text-[10px] font-medium text-center leading-tight ${isActive ? "text-primary font-bold" : isDone ? "text-deep-blue" : "text-muted-foreground"}`}>{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-base font-bold text-deep-blue">Billing Summary</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Rate</span><span className="font-medium text-foreground">{b.currency} $ {b.ratePerHour}.00/hr</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Time Worked</span><span className="font-medium text-foreground">{b.hoursWorked.toFixed(2)} hrs</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tax ({(b.taxRate * 100).toFixed(0)}%)</span><span className="font-medium text-foreground">{b.currency} ${tax.toFixed(2)}</span></div>
          </div>
          <div className="border-t border-border my-4" />
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-foreground">Total</span>
            <span className="text-xl font-bold text-green-600">{b.currency} ${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

