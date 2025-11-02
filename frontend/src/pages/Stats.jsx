import React, { useState, useEffect, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import {
  getPracticeSessions,
  getRaceSessions,
  getXP,
  getStreak,
} from "../utils/localStorage";
import "../styles/Stats/Stats.css";

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

  // Calculate average values
  const calculateAvgWPM = (sessions) =>
    sessions.length
      ? Math.round(
          sessions.reduce((acc, s) => acc + (s.wpm || 0), 0) / sessions.length
        )
      : 0;

  const calculateAvgAccuracy = (sessions) =>
    sessions.length
      ? Math.round(
          sessions.reduce((acc, s) => acc + (s.accuracy || 0), 0) /
            sessions.length
        )
      : 0;

  const bestWPM = practiceSessions.length
    ? Math.max(...practiceSessions.map((s) => s.wpm || 0))
    : 0;

  const avgWPM = calculateAvgWPM(practiceSessions);
  const avgAccuracy = calculateAvgAccuracy(practiceSessions);
  const totalSessions = practiceSessions.length + raceSessions.length;

  return (
    <div className={`stats-page ${isDarkMode ? "dark" : "light"}`}>
      {/* Header */}
      <div className="stats-header">
        <h1>📊 Your Typing Statistics</h1>
        <p>Track your progress and see how you're improving!</p>
      </div>

      {/* Overview Cards */}
      <div className="stats-grid">
        <div className={`stat-card ${isDarkMode ? "dark" : "light"}`}>
          <div className="emoji">⭐</div>
          <div className="value">{xp}</div>
          <div className="label">Total XP</div>
          <div className="progress-bar">
            <div
              className="fill"
              style={{ width: `${Math.min((xp / 5000) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className={`stat-card ${isDarkMode ? "dark" : "light"}`}>
          <div className="emoji">🔥</div>
          <div className="value">{streak}</div>
          <div className="label">Day Streak</div>
          <div className="progress-bar accuracy">
            <div
              className="fill"
              style={{ width: `${Math.min((streak / 30) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className={`stat-card ${isDarkMode ? "dark" : "light"}`}>
          <div className="emoji">🚀</div>
          <div className="value">{bestWPM}</div>
          <div className="label">Best WPM</div>
        </div>

        <div className={`stat-card ${isDarkMode ? "dark" : "light"}`}>
          <div className="emoji">📈</div>
          <div className="value">{totalSessions}</div>
          <div className="label">Total Sessions</div>
        </div>
      </div>

      {/* Average Performance Section */}
      <div className="charts-section">
        <div className={`chart-card ${isDarkMode ? "dark" : "light"}`}>
          <h3>⚡ Average Performance</h3>
          <div>
            <div className="flex justify-between mb-2">
              <span>Average WPM</span>
              <span className="text-blue-400 font-semibold">{avgWPM}</span>
            </div>
            <div className="progress-bar">
              <div
                className="fill"
                style={{ width: `${Math.min(avgWPM, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span>Average Accuracy</span>
              <span className="text-green-400 font-semibold">
                {avgAccuracy}%
              </span>
            </div>
            <div className="progress-bar accuracy">
              <div
                className="fill"
                style={{ width: `${Math.min(avgAccuracy, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className={`chart-card ${isDarkMode ? "dark" : "light"}`}>
          <h3>🎯 Best Performance</h3>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2 text-pink-400">
              {bestWPM}
            </div>
            <p>Words Per Minute</p>
          </div>
        </div>
      </div>

      {/* Practice Sessions Table */}
      <div className={`session-table ${isDarkMode ? "dark" : "light"}`}>
        {practiceSessions.length === 0 ? (
          <div className="no-data">
            <span className="emoji">📝</span>
            No practice data yet. Start practicing to see your stats!
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>WPM</th>
                <th>Accuracy</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {practiceSessions
                .slice()
                .reverse()
                .map((s, i) => (
                  <tr key={i}>
                    <td>{s.date}</td>
                    <td>{s.wpm}</td>
                    <td>{s.accuracy}%</td>
                    <td>
                      <span
                        className={`${
                          s.mode === "coding"
                            ? "text-purple-400"
                            : "text-blue-400"
                        }`}
                      >
                        {s.mode === "coding" ? "💻 Coding" : "📝 Simple"}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Race Sessions Table */}
      {raceSessions.length > 0 && (
        <div className={`session-table ${isDarkMode ? "dark" : "light"}`}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Your WPM</th>
                <th>Bot WPM</th>
                <th>Accuracy</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {raceSessions
                .slice()
                .reverse()
                .map((s, i) => (
                  <tr key={i}>
                    <td>{s.date}</td>
                    <td>{s.wpm}</td>
                    <td>{s.botWPM}</td>
                    <td>{s.accuracy}%</td>
                    <td>
                      <span
                        className={`${
                          s.result === "Win" ? "text-green-400" : "text-red-400"
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
      )}
    </div>
  );
}
