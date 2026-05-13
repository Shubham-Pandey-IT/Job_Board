import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <Briefcase size={24} className="text-rose-500" />
          <span className="text-xl font-bold text-gray-900">JobBoard</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
            Jobs
          </Link>
          <Link to="/saved" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
            Saved
          </Link>
          <Link to="/tracker" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
            Tracker
          </Link>
        </div>

      </div>
    </nav>
  );
}