import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Support from "./pages/Support";
import RefundPolicy from "./pages/RefundPolicy";

export default function App() {
  return (
    <div className="min-h-screen bg-app-bg text-app-body flex flex-col">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/support" element={<Support />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Routes>

      <Footer />
    </div>
  );
}