import { Briefcase, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleDark } from "../store/darkSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.dark.isDark);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <Briefcase size={24} className="text-rose-500" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">JobBoard</span>
        </Link>

        {/* LINKS + TOGGLE */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
            Jobs
          </Link>
          <Link to="/saved" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
            Saved
          </Link>
          <Link to="/tracker" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
            Tracker
          </Link>

          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => dispatch(toggleDark())}
            className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {isDark
              ? <Sun size={16} className="text-yellow-400" />
              : <Moon size={16} className="text-gray-600" />
            }
          </button>
        </div>

      </div>
    </nav>
  );
}