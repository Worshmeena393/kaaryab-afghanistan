import { NextResponse } from "next/server";
import { z } from "zod";
import { saveMessage, getMessages } from "@/lib/storage";

export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email format"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function GET() {
  try {
    const messages = getMessages();
    return NextResponse.json(
      {
        count: messages.length,
        data: messages,
        meta: {
          source: "KaarYab storage layer (server in-memory + browser LocalStorage hybrid)",
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: "Failed to read messages",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const parsed = contactSchema.safeParse(payload || {});
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten(),
          required: ["name", "email", "subject", "message"],
        },
        { status: 400 },
      );
    }
    const created = saveMessage(parsed.data);
    return NextResponse.json(
      {
        message: "Message sent successfully. Thank you for contacting KaarYab Afghanistan!",
        data: created,
      },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: "Invalid JSON payload",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}
