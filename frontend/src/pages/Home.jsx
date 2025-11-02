import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { getXP, getStreak, getPracticeSessions } from "../utils/localStorage";
import { useState, useEffect } from "react";
// import "../styles/Home.scss";

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
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-6xl sm:text-7xl animate-bounce">⌨️</span>
          </div>
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${
              isDarkMode
                ? "from-purple-400 via-pink-400 to-blue-400"
                : "from-purple-600 via-pink-600 to-blue-600"
            }`}
          >
            Master Your Typing Skills
          </h1>
          <p
            className={`text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Improve your typing speed, accuracy, and efficiency with our
            interactive typing practice platform
          </p>

          <Link
            to="/practice"
            className={`inline-block px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
              isDarkMode
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
            }`}
          >
            🚀 Start Practicing Now
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div
            className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? "bg-gray-800/50 border-purple-500/30 shadow-lg shadow-purple-500/20"
                : "bg-white/70 border-purple-200 shadow-lg"
            }`}
          >
            <div className="text-4xl mb-2">⭐</div>
            <div
              className={`text-3xl font-bold mb-1 ${
                isDarkMode ? "text-yellow-400" : "text-yellow-600"
              }`}
            >
              {stats.xp}
            </div>
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Total XP
            </div>
          </div>

          <div
            className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? "bg-gray-800/50 border-orange-500/30 shadow-lg shadow-orange-500/20"
                : "bg-white/70 border-orange-200 shadow-lg"
            }`}
          >
            <div className="text-4xl mb-2">🔥</div>
            <div
              className={`text-3xl font-bold mb-1 ${
                isDarkMode ? "text-orange-400" : "text-orange-600"
              }`}
            >
              {stats.streak}
            </div>
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Day Streak
            </div>
          </div>

          <div
            className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? "bg-gray-800/50 border-blue-500/30 shadow-lg shadow-blue-500/20"
                : "bg-white/70 border-blue-200 shadow-lg"
            }`}
          >
            <div className="text-4xl mb-2">📈</div>
            <div
              className={`text-3xl font-bold mb-1 ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              {stats.totalSessions}
            </div>
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Sessions
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 hover:scale-105 cursor-pointer ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700 hover:border-purple-500/50"
                  : "bg-white/70 border-gray-200 hover:border-purple-300"
              }`}
            >
              <div
                className={`text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}
              >
                {feature.icon}
              </div>
              <h3
                className={`text-xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-8 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Quick Actions
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/practice"
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              💪 Practice Now
            </Link>
            <Link
              to="/stats"
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                  : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
              }`}
            >
              📊 View Stats
            </Link>
            <Link
              to="/settings"
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                  : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
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
