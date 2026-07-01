import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { TypingStatisticsModel } from "@/models/TypingStatistics";
import { successResponse, errorResponse } from "@/lib/api-response";

// Get leaderboard by different metrics
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "wpm"; // wpm, accuracy, streak
    const limit = parseInt(searchParams.get("limit") || "100");

    let leaderboard;

    switch (type) {
      case "wpm":
        leaderboard = await TypingStatisticsModel.find()
          .sort({ highestWPM: -1 })
          .limit(limit)
          .select("userId highestWPM averageAccuracy")
          .lean();
        break;
      case "accuracy":
        leaderboard = await TypingStatisticsModel.find()
          .sort({ averageAccuracy: -1 })
          .limit(limit)
          .select("userId averageAccuracy highestWPM")
          .lean();
        break;
      case "streak":
        leaderboard = await TypingStatisticsModel.find()
          .sort({ dailyStreak: -1 })
          .limit(limit)
          .select("userId dailyStreak")
          .lean();
        break;
      default:
        leaderboard = await TypingStatisticsModel.find()
          .sort({ highestWPM: -1 })
          .limit(limit)
          .lean();
    }

    // Add rank
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

    return successResponse(rankedLeaderboard);
  } catch (error) {
    return errorResponse(error);
  }
}
