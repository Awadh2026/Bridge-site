import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Support from "./pages/Support";
import RefundPolicy from "./pages/RefundPolicy";
import DeleteAccount from "./pages/DeleteAccount";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminProfiles from "./pages/AdminProfiles";
import AdminOrders from "./pages/AdminOrders";
import AdminOrderDetails from "./pages/AdminOrderDetails";
import DeliveryOrders from "./pages/DeliveryOrders";
import Login from "./components/Login";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-app-bg text-app-body flex flex-col">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/support" element={<Support />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/profiles" element={<AdminProfiles />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
          <Route path="/delivery/orders" element={<DeliveryOrders />} />
        </Routes>

        <Footer />
      </div>
    </AuthProvider>
  );
}