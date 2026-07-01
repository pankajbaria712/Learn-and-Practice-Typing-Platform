import "@/styles/globals.css";

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Learn & Practice Typing</h1>
          <p className="text-xl text-gray-300">
            Improve your typing speed and accuracy
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="/practice"
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200"
            >
              Start Practicing
            </a>
            <a
              href="/auth/signin"
              className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
