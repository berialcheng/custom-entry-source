import { NextRequest, NextResponse } from "next/server";
import { ValidateRequest } from "@/types/entry-source";

export async function POST(request: NextRequest) {
  try {
    let body: ValidateRequest | null = null;
    try {
      body = await request.json();
    } catch {
      body = null;
    }
    console.log("Validate request received:", JSON.stringify(body, null, 2));

    // Perform validation logic here
    // For now, we'll always return success
    // In production, you might want to validate:
    // - Configuration is complete
    // - Required fields are present
    // - External system is accessible

    const response = NextResponse.json({
      status: "ok",
      message: "Validation successful",
    });
    return withCors(response, request);
  } catch (error) {
    console.error("Validate error:", error);
    const response = NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Validation failed",
      },
      { status: 400 }
    );
    return withCors(response, request);
  }
}

export async function GET(request: NextRequest) {
  const response = NextResponse.json({
    status: "ok",
    message: "Validation endpoint reachable",
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
