const STORAGE_KEY = "typingPracticeSessions";
const SETTINGS_KEY = "typing_app_settings";
const DARK_MODE_KEY = "typing_app_dark_mode";
const RACE_KEY = "typing_race_stats";
const XP_KEY = "typing_xp";
const STREAK_KEY = "typing_streak";

export function savePracticeSession(session) {
  const sessions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  sessions.push(session);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function getPracticeSessions() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function clearPracticeSessions() {
  localStorage.removeItem(STORAGE_KEY);
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getSettings() {
  return (
    JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {
      defaultDuration: 60,
      darkMode: false,
    }
  );
}

export function saveDarkModePreference(isDarkMode) {
  localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDarkMode));
}

export function getDarkModePreference() {
  const data = localStorage.getItem(DARK_MODE_KEY);
  return data ? JSON.parse(data) : false;
}

export function saveRaceSession(session) {
  const existing = JSON.parse(localStorage.getItem(RACE_KEY)) || [];
  existing.push(session);
  localStorage.setItem(RACE_KEY, JSON.stringify(existing));
}

export function getRaceSessions() {
  return JSON.parse(localStorage.getItem(RACE_KEY)) || [];
}

export function addXP(xp) {
  const currentXP = parseInt(localStorage.getItem(XP_KEY)) || 0;
  localStorage.setItem(XP_KEY, currentXP + xp);
}

export function getXP() {
  return parseInt(localStorage.getItem(XP_KEY)) || 0;
}

export function increaseStreak() {
  const today = new Date().toDateString();
  const lastDate = localStorage.getItem("last_streak_date");

  let streak = parseInt(localStorage.getItem(STREAK_KEY)) || 0;
  if (lastDate !== today) {
    streak += 1;
    localStorage.setItem(STREAK_KEY, streak);
    localStorage.setItem("last_streak_date", today);
  }
}

export function getStreak() {
  return parseInt(localStorage.getItem(STREAK_KEY)) || 0;
}
