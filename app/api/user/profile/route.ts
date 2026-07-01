import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { updateProfileSchema } from "@/lib/validation";
import { successResponse, errorResponse, APIError } from "@/lib/api-response";

// Get user profile
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new APIError(401, "Unauthorized");
    }

    return successResponse({
      user: session.user,
    });
  } catch (error) {
    return errorResponse(error);
  }
}

// Update user profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new APIError(401, "Unauthorized");
    }

    const body = await request.json();
    const validatedData = updateProfileSchema.parse(body);

    // Note: Profile updates are limited for OAuth users
    // This is a placeholder for future profile update functionality
    // For now, we're just validating the input

    return successResponse({
      message: "Profile update functionality coming soon",
      user: session.user,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
