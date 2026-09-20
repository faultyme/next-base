import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";

import { AUTH_JWT_MAX_AGE, AUTH_SECRET, AUTH_SESSION_SALT } from "@/lib/auth/config";
import { findUser } from "@/lib/db/queries/user/find-user";
import { userLoginSchema } from "@/lib/validation/auth/user.schema";
import { verifyOtp } from "@/services/auth/otp";

export async function POST(request: Request) {
  try {
    // 1. Read request body
    const body = await request.json();

    // 2. Validate request
    const result = userLoginSchema.safeParse(body);

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

    // 3. Find user
    const user = input.email
      ? await findUser({
          type: "email",
          value: input.email,
        })
      : await findUser({
          type: "mobile",
          value: input.mobile!,
        });

    // 4. User not found
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    // 5. Check user status
    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        {
          success: false,
          error: "User is not active",
        },
        { status: 401 }
      );
    }

    // 6. Verify OTP
    const verification = await verifyOtp({
      userId: user.id,
      identifierType: input.email ? "EMAIL" : "MOBILE",
      otp: input.otp,
    });

    // 7. OTP failed
    if (!verification.verified) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    // 8. Generate Auth.js JWT
    const accessToken = await encode({
      token: {
        sub: user.id,
      },
      secret: AUTH_SECRET,
      salt: AUTH_SESSION_SALT,
      maxAge: AUTH_JWT_MAX_AGE,
    });

    // 9. Login success
    const response = NextResponse.json(
      {
        success: true,
        data: {
          userId: user.id,
          accessToken,
        },
        message: "Login successful.",
      },
      { status: 200 }
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: AUTH_JWT_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
