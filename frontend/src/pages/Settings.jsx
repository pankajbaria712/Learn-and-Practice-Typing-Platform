import { useState, useEffect } from "react";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { saveSettings, getSettings } from "../utils/localStorage";

export default function Settings() {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const [defaultDuration, setDefaultDuration] = useState(60);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const settings = getSettings();
    setDefaultDuration(settings.defaultDuration);
  }, []);

  const handleSave = () => {
    saveSettings({ defaultDuration, darkMode: isDarkMode });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  const durationOptions = [
    { value: 30, label: "30 seconds", emoji: "⚡" },
    { value: 60, label: "1 minute", emoji: "⏱️" },
    { value: 120, label: "2 minutes", emoji: "⏰" },
    { value: 300, label: "5 minutes", emoji: "🕐" },
    { value: 600, label: "10 minutes", emoji: "⏳" },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
              isDarkMode
                ? "from-purple-400 via-pink-400 to-blue-400"
                : "from-purple-600 via-pink-600 to-blue-600"
            }`}
          >
            ⚙️ Settings
          </h1>
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Customize your typing practice experience
          </p>
        </div>

        {/* Settings Cards */}
        <div className="space-y-6">
          {/* Practice Duration */}
          <div
            className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800/50 border-purple-500/30 shadow-lg"
                : "bg-white/70 border-purple-200 shadow-lg"
            }`}
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">⏱️</span>
              <div>
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Default Practice Duration
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Choose your preferred practice session length
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
              {durationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setDefaultDuration(option.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                    defaultDuration === option.value
                      ? isDarkMode
                        ? "bg-purple-600 border-purple-400 shadow-lg shadow-purple-500/50"
                        : "bg-purple-600 border-purple-500 text-white shadow-lg"
                      : isDarkMode
                      ? "bg-gray-700/50 border-gray-600 hover:border-purple-500/50"
                      : "bg-white border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="text-2xl mb-2">{option.emoji}</div>
                  <div
                    className={`text-sm font-semibold ${
                      defaultDuration === option.value
                        ? "text-white"
                        : isDarkMode
                        ? "text-gray-300"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </div>
                  {defaultDuration === option.value && (
                    <div className="mt-2 text-xs">✓ Selected</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div
            className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800/50 border-blue-500/30 shadow-lg"
                : "bg-white/70 border-blue-200 shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-3xl mr-3">
                  {isDarkMode ? "🌙" : "☀️"}
                </span>
                <div>
                  <h3
                    className={`text-xl font-bold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Appearance
                  </h3>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Switch between light and dark mode
                  </p>
                </div>
              </div>

              <button
                onClick={handleDarkModeToggle}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
                  isDarkMode ? "bg-purple-600" : "bg-gray-300"
                }`}
                aria-label="Toggle dark mode"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                    isDarkMode ? "translate-x-7" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="mt-4">
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700/50 text-gray-300"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Current mode:{" "}
                <span className="font-semibold">
                  {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div
            className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800/50 border-green-500/30 shadow-lg"
                : "bg-white/70 border-green-200 shadow-lg"
            }`}
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🎨</span>
              <div>
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Personalization
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Your settings are saved automatically
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700/30" : "bg-gray-50"
                }`}
              >
                <div className="text-sm font-semibold mb-2 text-gray-400">
                  Theme
                </div>
                <div
                  className={`text-lg font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {isDarkMode ? "Dark" : "Light"}
                </div>
              </div>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700/30" : "bg-gray-50"
                }`}
              >
                <div className="text-sm font-semibold mb-2 text-gray-400">
                  Default Duration
                </div>
                <div
                  className={`text-lg font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {defaultDuration < 60
                    ? `${defaultDuration}s`
                    : `${defaultDuration / 60} min`}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSave}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                isDarkMode
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
              }`}
            >
              💾 Save Settings
            </button>
          </div>

          {/* Notification */}
          {showNotification && (
            <div
              className={`fixed bottom-4 right-4 px-6 py-4 rounded-xl shadow-2xl z-50 animate-slide-up ${
                isDarkMode
                  ? "bg-green-600 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">✓</span>
                <span className="font-semibold">
                  Settings saved successfully!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
