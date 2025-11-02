import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import "../styles/TimerDisplay/TimerDisplay.scss";

const TimerDisplay = ({ time }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div
      className={`timer-display ${isDarkMode ? "dark" : "light"} ${
        time <= 10 ? "danger" : ""
      }`}
    >
      ⏰ {formattedTime}
    </div>
  );
};

export default TimerDisplay;
