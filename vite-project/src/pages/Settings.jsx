import { useState, useEffect } from "react";
import { saveSettings, getSettings } from "../utils/localStorage";

export default function Settings() {
  const [defaultDuration, setDefaultDuration] = useState(60);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const settings = getSettings();
    setDefaultDuration(settings.defaultDuration);
    setDarkMode(settings.darkMode);
  }, []);

  const handleSave = () => {
    saveSettings({ defaultDuration, darkMode });
    alert("Settings saved successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Settings Page</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Default Practice Duration: </label>
        <select
          value={defaultDuration}
          onChange={(e) => setDefaultDuration(Number(e.target.value))}
        >
          <option value={60}>1 Minute</option>
          <option value={120}>2 Minutes</option>
          <option value={300}>5 Minutes</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          Enable Dark Mode
        </label>
      </div>

      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
}
