import { NextRequest, NextResponse } from "next/server";
import { SaveRequest } from "@/types/entry-source";

export async function POST(request: NextRequest) {
  try {
    const body: SaveRequest = await request.json();
    console.log("Save request received:", JSON.stringify(body, null, 2));

    // Handle save logic here
    // This is called when the activity configuration is saved
    // You might want to:
    // - Store configuration in a database
    // - Validate and transform settings

    return NextResponse.json({
      status: "ok",
      message: "Configuration saved successfully",
    });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Save failed",
      },
      { status: 500 }
    );
  }
}
