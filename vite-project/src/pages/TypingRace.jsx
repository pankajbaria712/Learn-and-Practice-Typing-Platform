import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { getRandomParagraph } from "../utils/paragraphs";
import { saveRaceSession, addXP, increaseStreak } from "../utils/localStorage";

export default function TypingRace() {
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

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setRaceStarted(true);
      setStartTime(Date.now());
    }
  }, [countdown]);

  useEffect(() => {
    let timer;
    if (raceStarted && !isCompleted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && !isCompleted) {
      finishRace();
    }
    return () => clearInterval(timer);
  }, [raceStarted, timeLeft, isCompleted]);

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
    if (userWon) {
      confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
    }
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
      const style = {
        background:
          idx < typedText.length
            ? "#ccffcc"
            : idx < botProgress
            ? "#ffcccc"
            : "transparent",
        fontSize: "20px",
        fontFamily: "monospace",
      };
      return (
        <span key={idx} style={style}>
          {char}
        </span>
      );
    });

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🏁 Typing Race vs Bot</h2>
      {!raceStarted && countdown === null && (
        <>
          <div>
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
          <button onClick={() => setCountdown(3)}>Start Race</button>
        </>
      )}
      {countdown > 0 && <h1>⏱️ {countdown}</h1>}
      {raceStarted && (
        <>
          <p>
            Time Left: {timeLeft}s | WPM: {wpm}
          </p>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            {renderHighlightedText()}
          </div>
          <textarea
            rows={6}
            cols={80}
            value={typedText}
            onChange={handleTyping}
            disabled={isCompleted}
            placeholder="Start typing here..."
            style={{ fontFamily: "monospace", fontSize: "16px" }}
          />
          {isCompleted && (
            <>
              <p>✅ Race Completed! Your WPM: {wpm}</p>
              <button onClick={handleRestart}>Restart Race</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
