import { NextResponse } from "next/server";

export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

export function successResponse(data: any, statusCode = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: statusCode }
  );
}

export function errorResponse(error: unknown) {
  if (error instanceof APIError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    console.error("Unhandled error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }

  console.error("Unknown error:", error);
  return NextResponse.json(
    {
      success: false,
      error: "Internal server error",
    },
    { status: 500 }
  );
}
