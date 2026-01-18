import { NextRequest, NextResponse } from "next/server";
import { MockDataService } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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

    return NextResponse.json({
      status: "ok",
      data: responseData,
    });
  } catch (error) {
    console.error("Execute error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Support GET for testing
export async function GET() {
  const contacts = MockDataService.getContacts();

  const responseData = contacts.map((contact) => ({
    contactKey: contact.id,
    email: contact.email,
    firstName: contact.firstName,
    lastName: contact.lastName,
    phone: contact.phone || "",
    customerId: contact.customerId || "",
  }));

  return NextResponse.json({
    status: "ok",
    data: responseData,
  });
}
