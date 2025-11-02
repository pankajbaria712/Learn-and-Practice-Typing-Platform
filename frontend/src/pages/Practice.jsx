import React, { useState } from "react";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import TypingArea from "../components/TypingArea";
import "../styles/Practice/Practice.scss";

const simpleParagraph =
  "The quick brown fox jumps over the lazy dog. Practice daily to improve typing speed.";
const codingParagraph =
  "const greet = () => { console.log('Hello World'); }; greet();";

const Practice = () => {
  const [mode, setMode] = useState("simple");
  const [timer, setTimer] = useState(60);
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`practice ${isDarkMode ? "dark" : "light"}`}>
      <h1 className="practice__title">🖥️ Practice Typing</h1>

      <div className="practice__controls">
        <label className="practice__label">
          <span>Mode:</span>
          <select
            className="practice__select"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="simple">📝 Simple Mode</option>
            <option value="coding">💻 Coding Mode</option>
          </select>
        </label>

        <label className="practice__label">
          <span>Timer:</span>
          <select
            className="practice__select"
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
