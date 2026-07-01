"use client";

import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("wpm");

  useEffect(() => {
    fetchLeaderboard();
  }, [type]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`/api/leaderboard?type=${type}&limit=50`);
      const data = await response.json();
      if (data.success) {
        setLeaderboard(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Leaderboard
        </h1>

        <div className="flex gap-4 justify-center mb-8">
          {["wpm", "accuracy", "streak"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-6 py-2 rounded font-semibold transition ${
                type === t
                  ? "bg-white text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading leaderboard...</p>
        ) : (
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-800">
                  <th className="text-left py-3 px-4 text-gray-300">Rank</th>
                  <th className="text-left py-3 px-4 text-gray-300">User ID</th>
                  <th className="text-right py-3 px-4 text-gray-300">
                    {type === "wpm"
                      ? "Highest WPM"
                      : type === "accuracy"
                      ? "Accuracy %"
                      : "Streak"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800 hover:bg-gray-800/50"
                  >
                    <td className="py-3 px-4">
                      <span className="font-semibold text-white">
                        #{entry.rank}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {entry.userId.substring(0, 12)}...
                    </td>
                    <td className="py-3 px-4 text-right text-white font-semibold">
                      {type === "wpm"
                        ? `${entry.highestWPM} WPM`
                        : type === "accuracy"
                        ? `${entry.averageAccuracy?.toFixed(2) || 0}%`
                        : `${entry.dailyStreak || 0} days`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
