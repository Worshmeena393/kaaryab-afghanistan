import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpportunityById, updateOpportunity, deleteOpportunity } from "@/lib/storage";

export const dynamic = "force-dynamic";

const opportunityUpdateSchema = z.object({
  title: z.string().min(3).optional(),
  organization: z.string().min(2).optional(),
  category: z.enum(["Job", "Internship", "Scholarship", "Online Course", "Remote Work", "Training", "Volunteer", "Professional Development"]).optional(),
  location: z.string().min(2).optional(),
  type: z.enum(["Remote", "On-site", "Hybrid"]).optional(),
  deadline: z.string().min(1).optional(),
  description: z.string().min(20).optional(),
  requirements: z.array(z.string()).optional(),
  applyLink: z
    .string()
    .min(4)
    .refine((val) => !val || /^https?:\/\//.test(String(val)), "Apply link must start with http:// or https://")
    .optional(),
  tags: z.array(z.string()).optional(),
});

function getParamId(paramsPromiseOrObj) {
  return Promise.resolve(paramsPromiseOrObj).then((p) => String(p?.id ?? ""));
}

export async function GET(_request, context) {
  try {
    const id = await getParamId(context?.params);
    const item = getOpportunityById(id);
    if (!item) {
      return NextResponse.json(
        { error: `Opportunity id=${id} not found` },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        data: item,
        meta: { timestamp: new Date().toISOString() },
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: "Failed to fetch opportunity",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, context) {
  try {
    const id = await getParamId(context?.params);
    const existing = getOpportunityById(id);
    if (!existing) {
      return NextResponse.json(
        { error: `Opportunity id=${id} not found` },
        { status: 404 },
      );
    }
    const payload = await request.json();
    const parsed = opportunityUpdateSchema.safeParse(payload || {});
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const updated = updateOpportunity({ id, ...parsed.data });
    if (!updated) {
      return NextResponse.json(
        { error: `Opportunity id=${id} failed to update` },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        message: "Opportunity updated successfully",
        data: updated,
      },
      { status: 200 },
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

export async function DELETE(_request, context) {
  try {
    const id = await getParamId(context?.params);
    const existing = getOpportunityById(id);
    if (!existing) {
      return NextResponse.json(
        { error: `Opportunity id=${id} not found` },
        { status: 404 },
      );
    }
    deleteOpportunity(id);
    return NextResponse.json(
      {
        message: "Opportunity deleted successfully",
        deletedId: id,
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: "Failed to delete opportunity",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
