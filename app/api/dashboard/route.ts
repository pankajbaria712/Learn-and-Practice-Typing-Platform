import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { TypingStatisticsModel } from "@/models/TypingStatistics";
import { DailyProgressModel } from "@/models/DailyProgress";
import { TypingSessionModel } from "@/models/TypingSession";
import { successResponse, errorResponse, APIError } from "@/lib/api-response";

// Get user dashboard data
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new APIError(401, "Unauthorized");
    }

    await connectDB();

    const [stats, recentSessions, todayProgress] = await Promise.all([
      TypingStatisticsModel.findOne({ userId: session.user.id }).lean(),
      TypingSessionModel.find({ userId: session.user.id })
        .sort({ date: -1 })
        .limit(5)
        .lean(),
      DailyProgressModel.findOne({
        userId: session.user.id,
        date: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      }).lean(),
    ]);

    return successResponse({
      stats,
      recentSessions,
      todayProgress,
      user: {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
