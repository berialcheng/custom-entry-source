import { NextRequest, NextResponse } from "next/server";
import { ConfigResponse } from "@/types/entry-source";

export async function GET(request: NextRequest) {
  const baseUrl = getBaseUrl(request);

  const config: ConfigResponse = {
    workflowApiVersion: "1.1",
    metaData: {
      icon: "images/icon.png",
      category: "event",
    },
    type: "REST",
    lang: {
      "en-US": {
        name: "Custom Entry Source",
        description: "Entry source that fetches contacts from external system",
      },
      "zh-CN": {
        name: "自定义入口源",
        description: "从外部系统获取联系人的入口源",
      },
    },
    arguments: {
      execute: {
        inArguments: [],
        outArguments: [
          {
            contactKey: "",
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            customerId: "",
          },
        ],
      },
    },
    configurationArguments: {
      publish: {
        url: `${baseUrl}/api/entry-source/publish`,
      },
      validate: {
        url: `${baseUrl}/api/entry-source/validate`,
      },
      stop: {
        url: `${baseUrl}/api/entry-source/stop`,
      },
      save: {
        url: `${baseUrl}/api/entry-source/save`,
      },
    },
    userInterfaces: {
      configModal: {
        url: `${baseUrl}/config-modal`,
        height: 400,
        width: 600,
      },
    },
    schema: {
      arguments: {
        execute: {
          outArguments: [
            {
              contactKey: {
                dataType: "Text",
                direction: "out",
                access: "visible",
              },
            },
            {
              email: {
                dataType: "Email",
                direction: "out",
                access: "visible",
              },
            },
            {
              firstName: {
                dataType: "Text",
                direction: "out",
                access: "visible",
              },
            },
            {
              lastName: {
                dataType: "Text",
                direction: "out",
                access: "visible",
              },
            },
            {
              phone: {
                dataType: "Phone",
                direction: "out",
                access: "visible",
              },
            },
            {
              customerId: {
                dataType: "Text",
                direction: "out",
                access: "visible",
              },
            },
          ],
        },
      },
    },
  };

  return NextResponse.json(config);
}

function getBaseUrl(request: NextRequest): string {
  // Check for custom base URL in environment
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // Fallback to request host
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = request.headers.get("x-forwarded-proto") || "https";
  return `${protocol}://${host}`;
}
