import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { getXP, getStreak, getPracticeSessions } from "../utils/localStorage";
import { useState, useEffect } from "react";
import "../styles/home/Home.css";

export default function Home() {
  const { isDarkMode } = useContext(DarkModeContext);
  const [stats, setStats] = useState({ xp: 0, streak: 0, totalSessions: 0 });

  useEffect(() => {
    setStats({
      xp: getXP(),
      streak: getStreak(),
      totalSessions: getPracticeSessions().length,
    });
  }, []);

  const features = [
    {
      icon: "⚡",
      title: "Speed Training",
      description: "Improve your words per minute with timed practice sessions",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: "🎯",
      title: "Accuracy Focus",
      description:
        "Track your accuracy and improve precision with every session",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: "💻",
      title: "Code Mode",
      description:
        "Practice typing code snippets to level up your programming skills",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description:
        "Monitor your improvement with detailed statistics and analytics",
      color: "from-green-400 to-emerald-500",
    },
  ];

  return (
    <div
      className={`home-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      {/* Hero Section */}
      <div className="home-hero">
        <div className="hero-content">
          <div>
            <span className="hero-icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6742/6742660.png"
                alt=""
              />
            </span>
          </div>
          <h1
            className={`hero-title ${isDarkMode ? "dark-mode" : "light-mode"}`}
          >
            Master Your Typing Skills
          </h1>
          <p
            className={`hero-description ${
              isDarkMode ? "dark-mode" : "light-mode"
            }`}
          >
            Improve your typing speed, accuracy, and efficiency with our
            interactive typing practice platform
          </p>

          <Link to="/practice" className="hero-button">
            🚀 Start Practicing Now
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div
            className={`stat-card xp-card ${
              isDarkMode ? "dark-mode" : "light-mode"
            }`}
          >
            <span className="stat-icon">⭐</span>
            <div className="stat-value">{stats.xp}</div>
            <div
              className={`stat-label ${
                isDarkMode ? "dark-mode" : "light-mode"
              }`}
            >
              Total XP
            </div>
          </div>

          <div
            className={`stat-card streak-card ${
              isDarkMode ? "dark-mode" : "light-mode"
            }`}
          >
            <span className="stat-icon">🔥</span>
            <div className="stat-value">{stats.streak}</div>
            <div
              className={`stat-label ${
                isDarkMode ? "dark-mode" : "light-mode"
              }`}
            >
              Day Streak
            </div>
          </div>

          <div
            className={`stat-card sessions-card ${
              isDarkMode ? "dark-mode" : "light-mode"
            }`}
          >
            <span className="stat-icon">📈</span>
            <div className="stat-value">{stats.totalSessions}</div>
            <div
              className={`stat-label ${
                isDarkMode ? "dark-mode" : "light-mode"
              }`}
            >
              Sessions
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${
                isDarkMode ? "dark-mode" : "light-mode"
              } fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2
            className={`quick-actions-title ${
              isDarkMode ? "dark-mode" : "light-mode"
            }`}
          >
            Quick Actions
          </h2>
          <div className="quick-actions-buttons">
            <Link to="/practice" className="action-button primary">
              💪 Practice Now
            </Link>
            <Link
              to="/stats"
              className={`action-button secondary ${
                isDarkMode ? "dark-mode" : "light-mode"
              }`}
            >
              📊 View Stats
            </Link>
            <Link
              to="/settings"
              className={`action-button secondary ${
                isDarkMode ? "dark-mode" : "light-mode"
              }`}
            >
              ⚙️ Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
