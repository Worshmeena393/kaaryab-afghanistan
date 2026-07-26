import { NextResponse } from "next/server";
import { saveMessage, getMessages } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const messages = getMessages();
    return NextResponse.json(
      {
        count: messages.length,
        data: messages,
        meta: { timestamp: new Date().toISOString() },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to read messages", message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, subject, message } = payload || {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: ["name", "email", "subject", "message"],
        },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const newMessage = saveMessage(payload);
    return NextResponse.json(
      {
        message: "Message sent successfully. Thank you for contacting KaarYab Afghanistan!",
        data: newMessage,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid JSON payload", message: err instanceof Error ? err.message : "Unknown error" },
      { status: 400 }
    );
  }
}
