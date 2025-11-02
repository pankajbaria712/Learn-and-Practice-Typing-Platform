import React from "react";
import "./TimerDisplay.css";

const TimerDisplay = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className={`timer-display ${time <= 10 ? "danger" : ""}`}>
      ⏰ {formattedTime}
    </div>
  );
};

export default TimerDisplay;
