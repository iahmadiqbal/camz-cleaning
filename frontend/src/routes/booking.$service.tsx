import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";
import { SiteLayout } from "@/components/SiteLayout";
import { services } from "@/lib/data";
import { bookingStore } from "@/lib/bookingStore";

export const Route = createFileRoute("/booking/$service")({
  component: BookingServiceDetails,
});

// Step progress bar
function StepBar({ current, total, serviceTitle }: { current: number; total: number; serviceTitle: string }) {
  return (
    <div className="mb-8">
      <div className="flex gap-2 mb-3">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < current ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Step {current} of {total}</span>
        <span className="text-primary font-semibold">{serviceTitle}</span>
      </div>
    </div>
  );
}

// Tier button
function TierBtn({ label, price, desc, selected, onClick }: { label: string; price: string; desc?: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
        selected
          ? "bg-primary border-primary text-white"
          : "border-border bg-card text-foreground hover:border-primary"
      }`}
    >
      {selected && <FaCheck className="text-xs flex-shrink-0" />}
      {label} ({price})
      {desc && <span className={`text-xs font-normal ${selected ? "text-white/80" : "text-muted-foreground"}`}>· {desc}</span>}
    </button>
  );
}

const inputCls = "w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm";
const labelCls = "block text-sm font-semibold text-foreground mb-2";
const Err = ({ msg }: { msg?: string }) => msg ? <p className="text-xs text-destructive mt-1">{msg}</p> : null;

function BookingServiceDetails() {
  const { service } = Route.useParams();
  const navigate = useNavigate();
  const meta = services.find((s) => s.id === service);
  const [form, setForm] = useState<Record<string, string | number | boolean | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!meta) {
    return (
      <SiteLayout>
        <div className="max-w-md mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold">Service not found</h1>
          <Link to="/services" className="mt-4 inline-block text-primary">Browse services</Link>
        </div>
      </SiteLayout>
    );
  }

  const update = (k: string, v: string | number | boolean | string[]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (service === "vehicle") {
      if (!form.vehicleType) e.vehicleType = "Please select vehicle type";
      if (!form.tier) e.tier = "Please select a service tier";
    }
    if (service === "residential") {
      if (!form.bedrooms) e.bedrooms = "Please select bedrooms";
      if (!form.washrooms) e.washrooms = "Please select washrooms";
      if (!form.cleaningType) e.cleaningType = "Please select cleaning type";
    }
    if (service === "move") {
      if (!form.bedrooms) e.bedrooms = "Please select bedrooms";
      if (!form.condition) e.condition = "Please select property condition";
    }
    if (service === "commercial") {
      if (!form.businessType) e.businessType = "Please select business type";
      if (!form.sqft) e.sqft = "Please enter square footage";
    }
    if (service === "carpet") {
      if (!form.itemType) e.itemType = "Please select item type";
      if (!form.qty) e.qty = "Please enter quantity";
    }
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    bookingStore.set({ service, serviceTitle: meta.title, details: form });
    navigate({ to: "/booking-datetime" });
  };

  return (
    <SiteLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-[image:var(--gradient-hero)] px-6 pt-6 pb-10">
          <button onClick={() => navigate({ to: "/services" })} className="text-white/80 hover:text-white mb-4 flex items-center gap-2 text-sm">
            <FaArrowLeft /> Back
          </button>
          <h1 className="text-2xl font-bold text-white text-center">Service Details</h1>
        </div>

        <div className="max-w-lg mx-auto px-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl shadow-[var(--shadow-elegant)] p-6"
          >
            <StepBar current={1} total={4} serviceTitle={meta.title} />

            <h2 className="text-xl font-bold text-deep-blue mb-6">{meta.title} Details</h2>

            {service === "vehicle" && <VehicleForm form={form} update={update} errors={errors} />}
            {service === "residential" && <ResidentialForm form={form} update={update} errors={errors} />}
            {service === "move" && <MoveForm form={form} update={update} errors={errors} />}
            {service === "commercial" && <CommercialForm form={form} update={update} errors={errors} />}
            {service === "carpet" && <CarpetForm form={form} update={update} errors={errors} />}

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => navigate({ to: "/services" })}
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
    </SiteLayout>
  );
}

type FP = {
  form: Record<string, string | number | boolean | string[]>;
  update: (k: string, v: string | number | boolean | string[]) => void;
  errors: Record<string, string>;
};

function VehicleForm({ form, update, errors }: FP) {
  const tiers = [
    { label: "Basic", price: "+$40", desc: "External wash, tire shine, interior vacuum" },
    { label: "Full", price: "+$100", desc: "Full detail inside & out" },
    { label: "Premium", price: "+$150", desc: "Premium wax, leather conditioning, engine bay" },
  ];
  const selected = String(form.tier || "");
  const selectedTier = tiers.find((t) => t.label === selected);

  return (
    <div className="space-y-5">
      <div>
        <label className={labelCls}>Vehicle Type</label>
        <select className={inputCls} value={String(form.vehicleType || "")} onChange={(e) => update("vehicleType", e.target.value)}>
          <option value="">Select vehicle type</option>
          <option>Sedan</option>
          <option>SUV</option>
          <option>Truck</option>
          <option>Van</option>
          <option>Motorcycle</option>
        </select>
        <Err msg={errors.vehicleType} />
      </div>

      <div>
        <label className={labelCls}>Service Tier</label>
        <div className="flex flex-wrap gap-2">
          {tiers.map((t) => (
            <TierBtn
              key={t.label}
              label={t.label}
              price={t.price}
              selected={form.tier === t.label}
              onClick={() => update("tier", t.label)}
            />
          ))}
        </div>
        <Err msg={errors.tier} />
      </div>

      {selectedTier && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-soft-blue/10 border border-primary/20"
        >
          <p className="text-sm font-semibold text-deep-blue mb-1">Includes:</p>
          <p className="text-sm text-muted-foreground">{selectedTier.desc}.</p>
        </motion.div>
      )}
    </div>
  );
}

function ResidentialForm({ form, update, errors }: FP) {
  const types = [
    { label: "Standard", price: "+$0", desc: "Regular clean" },
    { label: "Deep Clean", price: "+$40", desc: "Thorough top-to-bottom" },
  ];
  const addons = ["Inside Fridge", "Inside Oven", "Windows", "Blinds"];
  const selected = (form.addons as string[]) || [];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Bedrooms</label>
          <select className={inputCls} value={String(form.bedrooms || "")} onChange={(e) => update("bedrooms", e.target.value)}>
            <option value="">Select</option>
            {["1", "2", "3", "4", "5+"].map((v) => <option key={v}>{v}</option>)}
          </select>
          <Err msg={errors.bedrooms} />
        </div>
        <div>
          <label className={labelCls}>Washrooms</label>
          <select className={inputCls} value={String(form.washrooms || "")} onChange={(e) => update("washrooms", e.target.value)}>
            <option value="">Select</option>
            {["1", "2", "3", "4+"].map((v) => <option key={v}>{v}</option>)}
          </select>
          <Err msg={errors.washrooms} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Cleaning Type</label>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <TierBtn key={t.label} label={t.label} price={t.price} selected={form.cleaningType === t.label} onClick={() => update("cleaningType", t.label)} />
          ))}
        </div>
        <Err msg={errors.cleaningType} />
      </div>
      <div>
        <label className={labelCls}>Add-ons (optional)</label>
        <div className="flex flex-wrap gap-2">
          {addons.map((a) => (
            <button key={a} onClick={() => {
              update("addons", selected.includes(a) ? selected.filter((x) => x !== a) : [...selected, a]);
            }} className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${selected.includes(a) ? "bg-primary border-primary text-white" : "border-border hover:border-primary"}`}>
              {a} (+$25)
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MoveForm({ form, update, errors }: FP) {
  const conditions = [
    { label: "Light", price: "+$0" },
    { label: "Medium", price: "+$40" },
    { label: "Heavy", price: "+$80" },
  ];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Bedrooms</label>
          <select className={inputCls} value={String(form.bedrooms || "")} onChange={(e) => update("bedrooms", e.target.value)}>
            <option value="">Select</option>
            {["1", "2", "3", "4+"].map((v) => <option key={v}>{v}</option>)}
          </select>
          <Err msg={errors.bedrooms} />
        </div>
        <div>
          <label className={labelCls}>Washrooms</label>
          <select className={inputCls} value={String(form.washrooms || "")} onChange={(e) => update("washrooms", e.target.value)}>
            <option value="">Select</option>
            {["1", "2", "3+"].map((v) => <option key={v}>{v}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={labelCls}>Property Condition</label>
        <div className="flex flex-wrap gap-2">
          {conditions.map((c) => (
            <TierBtn key={c.label} label={c.label} price={c.price} selected={form.condition === c.label} onClick={() => update("condition", c.label)} />
          ))}
        </div>
        <Err msg={errors.condition} />
      </div>
      <div>
        <label className={labelCls}>Property Status</label>
        <div className="flex gap-2">
          {["Empty", "Furnished"].map((s) => (
            <TierBtn key={s} label={s} price="" selected={form.furnished === s} onClick={() => update("furnished", s)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CommercialForm({ form, update, errors }: FP) {
  const freqs = [{ label: "One-time", price: "" }, { label: "Weekly", price: "" }, { label: "Monthly", price: "" }];
  return (
    <div className="space-y-5">
      <div>
        <label className={labelCls}>Business Type</label>
        <select className={inputCls} value={String(form.businessType || "")} onChange={(e) => update("businessType", e.target.value)}>
          <option value="">Select business type</option>
          {["Office", "Retail Store", "Warehouse", "Restaurant", "Clinic"].map((v) => <option key={v}>{v}</option>)}
        </select>
        <Err msg={errors.businessType} />
      </div>
      <div>
        <label className={labelCls}>Square Footage</label>
        <input type="number" className={inputCls} placeholder="e.g. 3500" value={String(form.sqft || "")} onChange={(e) => update("sqft", e.target.value)} />
        <Err msg={errors.sqft} />
      </div>
      <div>
        <label className={labelCls}>Frequency</label>
        <div className="flex flex-wrap gap-2">
          {freqs.map((f) => (
            <TierBtn key={f.label} label={f.label} price={f.price} selected={form.frequency === f.label} onClick={() => update("frequency", f.label)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CarpetForm({ form, update, errors }: FP) {
  const dirtLevels = [{ label: "Light", price: "+$0" }, { label: "Medium", price: "+$15" }, { label: "Heavy", price: "+$30" }];
  return (
    <div className="space-y-5">
      <div>
        <label className={labelCls}>Item Type</label>
        <div className="flex gap-2">
          {["Carpet", "Sofa"].map((t) => (
            <TierBtn key={t} label={t} price="" selected={form.itemType === t} onClick={() => update("itemType", t)} />
          ))}
        </div>
        <Err msg={errors.itemType} />
      </div>
      <div>
        <label className={labelCls}>Quantity</label>
        <input type="number" min={1} className={inputCls} placeholder="e.g. 2" value={String(form.qty || "")} onChange={(e) => update("qty", e.target.value)} />
        <Err msg={errors.qty} />
      </div>
      <div>
        <label className={labelCls}>Dirt Level</label>
        <div className="flex flex-wrap gap-2">
          {dirtLevels.map((d) => (
            <TierBtn key={d.label} label={d.label} price={d.price} selected={form.dirtLevel === d.label} onClick={() => update("dirtLevel", d.label)} />
          ))}
        </div>
      </div>
    </div>
  );
}
