import { NextResponse } from "next/server";
import { getStoredOpportunities, addOpportunity } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const opportunities = getStoredOpportunities();
    return NextResponse.json(
      {
        count: opportunities.length,
        data: opportunities,
        meta: {
          source: "LocalStorage (mock API backend)",
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to read opportunities", message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const newItem = addOpportunity(payload);
    if (!newItem) {
      return NextResponse.json(
        { error: "Validation failed. Required fields: title, organization, category, location, type, deadline, description, requirements, applyLink." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "Opportunity created successfully",
        data: newItem,
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
