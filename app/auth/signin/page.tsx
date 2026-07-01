"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg border border-gray-800">
        <h1 className="text-2xl font-bold text-center mb-8">Sign In</h1>

        <button
          onClick={() => {
            setIsLoading(true);
            signIn("google", { callbackUrl: "/dashboard" });
          }}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </button>

        <p className="text-center text-gray-400 mt-6">
          New user? Sign in to create your account
        </p>
      </div>
    </div>
  );
}
