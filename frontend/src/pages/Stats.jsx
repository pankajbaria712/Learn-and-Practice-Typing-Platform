import { useState, useEffect } from "react";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import {
  getPracticeSessions,
  getRaceSessions,
  getXP,
  getStreak,
} from "../utils/localStorage";

export default function StatsPage() {
  const { isDarkMode } = useContext(DarkModeContext);
  const [practiceSessions, setPracticeSessions] = useState([]);
  const [raceSessions, setRaceSessions] = useState([]);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setPracticeSessions(getPracticeSessions());
    setRaceSessions(getRaceSessions());
    setXp(getXP());
    setStreak(getStreak());
  }, []);

  // Calculate statistics
  const calculateAvgWPM = (sessions) => {
    if (sessions.length === 0) return 0;
    const sum = sessions.reduce((acc, s) => acc + (s.wpm || 0), 0);
    return Math.round(sum / sessions.length);
  };

  const calculateAvgAccuracy = (sessions) => {
    if (sessions.length === 0) return 0;
    const sum = sessions.reduce((acc, s) => acc + (s.accuracy || 0), 0);
    return Math.round(sum / sessions.length);
  };

  const bestWPM = practiceSessions.length
    ? Math.max(...practiceSessions.map((s) => s.wpm || 0))
    : 0;

  const avgWPM = calculateAvgWPM(practiceSessions);
  const avgAccuracy = calculateAvgAccuracy(practiceSessions);
  const totalSessions = practiceSessions.length + raceSessions.length;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
              isDarkMode
                ? "from-purple-400 via-pink-400 to-blue-400"
                : "from-purple-600 via-pink-600 to-blue-600"
            }`}
          >
            📊 Your Typing Statistics
          </h1>
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Track your progress and see how you're improving
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? "bg-gray-800/50 border-yellow-500/30 shadow-lg shadow-yellow-500/20"
                : "bg-white/70 border-yellow-200 shadow-lg"
            }`}
          >
            <div className="text-4xl mb-2">⭐</div>
            <div
              className={`text-3xl font-bold mb-1 ${
                isDarkMode ? "text-yellow-400" : "text-yellow-600"
              }`}
            >
              {xp}
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
              {streak}
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
            <div className="text-4xl mb-2">🚀</div>
            <div
              className={`text-3xl font-bold mb-1 ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              {bestWPM}
            </div>
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Best WPM
            </div>
          </div>

          <div
            className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? "bg-gray-800/50 border-green-500/30 shadow-lg shadow-green-500/20"
                : "bg-white/70 border-green-200 shadow-lg"
            }`}
          >
            <div className="text-4xl mb-2">📈</div>
            <div
              className={`text-3xl font-bold mb-1 ${
                isDarkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              {totalSessions}
            </div>
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Total Sessions
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div
            className={`rounded-2xl p-6 backdrop-blur-sm border ${
              isDarkMode
                ? "bg-gray-800/50 border-purple-500/30 shadow-lg"
                : "bg-white/70 border-purple-200 shadow-lg"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              ⚡ Average Performance
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Average WPM
                  </span>
                  <span
                    className={`font-bold ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {avgWPM}
                  </span>
                </div>
                <div
                  className={`h-3 rounded-full overflow-hidden ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((avgWPM / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Average Accuracy
                  </span>
                  <span
                    className={`font-bold ${
                      isDarkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    {avgAccuracy}%
                  </span>
                </div>
                <div
                  className={`h-3 rounded-full overflow-hidden ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${avgAccuracy}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl p-6 backdrop-blur-sm border ${
              isDarkMode
                ? "bg-gray-800/50 border-pink-500/30 shadow-lg"
                : "bg-white/70 border-pink-200 shadow-lg"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              🎯 Best Performance
            </h3>
            <div className="space-y-6">
              <div className="text-center">
                <div
                  className={`text-5xl font-bold mb-2 ${
                    isDarkMode ? "text-pink-400" : "text-pink-600"
                  }`}
                >
                  {bestWPM}
                </div>
                <div
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Words Per Minute
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Sessions */}
        <div className="mb-12">
          <h2
            className={`text-2xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            💪 Practice Sessions
          </h2>
          <div
            className={`rounded-2xl overflow-hidden border ${
              isDarkMode
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white/70 border-gray-200"
            }`}
          >
            {practiceSessions.length === 0 ? (
              <div
                className={`p-12 text-center ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <div className="text-5xl mb-4">📝</div>
                <p>No practice data yet. Start practicing to see your stats!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      className={`border-b ${
                        isDarkMode
                          ? "border-gray-700 bg-gray-800/70"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Date
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        WPM
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Accuracy
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Mode
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {practiceSessions
                      .slice()
                      .reverse()
                      .map((s, i) => (
                        <tr
                          key={i}
                          className={`border-b transition-colors ${
                            isDarkMode
                              ? "border-gray-700 hover:bg-gray-800/50"
                              : "border-gray-100 hover:bg-gray-50"
                          }`}
                        >
                          <td
                            className={`px-6 py-4 whitespace-nowrap ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {s.date}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap font-semibold ${
                              isDarkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                          >
                            {s.wpm}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap font-semibold ${
                              s.accuracy >= 90
                                ? isDarkMode
                                  ? "text-green-400"
                                  : "text-green-600"
                                : s.accuracy >= 75
                                ? isDarkMode
                                  ? "text-yellow-400"
                                  : "text-yellow-600"
                                : isDarkMode
                                ? "text-red-400"
                                : "text-red-600"
                            }`}
                          >
                            {s.accuracy}%
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                s.mode === "coding"
                                  ? isDarkMode
                                    ? "bg-purple-900/50 text-purple-300"
                                    : "bg-purple-100 text-purple-700"
                                  : isDarkMode
                                  ? "bg-blue-900/50 text-blue-300"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {s.mode === "coding" ? "💻 Coding" : "📝 Simple"}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Race Sessions */}
        {raceSessions.length > 0 && (
          <div className="mb-12">
            <h2
              className={`text-2xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              🏁 Race Sessions
            </h2>
            <div
              className={`rounded-2xl overflow-hidden border ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white/70 border-gray-200"
              }`}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      className={`border-b ${
                        isDarkMode
                          ? "border-gray-700 bg-gray-800/70"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Date
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Your WPM
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Bot WPM
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Accuracy
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {raceSessions
                      .slice()
                      .reverse()
                      .map((s, i) => (
                        <tr
                          key={i}
                          className={`border-b transition-colors ${
                            isDarkMode
                              ? "border-gray-700 hover:bg-gray-800/50"
                              : "border-gray-100 hover:bg-gray-50"
                          }`}
                        >
                          <td
                            className={`px-6 py-4 whitespace-nowrap ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {s.date}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap font-semibold ${
                              isDarkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                          >
                            {s.wpm}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {s.botWPM}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap font-semibold ${
                              s.accuracy >= 90
                                ? isDarkMode
                                  ? "text-green-400"
                                  : "text-green-600"
                                : s.accuracy >= 75
                                ? isDarkMode
                                  ? "text-yellow-400"
                                  : "text-yellow-600"
                                : isDarkMode
                                ? "text-red-400"
                                : "text-red-600"
                            }`}
                          >
                            {s.accuracy}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                s.result === "Win"
                                  ? isDarkMode
                                    ? "bg-green-900/50 text-green-300"
                                    : "bg-green-100 text-green-700"
                                  : isDarkMode
                                  ? "bg-red-900/50 text-red-300"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {s.result === "Win" ? "🏆 Won" : "😔 Lost"}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
