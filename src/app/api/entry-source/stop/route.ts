import { NextRequest, NextResponse } from "next/server";
import { StopRequest } from "@/types/entry-source";

export async function POST(request: NextRequest) {
  try {
    let body: StopRequest | null = null;
    try {
      body = await request.json();
    } catch {
      body = null;
    }
    console.log("Stop request received:", JSON.stringify(body, null, 2));

    // Handle stop logic here
    // This is called when the Journey is stopped/deactivated
    // You might want to:
    // - Stop data synchronization
    // - Clean up webhooks
    // - Cancel scheduled tasks

    const response = NextResponse.json({
      status: "ok",
      message: "Journey stopped successfully",
    });
    return withCors(response, request);
  } catch (error) {
    console.error("Stop error:", error);
    const response = NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Stop failed",
      },
      { status: 500 }
    );
    return withCors(response, request);
  }
}

export async function GET(request: NextRequest) {
  const response = NextResponse.json({
    status: "ok",
    message: "Stop endpoint reachable",
  });
  return withCors(response, request);
}

export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return withCors(response, request);
}

function withCors(response: NextResponse, request?: NextRequest) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  const requestedHeaders = request?.headers.get(
    "access-control-request-headers"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    requestedHeaders ?? "Content-Type, Authorization"
  );
  return response;
}
