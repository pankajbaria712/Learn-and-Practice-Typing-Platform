import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

export default function Navbar() {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        background: "#eee",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/practice">Practice</Link>
      <Link to="/stats">Stats</Link>
      <Link to="/settings">Settings</Link>

      <button onClick={toggleDarkMode}>
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
}
