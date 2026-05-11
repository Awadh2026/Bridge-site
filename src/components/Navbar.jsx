import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white px-8 py-5 flex justify-between items-center">

      <h1 className="text-xl font-bold">
        AwadhInfoSolution
      </h1>

      <div className="space-x-6">
        <Link to="/">Home</Link>
        <Link to="/support">Support</Link>
        <Link to="/privacy">Privacy</Link>

        <button className="bg-pink-500 px-5 py-2 rounded-full">
          Work With Us
        </button>
      </div>
    </nav>
  );
}