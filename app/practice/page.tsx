"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Practice() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Typing Practice
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Practice mode coming soon. UI from the original app will be integrated here.
        </p>
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center">
          <p className="text-gray-400">
            The beautiful UI from your existing frontend will be integrated here while
            connecting to the new backend infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
}
