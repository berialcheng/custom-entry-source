import { NextRequest, NextResponse } from "next/server";
import { SaveRequest } from "@/types/entry-source";

export async function POST(request: NextRequest) {
  try {
    let body: SaveRequest | null = null;
    try {
      body = await request.json();
    } catch {
      body = null;
    }
    console.log("Save request received:", JSON.stringify(body, null, 2));

    // Handle save logic here
    // This is called when the activity configuration is saved
    // You might want to:
    // - Store configuration in a database
    // - Validate and transform settings

    const response = NextResponse.json({
      status: "ok",
      message: "Configuration saved successfully",
    });
    return withCors(response, request);
  } catch (error) {
    console.error("Save error:", error);
    const response = NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Save failed",
      },
      { status: 500 }
    );
    return withCors(response, request);
  }
}

export async function GET(request: NextRequest) {
  const response = NextResponse.json({
    status: "ok",
    message: "Save endpoint reachable",
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
