// Shared in-memory store — simulates real-time data flow between customer booking and admin panel

export type Platform = "APP" | "GOOGLE" | "REFERRAL" | "FACEBOOK" | "WEBSITE";

export type AppCustomer = {
    id: number;
    name: string;
    email: string;
    phone?: string;
    platform: Platform;
    joined: string; // "Apr 19, 2026"
    bookingCount: number;
    totalSpent: number;
};

export type AppBooking = {
    id: string;
    customerId: number;
    customerName: string;
    customerEmail: string;
    service: string;
    serviceTitle: string;
    date: string;
    time: string;
    location: string;
    price: number;
    status: "Pending" | "Confirmed" | "In Progress" | "Completed" | "Cancelled";
    staff: string;
    createdAt: string;
};

// ── Seed data ──────────────────────────────────────────────
const seedCustomers: AppCustomer[] = [
    { id: 1, name: "Ahmad", email: "ahmadev42@gmail.com", platform: "APP", joined: "Apr 19, 2026", bookingCount: 5, totalSpent: 450 },
    { id: 2, name: "Anas Tahir", email: "chanas.tahir.55@gmail.com", platform: "GOOGLE", joined: "Apr 14, 2026", bookingCount: 8, totalSpent: 920 },
    { id: 3, name: "Anas", email: "anast4390@gmail.com", platform: "REFERRAL", joined: "Apr 14, 2026", bookingCount: 2, totalSpent: 180 },
    { id: 4, name: "New Customer", email: "abc@gmail.com", platform: "FACEBOOK", joined: "Apr 14, 2026", bookingCount: 1, totalSpent: 89 },
    { id: 5, name: "Sarah Johnson", email: "sarah@example.com", platform: "APP", joined: "Mar 10, 2026", bookingCount: 12, totalSpent: 1480 },
    { id: 6, name: "Mark Chen", email: "mark@example.com", platform: "WEBSITE", joined: "Feb 22, 2026", bookingCount: 24, totalSpent: 7200 },
    { id: 7, name: "Priya Patel", email: "priya@example.com", platform: "APP", joined: "Jan 15, 2026", bookingCount: 3, totalSpent: 615 },
];

const seedBookings: AppBooking[] = [
    { id: "BK-1042", customerId: 5, customerName: "Sarah Johnson", customerEmail: "sarah@example.com", service: "residential", serviceTitle: "Residential Cleaning", date: "2026-04-20", time: "09:00 AM", location: "142 Maple Ave NW, Calgary", price: 149, status: "Confirmed", staff: "Alex Morgan", createdAt: "2026-04-18" },
    { id: "BK-1041", customerId: 6, customerName: "Mark Chen", customerEmail: "mark@example.com", service: "commercial", serviceTitle: "Commercial Cleaning", date: "2026-04-19", time: "11:00 AM", location: "88 Elbow Dr SW, Calgary", price: 320, status: "In Progress", staff: "Jamie Rivera", createdAt: "2026-04-17" },
    { id: "BK-1040", customerId: 7, customerName: "Priya Patel", customerEmail: "priya@example.com", service: "move", serviceTitle: "Move-In / Move-Out", date: "2026-04-18", time: "02:00 PM", location: "310 Bow Trail SW, Calgary", price: 245, status: "Completed", staff: "Taylor Brooks", createdAt: "2026-04-16" },
    { id: "BK-1039", customerId: 1, customerName: "Ahmad", customerEmail: "ahmadev42@gmail.com", service: "carpet", serviceTitle: "Carpet / Sofa Cleaning", date: "2026-04-22", time: "10:00 AM", location: "55 Park Ave, Calgary", price: 89, status: "Pending", staff: "—", createdAt: "2026-04-20" },
    { id: "BK-1038", customerId: 2, customerName: "Anas Tahir", customerEmail: "chanas.tahir.55@gmail.com", service: "vehicle", serviceTitle: "Vehicle Detailing", date: "2026-04-21", time: "01:00 PM", location: "200 River Rd, Calgary", price: 119, status: "Confirmed", staff: "Jordan Smith", createdAt: "2026-04-19" },
    { id: "BK-1037", customerId: 3, customerName: "Anas", customerEmail: "anast4390@gmail.com", service: "carpet", serviceTitle: "Carpet / Sofa Cleaning", date: "2026-04-17", time: "03:00 PM", location: "77 Oak St, Calgary", price: 159, status: "Completed", staff: "Alex Morgan", createdAt: "2026-04-15" },
];

// ── Store ──────────────────────────────────────────────────
type Listener = () => void;

class AppStore {
    private customers: AppCustomer[] = [...seedCustomers];
    private bookings: AppBooking[] = [...seedBookings];
    private listeners = new Set<Listener>();

    private notify() {
        this.listeners.forEach((l) => l());
    }

    subscribe(l: Listener) {
        this.listeners.add(l);
        return () => this.listeners.delete(l);
    }

    // ── Customers ──
    getCustomers() { return [...this.customers]; }

    addCustomer(c: Omit<AppCustomer, "id" | "bookingCount" | "totalSpent">) {
        const id = Math.max(0, ...this.customers.map((x) => x.id)) + 1;
        this.customers.push({ ...c, id, bookingCount: 0, totalSpent: 0 });
        this.notify();
        return id;
    }

    updateCustomer(id: number, patch: Partial<AppCustomer>) {
        this.customers = this.customers.map((c) => c.id === id ? { ...c, ...patch } : c);
        this.notify();
    }

    deleteCustomer(id: number) {
        this.customers = this.customers.filter((c) => c.id !== id);
        this.bookings = this.bookings.filter((b) => b.customerId !== id);
        this.notify();
    }

    // ── Bookings ──
    getBookings() { return [...this.bookings]; }

    getBookingsByCustomer(customerId: number) {
        return this.bookings.filter((b) => b.customerId === customerId);
    }

    /** Called when a customer completes a booking from the frontend */
    addBooking(b: Omit<AppBooking, "id" | "createdAt">) {
        const id = `BK-${1000 + this.bookings.length + 1}`;
        const createdAt = new Date().toISOString().split("T")[0];
        const booking: AppBooking = { ...b, id, createdAt };
        this.bookings.unshift(booking);

        // Update or create customer record
        const existing = this.customers.find(
            (c) => c.email.toLowerCase() === b.customerEmail.toLowerCase()
        );
        if (existing) {
            existing.bookingCount += 1;
            existing.totalSpent += b.price;
        } else {
            const newId = Math.max(0, ...this.customers.map((x) => x.id)) + 1;
            const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
            this.customers.push({
                id: newId,
                name: b.customerName,
                email: b.customerEmail,
                platform: "APP",
                joined: today,
                bookingCount: 1,
                totalSpent: b.price,
            });
        }
        this.notify();
        return id;
    }

    updateBookingStatus(id: string, status: AppBooking["status"]) {
        this.bookings = this.bookings.map((b) => b.id === id ? { ...b, status } : b);
        this.notify();
    }

    reset() {
        this.customers = [...seedCustomers];
        this.bookings = [...seedBookings];
        this.notify();
    }
}

export const appStore = new AppStore();
