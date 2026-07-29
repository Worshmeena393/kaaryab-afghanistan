import { NextResponse } from "next/server";
import { z } from "zod";
import { getStoredOpportunities, addOpportunity } from "@/lib/storage";

export const dynamic = "force-dynamic";

const opportunitySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  organization: z.string().min(2, "Organization is required"),
  category: z.enum(["Job", "Internship", "Scholarship", "Online Course", "Remote Work", "Training", "Volunteer", "Professional Development"]),
  location: z.string().min(2, "Location is required"),
  type: z.enum(["Remote", "On-site", "Hybrid"]),
  deadline: z.string().min(1, "Deadline is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  requirements: z.array(z.string()).default([]),
  applyLink: z.string().min(4, "Apply link is required").refine((val) => /^https?:\/\//.test(String(val)), {
    message: "Apply link must start with http:// or https://",
  }),
  tags: z.array(z.string()).default([]),
});

export async function GET() {
  try {
    const opportunities = getStoredOpportunities();
    return NextResponse.json(
      {
        count: opportunities.length,
        data: opportunities,
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
        error: "Failed to read opportunities",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const parsed = opportunitySchema.safeParse(payload || {});
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten(),
          required: [
            "title",
            "organization",
            "category",
            "location",
            "type",
            "deadline",
            "description",
            "requirements",
            "applyLink",
          ],
        },
        { status: 400 },
      );
    }
    const created = addOpportunity(parsed.data);
    return NextResponse.json(
      {
        message: "Opportunity created successfully",
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
