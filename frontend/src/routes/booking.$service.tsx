import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageTransition } from "@/components/PageTransition";
import { BookingStepper } from "@/components/BookingStepper";
import { services } from "@/lib/data";
import { bookingStore } from "@/lib/bookingStore";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/booking/$service")({
  component: BookingForm,
});

const inputCls = "w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40";
const labelCls = "block text-sm font-medium text-foreground mb-1.5";
const cardCls = "rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-card)]";

function BookingForm() {
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

  const update = (k: string, v: string | number | boolean | string[]) => setForm((f) => ({ ...f, [k]: v }));
  const toggleAddon = (a: string) => {
    const list = (form.addons as string[]) || [];
    update("addons", list.includes(a) ? list.filter((x) => x !== a) : [...list, a]);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (service === "residential") {
      if (!form.bedrooms) e.bedrooms = "Please select bedrooms";
      if (!form.washrooms) e.washrooms = "Please select washrooms";
      if (!form.type) e.type = "Please select cleaning type";
    }
    if (service === "move") {
      if (!form.bedrooms) e.bedrooms = "Please select bedrooms";
      if (!form.washrooms) e.washrooms = "Please select washrooms";
      if (!form.condition) e.condition = "Please select property condition";
      if (!form.furnished) e.furnished = "Please select property status";
    }
    if (service === "commercial") {
      if (!form.business) e.business = "Please select business type";
      if (!form.size) e.size = "Please enter square footage";
      if (!form.frequency) e.frequency = "Please select frequency";
    }
    if (service === "carpet") {
      if (!form.qty || Number(form.qty) < 1) e.qty = "Please enter quantity";
      if (!form.dirt) e.dirt = "Please select dirt level";
    }
    if (service === "vehicle") {
      if (!form.vehicle) e.vehicle = "Please select vehicle type";
      if (!form.serviceType) e.serviceType = "Please select service type";
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
      <PageTransition direction="bottom">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <BookingStepper current={1} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-2xl overflow-hidden relative h-44 md:h-56 shadow-[var(--shadow-card)]"
          >
            <img src={meta.image} alt={meta.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/85 to-deep-blue/20 flex items-center px-6 md:px-10">
              <div className="text-primary-foreground">
                <div className="text-4xl md:text-5xl mb-2">{meta.icon}</div>
                <h1 className="text-2xl md:text-4xl font-bold">{meta.title}</h1>
                <p className="text-sm md:text-base opacity-90 mt-1">Tell us a bit about your needs</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className={cardCls}>
            {service === "residential" && <ResidentialFields form={form} update={update} toggleAddon={toggleAddon} errors={errors} />}
            {service === "move" && <MoveFields form={form} update={update} errors={errors} />}
            {service === "commercial" && <CommercialFields form={form} update={update} errors={errors} />}
            {service === "carpet" && <CarpetFields form={form} update={update} errors={errors} />}
            {service === "vehicle" && <VehicleFields form={form} update={update} errors={errors} />}

            <div className="mt-8 flex justify-end">
              <button onClick={submit} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground font-semibold shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </SiteLayout>
  );
}

type FieldProps = { form: Record<string, string | number | boolean | string[]>; update: (k: string, v: string | number | boolean | string[]) => void; toggleAddon?: (a: string) => void; errors?: Record<string, string> };
const Err = ({ msg }: { msg?: string }) => msg ? <p className="text-xs text-destructive mt-1">{msg}</p> : null;

function ResidentialFields({ form, update, toggleAddon, errors = {} }: FieldProps) {
  const addons = ["Inside Fridge", "Inside Oven", "Windows", "Blinds"];
  const selected = (form.addons as string[]) || [];
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <div><label className={labelCls}>Bedrooms *</label><select className={inputCls} value={String(form.bedrooms || "")} onChange={(e) => update("bedrooms", e.target.value)}><option value="">Select...</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select><Err msg={errors.bedrooms} /></div>
      <div><label className={labelCls}>Washrooms *</label><select className={inputCls} value={String(form.washrooms || "")} onChange={(e) => update("washrooms", e.target.value)}><option value="">Select...</option><option>1</option><option>2</option><option>3</option><option>4+</option></select><Err msg={errors.washrooms} /></div>
      <div><label className={labelCls}>Property size (sqft)</label><input type="number" className={inputCls} placeholder="e.g. 1200" value={String(form.size || "")} onChange={(e) => update("size", e.target.value)} /></div>
      <div><label className={labelCls}>Cleaning type *</label><select className={inputCls} value={String(form.type || "")} onChange={(e) => update("type", e.target.value)}><option value="">Select...</option><option>Standard</option><option>Deep Clean</option></select><Err msg={errors.type} /></div>
      <div className="sm:col-span-2">
        <label className={labelCls}>Add-ons (optional)</label>
        <div className="flex flex-wrap gap-2">
          {addons.map((a) => (
            <button key={a} type="button" onClick={() => toggleAddon?.(a)} className={`px-4 py-2 rounded-full text-sm border transition-colors ${selected.includes(a) ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>{a}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MoveFields({ form, update, errors = {} }: FieldProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <div><label className={labelCls}>Bedrooms *</label><select className={inputCls} value={String(form.bedrooms || "")} onChange={(e) => update("bedrooms", e.target.value)}><option value="">Select...</option><option>1</option><option>2</option><option>3</option><option>4+</option></select><Err msg={errors.bedrooms} /></div>
      <div><label className={labelCls}>Washrooms *</label><select className={inputCls} value={String(form.washrooms || "")} onChange={(e) => update("washrooms", e.target.value)}><option value="">Select...</option><option>1</option><option>2</option><option>3+</option></select><Err msg={errors.washrooms} /></div>
      <div><label className={labelCls}>Property Condition *</label><select className={inputCls} value={String(form.condition || "")} onChange={(e) => update("condition", e.target.value)}><option value="">Select...</option><option>Light</option><option>Medium</option><option>Heavy</option></select><Err msg={errors.condition} /></div>
      <div><label className={labelCls}>Property Status *</label><select className={inputCls} value={String(form.furnished || "")} onChange={(e) => update("furnished", e.target.value)}><option value="">Select...</option><option>Empty</option><option>Furnished</option></select><Err msg={errors.furnished} /></div>
      <div className="sm:col-span-2 space-y-2">
        <label className={labelCls}>Additional Options</label>
        <div className="flex items-center gap-3"><input type="checkbox" id="carpet" checked={!!form.carpet} onChange={(e) => update("carpet", e.target.checked)} className="w-4 h-4 accent-primary" /><label htmlFor="carpet" className="text-sm">Include Carpet Cleaning (+$60)</label></div>
        <div className="flex items-center gap-3"><input type="checkbox" id="wall" checked={!!form.wall} onChange={(e) => update("wall", e.target.checked)} className="w-4 h-4 accent-primary" /><label htmlFor="wall" className="text-sm">Wall Spot Cleaning (+$40)</label></div>
      </div>
    </div>
  );
}

function CommercialFields({ form, update, errors = {} }: FieldProps) {
  const extras = ["Floor Cleaning / Polishing", "Window Cleaning", "Washroom Maintenance"];
  const selected = (form.extras as string[]) || [];
  const toggleExtra = (item: string) => {
    update("extras", selected.includes(item) ? selected.filter((x) => x !== item) : [...selected, item]);
  };
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <div>
        <label className={labelCls}>Business Type *</label>
        <select className={inputCls} value={String(form.business || "")} onChange={(e) => update("business", e.target.value)}>
          <option value="">Select...</option>
          <option>Office</option>
          <option>Retail Store</option>
          <option>Warehouse</option>
          <option>Restaurant</option>
        </select>
        <Err msg={errors.business} />
      </div>
      <div><label className={labelCls}>Square Footage *</label><input type="number" className={inputCls} placeholder="e.g. 3500" value={String(form.size || "")} onChange={(e) => update("size", e.target.value)} /><Err msg={errors.size} /></div>
      <div className="sm:col-span-2">
        <label className={labelCls}>Service Frequency *</label>
        <select className={inputCls} value={String(form.frequency || "")} onChange={(e) => update("frequency", e.target.value)}>
          <option value="">Select...</option>
          <option>One-time</option>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
        <Err msg={errors.frequency} />
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls}>Additional Requirements</label>
        <div className="space-y-2">
          {extras.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <input type="checkbox" id={item} checked={selected.includes(item)} onChange={() => toggleExtra(item)} className="w-4 h-4 accent-primary" />
              <label htmlFor={item} className="text-sm">{item}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="sm:col-span-2 p-4 rounded-xl bg-soft-blue border border-primary/20">
        <div className="text-sm font-semibold text-deep-blue mb-1">📋 Request a Quote (Recommended)</div>
        <p className="text-xs text-muted-foreground">Your request will be reviewed by our team and we'll contact you with a custom quote within 24 hours.</p>
      </div>
    </div>
  );
}

function CarpetFields({ form, update, errors = {} }: FieldProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <div><label className={labelCls}>Type</label><select className={inputCls} value={String(form.itemType || "")} onChange={(e) => update("itemType", e.target.value)}><option>Carpet</option><option>Sofa</option></select></div>
      <div><label className={labelCls}>Quantity *</label><input type="number" min={1} className={inputCls} value={String(form.qty || "")} onChange={(e) => update("qty", e.target.value)} /><Err msg={errors.qty} /></div>
      <div className="sm:col-span-2"><label className={labelCls}>Dirt level *</label><select className={inputCls} value={String(form.dirt || "")} onChange={(e) => update("dirt", e.target.value)}><option value="">Select...</option><option>Light</option><option>Medium</option><option>Heavy</option></select><Err msg={errors.dirt} /></div>
    </div>
  );
}

function VehicleFields({ form, update, errors = {} }: FieldProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <div><label className={labelCls}>Vehicle type *</label><select className={inputCls} value={String(form.vehicle || "")} onChange={(e) => update("vehicle", e.target.value)}><option value="">Select...</option><option>Sedan</option><option>SUV</option><option>Truck</option><option>Van</option></select><Err msg={errors.vehicle} /></div>
      <div><label className={labelCls}>Service type *</label><select className={inputCls} value={String(form.serviceType || "")} onChange={(e) => update("serviceType", e.target.value)}><option value="">Select...</option><option>Exterior</option><option>Interior</option><option>Full Detail</option></select><Err msg={errors.serviceType} /></div>
    </div>
  );
}
