import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { examples } from "@/lib/db/schemas";
import { createExampleSchema } from "@/lib/validation";

// GET /api/examples - List all examples
export async function GET() {
  try {
    const allExamples = await db.select().from(examples);

    return NextResponse.json({
      success: true,
      data: allExamples,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch examples" },
      { status: 500 }
    );
  }
}

// POST /api/examples - Create a new example
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = createExampleSchema.safeParse(body);

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
    const result = await db.insert(examples).values(validatedData.data).returning();

    return NextResponse.json(
      {
        success: true,
        data: result[0],
        message: "Example created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating example:", error);

    return NextResponse.json(
      { success: false, error: "Failed to create example" },
      { status: 500 }
    );
  }
}
