import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas";
import { eq } from "drizzle-orm";
import { updateUserSchema } from "@/lib/validation";

// GET /api/users/[id] - Get a single user
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    const user = await db.select().from(users).where(eq(users.id, id));

    if (!user || user.length === 0) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: user[0],
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch user" }, { status: 500 });
  }
}

// PUT /api/users/[id] - Update a user
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // First check if user exists
    const existingUser = await db.select().from(users).where(eq(users.id, id));
    if (!existingUser || existingUser.length === 0) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Validate the request body
    const validatedData = updateUserSchema.safeParse(body);

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
      .update(users)
      .set(validatedData.data)
      .where(eq(users.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      data: result[0],
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE /api/users/[id] - Delete a user
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    // First check if user exists
    const existingUser = await db.select().from(users).where(eq(users.id, id));
    if (!existingUser || existingUser.length === 0) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Delete from database
    await db.delete(users).where(eq(users.id, id));

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 });
  }
}
