"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }

    if (status === "authenticated") {
      fetchDashboardData();
    }
  }, [status, router]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/dashboard");
      const data = await response.json();
      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* User Profile Card */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
            <p className="text-gray-300">
              <strong>Name:</strong> {session.user?.name}
            </p>
            <p className="text-gray-300">
              <strong>Email:</strong> {session.user?.email}
            </p>
          </div>

          {/* Statistics Card */}
          {dashboardData && (
            <>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Statistics
                </h2>
                {dashboardData.stats ? (
                  <>
                    <p className="text-gray-300">
                      <strong>Highest WPM:</strong> {dashboardData.stats.highestWPM}
                    </p>
                    <p className="text-gray-300">
                      <strong>Average WPM:</strong> {dashboardData.stats.averageWPM.toFixed(2)}
                    </p>
                    <p className="text-gray-300">
                      <strong>Sessions:</strong> {dashboardData.stats.totalSessions}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-400">No statistics yet</p>
                )}
              </div>

              {/* Today's Progress Card */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Today
                </h2>
                {dashboardData.todayProgress ? (
                  <>
                    <p className="text-gray-300">
                      <strong>Sessions:</strong> {dashboardData.todayProgress.sessionsCompleted}
                    </p>
                    <p className="text-gray-300">
                      <strong>Avg WPM:</strong> {dashboardData.todayProgress.averageWPM.toFixed(2)}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-400">No sessions today</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Recent Sessions */}
        {dashboardData && dashboardData.recentSessions && (
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Sessions
            </h2>
            {dashboardData.recentSessions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-2 px-4 text-gray-400">
                        Date
                      </th>
                      <th className="text-left py-2 px-4 text-gray-400">WPM</th>
                      <th className="text-left py-2 px-4 text-gray-400">
                        Accuracy
                      </th>
                      <th className="text-left py-2 px-4 text-gray-400">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentSessions.map((session: any) => (
                      <tr
                        key={session._id}
                        className="border-b border-gray-800 hover:bg-gray-800"
                      >
                        <td className="py-2 px-4 text-gray-300">
                          {new Date(session.date).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4 text-white font-semibold">
                          {session.wpm}
                        </td>
                        <td className="py-2 px-4 text-white">
                          {session.accuracy.toFixed(2)}%
                        </td>
                        <td className="py-2 px-4 text-gray-300">
                          {session.duration}s
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400">No sessions yet</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
