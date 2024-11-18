import { NextResponse } from "next/server";

export function handleError(
  error: unknown,
  message?: string,
  statusCode?: number
): NextResponse {
  console.error("API Error:", error);

  if (error instanceof SyntaxError) {
    return NextResponse.json(
      { error: "Invalid request syntax" },
      { status: 400 }
    );
  } else if (error instanceof Error) {
    return NextResponse.json(
      { error: message || error.message },
      { status: statusCode || 500 }
    );
  } else {
    return NextResponse.json(
      { error: message || "An unexpected error occurred" },
      { status: statusCode || 500 }
    );
  }
}
