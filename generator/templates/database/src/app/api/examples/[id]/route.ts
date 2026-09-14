import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { examples } from "@/lib/db/schemas";
import { eq } from "drizzle-orm";
import { updateExampleSchema } from "@/lib/validation";

// GET /api/examples/[id] - Get a single example
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const example = await db.select().from(examples).where(eq(examples.id, id));

    if (!example || example.length === 0) {
      return NextResponse.json({ success: false, error: "Example not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: example[0],
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch example" }, { status: 500 });
  }
}

// PUT /api/examples/[id] - Update an example
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // First check if example exists
    const existingExample = await db.select().from(examples).where(eq(examples.id, id));

    if (!existingExample || existingExample.length === 0) {
      return NextResponse.json({ success: false, error: "Example not found" }, { status: 404 });
    }

    // Validate the request body
    const validatedData = updateExampleSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validatedData.error.issues,
        },
        { status: 400 }
      );
    }

    // Update in database
    const result = await db
      .update(examples)
      .set(validatedData.data)
      .where(eq(examples.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      data: result[0],
      message: "Example updated successfully",
    });
  } catch (error) {
    console.error("Error updating example:", error);

    return NextResponse.json(
      { success: false, error: "Failed to update example" },
      { status: 500 }
    );
  }
}

// DELETE /api/examples/[id] - Delete an example
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // First check if example exists
    const existingExample = await db.select().from(examples).where(eq(examples.id, id));

    if (!existingExample || existingExample.length === 0) {
      return NextResponse.json({ success: false, error: "Example not found" }, { status: 404 });
    }

    // Delete from database
    await db.delete(examples).where(eq(examples.id, id));

    return NextResponse.json({
      success: true,
      message: "Example deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting example:", error);

    return NextResponse.json(
      { success: false, error: "Failed to delete example" },
      { status: 500 }
    );
  }
}
