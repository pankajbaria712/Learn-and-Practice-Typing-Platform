import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { TypingStatisticsModel } from "@/models/TypingStatistics";
import { successResponse, errorResponse, APIError } from "@/lib/api-response";

// Get user statistics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new APIError(401, "Unauthorized");
    }

    await connectDB();

    const stats = await TypingStatisticsModel.findOne({
      userId: session.user.id,
    }).lean();

    if (!stats) {
      throw new APIError(404, "Statistics not found");
    }

    return successResponse(stats);
  } catch (error) {
    return errorResponse(error);
  }
}
