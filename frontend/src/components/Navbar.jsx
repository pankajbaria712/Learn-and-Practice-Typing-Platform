import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import "../styles/Navbar/Navbar.css";

export default function Navbar() {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${isDarkMode ? "dark" : "light"}`}>
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">⌨️</span>
          <span className="navbar__logo-text">Typing Master</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar__links">
          {[
            { path: "/", label: "Home", icon: "🏠" },
            { path: "/practice", label: "Practice", icon: "💪" },
            { path: "/stats", label: "Stats", icon: "📊" },
            { path: "/settings", label: "Settings", icon: "⚙️" },
          ].map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`navbar__link ${isActive(path) ? "active" : ""}`}
            >
              <span className="navbar__icon">{icon}</span>
              <span className="navbar__label">{label}</span>
            </Link>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="navbar__toggle"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <span>☀️</span> : <span>🌙</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
