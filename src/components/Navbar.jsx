import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white px-6 py-5 flex items-center justify-between relative">
      <h1 className="text-xl font-bold z-20">Zingerr</h1>

      {/* Hamburger Icon */}
      <button
        className="md:hidden z-20"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms & Conditions</Link>
        <Link to="/refund-policy">Refund Policy</Link>
        <Link to="/support">Support</Link>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-blue-900 bg-opacity-95 flex flex-col items-center justify-center space-y-8 text-xl transition-all duration-300 md:hidden z-10 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/support" onClick={() => setMenuOpen(false)}>Support</Link>
        <Link to="/privacy" onClick={() => setMenuOpen(false)}>Privacy</Link>
        <Link to="/terms" onClick={() => setMenuOpen(false)}>Terms & Conditions</Link>
        <Link to="/refund-policy" onClick={() => setMenuOpen(false)}>Refund Policy</Link>
      </div>
    </nav>
  );
}