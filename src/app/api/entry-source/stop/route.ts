import { NextRequest, NextResponse } from "next/server";
import { StopRequest } from "@/types/entry-source";

export async function POST(request: NextRequest) {
  try {
    const body: StopRequest = await request.json();
    console.log("Stop request received:", JSON.stringify(body, null, 2));

    // Handle stop logic here
    // This is called when the Journey is stopped/deactivated
    // You might want to:
    // - Stop data synchronization
    // - Clean up webhooks
    // - Cancel scheduled tasks

    return NextResponse.json({
      status: "ok",
      message: "Journey stopped successfully",
    });
  } catch (error) {
    console.error("Stop error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Stop failed",
      },
      { status: 500 }
    );
  }
}
