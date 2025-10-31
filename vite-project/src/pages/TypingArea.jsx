import React, { useState, useEffect, useRef } from "react";
import correctSound from "../sounds/correct.mp3";
import errorSound from "../sounds/error.wav";
import ResultModal from "./ResultModal";
import TimerDisplay from "./TimerDisplay";
import "./TypingArea.css";

const TypingArea = ({ paragraph, mode, timer }) => {
  const [userInput, setUserInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timer);
  const [isRunning, setIsRunning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctCount, setCorrectCount] = useState(0);

  const inputRef = useRef(null);
  const correctAudio = useRef(new Audio(correctSound));
  const errorAudio = useRef(new Audio(errorSound));

  const emojis = ["💪", "🚀", "🔥", "🤩", "😎", "🎯"];

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      calculateResults();
      setShowResult(true);
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const calculateResults = () => {
    const wordsTyped = userInput.trim().split(/\s+/).length;
    const minutes = timer / 60;
    const calculatedWPM = Math.max(Math.round(wordsTyped / minutes), 0);

    const correctChars = userInput
      .split("")
      .filter((c, i) => c === paragraph[i]).length;
    const calculatedAccuracy = userInput.length
      ? Math.round((correctChars / userInput.length) * 100)
      : 0;

    setWpm(calculatedWPM);
    setAccuracy(calculatedAccuracy);
  };

  const handleKeyDown = (e) => {
    if (!isRunning) setIsRunning(true);

    const key = e.key;
    e.preventDefault();

    if (key.length === 1) {
      if (key === paragraph[currentIndex]) {
        correctAudio.current.currentTime = 0;
        correctAudio.current.play();

        setUserInput((prev) => prev + key);
        setCurrentIndex((prev) => prev + 1);
        setCorrectCount((prev) => prev + 1);
        setIsError(false);
      } else {
        errorAudio.current.currentTime = 0;
        errorAudio.current.play();
        setIsError(true);
      }
    } else if (key === "Backspace" && currentIndex > 0) {
      setUserInput((prev) => prev.slice(0, -1));
      setCurrentIndex((prev) => prev - 1);
      setIsError(false);
    }
  };

  const handleCloseModal = () => {
    setUserInput("");
    setCurrentIndex(0);
    setTimeLeft(timer);
    setIsRunning(false);
    setShowResult(false);
    setWpm(0);
    setAccuracy(100);
    setCorrectCount(0);
    inputRef.current.focus();
  };

  return (
    <div
      className="typing-container"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={inputRef}
    >
      <TimerDisplay time={timeLeft} />

      <div className="wpm-display">🏎️ WPM: {wpm}</div>

      <div
        className={`paragraph-display ${
          mode === "coding" ? "coding-mode" : ""
        }`}
      >
        {paragraph.split("").map((char, index) => {
          let className = "char";
          if (index < currentIndex) {
            className += userInput[index] === char ? " correct" : " incorrect";
          }
          if (index === currentIndex) {
            className += isError ? " error-cursor" : " cursor";
          }
          return (
            <span key={index} className={className}>
              {char}
              {correctCount !== 0 &&
                correctCount % 10 === 0 &&
                index === currentIndex && (
                  <span className="emoji-pop">
                    {emojis[Math.floor(Math.random() * emojis.length)]}
                  </span>
                )}
            </span>
          );
        })}
      </div>

      <ResultModal
        show={showResult}
        onClose={handleCloseModal}
        wpm={wpm}
        accuracy={accuracy}
        time={timer}
      />
    </div>
  );
};

export default TypingArea;
