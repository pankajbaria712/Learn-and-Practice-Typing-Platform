export interface User {
  _id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TypingSession {
  _id: string;
  userId: string;
  date: Date;
  duration: number;
  wordsTyped: number;
  charactersTyped: number;
  accuracy: number;
  wpm: number;
  mistakes: number;
  mode: "practice" | "race" | "lesson";
  difficulty: "easy" | "medium" | "hard";
  lesson?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TypingStatistics {
  _id: string;
  userId: string;
  totalSessions: number;
  totalPracticeTime: number;
  highestWPM: number;
  averageWPM: number;
  averageAccuracy: number;
  totalWordsTyped: number;
  totalMistakes: number;
  dailyStreak: number;
  lastActiveDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  _id: string;
  userId: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  createdAt: Date;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  userImage?: string;
  wpm: number;
  accuracy: number;
  rank: number;
}

export interface DailyProgress {
  _id: string;
  userId: string;
  date: Date;
  sessionsCompleted: number;
  totalPracticeTime: number;
  averageWPM: number;
  averageAccuracy: number;
  createdAt: Date;
}
