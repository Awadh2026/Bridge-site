import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-blue-600 shadow-2xl border-b border-blue-400 border-opacity-30 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <h1 className="text-white text-2xl font-bold">
          Zingerr
        </h1>
        {/* Navigation */}
        <nav className="flex items-center gap-10 text-white font-semibold">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/privacy" className="hover:text-gray-200">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-gray-200">
            Terms & Conditions
          </Link>
          <Link to="/support" className="hover:text-gray-200">
            Support
          </Link>
        </nav>
      </div>
    </header>
  );
}