import React, { useState } from "react";
import TypingArea from "../pages/TypingArea";

const simpleParagraph =
  "The quick brown fox jumps over the lazy dog. Practice daily to improve typing speed.";
const codingParagraph =
  "const greet = () => { console.log('Hello World'); }; greet();";

const Practice = () => {
  const [mode, setMode] = useState("simple");
  const [timer, setTimer] = useState(60);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 animate-pulse">
        🖥️ Practice Typing
      </h1>

      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center shadow-lg">
        <label className="flex flex-col text-white text-sm sm:text-base">
          Mode:
          <select
            className="mt-1 p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="simple">📝 Simple Mode</option>
            <option value="coding">💻 Coding Mode</option>
          </select>
        </label>

        <label className="flex flex-col text-white text-sm sm:text-base">
          Timer:
          <select
            className="mt-1 p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={timer}
            onChange={(e) => setTimer(Number(e.target.value))}
          >
            <option value={60}>1 min</option>
            <option value={120}>2 min</option>
            <option value={300}>5 min</option>
          </select>
        </label>
      </div>

      <TypingArea
        paragraph={mode === "simple" ? simpleParagraph : codingParagraph}
        mode={mode}
        timer={timer}
      />
    </div>
  );
};

export default Practice;
