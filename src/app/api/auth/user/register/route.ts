// src/app/api/auth/user-register/route.ts

import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas/user.schema";
import { findUser } from "@/lib/db/queries/user/find-user";
import { sendVerificationOtp } from "@/services/auth/otp";
import { userRegisterSchema } from "@/lib/validation/auth/user.schema";

export async function POST(request: Request) {
  try {
    // 1. Read request body
    const body = await request.json();

    // 2. Validate request
    const result = userRegisterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request",
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const input = result.data;

    // 3. Check whether identifier already exists
    if (input.email) {
      const existingUser = await findUser({
        type: "email",
        value: input.email,
      });

      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            error: "Email already exists",
          },
          { status: 400 }
        );
      }
    }

    if (input.mobile) {
      const existingUser = await findUser({
        type: "mobile",
        value: input.mobile,
      });

      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            error: "Mobile already exists",
          },
          { status: 400 }
        );
      }
    }

    // 4. Create user
    const [user] = await db
      .insert(users)
      .values({
        email: input.email,
        mobile: input.mobile,
        role: "USER",
        status: "ACTIVE",
      })
      .returning();

    // 5. Send verification OTP
    const otpResult = await sendVerificationOtp({
      userId: user.id,
      identifierType: input.email ? "EMAIL" : "MOBILE",
      identifier: input.email ?? input.mobile!,
    });

    // 6. Return response
    return NextResponse.json(
      {
        success: true,
        data: {
          verificationRequired: true,
          identifierType: input.email ? "EMAIL" : "MOBILE",
          expiresAt: otpResult.expiresAt,
          resendLockedUntil: otpResult.resendLockedUntil,
          resendCount: otpResult.resendCount,
        },
        message: "Registration successful. OTP verification required.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
