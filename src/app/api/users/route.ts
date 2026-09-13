import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas";
import { createUserSchema } from "@/lib/validation";

// GET /api/users - List all users
export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    return NextResponse.json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = createUserSchema.safeParse(body);

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

    // Insert into database
    const result = await db.insert(users).values(validatedData.data).returning();

    return NextResponse.json(
      {
        success: true,
        data: result[0],
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
  }
}
