export const services = [
  { id: "residential", title: "Residential Cleaning", desc: "Sparkling homes, every visit.", icon: "🏠", price: "From $89" },
  { id: "move", title: "Move-In / Move-Out", desc: "Spotless transitions made easy.", icon: "📦", price: "From $179" },
  { id: "commercial", title: "Commercial Cleaning", desc: "Professional offices & retail.", icon: "🏢", price: "Custom Quote" },
  { id: "carpet", title: "Carpet / Sofa Cleaning", desc: "Deep steam care for fabrics.", icon: "🛋️", price: "From $59" },
  { id: "vehicle", title: "Vehicle Detailing", desc: "Showroom shine for your ride.", icon: "🚗", price: "From $99" },
];

export const testimonials = [
  { name: "Sarah Johnson", role: "Homeowner", text: "CAMZ transformed my home. The team was punctual, friendly and incredibly thorough.", rating: 5 },
  { name: "Mark Chen", role: "Office Manager", text: "Reliable commercial cleaning every single week. Our team loves the fresh space.", rating: 5 },
  { name: "Priya Patel", role: "Tenant", text: "The move-out clean got me my full deposit back. Worth every penny!", rating: 5 },
];

export const timeSlots = ["08:00 AM", "09:30 AM", "11:00 AM", "12:30 PM", "02:00 PM", "03:30 PM", "05:00 PM"];

export const cleaners = ["Alex Morgan", "Jamie Rivera", "Taylor Brooks", "Jordan Smith"];

export const bookings = [
  { id: "BK-1042", customer: "Sarah Johnson", service: "Residential", date: "2025-04-20", status: "Confirmed", amount: 149, staff: "Alex Morgan" },
  { id: "BK-1041", customer: "Mark Chen", service: "Commercial", date: "2025-04-19", status: "In Progress", amount: 320, staff: "Jamie Rivera" },
  { id: "BK-1040", customer: "Priya Patel", service: "Move-Out", date: "2025-04-18", status: "Completed", amount: 245, staff: "Taylor Brooks" },
  { id: "BK-1039", customer: "Liam Foster", service: "Carpet", date: "2025-04-22", status: "Pending", amount: 89, staff: "—" },
  { id: "BK-1038", customer: "Nora Kim", service: "Vehicle Detail", date: "2025-04-21", status: "Confirmed", amount: 119, staff: "Jordan Smith" },
  { id: "BK-1037", customer: "Diego Alvarez", service: "Residential", date: "2025-04-17", status: "Completed", amount: 159, staff: "Alex Morgan" },
];

export const staff = [
  { id: 1, name: "Alex Morgan", role: "Senior Cleaner", jobs: 142, rating: 4.9, status: "Active" },
  { id: 2, name: "Jamie Rivera", role: "Team Lead", jobs: 198, rating: 4.8, status: "Active" },
  { id: 3, name: "Taylor Brooks", role: "Cleaner", jobs: 87, rating: 4.7, status: "Active" },
  { id: 4, name: "Jordan Smith", role: "Detailer", jobs: 64, rating: 4.9, status: "On Leave" },
];

export const customers = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", bookings: 12, spent: 1480 },
  { id: 2, name: "Mark Chen", email: "mark@example.com", bookings: 24, spent: 7200 },
  { id: 3, name: "Priya Patel", email: "priya@example.com", bookings: 3, spent: 615 },
  { id: 4, name: "Liam Foster", email: "liam@example.com", bookings: 5, spent: 432 },
];

export const payments = [
  { id: "TX-9821", customer: "Sarah Johnson", amount: 149, method: "Visa ••4242", date: "2025-04-20", status: "Paid" },
  { id: "TX-9820", customer: "Mark Chen", amount: 320, method: "Mastercard ••8821", date: "2025-04-19", status: "Paid" },
  { id: "TX-9819", customer: "Priya Patel", amount: 245, method: "Apple Pay", date: "2025-04-18", status: "Paid" },
  { id: "TX-9818", customer: "Liam Foster", amount: 89, method: "Visa ••1102", date: "2025-04-22", status: "Pending" },
];

export const revenueData = [
  { month: "Nov", revenue: 4200 }, { month: "Dec", revenue: 5100 },
  { month: "Jan", revenue: 4800 }, { month: "Feb", revenue: 6200 },
  { month: "Mar", revenue: 7400 }, { month: "Apr", revenue: 8600 },
];

export const serviceBreakdown = [
  { name: "Residential", value: 42 },
  { name: "Commercial", value: 28 },
  { name: "Move-Out", value: 14 },
  { name: "Carpet", value: 10 },
  { name: "Vehicle", value: 6 },
];
