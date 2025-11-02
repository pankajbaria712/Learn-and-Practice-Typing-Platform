import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

export default function Navbar() {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-900/90 border-gray-700"
          : "bg-white/90 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold transition-transform hover:scale-105"
          >
            <span className="text-2xl">⌨️</span>
            <span
              className={`${
                isDarkMode ? "text-white" : "text-gray-900"
              } hidden sm:inline`}
            >
              Typing Master
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {[
              { path: "/", label: "Home", icon: "🏠" },
              { path: "/practice", label: "Practice", icon: "💪" },
              { path: "/stats", label: "Stats", icon: "📊" },
              { path: "/settings", label: "Settings", icon: "⚙️" },
            ].map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                  isActive(path)
                    ? isDarkMode
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-purple-600 text-white shadow-lg"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
                }`}
              >
                <span>{icon}</span>
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`ml-2 p-2 rounded-lg transition-all duration-200 ${
                isDarkMode
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <span className="text-lg">☀️</span>
              ) : (
                <span className="text-lg">🌙</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
