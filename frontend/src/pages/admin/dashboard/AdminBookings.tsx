
import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageTransition } from "@/components/PageTransition";
import { cleaners } from "@/lib/data";
import { ClipboardList, Phone, UserPlus, MapPin, X } from "lucide-react";


type BookingStatus = "Pending" | "Confirmed" | "In Progress" | "Completed" | "Approved" | "Cancelled";

interface Booking {
  id: string;
  orderId: string;
  customer: string;
  service: string;
  amount: number;
  status: BookingStatus;
  staff: string | null;
  location: string | null;
  staffOnline: boolean;
}

const mockBookings: Booking[] = [
  { id: "1", orderId: "54A89380", customer: "Anas Tahir Customer", service: "Vehicle Detailing", amount: 40.00, status: "Completed", staff: "Anas Tahir", location: "V6XQ+X6, Usmanwala, Punjab", staffOnline: false },
  { id: "2", orderId: "66D5CCDE", customer: "ahmad", service: "Carpet / Sofa Cleaning", amount: 40.00, status: "Pending", staff: null, location: null, staffOnline: false },
  { id: "3", orderId: "FCD1E0CD", customer: "ahmad", service: "Carpet / Sofa Cleaning", amount: 40.00, status: "Pending", staff: null, location: null, staffOnline: false },
  { id: "4", orderId: "368FD005", customer: "ahmad", service: "Carpet / Sofa Cleaning", amount: 40.00, status: "Pending", staff: null, location: null, staffOnline: false },
  { id: "5", orderId: "3B3FFFA2", customer: "ahmad", service: "Carpet / Sofa Cleaning", amount: 40.00, status: "Pending", staff: null, location: null, staffOnline: false },
  { id: "6", orderId: "07054E1A", customer: "ahmad", service: "Vehicle Detailing", amount: 30.00, status: "Pending", staff: null, location: null, staffOnline: false },
  { id: "7", orderId: "14E3F4B5", customer: "ahmad", service: "Vehicle Detailing", amount: 30.00, status: "Pending", staff: null, location: null, staffOnline: false },
  { id: "8", orderId: "C5180AC5", customer: "ahmad", service: "Vehicle Detailing", amount: 30.00, status: "Pending", staff: null, location: null, staffOnline: false },
  { id: "9", orderId: "49C0D7E2", customer: "ahmad", service: "Vehicle Detailing", amount: 30.00, status: "Pending", staff: null, location: null, staffOnline: false },
  { id: "10", orderId: "6A630DBE", customer: "ahmad", service: "Vehicle Detailing", amount: 30.00, status: "Pending", staff: null, location: null, staffOnline: false },
  { id: "11", orderId: "68365F92", customer: "Anas Tahir Customer", service: "Vehicle Detailing", amount: 0.03, status: "Approved", staff: "Anas Tahir", location: "V6XQ+X6, Usmanwala, Punjab", staffOnline: false },
  { id: "12", orderId: "55325FCC", customer: "Anas Tahir Customer", service: "Vehicle Detailing", amount: 0.02, status: "Approved", staff: "Anas Tahir", location: "V6XQ+X6, Usmanwala, Punjab", staffOnline: false },
  { id: "13", orderId: "33735746", customer: "ahmad", service: "Vehicle Detailing", amount: 80.00, status: "Pending", staff: null, location: null, staffOnline: false },
];

const statusStyle: Record<BookingStatus, string> = {
  Pending: "bg-yellow-50 text-yellow-600 border border-yellow-200",
  Confirmed: "bg-blue-50 text-blue-600 border border-blue-200",
  "In Progress": "bg-purple-50 text-purple-600 border border-purple-200",
  Completed: "bg-green-50 text-green-600 border border-green-200",
  Approved: "bg-green-50 text-green-600 border border-green-200",
  Cancelled: "bg-red-50 text-red-500 border border-red-200",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [assignFor, setAssignFor] = useState<string | null>(null);
  const [selectedCleaner, setSelectedCleaner] = useState(cleaners[0]);

  const assignCleaner = () => {
    if (!assignFor) return;
    setBookings((p) =>
      p.map((b) =>
        b.id === assignFor
          ? { ...b, staff: selectedCleaner, status: "Confirmed", location: "Calgary, AB" }
          : b
      )
    );
    setAssignFor(null);
  };

  return (
    <AdminLayout>
      <PageTransition direction="left">
        <div className="pb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">All Bookings</h1>

          <div className="space-y-4">
            {bookings.map((b, i) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
              >
                {/* Top row: icon + status */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <ClipboardList className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusStyle[b.status]}`}>
                    {b.status.toUpperCase()}
                  </span>
                </div>

                {/* Service + Customer */}
                <h3 className="text-base font-bold text-gray-900 mb-1">{b.service}</h3>
                <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-3">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" strokeWidth="2" />
                  </svg>
                  {b.customer}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 mb-3" />

                {/* Order ID + Amount */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 font-medium tracking-wide">
                    ORDER ID: {b.orderId}
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    {b.amount.toFixed(2)}
                  </span>
                </div>

                {/* Call buttons */}
                <div className="flex gap-2 mb-3">
                  <button className="flex items-center gap-1.5 border border-gray-200 rounded-full px-4 py-2 text-xs font-medium text-blue-500 hover:bg-blue-50 transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                    Call Customer
                  </button>
                  {b.staff && (
                    <button className="flex items-center gap-1.5 border border-gray-200 rounded-full px-4 py-2 text-xs font-medium text-green-500 hover:bg-green-50 transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                      Call Cleaner
                    </button>
                  )}
                </div>

                {/* Assigned cleaner info */}
                {b.staff && (
                  <div className="bg-gray-50 rounded-xl p-3 mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth="2" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" strokeWidth="2" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-800">Assigned to: {b.staff}</span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">
                        {b.staffOnline ? "ONLINE" : "OFFLINE"}
                      </span>
                    </div>
                    {b.location && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        {b.location}
                      </div>
                    )}
                  </div>
                )}

                {/* Assign Cleaner button — only if no staff */}
                {!b.staff && (
                  <button
                    onClick={() => setAssignFor(b.id)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-semibold py-3 rounded-2xl hover:bg-blue-600 transition-colors text-sm"
                  >
                    <UserPlus className="w-4 h-4" />
                    Assign Cleaner
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Assign Cleaner Modal */}
        {assignFor && (
            <div
              onClick={() => setAssignFor(null)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-white rounded-2xl p-5 shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Assign Cleaner</h3>
                  <button onClick={() => setAssignFor(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Select Cleaner</label>
                <select
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 mb-5"
                  value={selectedCleaner}
                  onChange={(e) => setSelectedCleaner(e.target.value)}
                >
                  {cleaners.map((c) => <option key={c}>{c}</option>)}
                </select>
                <div className="flex gap-2">
                  <button onClick={() => setAssignFor(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium">Cancel</button>
                  <button onClick={assignCleaner} className="flex-1 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600">Assign</button>
                </div>
              </div>
            </div>
          )}
      </PageTransition>
    </AdminLayout>
  );
}

export function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-card p-6 shadow-[var(--shadow-elegant)]"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-deep-blue">{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="w-5 h-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

