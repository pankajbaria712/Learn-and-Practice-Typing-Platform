import { useState, useEffect } from "react";
import {
  getPracticeSessions,
  getRaceSessions,
  getXP,
  getStreak,
} from "../utils/localStorage";

export default function StatsPage() {
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Typing Stats</h2>
      <p>
        🏆 XP: {xp} | 🔥 Streak: {streak} days
      </p>
      <h3>Practice Sessions</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Date</th>
            <th>WPM</th>
            <th>Accuracy</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          {practiceSessions.length === 0 ? (
            <tr>
              <td colSpan="4">No practice data</td>
            </tr>
          ) : (
            practiceSessions
              .slice()
              .reverse()
              .map((s, i) => (
                <tr key={i}>
                  <td>{s.date}</td>
                  <td>{s.wpm}</td>
                  <td>{s.accuracy}%</td>
                  <td>{s.mode}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>

      <h3 style={{ marginTop: "20px" }}>Race Sessions</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Date</th>
            <th>WPM</th>
            <th>Accuracy</th>
            <th>Bot WPM</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {raceSessions.length === 0 ? (
            <tr>
              <td colSpan="5">No race data</td>
            </tr>
          ) : (
            raceSessions
              .slice()
              .reverse()
              .map((s, i) => (
                <tr key={i}>
                  <td>{s.date}</td>
                  <td>{s.wpm}</td>
                  <td>{s.accuracy}%</td>
                  <td>{s.botWPM}</td>
                  <td>{s.result}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}
