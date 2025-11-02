import React from "react";
import "./TimerDisplay.css";

const TimerDisplay = ({ time }) => {
  return (
    <div className={`timer-display ${time <= 5 ? "warning" : ""}`}>
      ⏱️ {time}s
    </div>
  );
};

export default TimerDisplay;
