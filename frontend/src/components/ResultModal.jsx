import React, { useEffect, useState, useContext } from "react";
import confetti from "canvas-confetti";
import successSoundFile from "../sounds/success.wav";
import { DarkModeContext } from "../context/DarkModeContext";
import "../styles/ResultModal/ResultModal.css";

const ResultModal = ({ show, onClose, wpm, accuracy, time }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [displayWPM, setDisplayWPM] = useState(0);
  const [displayAccuracy, setDisplayAccuracy] = useState(0);
  const [displayTime, setDisplayTime] = useState(0);

  useEffect(() => {
    if (show) {
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
      });

      const audio = new Audio(successSoundFile);
      audio.volume = 0.4;
      audio.play();

      let wpmCount = 0,
        accCount = 0,
        timeCount = 0;
      const interval = setInterval(() => {
        if (wpmCount < wpm) wpmCount += 1;
        if (accCount < accuracy) accCount += 1;
        if (timeCount < time) timeCount += 1;
        setDisplayWPM(wpmCount);
        setDisplayAccuracy(accCount);
        setDisplayTime(timeCount);
        if (wpmCount >= wpm && accCount >= accuracy && timeCount >= time) {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [show, wpm, accuracy, time]);

  if (!show) return null;

  const shareText = `🏆 Just typed ${wpm} WPM with ${accuracy}% accuracy in ${time}s on My Typing App! ⚡ Try beating me! #TypingChallenge`;

  const shareOnX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}`;
    window.open(url, "_blank");
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareText
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="result-modal-overlay">
      <div className={`result-modal-glass ${isDarkMode ? "dark" : "light"}`}>
        <h1 className="result-title">🏆 Great Job!</h1>
        <p className="result-subtitle">✨ You completed your typing session!</p>

        <div className="result-stats">
          <div>
            🚀 WPM: <span>{displayWPM}</span>
          </div>
          <div>
            ⏱️ Time: <span>{displayTime}s</span>
          </div>
          <div>
            🎯 Accuracy: <span>{displayAccuracy}%</span>
          </div>
        </div>

        <div className="result-buttons">
          <button className="share-btn neon" onClick={shareOnX}>
            Share on X
          </button>
          <button className="share-btn neon" onClick={shareOnWhatsApp}>
            Share on WhatsApp
          </button>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
