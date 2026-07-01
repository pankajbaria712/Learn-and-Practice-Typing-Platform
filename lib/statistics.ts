import { TypingSessionModel } from "@/models/TypingSession";
import { TypingStatisticsModel } from "@/models/TypingStatistics";
import { DailyProgressModel } from "@/models/DailyProgress";

export async function calculateAndUpdateStatistics(userId: string) {
  try {
    // Get all sessions for the user
    const sessions = await TypingSessionModel.find({ userId }).lean();

    if (sessions.length === 0) {
      return;
    }

    // Calculate statistics
    const totalSessions = sessions.length;
    const totalPracticeTime = sessions.reduce((sum, s) => sum + s.duration, 0);
    const highestWPM = Math.max(...sessions.map((s) => s.wpm));
    const averageWPM =
      sessions.reduce((sum, s) => sum + s.wpm, 0) / totalSessions;
    const averageAccuracy =
      sessions.reduce((sum, s) => sum + s.accuracy, 0) / totalSessions;
    const totalWordsTyped = sessions.reduce((sum, s) => sum + s.wordsTyped, 0);
    const totalMistakes = sessions.reduce((sum, s) => sum + s.mistakes, 0);

    // Calculate daily streak
    const lastActiveDate = sessions[sessions.length - 1].date;
    const dailyStreak = calculateDailyStreak(sessions);

    // Update or create statistics
    await TypingStatisticsModel.findOneAndUpdate(
      { userId },
      {
        totalSessions,
        totalPracticeTime,
        highestWPM,
        averageWPM: Math.round(averageWPM * 100) / 100,
        averageAccuracy: Math.round(averageAccuracy * 100) / 100,
        totalWordsTyped,
        totalMistakes,
        dailyStreak,
        lastActiveDate,
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error("Error calculating statistics:", error);
  }
}

export async function updateDailyProgress(userId: string, date: Date) {
  try {
    // Get all sessions for today
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const sessions = await TypingSessionModel.find({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).lean();

    if (sessions.length === 0) {
      return;
    }

    const sessionsCompleted = sessions.length;
    const totalPracticeTime = sessions.reduce((sum, s) => sum + s.duration, 0);
    const averageWPM =
      sessions.reduce((sum, s) => sum + s.wpm, 0) / sessionsCompleted;
    const averageAccuracy =
      sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessionsCompleted;

    // Update or create daily progress
    await DailyProgressModel.findOneAndUpdate(
      { userId, date: { $gte: startOfDay, $lte: endOfDay } },
      {
        sessionsCompleted,
        totalPracticeTime,
        averageWPM: Math.round(averageWPM * 100) / 100,
        averageAccuracy: Math.round(averageAccuracy * 100) / 100,
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error("Error updating daily progress:", error);
  }
}

function calculateDailyStreak(sessions: any[]): number {
  if (sessions.length === 0) return 0;

  // Sort sessions by date in descending order
  const sortedSessions = sessions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const session of sortedSessions) {
    const sessionDate = new Date(session.date);
    sessionDate.setHours(0, 0, 0, 0);

    const daysDifference = Math.floor(
      (currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDifference === streak) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
