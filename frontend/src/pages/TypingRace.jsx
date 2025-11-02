import { useState, useEffect, useContext } from "react";
import confetti from "canvas-confetti";
import { DarkModeContext } from "../context/DarkModeContext";
import { getRandomParagraph } from "../utils/paragraphs";
import { saveRaceSession, addXP, increaseStreak } from "../utils/localStorage";
import "../styles/TypingRace/TypingRace.css";

export default function TypingRace() {
  const { isDarkMode } = useContext(DarkModeContext);

  const [textToType, setTextToType] = useState(getRandomParagraph());
  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [botProgress, setBotProgress] = useState(0);
  const [botWPM, setBotWPM] = useState(40);
  const [countdown, setCountdown] = useState(null);
  const [raceStarted, setRaceStarted] = useState(false);

  // Countdown before start
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setRaceStarted(true);
      setStartTime(Date.now());
    }
  }, [countdown]);

  // Timer countdown
  useEffect(() => {
    let timer;
    if (raceStarted && !isCompleted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && !isCompleted) {
      finishRace();
    }
    return () => clearInterval(timer);
  }, [raceStarted, timeLeft, isCompleted]);

  // Bot typing simulation
  useEffect(() => {
    let botTimer;
    if (raceStarted && !isCompleted) {
      const charsPerSecond = (botWPM * 5) / 60;
      botTimer = setInterval(() => {
        setBotProgress((prev) =>
          Math.min(prev + charsPerSecond, textToType.length)
        );
      }, 1000);
    }
    return () => clearInterval(botTimer);
  }, [raceStarted, isCompleted, botWPM]);

  const handleTyping = (e) => {
    if (!startTime) setStartTime(Date.now());
    const value = e.target.value;
    setTypedText(value);

    const wordsTyped = value.trim().split(/\s+/).length;
    const elapsedTime = (Date.now() - startTime) / 60000;
    if (elapsedTime > 0) {
      setWpm(Math.round(wordsTyped / elapsedTime));
    }
    if (value === textToType) {
      finishRace();
    }
  };

  const finishRace = () => {
    setIsCompleted(true);
    const userWon = typedText.length >= botProgress;
    if (userWon)
      confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });

    const correctChars = typedText
      .split("")
      .filter((c, i) => c === textToType[i]).length;
    const accuracy =
      textToType.length === 0
        ? 0
        : ((correctChars / textToType.length) * 100).toFixed(2);

    const xpEarned = parseInt(wpm) + Math.floor(accuracy / 2);
    addXP(xpEarned);
    increaseStreak();

    saveRaceSession({
      wpm,
      accuracy,
      botWPM,
      result: userWon ? "won" : "lost",
      date: new Date().toLocaleString(),
    });
  };

  const handleRestart = () => {
    setTextToType(getRandomParagraph());
    setTypedText("");
    setStartTime(null);
    setTimeLeft(60);
    setWpm(0);
    setIsCompleted(false);
    setCountdown(null);
    setRaceStarted(false);
    setBotProgress(0);
  };

  const renderHighlightedText = () =>
    textToType.split("").map((char, idx) => {
      const className =
        idx < typedText.length
          ? "user-progress"
          : idx < botProgress
          ? "bot-progress"
          : "";
      return (
        <span key={idx} className={className}>
          {char}
        </span>
      );
    });

  return (
    <div className={`race-container ${isDarkMode ? "dark" : "light"}`}>
      <h2 className="race-title">🏁 Typing Race vs Bot</h2>

      {!raceStarted && countdown === null && (
        <div className="race-setup">
          <div className="bot-speed">
            <label>🤖 Bot Speed: {botWPM} WPM</label>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={botWPM}
              onChange={(e) => setBotWPM(parseInt(e.target.value))}
            />
          </div>
          <button className="race-btn start" onClick={() => setCountdown(3)}>
            Start Race 🚀
          </button>
        </div>
      )}

      {countdown > 0 && <h1 className="countdown">⏱️ {countdown}</h1>}

      {raceStarted && (
        <div className="race-play">
          <p className="race-status">
            Time Left: <strong>{timeLeft}s</strong> | WPM:{" "}
            <strong>{wpm}</strong>
          </p>

          <div className="race-text">{renderHighlightedText()}</div>

          <textarea
            rows={5}
            value={typedText}
            onChange={handleTyping}
            disabled={isCompleted}
            placeholder="Start typing here..."
            className="race-input"
          />

          {isCompleted && (
            <div className="race-result">
              <p>✅ Race Completed! Your WPM: {wpm}</p>
              <button className="race-btn restart" onClick={handleRestart}>
                Restart Race 🔁
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
