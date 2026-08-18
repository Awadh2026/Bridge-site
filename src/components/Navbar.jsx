import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import zingerrLogo from "../assets/zingerr.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  return (
    <nav className="bg-app-bg text-app-header px-6 py-5 flex items-center justify-between relative border-b-4 border-app-accent">
      <Link to="/" className="z-20 shrink-0">
        <img
          src={zingerrLogo}
          alt="ZINGERR — Fresh Zing at Door"
          className="h-16 md:h-[4.5rem] w-auto object-contain"
        />
      </Link>

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
      <div className="hidden md:flex space-x-6 items-center font-medium">
        <Link to="/" className="hover:text-app-accent transition">Home</Link>
        <Link to="/privacy" className="hover:text-app-accent transition">Privacy</Link>
        <Link to="/terms" className="hover:text-app-accent transition">Terms & Conditions</Link>
        <Link to="/refund-policy" className="hover:text-app-accent transition">Refund Policy</Link>
        <Link to="/support" className="hover:text-app-accent transition">Support</Link>
        <Link to="/delete-account" className="hover:text-app-accent transition">Delete Account</Link>
        
        {/* Auth Button */}
        {user ? (
          <>
            <Link
              to="/admin/orders"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Orders
            </Link>
            <button
              onClick={() => logout()}
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-app-bg bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-app-accent focus:ring-offset-2"
            >
              Sign out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="hidden px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-app-accent focus:ring-offset-2"
          >
            Sign in
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-app-bg-muted text-app-header flex flex-col items-center justify-center space-y-8 text-xl transition-all duration-300 md:hidden z-10 border-l-4 border-app-accent ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/support" onClick={() => setMenuOpen(false)}>Support</Link>
        <Link to="/privacy" onClick={() => setMenuOpen(false)}>Privacy</Link>
        <Link to="/terms" onClick={() => setMenuOpen(false)}>Terms & Conditions</Link>
        <Link to="/refund-policy" onClick={() => setMenuOpen(false)}>Refund Policy</Link>
        <Link to="/delete-account" onClick={() => setMenuOpen(false)}>Delete Account</Link>
        
        {/* Mobile Auth Button */}
        {user ? (
          <>
            <Link
              to="/admin/orders"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Orders
            </Link>
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-app-bg bg-white hover:bg-gray-100"
            >
              Sign out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="hidden px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}