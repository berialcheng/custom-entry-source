import { NextRequest, NextResponse } from "next/server";
import { PublishRequest } from "@/types/entry-source";

export async function POST(request: NextRequest) {
  try {
    let body: PublishRequest | null = null;
    try {
      body = await request.json();
    } catch {
      body = null;
    }
    console.log("Publish request received:", JSON.stringify(body, null, 2));

    // Handle publish logic here
    // This is called when the Journey is published/activated
    // You might want to:
    // - Start data synchronization
    // - Set up webhooks
    // - Initialize scheduled tasks

    const response = NextResponse.json({
      status: "ok",
      message: "Journey published successfully",
    });
    return withCors(response, request);
  } catch (error) {
    console.error("Publish error:", error);
    const response = NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Publish failed",
      },
      { status: 500 }
    );
    return withCors(response, request);
  }
}

export async function GET(request: NextRequest) {
  const response = NextResponse.json({
    status: "ok",
    message: "Publish endpoint reachable",
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
