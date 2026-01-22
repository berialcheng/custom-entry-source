import { NextRequest, NextResponse } from "next/server";
import { MockDataService } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  try {
    let body: unknown = null;
    try {
      body = await request.json();
    } catch {
      body = null;
    }
    console.log("Execute request received:", JSON.stringify(body, null, 2));

    // Get all contacts from mock data
    const contacts = MockDataService.getContacts();

    // Transform contacts to the format expected by Journey Builder
    const responseData = contacts.map((contact) => ({
      contactKey: contact.id,
      email: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone || "",
      customerId: contact.customerId || "",
    }));

    const response = NextResponse.json({
      status: "ok",
      data: responseData,
    });
    return withCors(response, request);
  } catch (error) {
    console.error("Execute error:", error);
    const response = NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
    return withCors(response, request);
  }
}

// Support GET for testing
export async function GET(request: NextRequest) {
  try {
    const contacts = MockDataService.getContacts();

    const responseData = contacts.map((contact) => ({
      contactKey: contact.id,
      email: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone || "",
      customerId: contact.customerId || "",
    }));

    const response = NextResponse.json({
      status: "ok",
      data: responseData,
    });
    return withCors(response, request);
  } catch (error) {
    console.error("Execute error:", error);
    const response = NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
    return withCors(response, request);
  }
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
