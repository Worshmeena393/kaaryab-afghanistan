import { NextResponse } from "next/server";
import { getOpportunityById, updateOpportunity, deleteOpportunity } from "@/lib/storage";

export const dynamic = "force-dynamic";

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
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        data: item,
        meta: { timestamp: new Date().toISOString() },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch opportunity", message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, context) {
  try {
    const id = await getParamId(context?.params);
    const payload = await request.json();
    const updated = updateOpportunity({ id, ...payload });
    if (!updated) {
      return NextResponse.json(
        { error: `Opportunity id=${id} not found` },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Opportunity updated successfully",
        data: updated,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid JSON payload", message: err instanceof Error ? err.message : "Unknown error" },
      { status: 400 }
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
        { status: 404 }
      );
    }
    deleteOpportunity(id);
    return NextResponse.json(
      {
        message: "Opportunity deleted successfully",
        deletedId: id,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete opportunity", message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
