// Simple in-memory booking store (resets on reload — fine for demo)
type BookingState = {
  service?: string;
  serviceTitle?: string;
  details?: Record<string, string | number | boolean | string[]>;
  date?: string;
  time?: string;
  price?: number;
};

let state: BookingState = {};
const listeners = new Set<() => void>();

export const bookingStore = {
  get: () => state,
  set: (patch: Partial<BookingState>) => {
    state = { ...state, ...patch };
    listeners.forEach((l) => l());
  },
  reset: () => { state = {}; listeners.forEach((l) => l()); },
  subscribe: (l: () => void) => { listeners.add(l); return () => listeners.delete(l); },
};
