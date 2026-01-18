import { NextRequest, NextResponse } from "next/server";
import { ValidateRequest } from "@/types/entry-source";

export async function POST(request: NextRequest) {
  try {
    const body: ValidateRequest = await request.json();
    console.log("Validate request received:", JSON.stringify(body, null, 2));

    // Perform validation logic here
    // For now, we'll always return success
    // In production, you might want to validate:
    // - Configuration is complete
    // - Required fields are present
    // - External system is accessible

    return NextResponse.json({
      status: "ok",
      message: "Validation successful",
    });
  } catch (error) {
    console.error("Validate error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Validation failed",
      },
      { status: 400 }
    );
  }
}
