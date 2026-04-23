import { Routes, Route } from "react-router-dom";
import { Preloader } from "./components/Preloader";

// Site pages
import Home from "./pages/site/Home";
import About from "./pages/site/About";
import Services from "./pages/site/Services";
import Login from "./pages/site/Login";
import Tracking from "./pages/site/Tracking";
import PrivacyPolicy from "./pages/site/PrivacyPolicy";

// Booking pages
import BookingService from "./pages/booking/BookingService";
import BookingDatetime from "./pages/booking/BookingDatetime";
import BookingPricing from "./pages/booking/BookingPricing";
import BookingCheckout from "./pages/booking/BookingCheckout";
import BookingConfirmation from "./pages/booking/BookingConfirmation";

// Customer pages
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import BookingDetails from "./pages/customer/BookingDetails";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminIndex from "./pages/admin/AdminIndex";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminJobAssignment from "./pages/admin/AdminJobAssignment";
import AdminMonitoring from "./pages/admin/AdminMonitoring";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminReports from "./pages/admin/AdminReports";
import AdminServices from "./pages/admin/AdminServices";
import AdminStaff from "./pages/admin/AdminStaff";

// Staff pages
import StaffLogin from "./pages/staff/StaffLogin";
import StaffIndex from "./pages/staff/StaffIndex";
import StaffJobs from "./pages/staff/StaffJobs";
import StaffLeave from "./pages/staff/StaffLeave";

// 404
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Preloader />
      <Routes>
        {/* Site */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Booking */}
        <Route path="/booking/:service" element={<BookingService />} />
        <Route path="/booking-datetime" element={<BookingDatetime />} />
        <Route path="/booking-pricing" element={<BookingPricing />} />
        <Route path="/booking-checkout" element={<BookingCheckout />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />

        {/* Customer */}
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/booking-details/:id" element={<BookingDetails />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminIndex />} />
        <Route path="/admin/" element={<AdminIndex />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/job-assignment" element={<AdminJobAssignment />} />
        <Route path="/admin/monitoring" element={<AdminMonitoring />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/staff" element={<AdminStaff />} />

        {/* Staff */}
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/staff" element={<StaffIndex />} />
        <Route path="/staff/" element={<StaffIndex />} />
        <Route path="/staff/jobs" element={<StaffJobs />} />
        <Route path="/staff/leave" element={<StaffLeave />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
