import React, { useState, useEffect, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { saveSettings, getSettings } from "../utils/localStorage";
import "../styles/Settings/Settings.css";

export default function Settings() {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const [defaultDuration, setDefaultDuration] = useState(60);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const settings = getSettings();
    if (settings) {
      setDefaultDuration(settings.defaultDuration || 60);
    }
  }, []);

  const handleSave = () => {
    saveSettings({ defaultDuration, darkMode: isDarkMode });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  const durationOptions = [
    { value: 30, label: "30 sec", emoji: "⚡" },
    { value: 60, label: "1 min", emoji: "⏱️" },
    { value: 120, label: "2 min", emoji: "⏰" },
    { value: 300, label: "5 min", emoji: "🕐" },
    { value: 600, label: "10 min", emoji: "⏳" },
  ];

  return (
    <div className={`settings-page ${isDarkMode ? "dark" : "light"}`}>
      <div className="settings-container">
        {/* Header */}
        <div className="settings-header">
          <h1>⚙️ Settings</h1>
          <p>Customize your typing experience</p>
        </div>

        {/* <-- IMPORTANT: settings-cards wrapper matches Settings.scss grid --> */}
        <div className="settings-cards">
          {/* Duration Card */}
          <div className={`settings-card ${isDarkMode ? "dark" : "light"}`}>
            <div>
              <h3>Default Practice Duration</h3>
              <p>Choose your preferred practice session length</p>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <div
                className="grid"
                style={{
                  gap: "0.75rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                }}
              >
                {durationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDefaultDuration(option.value)}
                    className={`option-button ${
                      isDarkMode ? "dark" : "light"
                    } ${defaultDuration === option.value ? "selected" : ""}`}
                  >
                    <div style={{ fontSize: "1.1rem" }}>{option.emoji}</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>
                      {option.label}
                    </div>
                    {defaultDuration === option.value && (
                      <div style={{ marginTop: 6, fontSize: 12 }}>
                        ✓ Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Appearance Card */}
          <div className={`settings-card ${isDarkMode ? "dark" : "light"}`}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>Appearance</h3>
                <p>Switch between Light and Dark mode</p>
              </div>

              <div
                className={`toggle-switch ${
                  isDarkMode ? "dark active" : "light"
                }`}
                onClick={handleDarkModeToggle}
                role="button"
                aria-label="Toggle theme"
              >
                <div className="toggle-circle" />
              </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <div style={{ fontSize: "0.95rem", opacity: 0.9 }}>
                Current:{" "}
                <strong>{isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}</strong>
              </div>
            </div>
          </div>

          {/* Personalization Card */}
          <div className={`settings-card ${isDarkMode ? "dark" : "light"}`}>
            <div>
              <h3>Personalization</h3>
              <p>Quick summary of your current settings</p>
            </div>

            <div style={{ marginTop: "1rem", display: "grid", gap: ".5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ opacity: 0.75 }}>Theme</div>
                <div style={{ fontWeight: 700 }}>
                  {isDarkMode ? "Dark" : "Light"}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ opacity: 0.75 }}>Default Duration</div>
                <div style={{ fontWeight: 700 }}>
                  {defaultDuration < 60
                    ? `${defaultDuration}s`
                    : `${defaultDuration / 60} min`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save button under the cards */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="save-btn" onClick={handleSave}>
            💾 Save Settings
          </button>
        </div>

        {/* Notification Toast */}
        {showNotification && (
          <div className={`toast ${isDarkMode ? "dark" : "light"}`}>
            <span>✅ Settings saved successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
}
