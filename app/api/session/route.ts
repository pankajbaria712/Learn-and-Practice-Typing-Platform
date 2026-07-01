import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { TypingSessionModel } from "@/models/TypingSession";
import {
  calculateAndUpdateStatistics,
  updateDailyProgress,
} from "@/lib/statistics";
import {
  createSessionSchema,
  paginationSchema,
} from "@/lib/validation";
import {
  successResponse,
  errorResponse,
  APIError,
} from "@/lib/api-response";

// Record a new typing session
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new APIError(401, "Unauthorized");
    }

    await connectDB();

    const body = await request.json();
    const validatedData = createSessionSchema.parse(body);

    const typingSession = await TypingSessionModel.create({
      userId: session.user.id,
      ...validatedData,
    });

    // Update statistics
    await calculateAndUpdateStatistics(session.user.id);
    await updateDailyProgress(session.user.id, new Date());

    return successResponse(typingSession, 201);
  } catch (error) {
    return errorResponse(error);
  }
}

// Get user's typing sessions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new APIError(401, "Unauthorized");
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [sessions, total] = await Promise.all([
      TypingSessionModel.find({ userId: session.user.id })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      TypingSessionModel.countDocuments({ userId: session.user.id }),
    ]);

    return successResponse({
      sessions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
